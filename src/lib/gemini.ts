export type GeminiResumeOutput = {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  workExperience: Array<{
    company: string;
    role: string;
    duration: string;
    responsibilities: string;
  }>;
  internships: Array<{
    organization: string;
    role: string;
    duration: string;
    details: string;
  }>;
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  skills: string;
  awards: string;
};

function getApiKey(): string {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) {
    throw new Error('Missing GOOGLE_GENERATIVE_AI_API_KEY');
  }
  return key;
}

export async function generateResumeWithGemini(input: {
  targetRole?: string;
  company?: string;
  jobDescription?: string;
  baseData: Partial<GeminiResumeOutput>;
}): Promise<GeminiResumeOutput> {
  const apiKey = getApiKey();
  const baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  // Force Gemini 1.5 Flash per request, with a minimal fallback
  const candidateModels = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash'
  ];

  const systemInstruction = `You are an expert resume writer. Produce concise, ATS-friendly bullet points and a professional summary. Output STRICT JSON only matching the provided JSON schema. Avoid markdown, explanations, or extra text.`;

  const schema = {
    type: 'object',
    properties: {
      personal: {
        type: 'object',
        properties: {
          fullName: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          location: { type: 'string' },
          summary: { type: 'string' }
        },
        required: ['fullName', 'email', 'phone', 'location', 'summary']
      },
      workExperience: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            company: { type: 'string' },
            role: { type: 'string' },
            duration: { type: 'string' },
            responsibilities: { type: 'string' }
          },
          required: ['company', 'role', 'duration', 'responsibilities']
        }
      },
      internships: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            organization: { type: 'string' },
            role: { type: 'string' },
            duration: { type: 'string' },
            details: { type: 'string' }
          },
          required: ['organization', 'role', 'duration', 'details']
        }
      },
      education: {
        type: 'object',
        properties: {
          degree: { type: 'string' },
          institution: { type: 'string' },
          year: { type: 'string' }
        },
        required: ['degree', 'institution', 'year']
      },
      skills: { type: 'string' },
      awards: { type: 'string' }
    },
    required: ['personal', 'education', 'skills']
  };

  const base = input.baseData || {};
  const prompt = `Role: ${input.targetRole || ''}\nCompany: ${input.company || ''}\nJob Description: ${input.jobDescription || ''}\n\nBase Data (use and enhance, do not contradict):\n${JSON.stringify(base, null, 2)}\n\nReturn a single JSON object adhering to this schema: ${JSON.stringify(schema)}.`;

  let data: any = null;
  let lastError: any = null;
  for (const model of candidateModels) {
    const url = `${baseUrl}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    // Log model attempt for debugging
    console.log('[Gemini] Trying model:', model);
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }
        ],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
      })
    });
    if (resp.ok) {
      data = await resp.json();
      console.log('[Gemini] Success with model:', model);
      break;
    } else {
      lastError = new Error(`Gemini API error: ${resp.status} for model ${model}`);
      console.warn('[Gemini] Failed with model:', model, 'status:', resp.status);
      // try next model if 404/400
      if (resp.status !== 404 && resp.status !== 400 && resp.status !== 403) {
        break;
      }
    }
  }
  if (!data) {
    throw lastError || new Error('Gemini API error: unknown');
  }
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Try to parse JSON from the model output
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  const jsonStr = jsonStart >= 0 && jsonEnd >= 0 ? text.slice(jsonStart, jsonEnd + 1) : text;
  const parsed = JSON.parse(jsonStr) as GeminiResumeOutput;
  return parsed;
}


