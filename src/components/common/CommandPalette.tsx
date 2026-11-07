import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Calendar,
  Users,
  Lightbulb,
  HelpCircle,
  FileText,
  Award,
  IdCard,
  Settings,
  FolderGit2,
  CheckSquare,
  Shield,
  Download,
  RotateCcw,
  SunMoon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Innovation Tools' | 'Events' | 'Actions';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen, events, toggleTheme, exportState, resetDemoData, loginAsDemo } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  const baseItems: CommandItem[] = [
    {
      id: 'nav_workspace',
      title: 'Student Workspace Overview',
      category: 'Navigation',
      icon: <LayoutDashboard className="w-4 h-4" />,
      action: () => navigate('/workspace'),
    },
    {
      id: 'nav_events',
      title: 'Discover Hackathons & Competitions',
      category: 'Navigation',
      icon: <Calendar className="w-4 h-4" />,
      action: () => navigate('/workspace/events'),
    },
    {
      id: 'nav_my_events',
      title: 'My Registered Hackathons',
      category: 'Navigation',
      icon: <Calendar className="w-4 h-4" />,
      action: () => navigate('/workspace/my-events'),
    },
    {
      id: 'nav_hackmate',
      title: 'HackMate AI — Teammate Discovery',
      category: 'Innovation Tools',
      icon: <Users className="w-4 h-4" />,
      action: () => navigate('/workspace/hackmate'),
    },
    {
      id: 'nav_ideacheck',
      title: 'IdeaCheck AI — Weighted Evaluation Rubric',
      category: 'Innovation Tools',
      icon: <Lightbulb className="w-4 h-4" />,
      action: () => navigate('/workspace/ideacheck'),
    },
    {
      id: 'nav_rulebot',
      title: 'RuleBot — Event Rules Knowledge Assistant',
      category: 'Innovation Tools',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => navigate('/workspace/rulebot'),
    },
    {
      id: 'nav_planner',
      title: 'Project Planner — Milestones & Tasks',
      category: 'Innovation Tools',
      icon: <CheckSquare className="w-4 h-4" />,
      action: () => navigate('/workspace/project-planner'),
    },
    {
      id: 'nav_skill_assessment',
      title: 'Skill Assessment Quizzes',
      category: 'Innovation Tools',
      icon: <Award className="w-4 h-4" />,
      action: () => navigate('/workspace/skill-assessment'),
    },
    {
      id: 'nav_portfolio',
      title: 'Professional Developer Portfolio',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4" />,
      action: () => navigate('/workspace/portfolio'),
    },
    {
      id: 'nav_digital_card',
      title: 'Digital Student ID Card & QR Code',
      category: 'Navigation',
      icon: <IdCard className="w-4 h-4" />,
      action: () => navigate('/workspace/digital-card'),
    },
    {
      id: 'nav_certificates',
      title: 'Verified Certificates & PDF Export',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4" />,
      action: () => navigate('/workspace/certificates'),
    },
    {
      id: 'nav_settings',
      title: 'Account Settings & Backup',
      category: 'Navigation',
      icon: <Settings className="w-4 h-4" />,
      action: () => navigate('/workspace/settings'),
    },
    {
      id: 'nav_organizer',
      title: 'Switch to Organizer Portal Demo',
      category: 'Actions',
      icon: <Shield className="w-4 h-4" />,
      action: () => {
        loginAsDemo('organizer');
        navigate('/organizer');
      },
    },
    {
      id: 'act_theme',
      title: 'Toggle Light / Dark Mode',
      category: 'Actions',
      icon: <SunMoon className="w-4 h-4" />,
      action: () => toggleTheme(),
    },
    {
      id: 'act_export',
      title: 'Export Workspace Data (JSON)',
      category: 'Actions',
      icon: <Download className="w-4 h-4" />,
      action: () => exportState(),
    },
    {
      id: 'act_reset',
      title: 'Reset Demo Environment to Seed Data',
      category: 'Actions',
      icon: <RotateCcw className="w-4 h-4" />,
      action: () => {
        if (window.confirm('Reset all demo state to fresh seed data?')) {
          resetDemoData();
        }
      },
    },
  ];

  // Dynamic event search items
  const eventItems: CommandItem[] = events.map((ev) => ({
    id: 'ev_' + ev.id,
    title: `Event Hub: ${ev.title}`,
    category: 'Events',
    icon: <Calendar className="w-4 h-4 text-amber-400" />,
    action: () => navigate(`/workspace/event/${ev.id}`),
  }));

  const allItems = [...baseItems, ...eventItems];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        setCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col text-neutral-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, tool, or hackathon name..."
            className="flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />
          <kbd className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400 font-mono">
            ESC to close
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No matching commands or events found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  setCommandPaletteOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors text-left ${
                  idx === selectedIndex
                    ? 'bg-amber-500/10 text-amber-300 font-medium'
                    : 'text-neutral-300 hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={idx === selectedIndex ? 'text-amber-400' : 'text-neutral-400'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.title}</span>
                </div>
                <span className="text-[11px] text-neutral-500 shrink-0 ml-3">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Navigate with ↑ and ↓</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
};
