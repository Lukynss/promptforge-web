import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { prompt } = await request.json()

  if (!prompt?.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY is not configured.' }, { status: 500 })
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are PromptForge — an expert at turning rough prompts into precise, powerful AI instructions.

IMPORTANT: Detect the language of the user's prompt and respond in that exact same language. If the prompt is in Czech, write all questions and options in Czech. If in English, respond in English. Always match the user's language.

Your job: read the user's rough prompt and decide how many clarifying questions are needed to make it perfect. Use your judgment:
- Simple, clear prompts may need only 1–2 questions
- Vague or complex prompts may need 4–6 questions
- Never ask more than 6 questions
- Never ask unnecessary questions — only what genuinely changes the output

Rules for great questions:
- Each question targets ONE specific missing dimension (audience, tone, format, goal, context, length, style, etc.)
- Options must be SHORT (2–6 words), concrete, and mutually distinct
- Options must be tailored to THIS specific prompt — not generic
- Each question should have 3–5 options
- Order questions from most to least important

Return ONLY valid JSON:
{"questions":[{"q":"Question text?","options":["Option A","Option B","Option C"]}]}`,
        },
        {
          role: 'user',
          content: `Prompt: "${prompt.slice(0, 600)}"

Decide how many questions are needed and generate them with specific answer options. Make them specific to this exact prompt.`,
        },
      ],
    })

    const text = completion.choices[0].message.content.trim()
    const data = JSON.parse(text)

    // Validate shape
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      throw new Error('Invalid response shape from model')
    }

    return NextResponse.json(data)
  } catch (e) {
    console.error('questions route error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
