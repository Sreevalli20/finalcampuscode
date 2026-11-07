import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Award,
  Users,
  Lightbulb,
  ArrowRight,
  Kanban,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceDashboard: React.FC = () => {
  const {
    currentUser,
    events,
    registeredEventIds,
    submissions,
    certificates,
    notifications,
    announcements,
    planner,
  } = useApp();

  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));
  const activeSprints = registeredEvents.filter((e) => e.status === 'ongoing' || e.status === 'registration_open');
  const rebuildEvent = events.find((e) => e.id === 'rebuild-26');
  const pendingTasks = planner.tasks.filter((t) => t.status !== 'completed');

  return (
    <div className="space-y-8">
      {/* Personalized Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-950 border border-neutral-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-amber-400 font-semibold">{currentUser.college}</span>
              <span>·</span>
              <span>{currentUser.course}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              You are actively registered in {registeredEvents.length} hackathon{registeredEvents.length === 1 ? '' : 's'}. Round 2 submissions for ReBuild '26 are currently active.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/workspace/event/rebuild-26/submission"
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Submit ReBuild '26 Deliverables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/workspace/digital-card"
              className="px-4 py-2.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/60 transition-colors"
            >
              Digital ID Card
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Quantitative Metrics Derived from State */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs">Registered Events</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {registeredEvents.length}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">{activeSprints.length} active right now</p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs">Submissions Recorded</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {Object.keys(submissions).length}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Stored locally in state</p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs">Certificates Issued</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {certificates.length}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Verifiable PDF ready</p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs">Planner Tasks</span>
            <Kanban className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {pendingTasks.length}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Tasks remaining in sprint</p>
        </div>
      </div>

      {/* Main Grid: Ongoing Sprints & Innovation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Active Sprints & Tasks */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Hackathon Hub Card */}
          {rebuildEvent && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-semibold">
                    <span>FLAGSHIP SPRINT</span>
                    <span>·</span>
                    <span>ROUND 2 ACTIVE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{rebuildEvent.title}</h3>
                </div>
                <Link
                  to={`/workspace/event/${rebuildEvent.id}`}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors self-start sm:self-auto"
                >
                  Open Event Hub
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">My Team</span>
                  <span className="font-semibold text-white block mt-0.5">Team Astraea</span>
                  <span className="text-[11px] text-neutral-400">2 Members (Kavya, Zoya)</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">Current Track</span>
                  <span className="font-semibold text-amber-400 block mt-0.5 truncate">Accessible EdTech</span>
                  <span className="text-[11px] text-neutral-400">Student Ecosystems</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">Round 2 Deadline</span>
                  <span className="font-semibold text-rose-400 block mt-0.5 font-mono">Sunday 16:00 UTC</span>
                  <span className="text-[11px] text-neutral-400">GitHub & Demo URL</span>
                </div>
              </div>

              {/* Quick Hub Navigation Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <Link
                  to={`/workspace/event/${rebuildEvent.id}/rounds`}
                  className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Round Specs
                </Link>
                <Link
                  to={`/workspace/event/${rebuildEvent.id}/team`}
                  className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Team Roster
                </Link>
                <Link
                  to={`/workspace/event/${rebuildEvent.id}/submission`}
                  className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Manage Submission
                </Link>
                <Link
                  to={`/workspace/event/${rebuildEvent.id}/leaderboard`}
                  className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          )}

          {/* Innovation Tools Quick Access */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Innovation Tools Suite
              </h3>
              <span className="text-xs text-neutral-500 font-mono">Autonomous Frontend Engines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/workspace/hackmate"
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors group block"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  HackMate AI
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Find complementary partners with skill overlap matching.
                </p>
              </Link>

              <Link
                to="/workspace/ideacheck"
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors group block"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  IdeaCheck AI
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Score project thesis across 5 weighted evaluation axes.
                </p>
              </Link>

              <Link
                to="/workspace/rulebot"
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors group block"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  RuleBot Assistant
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Query local verified competition rules and rubrics.
                </p>
              </Link>
            </div>
          </div>

          {/* Project Planner Milestones */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Sprint Milestones & Tasks</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{planner.name}</p>
              </div>
              <Link
                to="/workspace/project-planner"
                className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Full Board</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {planner.tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        task.status === 'completed'
                          ? 'bg-emerald-400'
                          : task.status === 'in_progress'
                          ? 'bg-amber-400'
                          : 'bg-neutral-600'
                      }`}
                    />
                    <span className={`font-medium ${task.status === 'completed' ? 'text-neutral-400 line-through' : 'text-neutral-200'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px]">
                    <span>{task.category}</span>
                    <span>·</span>
                    <span className="text-neutral-400">Due {task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Feed & Deadlines */}
        <div className="lg:col-span-4 space-y-6">
          {/* Urgent Deadlines Widget */}
          <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white uppercase tracking-wider">Upcoming Deadlines</span>
              <Link to="/workspace/deadlines" className="text-amber-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">ReBuild '26 Round 2</span>
                  <span className="text-rose-400 font-mono font-bold text-[11px]">In 18h</span>
                </div>
                <p className="text-[11px] text-neutral-400">Final prototype code & live demo submission.</p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">TerraHacks Inception</span>
                  <span className="text-amber-400 font-mono text-[11px]">In 14 days</span>
                </div>
                <p className="text-[11px] text-neutral-400">Dataset verification and project thesis due.</p>
              </div>
            </div>
          </div>

          {/* Official Announcements */}
          <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white uppercase tracking-wider">Official Announcements</span>
              <Link to="/workspace/announcements" className="text-amber-400 hover:underline">
                History
              </Link>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="space-y-1 text-xs border-b border-neutral-800/60 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-400 font-medium">{ann.category}</span>
                    <span className="text-neutral-500 font-mono">{new Date(ann.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold text-neutral-200">{ann.title}</h4>
                  <p className="text-neutral-400 text-[11px] line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Sneak Peek */}
          <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white uppercase tracking-wider">Alerts & Activity</span>
              <Link to="/workspace/notifications" className="text-amber-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                    notif.read
                      ? 'bg-neutral-950/40 border-neutral-800/60 text-neutral-400'
                      : 'bg-neutral-950 border-amber-500/30 text-neutral-200'
                  }`}
                >
                  <p className="font-semibold text-[11px] leading-tight">{notif.title}</p>
                  <p className="text-[10px] text-neutral-400 truncate">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
