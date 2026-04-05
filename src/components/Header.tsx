'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Launch date: 30 days from current timestamp
    const launch = new Date('2026-03-29T00:00:00Z').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, launch - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight/90 backdrop-blur-xl border-b border-white/5' :'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <AppLogo
            size={28}
            iconName="BoltIcon"
            text="NEXUS"
            className="text-accent"
          />
        </div>

        {/* Countdown */}
        <div className="hidden md:flex items-center gap-1 font-mono text-xs">
          <span className="text-accent-muted uppercase tracking-widest mr-2">Launch In</span>
          {[
            { v: pad(timeLeft.days), l: 'D' },
            { v: pad(timeLeft.hours), l: 'H' },
            { v: pad(timeLeft.mins), l: 'M' },
            { v: pad(timeLeft.secs), l: 'S' },
          ].map(({ v, l }, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span className="text-accent-muted mx-0.5">:</span>}
              <span className="bg-midnight-2 border border-white/[0.06] px-2 py-1 rounded text-accent tabular-nums">
                {v}<span className="text-accent-muted text-[9px] ml-0.5">{l}</span>
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#early-access"
          className="cta-primary text-white font-display font-700 text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg"
        >
          Get Early Access
        </a>
      </div>
    </header>
  );
}