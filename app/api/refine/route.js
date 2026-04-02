import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const DAILY_LIMIT = 5

export async function POST(request) {
  const { prompt, questions, answers } = await request.json()

  if (!prompt || !answers?.length) {
    return NextResponse.json({ error: 'Prompt and answers are required' }, { status: 400 })
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY is not configured.' }, { status: 500 })
  }

  // ── Rate limit check ───────────────────────────────────────────────────────
  // Only counts existing rows — save happens client-side after this returns.
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .maybeSingle()

      const isPro = profile?.plan === 'pro'

      if (!isPro) {
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)

        const { count } = await supabase
          .from('prompt_history')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', todayStart.toISOString())

        if ((count ?? 0) >= DAILY_LIMIT) {
          return NextResponse.json(
            { error: 'Daily limit reached', limitReached: true, used: count, limit: DAILY_LIMIT },
            { status: 429 }
          )
        }
      }
    }
  } catch (e) {
    console.error('[refine] rate-limit check error:', e)
    // Non-critical — continue
  }

  // ── Generate ───────────────────────────────────────────────────────────────
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const qa = questions
      .map((q, i) => `- ${q}\n  → ${answers[i]}`)
      .join('\n')

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are PromptForge — an expert prompt engineer. Transform rough prompts into precise, powerful AI instructions.

IMPORTANT: Detect the language of the user's original prompt and respond entirely in that language. If the prompt is in Czech, write the refined prompt and improvement note in Czech. Always match the user's language.

When refining:
- Incorporate ALL context from the user's clarification answers
- Add specificity, structure, and clear constraints
- Keep the prompt natural and easy to paste into any AI tool
- Do NOT add unnecessary preamble in the refined prompt
- Make it significantly better — not just slightly rephrased

Scoring: 1–10 where 1 = vague, 10 = perfect precision
Improvement note: one sentence explaining the biggest upgrade (in the user's language)

Return ONLY valid JSON:
{"refined":"...","original_score":3.5,"refined_score":9.2,"improvement":"..."}`,
        },
        {
          role: 'user',
          content: `Original prompt: "${prompt.slice(0, 600)}"\n\nClarifications:\n${qa}\n\nWrite a refined, precise version.`,
        },
      ],
    })

    const data = JSON.parse(completion.choices[0].message.content.trim())
    return NextResponse.json({ ...data, limit: DAILY_LIMIT })
  } catch (e) {
    console.error('[refine] generation error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
