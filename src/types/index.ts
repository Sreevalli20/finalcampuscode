export type UserRole = 'student' | 'organizer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  yearOfStudy: string;
  skills: string[];
  interests: string[];
  headline: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  studentIdNumber: string;
}

export type EventStatus = 'upcoming' | 'registration_open' | 'ongoing' | 'judging' | 'completed';
export type ParticipationType = 'solo' | 'team' | 'both';

export interface EventRound {
  id: string;
  roundNumber: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  requirements: string[];
  status: 'upcoming' | 'active' | 'review' | 'closed';
}

export interface HackathonEvent {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  category: 'AI & Machine Learning' | 'Web3 & Fintech' | 'Open Innovation' | 'Sustainable Tech' | 'Mobile & Cloud';
  description: string;
  fullOverview: string;
  bannerImage: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  participationType: ParticipationType;
  minTeamSize: number;
  maxTeamSize: number;
  prizePool: string;
  prizeDetails: { place: string; amount: string; perks: string }[];
  status: EventStatus;
  eligibility: string[];
  tracks: string[];
  schedule: { date: string; time: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  rounds: EventRound[];
  rules: string[];
  registeredCount: number;
  featured?: boolean;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: string;
  college: string;
  skills: string[];
  isLeader?: boolean;
}

export interface Team {
  id: string;
  eventId: string;
  name: string;
  description: string;
  track: string;
  leaderId: string;
  members: TeamMember[];
  createdAt: string;
}

export interface ProjectSubmission {
  id: string;
  eventId: string;
  roundId: string;
  teamId?: string;
  userId: string;
  projectName: string;
  tagline: string;
  track: string;
  githubUrl: string;
  liveDemoUrl?: string;
  documentUrl?: string;
  description: string;
  techStack: string[];
  organizerNotes?: string;
  submittedAt: string;
  updatedAt: string;
  status: 'submitted' | 'under_review' | 'evaluated';
  scores?: {
    clarity: number;
    innovation: number;
    feasibility: number;
    technicalExecution: number;
    presentation: number;
    total: number;
    juryFeedback?: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  teamOrStudentName: string;
  projectName: string;
  track: string;
  totalScore: number;
  status: 'Winner' | 'Runner-up' | 'Finalist' | 'Shortlisted';
  avatarUrl?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  studentName: string;
  collegeName: string;
  eventId: string;
  eventName: string;
  achievement: 'Winner - 1st Place' | 'Runner-up - 2nd Place' | 'Best Technical Innovation' | 'Honorable Mention' | 'Official Participation & Finalist';
  issueDate: string;
  verificationHash: string;
  signatureName: string;
  signatureRole: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'announcement' | 'deadline' | 'submission' | 'team' | 'result' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface OfficialAnnouncement {
  id: string;
  eventId?: string;
  title: string;
  content: string;
  category: 'Critical' | 'Schedule' | 'Rules' | 'Results' | 'General';
  publishedAt: string;
  authorName: string;
  authorRole: string;
  pinned?: boolean;
}

export interface DiscussionPost {
  id: string;
  authorId: string;
  authorName: string;
  authorCollege: string;
  authorRole: string;
  title: string;
  content: string;
  category: 'Ideas' | 'Teammates' | 'Technical' | 'Announcements' | 'General';
  tags: string[];
  upvotes: number;
  hasUpvoted?: boolean;
  comments: {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  description?: string;
  category: 'Research' | 'Design' | 'Frontend' | 'Backend' | 'Pitch';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
  assignee?: string;
}

export interface PlannerProject {
  id: string;
  name: string;
  eventId: string;
  tasks: PlannerTask[];
  updatedAt: string;
}

export interface SkillQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SkillQuizResult {
  quizId: string;
  quizTitle: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  badgeEarned?: string;
}
