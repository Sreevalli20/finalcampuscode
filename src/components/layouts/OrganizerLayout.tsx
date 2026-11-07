import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Users,
  FileCheck,
  Trophy,
  ArrowLeft,
  Menu,
  X,
  Command,
  Sun,
  Moon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommandPalette } from '../common/CommandPalette';
import { ToastContainer } from '../common/ToastContainer';

export const OrganizerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, setCommandPaletteOpen, loginAsDemo } = useApp();

  const navItems = [
    { label: 'Organizer Overview', href: '/organizer', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Event Management', href: '/organizer/events', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Create Hackathon', href: '/organizer/events/create', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Participants Roster', href: '/organizer/participants', icon: <Users className="w-4 h-4" /> },
    { label: 'Submission Review', href: '/organizer/submissions', icon: <FileCheck className="w-4 h-4" /> },
    { label: 'Publish Results', href: '/organizer/results', icon: <Trophy className="w-4 h-4" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/organizer') {
      return location.pathname === '/organizer';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-neutral-800 bg-neutral-950 shrink-0">
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800 bg-amber-500/5">
          <Link to="/organizer" className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm inline-block" />
            <span>CampusCode</span>
          </Link>
          <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
            Organizer
          </span>
        </div>

        <div className="p-3 bg-neutral-900/40 border-b border-neutral-800 text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Demonstration Console</span>
          </div>
          <p className="leading-tight">
            Live edits update student views and leaderboard scores immediately.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <span className={active ? 'text-amber-400' : 'text-neutral-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={() => {
              loginAsDemo('student');
              navigate('/workspace');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Student Workspace</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 max-w-[80vw] bg-neutral-950 border-r border-neutral-800 h-full flex flex-col z-10">
            <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-800">
              <span className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm inline-block" />
                <span>Organizer Console</span>
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium ${
                    isActive(item.href)
                      ? 'bg-amber-500/15 text-amber-400 font-semibold'
                      : 'text-neutral-400 hover:bg-neutral-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  loginAsDemo('student');
                  setSidebarOpen(false);
                  navigate('/workspace');
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-neutral-300 bg-neutral-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Student App</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-md"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs text-amber-400 font-mono uppercase font-semibold">
                Organizer Portal
              </span>
              <span className="mx-2 text-neutral-600">/</span>
              <span className="text-xs text-neutral-300 capitalize">
                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 bg-neutral-900 hover:text-neutral-200 border border-neutral-800 rounded-lg"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Commands</span>
              <kbd className="font-mono text-[10px] bg-neutral-800 px-1 py-0.5 rounded text-neutral-400">⌘K</kbd>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-900"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                loginAsDemo('student');
                navigate('/workspace');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Student View</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
      <ToastContainer />
    </div>
  );
};
