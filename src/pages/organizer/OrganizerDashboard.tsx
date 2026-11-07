import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  PlusCircle,
  Bell,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrganizerDashboard: React.FC = () => {
  const { events, submissions, addAnnouncement, addToast } = useApp();

  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'Critical' | 'Schedule' | 'Rules' | 'General'>('Critical');

  const totalRegistered = events.reduce((sum, e) => sum + e.registeredCount, 0);
  const submissionsList = Object.values(submissions);
  const evaluatedCount = submissionsList.filter((s) => s.status === 'evaluated').length;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    addAnnouncement({
      title: annTitle.trim(),
      content: annContent.trim(),
      category: annCategory,
      authorName: 'Dr. Vikram Malhotra',
      authorRole: 'Head of Jury & Academic Council',
      pinned: annCategory === 'Critical',
    });

    setAnnTitle('');
    setAnnContent('');
    addToast('Broadcast Published', 'Announcement sent to all student workspaces.', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Organizer Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>OFFICIAL ORGANIZER CONTROL CONSOLE</span>
          <span>·</span>
          <span>DEMO MODE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          ReBuild '26 Operations & Jury Headquarters
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
          Monitor incoming collegiate submissions, review technical deliverables, adjust rubric weights, and broadcast live communications.
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <span className="text-xs text-neutral-400 block mb-1">Managed Hackathons</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {events.length}
          </p>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Active across 4 domains</span>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <span className="text-xs text-neutral-400 block mb-1">Total Registrations</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
            {totalRegistered}
          </p>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Across university squads</span>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <span className="text-xs text-neutral-400 block mb-1">Project Submissions</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {submissionsList.length}
          </p>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">{evaluatedCount} audited</span>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <span className="text-xs text-neutral-400 block mb-1">Jury Audit Status</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            Round 2
          </p>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Live evaluation active</span>
        </div>
      </div>

      {/* Main Grid: Submissions & Broadcast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Submissions Pending Review */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Student Submissions
            </h2>
            <Link to="/organizer/submissions" className="text-xs text-amber-400 hover:underline">
              View All Submissions
            </Link>
          </div>

          <div className="space-y-3">
            {submissionsList.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{sub.projectName}</h3>
                    <p className="text-xs text-neutral-400">{sub.tagline}</p>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono mt-1">
                      <span>Track: {sub.track}</span>
                      <span>·</span>
                      <span>Status: <strong className="text-amber-400">{sub.status}</strong></span>
                    </div>
                  </div>

                  <Link
                    to="/organizer/submissions"
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shrink-0"
                  >
                    Grade & Audit
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Shortcuts */}
          <div className="p-5 rounded-xl bg-neutral-900/30 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Organizer Operations</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                to="/organizer/events/create"
                className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-500/30 transition-colors flex items-center gap-2 text-neutral-200 hover:text-white"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Create New Hackathon</span>
              </Link>
              <Link
                to="/organizer/participants"
                className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-500/30 transition-colors flex items-center gap-2 text-neutral-200 hover:text-white"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>Manage Participants</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live Announcement Broadcaster */}
        <div className="lg:col-span-5 space-y-4">
          <form
            onSubmit={handleBroadcast}
            className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Bell className="w-4 h-4" />
              <span>Broadcast Official Announcement</span>
            </div>
            <p className="text-xs text-neutral-400">
              Dispatches immediate bulletin to all student dashboards and notification streams.
            </p>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
              <select
                value={annCategory}
                onChange={(e) => setAnnCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
              >
                <option value="Critical">Critical Alert</option>
                <option value="Schedule">Schedule Update</option>
                <option value="Rules">Rules Clarification</option>
                <option value="General">General Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Title</label>
              <input
                type="text"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. Round 2 Pitch Guidelines Published"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Content</label>
              <textarea
                rows={3}
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Type official broadcast instructions..."
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Broadcast</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
