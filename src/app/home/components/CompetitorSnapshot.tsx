'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CompRow {
  feature: string;
  us: boolean;
  a: boolean;
  b: boolean;
  c: boolean;
}

const ROWS: CompRow[] = [
  { feature: 'Third-party productivity audit', us: true, a: false, b: false, c: false },
  { feature: 'Full workflow transparency', us: true, a: false, b: true, c: false },
  { feature: 'No proprietary limitations', us: true, a: false, b: false, c: false },
  { feature: 'Real-time performance metrics', us: true, a: false, b: false, c: false },
  { feature: 'Money-back guarantee (60-day)', us: true, a: true, b: false, c: false },
  { feature: 'Zero feature bloat', us: true, a: false, b: false, c: true },
  { feature: 'Published integration APIs', us: true, a: false, b: false, c: false },
];

function Cell({ val }: { val: boolean }) {
  return (
    <td className="px-4 py-4 text-center">
      {val ? (
        <Icon name="CheckCircleIcon" size={18} className="comp-check mx-auto" variant="solid" />
      ) : (
        <Icon name="XCircleIcon" size={18} className="comp-cross mx-auto" variant="solid" />
      )}
    </td>
  );
}

export default function CompetitorSnapshot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('visible');
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-28 px-8 border-y border-white/[0.04] bg-midnight-2/30">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="reveal-on-scroll"
        >
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald mb-2">
              Competitive Analysis // Exhibit 7-C
            </p>
            <h2 className="font-display font-800 text-accent text-3xl md:text-4xl mb-3">
              The Market Didn't Adapt. It Resisted.
            </h2>
            <p className="font-sans text-accent-dim max-w-2xl leading-relaxed">
              Seven incumbents. Seven audits. Every one failed on the metrics that actually matter to teams. 
              This isn't a gap in the market — it's a deliberate resistance to innovation.
            </p>
          </div>

          {/* Table */}
          <div className="intel-card rounded-2xl overflow-hidden gradient-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-6 py-5 text-left font-mono text-[10px] uppercase tracking-[0.3em] text-accent-muted w-1/2">
                      Criteria
                    </th>
                    <th className="px-4 py-5 text-center font-mono text-[10px] uppercase tracking-[0.3em]">
                      <span className="text-emerald">Nexus</span>
                    </th>
                    <th className="px-4 py-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-accent-muted">
                      Platform A
                    </th>
                    <th className="px-4 py-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-accent-muted">
                      Platform B
                    </th>
                    <th className="px-4 py-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-accent-muted">
                      Platform C
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-white/[0.04] transition-colors hover:bg-emerald/[0.03] ${
                        i === ROWS.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-sans text-sm text-accent-dim">{row.feature}</td>
                      <td className="px-4 py-4 text-center bg-emerald/[0.04]">
                        <Icon name="CheckCircleIcon" size={18} className="comp-check mx-auto" variant="solid" />
                      </td>
                      <Cell val={row.a} />
                      <Cell val={row.b} />
                      <Cell val={row.c} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-widest text-accent-muted mt-4 text-right">
            Audit conducted by Clarity Labs, Nov 2025 // Methodology available on request
          </p>
        </div>
      </div>
    </section>
  );
}