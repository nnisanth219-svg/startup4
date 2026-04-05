'use client';
import React from 'react';

const TICKER_ITEMS = [
  '73% TEAM EFFICIENCY GAP',
  'TRANSFORMATION SCORE: 91/100',
  '$3.8B MARKET OPPORTUNITY',
  '8,200 TEAMS SURVEYED',
  '89% READY TO SWITCH NOW',
  '10 YEARS OF STAGNATION',
  'PLATFORM REVOLUTION IMMINENT',
  'LAUNCH: 30 DAYS AWAY',
];

export default function DataTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="border-y border-white/[0.06] bg-midnight-2/50 py-3 overflow-hidden">
      <div className="ticker-track flex items-center gap-12">
        {doubled?.map((item, i) => (
          <span key={i} className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-muted whitespace-nowrap flex-shrink-0">
            <span className="w-1 h-1 rounded-full bg-emerald inline-block flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}