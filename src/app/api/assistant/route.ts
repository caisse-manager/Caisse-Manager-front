import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
})

export async function POST(req: Request) {
  const { question } = await req.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
  })

  const reply = completion.choices[0]?.message?.content || "Je n’ai pas compris"

  return NextResponse.json({ reply })
}
