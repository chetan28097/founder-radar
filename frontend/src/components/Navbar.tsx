import React from 'react';

export const Navbar: React.FC = () => (
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
);