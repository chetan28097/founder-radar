import React, { useState } from 'react';
import { SearchRequest } from '../types';

interface Props {
  onSearch: (params: SearchRequest) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<Props> = ({ onSearch, isLoading }) => {
  const [previousCompany, setPreviousCompany] = useState('Stripe');
  const [windowMonths, setWindowMonths] = useState(6);
  const [sector, setSector] = useState('AI Infrastructure');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      previous_company: previousCompany,
      current_titles: ['Founder', 'Co-Founder'],
      transition_window_months: windowMonths,
      sectors: sector ? [sector] : [],
      limit: 10,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-8">
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
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Scanning Profiles...' : 'Run Discovery Scan'}
          </button>
        </div>
      </div>
    </form>
  );
};