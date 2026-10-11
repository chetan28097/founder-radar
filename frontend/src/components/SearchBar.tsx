import { useState, type FC, type FormEvent } from 'react';
import type { SearchRequest } from '../types';

interface SearchBarProps {
  onSearch: (params: SearchRequest) => void;
  isLoading: boolean;
  activeSector?: string;
  onSectorSelect?: (sector: string) => void;
}

const SECTOR_PRESETS = [
  { id: 'AI Infra', label: 'AI Infra', value: 'AI Infra' },
  { id: 'Fintech', label: 'Fintech', value: 'Fintech' },
  { id: 'DevTools', label: 'DevTools', value: 'DevTools' },
];

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  activeSector,
  onSectorSelect,
}) => {
  const [previousCompany, setPreviousCompany] = useState<string>('Stripe');
  const [windowMonths, setWindowMonths] = useState<number>(6);
  const [sector, setSector] = useState<string>(activeSector || 'AI Infra');

  const handleSectorBadgeClick = (presetValue: string) => {
    const nextSector = sector === presetValue ? '' : presetValue;
    setSector(nextSector);
    if (onSectorSelect) {
      onSectorSelect(nextSector);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({
      previous_company: previousCompany.trim(),
      current_titles: ['Founder', 'Co-Founder'],
      transition_window_months: windowMonths,
      sectors: sector.trim() ? [sector.trim()] : [],
      limit: 10,
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-8 space-y-4">
      {/* Quick Filter Badge Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
          Quick Filters:
        </span>

        {SECTOR_PRESETS.map((preset) => {
          const isActive = sector.toLowerCase().includes(preset.value.toLowerCase());
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSectorBadgeClick(preset.value)}
              className={`text-xs px-3 py-1 rounded-full font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
              }`}
            >
              <span>{preset.label}</span>
              {isActive && (
                <span className="text-[10px] bg-indigo-500/80 text-white rounded-full px-1">
                  ✓
                </span>
              )}
            </button>
          );
        })}

        {sector && (
          <button
            type="button"
            onClick={() => {
              setSector('');
              if (onSectorSelect) onSectorSelect('');
            }}
            className="text-[11px] text-slate-400 hover:text-slate-600 underline ml-auto transition cursor-pointer"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Primary Search Controls */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Previous Company
            </label>
            <input
              type="text"
              value={previousCompany}
              onChange={(e) => setPreviousCompany(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              placeholder="e.g. Stripe, OpenAI, Meta"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Transition Window
            </label>
            <select
              value={windowMonths}
              onChange={(e) => setWindowMonths(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
            >
              <option value={3}>Past 3 Months</option>
              <option value={6}>Past 6 Months</option>
              <option value={12}>Past 12 Months</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Target Sector Focus
            </label>
            <input
              type="text"
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                if (onSectorSelect) onSectorSelect(e.target.value);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              placeholder="e.g. AI Infra, Fintech, DevTools"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Scanning Profiles...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Run Discovery Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};