import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  CalendarCheck2,
  Clock,
  Users2,
  Lightbulb,
  Bot,
  Kanban,
  Award,
  User,
  Briefcase,
  CreditCard,
  ScrollText,
  Trophy,
  MessageSquare,
  MessagesSquare,
  BookOpen,
  Bell,
  HelpCircle,
  Settings,
  Shield,
  Menu,
  X,
  Command,
  Sun,
  Moon,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommandPalette } from '../common/CommandPalette';
import { ToastContainer } from '../common/ToastContainer';

interface NavGroup {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string | number;
  }[];
}

export const WorkspaceLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentUser,
    notifications,
    theme,
    toggleTheme,
    setCommandPaletteOpen,
    loginAsDemo,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navGroups: NavGroup[] = [
    {
      label: 'Main',
      items: [
        { label: 'Overview', href: '/workspace', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'Explore Events', href: '/workspace/events', icon: <Compass className="w-4 h-4" /> },
        { label: 'My Registrations', href: '/workspace/my-events', icon: <CalendarCheck2 className="w-4 h-4" /> },
        { label: 'Deadlines', href: '/workspace/deadlines', icon: <Clock className="w-4 h-4" /> },
      ],
    },
    {
      label: 'Innovation Tools',
      items: [
        { label: 'HackMate AI', href: '/workspace/hackmate', icon: <Users2 className="w-4 h-4" /> },
        { label: 'IdeaCheck AI', href: '/workspace/ideacheck', icon: <Lightbulb className="w-4 h-4" /> },
        { label: 'RuleBot Assistant', href: '/workspace/rulebot', icon: <Bot className="w-4 h-4" /> },
        { label: 'Project Planner', href: '/workspace/project-planner', icon: <Kanban className="w-4 h-4" /> },
        { label: 'Skill Assessment', href: '/workspace/skill-assessment', icon: <Award className="w-4 h-4" /> },
      ],
    },
    {
      label: 'Credentials & Profile',
      items: [
        { label: 'Student Profile', href: '/workspace/profile', icon: <User className="w-4 h-4" /> },
        { label: 'Public Portfolio', href: '/workspace/portfolio', icon: <Briefcase className="w-4 h-4" /> },
        { label: 'Digital Student Card', href: '/workspace/digital-card', icon: <CreditCard className="w-4 h-4" /> },
        { label: 'Certificates', href: '/workspace/certificates', icon: <ScrollText className="w-4 h-4" /> },
        { label: 'Achievements', href: '/workspace/achievements', icon: <Trophy className="w-4 h-4" /> },
      ],
    },
    {
      label: 'Community & Intel',
      items: [
        { label: 'Community Feed', href: '/workspace/community', icon: <MessageSquare className="w-4 h-4" /> },
        { label: 'Discussions', href: '/workspace/discussions', icon: <MessagesSquare className="w-4 h-4" /> },
        { label: 'Announcements', href: '/workspace/announcements', icon: <Bell className="w-4 h-4" /> },
        { label: 'Notifications', href: '/workspace/notifications', icon: <Bell className="w-4 h-4" />, badge: unreadCount > 0 ? unreadCount : undefined },
        { label: 'Student Guide', href: '/workspace/guide', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'Help & Support', href: '/workspace/help', icon: <HelpCircle className="w-4 h-4" /> },
        { label: 'Settings', href: '/workspace/settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === '/workspace') {
      return location.pathname === '/workspace';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-neutral-800 bg-neutral-950 shrink-0">
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800">
          <Link to="/" className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-sm inline-block" />
            <span>CampusCode</span>
          </Link>
          <span className="text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-amber-400 px-1.5 py-0.5 rounded">
            Student
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <p className="px-2.5 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                {group.label}
              </p>
              <div className="space-y-0.5 mt-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? 'bg-amber-500/10 text-amber-400 font-semibold'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={active ? 'text-amber-400' : 'text-neutral-400'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500 text-neutral-950 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Organizer demo switcher footer */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-900/40">
          <button
            onClick={() => {
              loginAsDemo('organizer');
              navigate('/organizer');
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Organizer Demo</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 max-w-[80vw] bg-neutral-950 border-r border-neutral-800 h-full flex flex-col z-10">
            <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-800">
              <Link to="/" className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-sm inline-block" />
                <span>CampusCode</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {navGroups.map((group) => (
                <div key={group.label} className="space-y-1">
                  <p className="px-2 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                    {group.label}
                  </p>
                  <div className="space-y-0.5 mt-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive(item.href)
                            ? 'bg-amber-500/10 text-amber-400 font-semibold'
                            : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-neutral-950 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-neutral-800">
              <button
                onClick={() => {
                  loginAsDemo('organizer');
                  setSidebarOpen(false);
                  navigate('/organizer');
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-neutral-300 hover:text-amber-400 bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Organizer Demo Mode</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-md"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-neutral-400 font-medium">Student Workspace</span>
              <span className="mx-2 text-neutral-600">/</span>
              <span className="text-xs text-neutral-200 font-semibold capitalize">
                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 bg-neutral-900 hover:text-neutral-200 border border-neutral-800 rounded-lg transition-colors"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Quick Jump</span>
              <kbd className="hidden sm:inline font-mono text-[10px] bg-neutral-800 px-1 py-0.5 rounded text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Bell */}
            <Link
              to="/workspace/notifications"
              className="relative p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-900"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-900"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Pill */}
            <Link
              to="/workspace/profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
            >
              <img
                src={currentUser.avatarUrl || '/src/assets/images/student_innovator_portrait_1794026124336.jpg'}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-amber-500/40"
              />
              <span className="text-xs font-medium text-neutral-200 hidden sm:inline truncate max-w-[120px]">
                {currentUser.name}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
      <ToastContainer />
    </div>
  );
};
