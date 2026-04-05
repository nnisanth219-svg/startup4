'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

type TabId = 'problem' | 'data' | 'product';

const TABS: {id: TabId;label: string;prefix: string;}[] = [
{ id: 'problem', label: 'The Challenge', prefix: '01' },
{ id: 'data', label: 'The Insights', prefix: '02' },
{ id: 'product', label: 'The Solution', prefix: '03' }];


const CHART_BARS = [
{ label: '2021', value: 22, color: 'from-teal/60 to-emerald/40' },
{ label: '2022', value: 41, color: 'from-teal/70 to-emerald/60' },
{ label: '2023', value: 63, color: 'from-teal to-emerald' },
{ label: '2024', value: 78, color: 'from-teal to-emerald' },
{ label: '2025', value: 91, color: 'from-emerald to-teal' },
{ label: '2026*', value: 100, color: 'from-emerald-500 to-teal' }];


export default function HeroTabSwitcher() {
  const [active, setActive] = useState<TabId>('problem');
  const [animKey, setAnimKey] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);
  const [countedStat, setCountedStat] = useState(0);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchTab = (id: TabId) => {
    setActive(id);
    setAnimKey((k) => k + 1);
    setBarsVisible(false);
    if (id === 'data') {
      setTimeout(() => setBarsVisible(true), 200);
    }
    if (id === 'problem') {
      setCountedStat(0);
      let val = 0;
      if (countRef.current) clearInterval(countRef.current);
      countRef.current = setInterval(() => {
        val += Math.ceil(73 / 40);
        if (val >= 73) {val = 73;clearInterval(countRef.current!);}
        setCountedStat(val);
      }, 30);
    }
  };

  useEffect(() => {
    switchTab('problem');
    return () => {if (countRef.current) clearInterval(countRef.current);};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 grid-tech overflow-hidden">
      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scan-line absolute top-0 left-0 w-full h-40 opacity-60" />
      </div>

      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Indigo ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
      

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-28 flex flex-col items-center gap-14">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-glow inline-block" />
          <span>Internal Briefing // Project Phoenix</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/[0.06] bg-midnight-2/60 backdrop-blur-md">
          {TABS.map((tab) =>
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
            active === tab.id ? 'tab-active' : 'tab-inactive hover:text-accent-dim'}`
            }>
            
              <span className="text-[9px] opacity-50">{tab.prefix}</span>
              {tab.label}
            </button>
          )}
        </div>

        {/* Tab content */}
        <div className="w-full min-h-[440px] flex items-center justify-center" key={animKey}>
          {/* ─── THE PROBLEM ─── */}
          {active === 'problem' &&
          <div className="snap-in flex flex-col items-center text-center gap-8 w-full">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald">
                Team Efficiency Gap — Enterprise Tools, Q4 2025
              </p>
              <div
              className="font-display font-800 leading-none stat-shimmer select-none"
              style={{ fontSize: 'clamp(6rem, 18vw, 10rem)' }}>
              
                {countedStat}%
              </div>
              <p className="font-display text-xl md:text-2xl font-300 text-accent-dim max-w-2xl leading-relaxed">
                of teams report current tools{' '}
                <span className="text-accent font-600">hinder productivity</span> instead of helping — 
                the lowest satisfaction rate recorded in a decade of workplace analysis.
              </p>
              <p className="font-mono text-[10px] text-accent-muted uppercase tracking-widest">
                Source: McKinsey Workplace Productivity Study, 2025 // n=8,200
              </p>
            </div>
          }

          {/* ─── THE DATA ─── */}
          {active === 'data' &&
          <div className="snap-in w-full flex flex-col gap-8">
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-emerald mb-2">
                  Digital Transformation Readiness — Indexed 0–100
                </p>
                <p className="font-display text-sm text-accent-muted">
                  Composite of team frustration, adoption readiness, and capability analysis
                </p>
              </div>

              <div className="flex items-end justify-center gap-3 h-64 px-4">
                {CHART_BARS.map((bar, i) =>
              <div key={bar.label} className="flex flex-col items-center gap-2 flex-1 max-w-[72px]">
                    <span className="font-mono text-xs font-600 text-accent">
                      {barsVisible ? bar.value : 0}
                    </span>
                    <div className="w-full rounded-t-md overflow-hidden bg-midnight-3 relative" style={{ height: '200px' }}>
                      <div
                    className={`absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t ${bar.color} transition-all ease-out`}
                    style={{
                      height: barsVisible ? `${bar.value}%` : '0%',
                      transitionDuration: `${800 + i * 120}ms`,
                      transitionDelay: barsVisible ? `${i * 80}ms` : '0ms'
                    }} />
                  
                      {bar.value >= 90 &&
                  <div
                    className="absolute top-1 left-0 right-0 flex justify-center"
                    style={{ opacity: barsVisible ? 1 : 0, transition: 'opacity 0.5s 1s' }}>
                    
                          <span className="font-mono text-[8px] text-emerald uppercase tracking-widest px-1 py-0.5 bg-emerald/10 rounded">
                            NOW
                          </span>
                        </div>
                  }
                    </div>
                    <span className="font-mono text-[9px] text-accent-muted uppercase tracking-wider">
                      {bar.label}
                    </span>
                  </div>
              )}
              </div>

              <p className="text-center font-mono text-[10px] text-accent-muted uppercase tracking-widest">
                Source: Forrester Digital Maturity Index 2025 // *2026 projection based on Q1 signals
              </p>
            </div>
          }

          {/* ─── THE PRODUCT ─── */}
          {active === 'product' &&
          <div className="snap-in flex flex-col items-center gap-8 w-full">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald">
                Asset Classification: Confidential // Access Required
              </p>

              <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                {/* Blurred product silhouette */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <AppImage
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=800&fit=crop&crop=center"
                  alt="Blurred platform preview — a modern collaboration interface partially obscured"
                  fill
                  className="object-cover opacity-40"
                  style={{ filter: 'blur(18px) saturate(0.4) brightness(0.5)' } as React.CSSProperties} />
                
                  <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(20,184,166,0.15) 100%)' }} />
                
                </div>

                {/* Pulsing lock icon */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div
                  className="w-20 h-20 rounded-2xl border border-emerald/40 bg-emerald/10 flex items-center justify-center unlock-pulse"
                  style={{ boxShadow: '0 0 60px rgba(16,185,129,0.4)' }}>
                  
                    <Icon name="LockClosedIcon" size={36} className="text-emerald" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent-muted">
                    Access Restricted
                  </span>
                </div>

                {/* Corner markers */}
                <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-emerald/40 rounded-tl" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-emerald/40 rounded-tr" />
                <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-emerald/40 rounded-bl" />
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-emerald/40 rounded-br" />
              </div>

              <div className="text-center space-y-2">
                <p className="font-display text-xl font-600 text-accent">
                  Early access unlocks the complete platform preview.
                </p>
                <p className="font-mono text-xs text-accent-muted uppercase tracking-widest">
                  428 access codes issued so far
                </p>
              </div>

              <a
              href="#early-access"
              className="cta-primary text-white font-display font-700 text-sm uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-2">
              
                <Icon name="BoltIcon" size={16} />
                Request Access
              </a>
            </div>
          }
        </div>
      </div>
    </section>);

}