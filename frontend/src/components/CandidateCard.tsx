import React, { useState } from 'react';
import { CandidateResult } from '../types';

export const CandidateCard: React.FC<{ candidate: CandidateResult }> = ({ candidate }) => {
  const [draft, setDraft] = useState(candidate.outreach_draft || '');
  const [copied, setCopied] = useState(false);

  const copyDraft = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidenceColor = {
    high: 'bg-emerald-100 text-emerald-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-slate-100 text-slate-800',
  }[candidate.confidence];

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${confidenceColor}`}>
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

      {/* Evidence & Sector Hypothesis */}
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

      {/* Human-in-the-Loop Outreach Draft */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Outreach Draft (Human-Review Required)
          </span>
          <button
            onClick={copyDraft}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
          >
            {copied ? '✓ Copied to clipboard' : 'Copy Message'}
          </button>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          className="w-full text-xs p-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans leading-relaxed"
        />
      </div>
    </article>
  );
};