import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex items-center gap-6">
          <AppLogo size={22} iconName="BoltIcon" text="NEXUS" className="text-accent-muted" />
          <span className="text-accent-muted font-mono text-xs">© 2026</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-8">
          {['Privacy', 'Terms', 'Status', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-accent-muted hover:text-accent font-mono text-xs uppercase tracking-widest transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          {[
            { name: 'TwitterIcon', label: 'Twitter' },
            { name: 'GlobeAltIcon', label: 'Web' },
          ].map(({ name, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-accent-muted hover:text-accent hover:border-emerald/40 transition-all duration-200"
            >
              <Icon name={name as any} size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}