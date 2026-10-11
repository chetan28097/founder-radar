import { useState, type FC, type ChangeEvent } from 'react';
import type { CandidateResult } from '../types';

interface CandidateCardProps {
  candidate: CandidateResult;
  onDraftChange?: (personId: string, updatedDraft: string) => void;
}

export const CandidateCard: FC<CandidateCardProps> = ({ candidate, onDraftChange }) => {
  const [draft, setDraft] = useState<string>(candidate.outreach_draft || '');
  const [copied, setCopied] = useState<boolean>(false);
  const [isScoreDrawerOpen, setIsScoreDrawerOpen] = useState<boolean>(false);

  const handleDraftChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDraft(value);
    if (onDraftChange) {
      onDraftChange(candidate.person_id, value);
    }
  };

  const copyDraft = () => {
    if (!draft) return;
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidenceStyle = {
    high: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-slate-100 text-slate-700 border-slate-200',
  }[candidate.confidence];

  // Helper to parse score points prefix like "+40: explanation"
  const parseScoreItem = (item: string) => {
    const match = item.match(/^([+-]?\d+):?\s*(.*)$/);
    if (match) {
      return {
        points: match[1],
        explanation: match[2],
      };
    }
    return {
      points: null,
      explanation: item,
    };
  };

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
            
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${confidenceStyle}`}>
              {candidate.confidence} Confidence
            </span>

            {candidate.transition_status && (
              <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {candidate.transition_status}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 mt-1 font-medium">
            {candidate.current_title} {candidate.startup_name ? `• ${candidate.startup_name}` : '• Stealth'}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Ex-<strong>{candidate.previous_company}</strong>
            {candidate.previous_role ? ` (${candidate.previous_role})` : ''}
            {candidate.transition_date ? ` • Departed ${candidate.transition_date}` : ''}
          </p>
        </div>

        {/* Match Fit Score */}
        <div className="flex md:flex-col items-baseline md:items-end justify-between">
          <div className="text-3xl font-black text-indigo-600 tracking-tight">
            {candidate.fit_score}%
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Match Fit
          </div>
        </div>
      </div>

      {/* Sector Hypothesis & Supporting Evidence */}
      <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs">
        <div className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
          <span>Sector Hypothesis:</span>
          <span className="font-medium text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/60">
            {candidate.sector_hypothesis}
          </span>
        </div>
        
        {candidate.sector_evidence && candidate.sector_evidence.length > 0 && (
          <ul className="mt-2 space-y-1.5 text-slate-600">
            {candidate.sector_evidence.map((evidence, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5 font-bold">›</span>
                <span>{evidence}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Collapsible Score Breakdown Drawer */}
      <div className="mt-3 border border-slate-200/80 rounded-xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setIsScoreDrawerOpen(!isScoreDrawerOpen)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-50/70 hover:bg-slate-100/80 transition cursor-pointer select-none"
          aria-expanded={isScoreDrawerOpen}
        >
          <div className="flex items-center gap-2">
            <svg
              className={`w-3.5 h-3.5 text-indigo-600 transition-transform duration-200 ${
                isScoreDrawerOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
            <span>Score Breakdown</span>
            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
              {candidate.score_explanation?.length || 0} factors
            </span>
          </div>

          <span className="text-[11px] text-slate-500 font-normal">
            {isScoreDrawerOpen ? 'Hide breakdown' : 'View factors'}
          </span>
        </button>

        {isScoreDrawerOpen && (
          <div className="p-3.5 bg-slate-50/40 border-t border-slate-200/60 transition-all duration-200">
            {candidate.score_explanation && candidate.score_explanation.length > 0 ? (
              <div className="space-y-2">
                {candidate.score_explanation.map((item, index) => {
                  const { points, explanation } = parseScoreItem(item);
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 text-xs bg-white p-2 rounded-lg border border-slate-100 shadow-2xs"
                    >
                      {points ? (
                        <span className="shrink-0 font-bold px-1.5 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {points.startsWith('+') ? points : `+${points}`}
                        </span>
                      ) : (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />
                      )}
                      <span className="text-slate-700 leading-relaxed font-medium">
                        {explanation}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-1">
                No detailed score breakdown factors available for this profile.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Human-in-the-Loop Outreach Draft */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Outreach Draft (Human-Review Required)
          </span>
          <button
            type="button"
            onClick={copyDraft}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer transition flex items-center gap-1"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-600">Copied to clipboard</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Message</span>
              </>
            )}
          </button>
        </div>
        <textarea
          value={draft}
          onChange={handleDraftChange}
          rows={3}
          className="w-full text-xs p-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-sans leading-relaxed bg-slate-50/30 focus:bg-white transition"
          placeholder="Craft an outreach message..."
        />
      </div>
    </article>
  );
};