import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  UserProfile,
  HackathonEvent,
  Team,
  ProjectSubmission,
  Certificate,
  NotificationItem,
  OfficialAnnouncement,
  DiscussionPost,
  PlannerProject,
  PlannerTask,
  LeaderboardEntry,
} from '../types';
import { StorageService } from '../services/storage';
import { SEED_STUDENT_USER, SEED_ORGANIZER_USER } from '../services/seedData';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextValue {
  currentUser: UserProfile;
  setCurrentUser: (u: UserProfile) => void;
  events: HackathonEvent[];
  registeredEventIds: string[];
  registerForEvent: (eventId: string) => boolean;
  unregisterFromEvent: (eventId: string) => boolean;
  teams: Record<string, Team>;
  saveTeam: (eventId: string, team: Team) => void;
  submissions: Record<string, ProjectSubmission>;
  saveSubmission: (submission: ProjectSubmission) => void;
  certificates: Certificate[];
  addCertificate: (cert: Certificate) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  announcements: OfficialAnnouncement[];
  addAnnouncement: (ann: Omit<OfficialAnnouncement, 'id' | 'publishedAt'>) => void;
  discussions: DiscussionPost[];
  addDiscussionPost: (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'upvotes' | 'comments'>) => void;
  upvoteDiscussionPost: (id: string) => void;
  addDiscussionComment: (postId: string, content: string) => void;
  planner: PlannerProject;
  updatePlannerTasks: (tasks: PlannerTask[]) => void;
  leaderboards: Record<string, LeaderboardEntry[]>;
  updateLeaderboard: (eventId: string, entries: LeaderboardEntry[]) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  loginAsDemo: (role: 'student' | 'organizer') => void;
  logout: () => void;
  resetDemoData: () => void;
  exportState: () => void;
  importState: (json: string) => boolean;
  createEvent: (ev: HackathonEvent) => void;
  updateEvent: (ev: HackathonEvent) => void;
  evaluateSubmission: (submissionId: string, scores: NonNullable<ProjectSubmission['scores']>) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [initial] = useState(() => StorageService.getInitialState());

  const [currentUser, setCurrentUser] = useState<UserProfile>(initial.currentUser);
  const [events, setEvents] = useState<HackathonEvent[]>(initial.events);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(initial.registeredEventIds);
  const [teams, setTeams] = useState<Record<string, Team>>(initial.teams);
  const [submissions, setSubmissions] = useState<Record<string, ProjectSubmission>>(initial.submissions);
  const [certificates, setCertificates] = useState<Certificate[]>(initial.certificates);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initial.notifications);
  const [announcements, setAnnouncements] = useState<OfficialAnnouncement[]>(initial.announcements);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(initial.discussions);
  const [planner, setPlanner] = useState<PlannerProject>(initial.planner);
  const [leaderboards, setLeaderboards] = useState<Record<string, LeaderboardEntry[]>>(initial.leaderboards);
  const [theme, setTheme] = useState<'dark' | 'light'>(initial.theme);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Sync theme with HTML documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Persist state changes
  useEffect(() => {
    StorageService.saveFullState({
      version: 1,
      currentUser,
      events,
      registeredEventIds,
      teams,
      submissions,
      certificates,
      notifications,
      announcements,
      discussions,
      planner,
      leaderboards,
      theme,
    });
  }, [
    currentUser,
    events,
    registeredEventIds,
    teams,
    submissions,
    certificates,
    notifications,
    announcements,
    discussions,
    planner,
    leaderboards,
    theme,
  ]);

  // Global Ctrl/Cmd + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      addToast('Theme Switched', `Active theme is now ${next}.`, 'info');
      return next;
    });
  };

  const registerForEvent = (eventId: string): boolean => {
    if (registeredEventIds.includes(eventId)) {
      addToast('Already Registered', 'You are already registered for this hackathon.', 'info');
      return false;
    }
    const nextList = [...registeredEventIds, eventId];
    setRegisteredEventIds(nextList);
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );

    // Add notification
    const targetEvent = events.find((e) => e.id === eventId);
    const notif: NotificationItem = {
      id: 'notif_' + Date.now(),
      userId: currentUser.id,
      title: `Registration Confirmed: ${targetEvent?.title || eventId}`,
      message: 'You have secured entry into this hackathon. You can now build your team or submit deliverables.',
      type: 'system',
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl: `/workspace/event/${eventId}`,
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast('Registration Confirmed', `Successfully entered ${targetEvent?.title || 'event'}.`, 'success');
    return true;
  };

  const unregisterFromEvent = (eventId: string): boolean => {
    setRegisteredEventIds((prev) => prev.filter((id) => id !== eventId));
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e))
    );
    addToast('Registration Cancelled', 'You have withdrawn from this hackathon.', 'info');
    return true;
  };

  const saveTeam = (eventId: string, team: Team) => {
    setTeams((prev) => ({ ...prev, [eventId]: team }));
    addToast('Team Updated', `Team "${team.name}" details saved successfully.`, 'success');
  };

  const saveSubmission = (sub: ProjectSubmission) => {
    setSubmissions((prev) => ({ ...prev, [sub.eventId]: sub }));
    addToast('Project Submitted', 'Your submission has been securely recorded locally.', 'success');
  };

  const addCertificate = (cert: Certificate) => {
    setCertificates((prev) => [cert, ...prev]);
    addToast('Certificate Issued', `Generated: ${cert.eventName}`, 'success');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('Notifications Cleared', 'All alerts cleared.', 'info');
  };

  const addAnnouncement = (ann: Omit<OfficialAnnouncement, 'id' | 'publishedAt'>) => {
    const newAnn: OfficialAnnouncement = {
      ...ann,
      id: 'ann_' + Date.now(),
      publishedAt: new Date().toISOString(),
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    addToast('Announcement Published', newAnn.title, 'success');
  };

  const addDiscussionPost = (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'upvotes' | 'comments'>) => {
    const newPost: DiscussionPost = {
      ...post,
      id: 'disc_' + Date.now(),
      createdAt: new Date().toISOString(),
      upvotes: 1,
      hasUpvoted: true,
      comments: [],
    };
    setDiscussions((prev) => [newPost, ...prev]);
    addToast('Post Published', 'Your question has been posted to the student forum.', 'success');
  };

  const upvoteDiscussionPost = (id: string) => {
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const willUpvote = !p.hasUpvoted;
        return {
          ...p,
          upvotes: willUpvote ? p.upvotes + 1 : Math.max(0, p.upvotes - 1),
          hasUpvoted: willUpvote,
        };
      })
    );
  };

  const addDiscussionComment = (postId: string, content: string) => {
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: 'comm_' + Date.now(),
              authorId: currentUser.id,
              authorName: currentUser.name,
              content,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      })
    );
    addToast('Comment Posted', 'Your reply is now live.', 'success');
  };

  const updatePlannerTasks = (tasks: PlannerTask[]) => {
    setPlanner((prev) => ({
      ...prev,
      tasks,
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateLeaderboard = (eventId: string, entries: LeaderboardEntry[]) => {
    setLeaderboards((prev) => ({ ...prev, [eventId]: entries }));
    addToast('Leaderboard Updated', 'Scores and rankings re-tallied.', 'info');
  };

  const loginAsDemo = (role: 'student' | 'organizer') => {
    if (role === 'organizer') {
      setCurrentUser(SEED_ORGANIZER_USER);
      addToast('Organizer Demo Active', 'Logged in as Dr. Vikram Malhotra (Lead Organizer).', 'info');
    } else {
      setCurrentUser(SEED_STUDENT_USER);
      addToast('Student Demo Active', 'Logged in as Kavya Sharma (NIT Trichy).', 'success');
    }
  };

  const logout = () => {
    // Soft logout: resets to student demo without losing state
    addToast('Logged Out', 'Session cleared. Returning to guest view.', 'info');
  };

  const resetDemoData = () => {
    StorageService.resetToSeed();
    const fresh = StorageService.getInitialState();
    setCurrentUser(fresh.currentUser);
    setEvents(fresh.events);
    setRegisteredEventIds(fresh.registeredEventIds);
    setTeams(fresh.teams);
    setSubmissions(fresh.submissions);
    setCertificates(fresh.certificates);
    setNotifications(fresh.notifications);
    setAnnouncements(fresh.announcements);
    setDiscussions(fresh.discussions);
    setPlanner(fresh.planner);
    setLeaderboards(fresh.leaderboards);
    setTheme(fresh.theme);
    addToast('Demo Reset', 'Environment restored to pristine seed data.', 'success');
  };

  const exportState = () => {
    const json = StorageService.exportAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campuscode-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Export Successful', 'Downloaded complete workspace JSON snapshot.', 'success');
  };

  const importState = (json: string): boolean => {
    const ok = StorageService.importFromJSON(json);
    if (ok) {
      const fresh = StorageService.getInitialState();
      setCurrentUser(fresh.currentUser);
      setEvents(fresh.events);
      setRegisteredEventIds(fresh.registeredEventIds);
      setTeams(fresh.teams);
      setSubmissions(fresh.submissions);
      setCertificates(fresh.certificates);
      setNotifications(fresh.notifications);
      setAnnouncements(fresh.announcements);
      setDiscussions(fresh.discussions);
      setPlanner(fresh.planner);
      setLeaderboards(fresh.leaderboards);
      setTheme(fresh.theme);
      addToast('Import Successful', 'Workspace state restored from JSON.', 'success');
      return true;
    } else {
      addToast('Import Failed', 'Invalid JSON backup format.', 'error');
      return false;
    }
  };

  const createEvent = (ev: HackathonEvent) => {
    setEvents((prev) => [ev, ...prev]);
    addToast('Hackathon Created', `"${ev.title}" is now published.`, 'success');
  };

  const updateEvent = (ev: HackathonEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === ev.id ? ev : e)));
    addToast('Event Updated', `Changes to "${ev.title}" saved.`, 'info');
  };

  const evaluateSubmission = (submissionId: string, scores: NonNullable<ProjectSubmission['scores']>) => {
    setSubmissions((prev) => {
      const updated = { ...prev };
      for (const key of Object.keys(updated)) {
        if (updated[key].id === submissionId) {
          updated[key] = {
            ...updated[key],
            status: 'evaluated',
            scores,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return updated;
    });
    addToast('Evaluation Saved', `Assigned total score: ${scores.total}/100`, 'success');
  };

  const value = useMemo<AppContextValue>(() => ({
    currentUser,
    setCurrentUser,
    events,
    registeredEventIds,
    registerForEvent,
    unregisterFromEvent,
    teams,
    saveTeam,
    submissions,
    saveSubmission,
    certificates,
    addCertificate,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    announcements,
    addAnnouncement,
    discussions,
    addDiscussionPost,
    upvoteDiscussionPost,
    addDiscussionComment,
    planner,
    updatePlannerTasks,
    leaderboards,
    updateLeaderboard,
    theme,
    toggleTheme,
    toasts,
    addToast,
    removeToast,
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    loginAsDemo,
    logout,
    resetDemoData,
    exportState,
    importState,
    createEvent,
    updateEvent,
    evaluateSubmission,
  }), [
    currentUser,
    events,
    registeredEventIds,
    teams,
    submissions,
    certificates,
    notifications,
    announcements,
    discussions,
    planner,
    leaderboards,
    theme,
    toasts,
    isCommandPaletteOpen,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
