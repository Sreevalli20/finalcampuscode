import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Award,
  ExternalLink,
  Code2,
  GraduationCap,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartImage } from '../../components/common/SmartImage';

export const WorkspacePortfolio: React.FC = () => {
  const { currentUser, certificates, addToast } = useApp();

  // Dynamic calculation of portfolio completeness
  const calculateCompleteness = () => {
    let score = 20; // base account
    if (currentUser.headline) score += 15;
    if (currentUser.bio) score += 15;
    if (currentUser.skills.length >= 4) score += 20;
    if (currentUser.githubUrl) score += 10;
    if (currentUser.linkedinUrl) score += 10;
    if (certificates.length > 0) score += 10;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();

  const handleCopyPublicLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '/workspace/portfolio');
    addToast('Portfolio URL Copied', 'Shareable link ready for recruiters.', 'success');
  };

  return (
    <div className="max-w-5xl space-y-10">
      {/* Top Banner with Completion Indicator & Share */}
      <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
            {completeness}%
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white">Recruiter Showcase Readiness</h3>
            <p className="text-[11px] text-neutral-400">
              Verified hackathon submissions, certifications, and technical stack.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyPublicLink}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Copy Recruiter Share Link</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-950 border border-neutral-800 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="text-amber-400 font-bold">{currentUser.studentIdNumber}</span>
              <span>·</span>
              <span>Class of 2027</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {currentUser.name}
            </h1>

            <p className="text-base text-amber-400 font-medium">
              {currentUser.headline}
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {currentUser.bio}
            </p>

            {/* Social & External Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {currentUser.githubUrl && (
                <a
                  href={currentUser.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 hover:text-white hover:border-neutral-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {currentUser.linkedinUrl && (
                <a
                  href={currentUser.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 hover:text-white hover:border-neutral-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {currentUser.portfolioUrl && (
                <a
                  href={currentUser.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 hover:text-white hover:border-neutral-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative">
              <SmartImage
                src={currentUser.avatarUrl || '/images/student_innovator_portrait_1794026124336.jpg'}
                alt={currentUser.name}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover border-2 border-amber-500/50 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Student
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Background & Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Academic Background</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">{currentUser.college}</h3>
            <p className="text-xs text-neutral-300">{currentUser.course}</p>
            <p className="text-xs text-neutral-500 font-mono">{currentUser.yearOfStudy}</p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Engineering Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentUser.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Shipped Prototypes & Hackathon Projects</h2>
          <span className="text-xs text-neutral-500 font-mono">Verified Deployments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1: CampusCode */}
          <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400">ReBuild '26 Submission</span>
                <span className="text-neutral-500">Accessible EdTech</span>
              </div>
              <h3 className="text-base font-bold text-white">CampusCode — Student Innovation Ecosystem</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Autonomous frontend-only innovation platform equipped with deterministic teammate matching (HackMate), 5-axis idea evaluation (IdeaCheck), and client-side verifiable PDF certificate generation.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">React 19</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">TypeScript</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">Tailwind CSS v4</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">jsPDF</span>
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Round 2 Candidate
              </span>
              <a
                href="https://github.com/kavya-sharma/campuscode-rebuild"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
              >
                <span>Inspect Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Project 2: CogniEdge */}
          <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400">CogniEdge Sprint Winner</span>
                <span className="text-neutral-500">Edge AI</span>
              </div>
              <h3 className="text-base font-bold text-white">WebEdge: Zero-Server Client Inference Sandbox</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Browser WebAssembly runtime evaluating lightweight transformers and neural classifiers inside background web workers without remote data round-trips.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">WebAssembly</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">Web Workers</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono">TypeScript</span>
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
              <span className="text-amber-400 font-mono flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> 1st Place Grand Winner
              </span>
              <span className="text-neutral-500 font-mono">Nov 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Certificates Showcase */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Verified Competition Honors</h2>
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <span className="text-amber-400 font-bold block">{cert.achievement}</span>
                <span className="text-neutral-200 font-medium">{cert.eventName}</span>
                <p className="text-[11px] text-neutral-500 font-mono">ID: {cert.certificateNumber}</p>
              </div>
              <span className="text-neutral-400 font-mono text-[11px] self-start sm:self-auto">
                Issued {cert.issueDate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
