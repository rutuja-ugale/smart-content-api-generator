'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto space-y-8 font-sans">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Smart Content & API Generator Agent</h1>
        <p className="text-gray-600 mt-1">Generate JSON API Specs & Next.js UI Code from High-Level Prompts</p>
      </header>

      <section className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Requirement Prompt</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            placeholder="e.g. Build a dynamic feedback form with rating and user comments..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="prompt-input"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          id="generate-btn"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating Specs...' : 'Generate API & UI Code'}
        </button>
      </section>

      {result && (
        <section className="space-y-6 border-t pt-6" id="result-section">
          <h2 className="text-xl font-bold">Generated Output</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <h3 className="text-gray-400 text-xs mb-2">// JSON API Specification</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </section>
      )}
    </main>
  );
}
