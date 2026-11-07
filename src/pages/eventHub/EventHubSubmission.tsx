import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, CheckCircle2, Github, Globe, FileText, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProjectSubmission } from '../../types';

const EventHubSubmissionInner: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, submissions, saveSubmission, currentUser, teams, addToast } = useApp();

  const event = events.find((e) => e.id === eventId);
  if (!event) return null;

  const existingSub = submissions[event.id];
  const activeRound = event.rounds.find((r) => r.status === 'active') || event.rounds[1] || event.rounds[0];
  const team = teams[event.id];

  const [projectName, setProjectName] = useState(existingSub?.projectName || 'CampusCode — Student Innovation Ecosystem');
  const [tagline, setTagline] = useState(existingSub?.tagline || 'High-performance multi-page ecosystem with built-in HackMate and IdeaCheck tools.');
  const [track, setTrack] = useState(existingSub?.track || team?.track || event.tracks[0]);
  const [githubUrl, setGithubUrl] = useState(existingSub?.githubUrl || 'https://github.com/kavya-sharma/campuscode-rebuild');
  const [liveDemoUrl, setLiveDemoUrl] = useState(existingSub?.liveDemoUrl || window.location.origin);
  const [documentUrl, setDocumentUrl] = useState(existingSub?.documentUrl || 'https://campuscode.dev/docs/architecture-v1.pdf');
  const [description, setDescription] = useState(
    existingSub?.description ||
      "CampusCode is an award-winning student innovation ecosystem engineered without heavy cloud backends. Features real local state synchronization, verifiable digital student credentials, HackMate compatibility matching, and transparent weighted idea evaluation."
  );
  const [organizerNotes, setOrganizerNotes] = useState(
    existingSub?.organizerNotes ||
      "Optimized for 1440px desktop baseline with full responsive support down to 360px mobile viewports. Includes client-side PDF generation and zero-API RuleBot."
  );

  const [techStack, setTechStack] = useState<string[]>(
    existingSub?.techStack || ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'jsPDF']
  );
  const [techInput, setTechInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleAddTech = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!projectName.trim()) errs.projectName = 'Project name is required';
    if (!tagline.trim()) errs.tagline = 'Short tagline is required';
    if (!githubUrl.trim() || !githubUrl.includes('github.com')) errs.githubUrl = 'Valid GitHub repository URL is required';
    if (!liveDemoUrl.trim() || !liveDemoUrl.startsWith('http')) errs.liveDemoUrl = 'Valid live demo URL is required (must start with http/https)';
    if (!description.trim() || description.length < 30) errs.description = 'Provide at least 30 characters explaining the project architecture and features';
    if (techStack.length === 0) errs.techStack = 'Specify at least 1 technology or library used';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sub: ProjectSubmission = {
      id: existingSub?.id || `sub_${Date.now()}`,
      eventId: event.id,
      roundId: activeRound.id,
      teamId: team?.id,
      userId: currentUser.id,
      projectName,
      tagline,
      track,
      githubUrl,
      liveDemoUrl,
      documentUrl,
      description,
      techStack,
      organizerNotes,
      submittedAt: existingSub?.submittedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'submitted',
      scores: existingSub?.scores,
    };

    saveSubmission(sub);
    setSubmittedSuccess(true);
    addToast('Submission Saved', `Deliverables for ${projectName} recorded.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white tracking-tight">Project Deliverables Submission</h2>
        <p className="text-xs text-neutral-400">
          Stage: <strong className="text-amber-400">{activeRound.title}</strong> · Deadline:{' '}
          <span className="font-mono">{new Date(activeRound.submissionDeadline).toUTCString()}</span>
        </p>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Submission successfully recorded! It is now reviewable by the jury panel.</span>
          </div>
          <button
            onClick={() => setSubmittedSuccess(false)}
            className="text-[11px] text-emerald-400 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Project Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. CampusCode — Student Ecosystem"
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
            {errors.projectName && <p className="text-[11px] text-rose-400 mt-1">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Chosen Track <span className="text-amber-400">*</span>
            </label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
            >
              {event.tracks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Short Tagline (One sentence) <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Autonomous student innovation ecosystem with zero server dependencies"
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
          />
          {errors.tagline && <p className="text-[11px] text-rose-400 mt-1">{errors.tagline}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              GitHub Repository URL <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              />
              <Github className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
            {errors.githubUrl && <p className="text-[11px] text-rose-400 mt-1">{errors.githubUrl}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Live Demo URL <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://myproject.dev"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              />
              <Globe className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
            {errors.liveDemoUrl && <p className="text-[11px] text-rose-400 mt-1">{errors.liveDemoUrl}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Optional Architecture PDF / Slides URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
              placeholder="https://myproject.dev/docs/spec.pdf"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
            <FileText className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Technologies & Libraries <span className="text-amber-400">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleAddTech}
              placeholder="Add technology (e.g. React 19, TypeScript, jsPDF)"
              className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-3 py-1.5 text-xs bg-neutral-800 text-neutral-200 rounded-lg hover:text-white"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 text-neutral-200 text-xs border border-neutral-700"
              >
                <span>{tech}</span>
                <button type="button" onClick={() => handleRemoveTech(tech)} className="text-neutral-400 hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          {errors.techStack && <p className="text-[11px] text-rose-400 mt-1">{errors.techStack}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Detailed Project Description & Innovation Overview <span className="text-amber-400">*</span>
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the problem statement, user experience, core technical challenges solved, and how your prototype functions..."
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
          />
          {errors.description && <p className="text-[11px] text-rose-400 mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Notes for Jury & Mentors (Walkthrough Tips)
          </label>
          <textarea
            rows={2}
            value={organizerNotes}
            onChange={(e) => setOrganizerNotes(e.target.value)}
            placeholder="Credentials, test accounts, or specific flows to test during evaluation..."
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="text-xs text-neutral-500 font-mono">
            {existingSub ? `Last updated: ${new Date(existingSub.updatedAt).toLocaleTimeString()}` : 'Not yet submitted'}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{existingSub ? 'Update Submission' : 'Submit for Round 2'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// Keyed wrapper: forces a fresh form state when navigating between events
export const EventHubSubmission: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  return <EventHubSubmissionInner key={eventId} />;
};
