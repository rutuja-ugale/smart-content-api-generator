import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Mock API generation logic simulating Python LLM pipeline output
    const spec = {
      endpoint: `/api/v1/${prompt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      method: "POST",
      schema: {
        id: "string",
        title: "string",
        content: "string",
        createdAt: "string"
      },
      uiCode: `export default function GeneratedCard() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">${prompt}</h2>
      <p className="text-gray-600">Automated Next.js UI component generated via LLM Pipeline.</p>
    </div>
  );
}`
    };

    return NextResponse.json({ success: true, data: spec });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate spec" }, { status: 500 });
  }
}
