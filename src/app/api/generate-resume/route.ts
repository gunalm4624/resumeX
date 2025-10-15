import { NextRequest } from 'next/server'
import { generateResumeWithGemini, GeminiResumeOutput } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { targetRole, company, jobDescription, baseData } = body || {}

    const result: GeminiResumeOutput = await generateResumeWithGemini({
      targetRole,
      company,
      jobDescription,
      baseData
    })

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e: any) {
    console.error('Failed to generate with Gemini', e)
    return new Response(JSON.stringify({ error: 'Failed to generate with Gemini' }), { status: 500 })
  }
}


