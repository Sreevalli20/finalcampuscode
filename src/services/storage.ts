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
  LeaderboardEntry
} from '../types';
import {
  SEED_STUDENT_USER,
  SEED_EVENTS,
  SEED_CERTIFICATES,
  SEED_ANNOUNCEMENTS,
  SEED_NOTIFICATIONS,
  SEED_DISCUSSIONS,
  SEED_PLANNER_PROJECT,
  SEED_LEADERBOARD_REBUILD,
} from './seedData';

const STORAGE_PREFIX = 'campuscode_v1_';

export interface StorageState {
  version: number;
  currentUser: UserProfile;
  events: HackathonEvent[];
  registeredEventIds: string[];
  teams: Record<string, Team>;
  submissions: Record<string, ProjectSubmission>;
  certificates: Certificate[];
  notifications: NotificationItem[];
  announcements: OfficialAnnouncement[];
  discussions: DiscussionPost[];
  planner: PlannerProject;
  leaderboards: Record<string, LeaderboardEntry[]>;
  theme: 'dark' | 'light';
}

function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed parsing ${key}, falling back to default.`, error);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`[Storage] Failed saving ${key}`, error);
  }
}

export const StorageService = {
  getInitialState(): StorageState {
    const hasInitialized = localStorage.getItem(STORAGE_PREFIX + 'initialized');

    if (!hasInitialized) {
      // Seed default teams & registrations
      const defaultTeam: Team = {
        id: 'team_astraea_rb26',
        eventId: 'rebuild-26',
        name: 'Team Astraea',
        description: 'Building CampusCode — The next-gen open innovation ecosystem for student hackathons.',
        track: 'Accessible EdTech & Student Ecosystems',
        leaderId: SEED_STUDENT_USER.id,
        createdAt: '2026-11-20T10:00:00Z',
        members: [
          {
            userId: SEED_STUDENT_USER.id,
            name: SEED_STUDENT_USER.name,
            email: SEED_STUDENT_USER.email,
            role: 'Lead Architect & Full-Stack',
            college: SEED_STUDENT_USER.college,
            skills: SEED_STUDENT_USER.skills,
            isLeader: true,
          },
          {
            userId: 'usr_zoya_02',
            name: 'Zoya Khan',
            email: 'zoya.khan@bits-pilani.ac.in',
            role: 'UI/UX & Product Design',
            college: 'BITS Pilani, Goa Campus',
            skills: ['Figma', 'UI/UX Design', 'Tailwind CSS'],
            isLeader: false,
          },
        ],
      };

      const defaultSubmission: ProjectSubmission = {
        id: 'sub_astraea_rb26',
        eventId: 'rebuild-26',
        roundId: 'rb26-r2',
        teamId: defaultTeam.id,
        userId: SEED_STUDENT_USER.id,
        projectName: 'CampusCode — Student Innovation Ecosystem',
        tagline: 'High-performance multi-page ecosystem with built-in HackMate and IdeaCheck tools.',
        track: 'Accessible EdTech & Student Ecosystems',
        githubUrl: 'https://github.com/kavya-sharma/campuscode-rebuild',
        liveDemoUrl: window.location.origin,
        documentUrl: 'https://campuscode.dev/docs/architecture-v1.pdf',
        description: 'CampusCode is an award-winning student innovation ecosystem engineered without heavy cloud backends. Features real local state synchronization, verifiable digital student credentials, HackMate compatibility matching, and transparent weighted idea evaluation.',
        techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Lucide React', 'jsPDF'],
        organizerNotes: 'Optimized for 1440px desktop baseline with full responsive support down to 360px mobile viewports. Includes client-side PDF generation and zero-API RuleBot.',
        submittedAt: '2026-11-21T14:30:00Z',
        updatedAt: '2026-11-21T14:30:00Z',
        status: 'submitted',
      };

      const seedState: StorageState = {
        version: 1,
        currentUser: SEED_STUDENT_USER,
        events: SEED_EVENTS,
        registeredEventIds: ['rebuild-26', 'edge-ai-sprint-26'],
        teams: {
          'rebuild-26': defaultTeam,
        },
        submissions: {
          'rebuild-26': defaultSubmission,
        },
        certificates: SEED_CERTIFICATES,
        notifications: SEED_NOTIFICATIONS,
        announcements: SEED_ANNOUNCEMENTS,
        discussions: SEED_DISCUSSIONS,
        planner: SEED_PLANNER_PROJECT,
        leaderboards: {
          'rebuild-26': SEED_LEADERBOARD_REBUILD,
        },
        theme: 'dark',
      };

      this.saveFullState(seedState);
      localStorage.setItem(STORAGE_PREFIX + 'initialized', 'true');
      return seedState;
    }

    return {
      version: 1,
      currentUser: safeGet<UserProfile>('user', SEED_STUDENT_USER),
      events: safeGet<HackathonEvent[]>('events', SEED_EVENTS),
      registeredEventIds: safeGet<string[]>('registered_events', ['rebuild-26', 'edge-ai-sprint-26']),
      teams: safeGet<Record<string, Team>>('teams', {}),
      submissions: safeGet<Record<string, ProjectSubmission>>('submissions', {}),
      certificates: safeGet<Certificate[]>('certificates', SEED_CERTIFICATES),
      notifications: safeGet<NotificationItem[]>('notifications', SEED_NOTIFICATIONS),
      announcements: safeGet<OfficialAnnouncement[]>('announcements', SEED_ANNOUNCEMENTS),
      discussions: safeGet<DiscussionPost[]>('discussions', SEED_DISCUSSIONS),
      planner: safeGet<PlannerProject>('planner', SEED_PLANNER_PROJECT),
      leaderboards: safeGet<Record<string, LeaderboardEntry[]>>('leaderboards', { 'rebuild-26': SEED_LEADERBOARD_REBUILD }),
      theme: safeGet<'dark' | 'light'>('theme', 'dark'),
    };
  },

  saveFullState(state: StorageState): void {
    safeSet('user', state.currentUser);
    safeSet('events', state.events);
    safeSet('registered_events', state.registeredEventIds);
    safeSet('teams', state.teams);
    safeSet('submissions', state.submissions);
    safeSet('certificates', state.certificates);
    safeSet('notifications', state.notifications);
    safeSet('announcements', state.announcements);
    safeSet('discussions', state.discussions);
    safeSet('planner', state.planner);
    safeSet('leaderboards', state.leaderboards);
    safeSet('theme', state.theme);
  },

  resetToSeed(): void {
    // Remove only CampusCode keys — never wipe unrelated app data in localStorage
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    this.getInitialState();
  },

  exportAsJSON(): string {
    const data: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        data[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(data, null, 2);
  },

  importFromJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as Record<string, string>;
      for (const [key, value] of Object.entries(parsed)) {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.setItem(key, value);
        }
      }
      return true;
    } catch (e) {
      console.error('[Storage] Import failed', e);
      return false;
    }
  },
};
