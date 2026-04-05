'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RevealCTA() {
  const [emailVal, setEmailVal] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRevealed(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailVal.trim()) {
      setEmailSubmitted(true);
      setEmailVal('');
    }
  };

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneVal.trim()) {
      setSmsSubmitted(true);
      setPhoneVal('');
    }
  };

  return (
    <section
      id="early-access"
      ref={sectionRef}
      className="relative py-36 px-8 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
      />
      <div className="noise-overlay absolute inset-0" />
      <div className="grid-tech absolute inset-0 opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Reveal snap-in: product name + date */}
        <div className={`text-center mb-24 ${revealed ? 'snap-in' : 'opacity-0'}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald mb-6">
            Analysis Complete // Verdict Reached
          </p>

          <div
            className="font-display font-800 text-accent mb-4 leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            NEXUS
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald/40" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald">
              Launch Date
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald/40" />
          </div>

          <div
            className="font-display font-800 text-emerald mb-8"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            March 29, 2026
          </div>

          <p className="font-sans text-accent-dim max-w-xl mx-auto leading-relaxed">
            You've seen the evidence. You know the market is ready for change. You know we've built the solution. The only question left is whether you're in before the platform launches.
          </p>
        </div>

        {/* App Store Badges */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 ${revealed ? 'snap-in' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
          <a
            href="#"
            className="store-badge flex items-center gap-4 px-6 py-4 rounded-xl w-full sm:w-auto"
          >
            <Icon name="DevicePhoneMobileIcon" size={32} className="text-accent-dim flex-shrink-0" />
            <div className="text-left">
              <p className="font-mono text-[9px] uppercase tracking-widest text-accent-muted">Download on the</p>
              <p className="font-display font-700 text-accent text-lg">App Store</p>
            </div>
          </a>

          <a
            href="#"
            className="store-badge flex items-center gap-4 px-6 py-4 rounded-xl w-full sm:w-auto"
          >
            <Icon name="CpuChipIcon" size={32} className="text-accent-dim flex-shrink-0" />
            <div className="text-left">
              <p className="font-mono text-[9px] uppercase tracking-widest text-accent-muted">Get it on</p>
              <p className="font-display font-700 text-accent text-lg">Google Play</p>
            </div>
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-accent-muted">Or get the link directly</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* SMS + Email capture */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${revealed ? 'snap-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          {/* SMS */}
          <div className="intel-card rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="DevicePhoneMobileIcon" size={14} className="text-emerald" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald">SMS Download Link</p>
            </div>
            <p className="font-sans text-sm text-accent-muted mb-6 leading-relaxed">
              Enter your number. We send one message: the direct platform access link. Nothing else.
            </p>
            {smsSubmitted ? (
              <div className="flex items-center gap-3 py-4">
                <Icon name="CheckCircleIcon" size={20} className="text-emerald" variant="solid" />
                <span className="font-display font-600 text-accent text-sm">Link sent. Check your messages.</span>
              </div>
            ) : (
              <form onSubmit={handleSmsSubmit} className="flex gap-2">
                <input
                  type="tel"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="sms-input flex-1 rounded-lg px-4 py-3 text-sm font-mono"
                  required
                />
                <button
                  type="submit"
                  className="cta-primary text-white font-mono text-xs uppercase tracking-widest px-4 py-3 rounded-lg flex-shrink-0"
                >
                  Send
                </button>
              </form>
            )}
          </div>

          {/* Email */}
          <div className="intel-card rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="EnvelopeIcon" size={14} className="text-teal" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal">Send Me the Full Analysis</p>
            </div>
            <p className="font-sans text-sm text-accent-muted mb-6 leading-relaxed">
              The complete 47-page market analysis. Every data point. Every citation. No editorial spin.
            </p>
            {emailSubmitted ? (
              <div className="flex items-center gap-3 py-4">
                <Icon name="CheckCircleIcon" size={20} className="text-teal" variant="solid" />
                <span className="font-display font-600 text-accent text-sm">Analysis incoming. Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  placeholder="your@email.com"
                  className="sms-input flex-1 rounded-lg px-4 py-3 text-sm font-mono"
                  required
                />
                <button
                  type="submit"
                  className="text-white font-mono text-xs uppercase tracking-widest px-4 py-3 rounded-lg flex-shrink-0 cta-secondary border border-teal/30 hover:border-teal/60 hover:bg-teal/10 transition-all"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Trust line */}
        <div className={`flex items-center justify-center gap-6 mt-12 ${revealed ? 'snap-in' : 'opacity-0'}`} style={{ animationDelay: '0.45s' }}>
          {[
            { icon: 'ShieldCheckIcon', text: 'No spam, ever' },
            { icon: 'LockClosedIcon', text: 'Data never sold' },
            { icon: 'XCircleIcon', text: 'Unsubscribe instantly' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-accent-muted">
              <Icon name={icon as any} size={11} className="text-emerald" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}