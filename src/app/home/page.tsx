import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroTabSwitcher from './components/HeroTabSwitcher';
import DataTicker from './components/DataTicker';
import IndustryReportCards from './components/IndustryReportCards';
import CompetitorSnapshot from './components/CompetitorSnapshot';
import RevealCTA from './components/RevealCTA';

export default function HomePage() {
  return (
    <main className="bg-midnight min-h-screen">
      <Header />

      {/* Hero: Feature Tab Switcher */}
      <HeroTabSwitcher />

      {/* Data Ticker */}
      <DataTicker />

      {/* Industry Report: Modular Evidence Cards */}
      <IndustryReportCards />

      {/* Competitor Comparison Snapshot */}
      <CompetitorSnapshot />

      {/* Reveal + CTA: App Download + SMS + Email */}
      <RevealCTA />

      <Footer />
    </main>
  );
}