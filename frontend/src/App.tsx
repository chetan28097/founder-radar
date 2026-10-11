import { useState } from 'react';
import type { CandidateResult, SearchRequest, SearchResponse } from './types';
import { MOCK_CANDIDATES } from './mockData';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CandidateCard } from './components/CandidateCard';
import { SkeletonCard } from './components/SkeletonCard';

export default function App() {
  const [candidates, setCandidates] = useState<CandidateResult[]>(MOCK_CANDIDATES);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeSector, setActiveSector] = useState<string>('');

  const handleSearch = async (payload: SearchRequest) => {
    setLoading(true);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Backend offline or responded with error');
      const data: SearchResponse = await res.json();
      if (data && Array.isArray(data.results)) {
        setCandidates(data.results);
      } else {
        setCandidates(MOCK_CANDIDATES);
      }
    } catch {
      // Graceful fallback to verified mock candidates for offline/demo reliability
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

  // Filter candidates if a sector quick filter badge is actively selected
  const filteredCandidates = activeSector
    ? candidates.filter((c) => {
        const sectorHypothesisMatch = c.sector_hypothesis
          ?.toLowerCase()
          .includes(activeSector.toLowerCase());
        const evidenceMatch = c.sector_evidence?.some((e) =>
          e.toLowerCase().includes(activeSector.toLowerCase())
        );
        return sectorHypothesisMatch || evidenceMatch;
      })
    : candidates;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-8">
        {/* Hero Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Stealth Founder Discovery
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Autonomous venture scouting across live talent migrations, powered by Crustdata and Gemini.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Radar Engine Live</span>
          </div>
        </div>

        {/* Modular Search Bar with Quick Filter Badge Bar */}
        <SearchBar
          onSearch={handleSearch}
          isLoading={loading}
          activeSector={activeSector}
          onSectorSelect={(sec) => setActiveSector(sec)}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {loading
                ? 'Scanning Ecosystem...'
                : `Matched Founders (${filteredCandidates.length})`}
            </span>
            {activeSector && (
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                Filtered: {activeSector}
              </span>
            )}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Strict Section 7 Candidate Contract
          </span>
        </div>

        {/* Loading State Skeleton or Candidate Cards */}
        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredCandidates.length > 0 ? (
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.person_id}
                candidate={candidate}
                onDraftChange={handleDraftChange}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-800">No candidates found for this sector</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try clicking "Clear filter" or running a discovery scan with a broader transition window.
            </p>
            {activeSector && (
              <button
                type="button"
                onClick={() => setActiveSector('')}
                className="mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Reset Sector Filter
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
