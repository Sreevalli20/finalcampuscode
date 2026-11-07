import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Users2,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { events } = useApp();
  const rebuildEvent = events.find((e) => e.id === 'rebuild-26') || events[0];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs text-neutral-400 font-medium">
              <span className="text-amber-400 font-semibold">ReBuild '26 Round 2 Project</span>
              <span>·</span>
              <span>Autonomous Student Innovation System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Where collegiate builders engineer, collaborate, and ship breakthroughs.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              CampusCode is an independent student innovation ecosystem. Discover premier hackathons, assemble complementary project squads with HackMate, evaluate engineering ideas with IdeaCheck, and build verified developer credentials.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/events"
                className="px-6 py-3 text-sm font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm inline-flex items-center gap-2 shrink-0"
              >
                <span>Explore Hackathons</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/workspace"
                className="px-6 py-3 text-sm font-medium rounded-lg bg-neutral-900 text-neutral-200 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors shrink-0"
              >
                Enter Student Workspace
              </Link>
            </div>

            {/* Micro-guarantee */}
            <div className="pt-4 flex items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Client-Side Engine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Server Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Verifiable Local Records</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/campuscode_hero_banner_1794026123043.jpg"
                alt="Students collaborating on hardware and software prototypes in modern lab"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Innovation Lab · Live Session</span>
                  <span className="text-amber-400 font-mono text-[11px]">Round 2 In Progress</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 truncate">
                  36 Hours of Concurrent Engineering · Systems, Web, and Edge AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">1,420+</p>
            <p className="text-xs text-neutral-400 mt-0.5">Collegiate Builders</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">36 Hrs</p>
            <p className="text-xs text-neutral-400 mt-0.5">Sprint Evaluation</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">$100K+</p>
            <p className="text-xs text-neutral-400 mt-0.5">Annual Prize Grants</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-200 font-mono tabular-nums">100%</p>
            <p className="text-xs text-neutral-400 mt-0.5">Frontend Client-Side</p>
          </div>
        </div>
      </section>

      {/* Flagship Hackathon Spotlight: ReBuild '26 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/90 to-neutral-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <span>Featured Hackathon</span>
                <span>·</span>
                <span>Flagship 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {rebuildEvent.title}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {rebuildEvent.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800">
                  <span className="text-[11px] text-neutral-500 block">Prize Pool</span>
                  <span className="text-sm font-semibold text-amber-400 font-mono">{rebuildEvent.prizePool}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800">
                  <span className="text-[11px] text-neutral-500 block">Team Format</span>
                  <span className="text-sm font-semibold text-neutral-200">1 to 4 Members</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-neutral-500 block">Rounds</span>
                  <span className="text-sm font-semibold text-neutral-200">3 Structured Stages</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  to={`/events/${rebuildEvent.id}`}
                  className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
                >
                  <span>View Event Spec & Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/workspace/event/${rebuildEvent.id}`}
                  className="px-5 py-2.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/60 transition-colors"
                >
                  Open Event Hub
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-xl">
                <img
                  src={rebuildEvent.bannerImage}
                  alt="ReBuild '26 Key Visual"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-neutral-950/30" />
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-amber-400 border border-neutral-800">
                  Active Round 2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Core Innovation Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Autonomous Innovation Suite
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Engineered for high-performing student squads.
          </h2>
          <p className="text-sm text-neutral-400">
            No mock stubs or external AI dependencies. Every tool runs directly on verified frontend algorithms and client logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: HackMate */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">01. HackMate Teammate Discovery</h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Skill-complementarity matching engine. Pair frontend specialists with firmware engineers, distributed backend architects, and UI designers based on verified skills and interests.
              </p>
            </div>
            <Link
              to="/workspace/hackmate"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 pt-2"
            >
              <span>Launch HackMate Matcher</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: IdeaCheck */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">02. IdeaCheck Rubric Evaluator</h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Objective scoring engine across 5 weighted axes: Problem Clarity, Technical Novelty, Feasibility, User Impact, and Execution Readiness. Delivers actionable feedback before submitting.
              </p>
            </div>
            <Link
              to="/workspace/ideacheck"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 pt-2"
            >
              <span>Evaluate Project Abstract</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: RuleBot */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">03. RuleBot Knowledge Assistant</h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Instant answers to eligibility, rounds, deadline formats, permitted libraries, and intellectual property terms queried from our local verified rule index with zero external hallucinations.
              </p>
            </div>
            <Link
              to="/workspace/rulebot"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 pt-2"
            >
              <span>Query Event Rules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Proof & Showcase: Student Project Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-2xl bg-neutral-900/30 border border-neutral-800">
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
              <img
                src="/src/assets/images/student_showcase_project_1794026124306.jpg"
                alt="Student prototype robotic telemetry project"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-amber-400 font-semibold">Featured Student Prototype</span>
              <span>·</span>
              <span>Hardware & Web Systems</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              ROBO-ARMv1: High-Precision IoT Robotic Telemetry Suite
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Engineered by undergraduate students from NIT Trichy and BITS Pilani. Combines low-power microcontrollers, MQTT telemetry, and a responsive client-side control dashboard built with React and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">ESP32</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">React 19</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">WebSockets</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">Tailwind CSS</span>
            </div>
            <div className="pt-3">
              <Link
                to="/workspace/portfolio"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5"
              >
                <span>Explore Full Student Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Block */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
          Ready to engineer and ship your next breakthrough?
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Explore current competitions, formulate your team, or test your project thesis with our client-side innovation tools.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/events"
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            Browse Open Hackathons
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 text-sm font-medium rounded-lg bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 transition-colors"
          >
            Create Student Profile
          </Link>
        </div>
      </section>
    </div>
  );
};
