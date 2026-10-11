import React, { useState } from 'react';
import type { CandidateResult, SearchRequest, SearchResponse } from './types';
import { MOCK_CANDIDATES } from './mockData';

export default function App() {
  const [candidates, setCandidates] = useState<CandidateResult[]>(MOCK_CANDIDATES);
  const [loading, setLoading] = useState<boolean>(false);
  const [previousCompany, setPreviousCompany] = useState<string>('Stripe');
  const [windowMonths, setWindowMonths] = useState<number>(6);
  const [sector, setSector] = useState<string>('AI Infrastructure');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: SearchRequest = {
      previous_company: previousCompany,
      current_titles: ['Founder', 'Co-Founder'],
      transition_window_months: windowMonths,
      sectors: sector ? [sector] : [],
      limit: 10,
    };

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Backend offline');
      const data: SearchResponse = await res.json();
      setCandidates(data.results);
    } catch {
      setCandidates(MOCK_CANDIDATES);
    } finally {
      setLoading(false);
    }
  };

  const handleDraftChange = (personId: string, updatedDraft: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.person_id === personId ? { ...c, outreach_draft: updatedDraft } : c))
    );
  };

  const copyDraft = (id: string, text: string | null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
              FR
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">Founder Radar</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">neatHack 2026</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <span>Team <strong className="text-slate-800">Rm-rf</strong></span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">● Observability Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Stealth Founder Discovery</h1>
          <p className="text-slate-500 text-sm mt-1">
            Autonomous venture scouting across live talent migrations, powered by Crustdata and Gemini[cite: 2].
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Previous Company</label>
              <input
                type="text"
                value={previousCompany}
                onChange={(e) => setPreviousCompany(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="e.g. Stripe, OpenAI, Meta"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transition Window</label>
              <select
                value={windowMonths}
                onChange={(e) => setWindowMonths(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value={3}>Past 3 Months</option>
                <option value={6}>Past 6 Months</option>
                <option value={12}>Past 12 Months</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Sector Focus</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="e.g. Fintech, AI Infra"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Scanning Profiles...' : 'Run Discovery Scan'}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          {candidates.map((candidate) => (
            <article key={candidate.person_id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {candidate.confidence} Confidence
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5 font-medium">
                    {candidate.current_title} {candidate.startup_name ? `• ${candidate.startup_name}` : '• Stealth'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Ex-<strong>{candidate.previous_company}</strong> ({candidate.previous_role || 'Engineer'})
                  </p>
                </div>

                <div className="flex md:flex-col items-baseline md:items-end justify-between">
                  <div className="text-3xl font-black text-indigo-600">{candidate.fit_score}%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Match Fit</div>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs">
                <div className="font-semibold text-slate-800 mb-1">
                  Sector Hypothesis: <span className="font-normal text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded ml-1">{candidate.sector_hypothesis}</span>
                </div>
                <ul className="mt-2 space-y-1 text-slate-600 list-disc list-inside">
                  {candidate.sector_evidence.map((evidence, i) => (
                    <li key={i}>{evidence}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Outreach Draft (Human-Review Required)[cite: 2]
                  </span>
                  <button
                    onClick={() => copyDraft(candidate.person_id, candidate.outreach_draft)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                  >
                    {copiedId === candidate.person_id ? '✓ Copied to clipboard' : 'Copy Message'}
                  </button>
                </div>
                <textarea
                  value={candidate.outreach_draft || ''}
                  onChange={(e) => handleDraftChange(candidate.person_id, e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans leading-relaxed"
                />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
