import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Code2, Users2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <Breadcrumbs />

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="text-amber-400 font-semibold">CampusCode Manifesto</span>
          <span>·</span>
          <span>Built for ReBuild '26</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Empowering student engineers with uncompromising frontend engineering.
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          CampusCode was designed from the ground up for Round 2 of ReBuild '26. Our mission is to prove that high-performance, complex web ecosystems can operate with fluid responsiveness, robust local persistence, and zero telemetry bloat.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">01. Autonomous Client Architecture</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Zero reliance on external server backends or flaky cloud databases. State syncs instantly to browser storage, guaranteeing offline survival in high-density hackathon venues.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">02. Transparent Rubrics & Matching</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            No black-box hallucinated scoring. Our IdeaCheck evaluation and HackMate compatibility scores use deterministic, weighted formulas so participants understand exactly how they are scored.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Users2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">03. Recruiter-Ready Portfolios</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Every competition, verified contribution, and peer endorsement forms an immutable digital card and verifiable certificate with exportable client-generated PDFs.
          </p>
        </div>
      </div>

      {/* Engineering Specs */}
      <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-6">
        <h2 className="text-xl font-bold text-white">Technical Architecture Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80">
            <span className="text-neutral-500 block uppercase text-[10px]">Framework</span>
            <span className="text-neutral-200 font-bold">React 19 + TypeScript</span>
          </div>
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80">
            <span className="text-neutral-500 block uppercase text-[10px]">Styling System</span>
            <span className="text-amber-400 font-bold">Tailwind CSS v4</span>
          </div>
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80">
            <span className="text-neutral-500 block uppercase text-[10px]">Client Persistence</span>
            <span className="text-neutral-200 font-bold">Versioned JSON Storage</span>
          </div>
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80">
            <span className="text-neutral-500 block uppercase text-[10px]">PDF Generator</span>
            <span className="text-neutral-200 font-bold">Client-Side jsPDF</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/workspace"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm"
        >
          <span>Launch Student Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
