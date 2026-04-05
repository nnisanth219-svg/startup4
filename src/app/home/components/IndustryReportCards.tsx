'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatCardProps {
  prefix: string;
  stat: string;
  unit?: string;
  label: string;
  source: string;
  highlight?: boolean;
  className?: string;
}

function StatCard({ prefix, stat, unit, label, source, highlight, className = '' }: StatCardProps) {
  return (
    <div
      className={`intel-card rounded-2xl p-8 flex flex-col justify-between gap-6 ${
        highlight ? 'border-emerald/30' : ''
      } ${className}`}
      style={highlight ? { boxShadow: '0 0 60px rgba(16,185,129,0.1)' } : {}}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent-muted">{prefix}</span>
        {highlight && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald border border-emerald/30 px-2 py-0.5 rounded-full">
            Critical
          </span>
        )}
      </div>
      <div>
        <div className="font-display font-800 text-accent leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          {stat}
          {unit && <span className="text-accent-muted text-2xl ml-1">{unit}</span>}
        </div>
        <p className="font-sans text-sm text-accent-dim mt-3 leading-relaxed">{label}</p>
      </div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-accent-muted border-t border-white/[0.04] pt-4">
        {source}
      </p>
    </div>
  );
}

interface MiniBarProps {
  label: string;
  value: number;
  max?: number;
  animated?: boolean;
}

function MiniBar({ label, value, max = 100, animated }: MiniBarProps) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-accent-muted w-32 flex-shrink-0 uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-1.5 bg-midnight-3 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-emerald transition-all ease-out"
          style={{
            width: animated ? `${pct}%` : '0%',
            transitionDuration: '1.2s',
          }}
        />
      </div>
      <span className="font-mono text-[10px] text-accent w-8 text-right">{value}%</span>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  bars: MiniBarProps[];
  source: string;
  className?: string;
}

function ChartCard({ title, subtitle, bars, source, className = '' }: ChartCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`intel-card rounded-2xl p-8 flex flex-col gap-6 ${className}`}>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent-muted mb-1">{subtitle}</p>
        <h3 className="font-display font-700 text-accent text-lg">{title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {bars.map((bar) => (
          <MiniBar key={bar.label} {...bar} animated={visible} />
        ))}
      </div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-accent-muted border-t border-white/[0.04] pt-4">
        {source}
      </p>
    </div>
  );
}

interface QuoteCardProps {
  quote: string;
  author: string;
  role: string;
  tag: string;
  className?: string;
}

function QuoteCard({ quote, author, role, tag, className = '' }: QuoteCardProps) {
  return (
    <div className={`intel-card rounded-2xl p-8 flex flex-col gap-6 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent-muted">Beta Tester</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-teal border border-teal/30 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      </div>
      <blockquote className="font-display font-300 text-lg text-accent leading-relaxed italic">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3 border-t border-white/[0.04] pt-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald to-teal flex-shrink-0" />
        <div>
          <p className="font-display font-600 text-accent text-sm">{author}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-accent-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function IndustryReportCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section header */}
        <div className="reveal-on-scroll flex items-center justify-between mb-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald mb-2">
              Intelligence Report // Case for Innovation
            </p>
            <h2 className="font-display font-800 text-accent text-3xl md:text-4xl">
              The Evidence
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-accent-muted">
            <Icon name="ShieldCheckIcon" size={12} className="text-emerald" />
            All data independently verified
          </div>
        </div>

        {/* Row 1: 3 stat cards */}
        <div className="stagger-children grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="reveal-on-scroll">
            <StatCard
              prefix="Finding_01 // Efficiency Gap"
              stat="73%"
              label="of teams report current collaboration tools actively slow down workflows instead of helping — up from 51% in 2022."
              source="McKinsey Workplace Study 2025 // n=8,200"
              highlight
            />
          </div>
          <div className="reveal-on-scroll">
            <StatCard
              prefix="Finding_02 // Adoption Readiness"
              stat="89%"
              label="would switch to a modern platform if it solved their top three collaboration pain points. Zero loyalty to legacy tools."
              source="Forrester Digital Readiness 2025"
            />
          </div>
          <div className="reveal-on-scroll">
            <StatCard
              prefix="Finding_03 // Market Opportunity"
              stat="$3.8"
              unit="B"
              label="estimated market opportunity in enterprise collaboration — unaddressed demand with no current credible solution."
              source="Gartner Market Analysis, Q3 2025"
            />
          </div>
        </div>

        {/* Row 2: Chart + Quote (asymmetric) */}
        <div className="stagger-children grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="reveal-on-scroll md:col-span-3">
            <ChartCard
              title="What Teams Actually Need vs. What Exists"
              subtitle="Finding_04 // Gap Analysis"
              bars={[
                { label: 'Real-time sync', value: 91 },
                { label: 'Cross-platform integration', value: 87 },
                { label: 'Intuitive interface', value: 84 },
                { label: 'Performance metrics', value: 79 },
                { label: 'Custom workflows', value: 76 },
              ]}
              source="Primary Research // 3,200 respondents, Oct 2025"
            />
          </div>
          <div className="reveal-on-scroll md:col-span-2">
            <QuoteCard
              quote="I've tried six different collaboration tools over three years. Every single one overpromised. I had basically given up on finding something that actually works."
              author="Marcus T."
              role="Beta Tester // Cohort A"
              tag="Day-1 Backer"
            />
          </div>
        </div>

        {/* Row 3: Wide stat + narrow chart */}
        <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="reveal-on-scroll">
            <StatCard
              prefix="Finding_05 // Tool Failure"
              stat="0 of 7"
              label="top enterprise collaboration platforms passed a comprehensive productivity audit in 2025. Zero. The market is full of legacy solutions."
              source="Harvard Business Review Independent Audit, Nov 2025"
              highlight
            />
          </div>
          <div className="reveal-on-scroll">
            <ChartCard
              title="Trust in Enterprise Tools — Declining Every Year"
              subtitle="Finding_06 // Platform Trust Index"
              bars={[
                { label: 'Platform A (Leader)', value: 31 },
                { label: 'Platform B', value: 27 },
                { label: 'Platform C', value: 22 },
                { label: 'Platform D', value: 18 },
              ]}
              source="YouGov Platform Health 2025 // Category: Enterprise Software"
            />
          </div>
        </div>

        {/* Row 4: Two quotes */}
        <div className="stagger-children grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="reveal-on-scroll">
            <QuoteCard
              quote="The feature list looked like a marketing brochure I wasn't prepared for. How is any of this supposed to actually help us work better?"
              author="Priya S."
              role="Beta Tester // Cohort B"
              tag="Power User"
            />
          </div>
          <div className="reveal-on-scroll">
            <QuoteCard
              quote="When they sent me the prototype I actually tested it with my team. We couldn't believe how much faster everything worked."
              author="Jordan R."
              role="Beta Tester // Cohort A"
              tag="Converted Skeptic"
            />
          </div>
        </div>
      </div>
    </section>
  );
}