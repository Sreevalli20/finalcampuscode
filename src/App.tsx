import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts (small, kept eager so navigation chrome renders instantly)
import { PublicLayout } from './components/layouts/PublicLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { WorkspaceLayout } from './components/layouts/WorkspaceLayout';
import { OrganizerLayout } from './components/layouts/OrganizerLayout';

// Route-level code splitting: every page is a separate chunk loaded on demand.
const LandingPage = lazy(() => import('./pages/public/LandingPage').then((m) => ({ default: m.LandingPage })));
const ExplorePage = lazy(() => import('./pages/public/ExplorePage').then((m) => ({ default: m.ExplorePage })));
const EventsPage = lazy(() => import('./pages/public/EventsPage').then((m) => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() => import('./pages/public/EventDetailPage').then((m) => ({ default: m.EventDetailPage })));
const AboutPage = lazy(() => import('./pages/public/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/public/ContactPage').then((m) => ({ default: m.ContactPage })));
const FaqPage = lazy(() => import('./pages/public/FaqPage').then((m) => ({ default: m.FaqPage })));

const LoginPage = lazy(() => import('./pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));

const WorkspaceDashboard = lazy(() => import('./pages/student/WorkspaceDashboard').then((m) => ({ default: m.WorkspaceDashboard })));
const WorkspaceEvents = lazy(() => import('./pages/student/WorkspaceEvents').then((m) => ({ default: m.WorkspaceEvents })));
const WorkspaceMyEvents = lazy(() => import('./pages/student/WorkspaceMyEvents').then((m) => ({ default: m.WorkspaceMyEvents })));
const WorkspaceDeadlines = lazy(() => import('./pages/student/WorkspaceDeadlines').then((m) => ({ default: m.WorkspaceDeadlines })));

const EventHubLayout = lazy(() => import('./pages/eventHub/EventHubLayout').then((m) => ({ default: m.EventHubLayout })));
const EventHubOverview = lazy(() => import('./pages/eventHub/EventHubOverview').then((m) => ({ default: m.EventHubOverview })));
const EventHubRounds = lazy(() => import('./pages/eventHub/EventHubRounds').then((m) => ({ default: m.EventHubRounds })));
const EventHubTeam = lazy(() => import('./pages/eventHub/EventHubTeam').then((m) => ({ default: m.EventHubTeam })));
const EventHubSubmission = lazy(() => import('./pages/eventHub/EventHubSubmission').then((m) => ({ default: m.EventHubSubmission })));
const EventHubResults = lazy(() => import('./pages/eventHub/EventHubResults').then((m) => ({ default: m.EventHubResults })));
const EventHubLeaderboard = lazy(() => import('./pages/eventHub/EventHubLeaderboard').then((m) => ({ default: m.EventHubLeaderboard })));

const HackMatePage = lazy(() => import('./pages/tools/HackMatePage').then((m) => ({ default: m.HackMatePage })));
const IdeaCheckPage = lazy(() => import('./pages/tools/IdeaCheckPage').then((m) => ({ default: m.IdeaCheckPage })));
const RuleBotPage = lazy(() => import('./pages/tools/RuleBotPage').then((m) => ({ default: m.RuleBotPage })));
const ProjectPlannerPage = lazy(() => import('./pages/tools/ProjectPlannerPage').then((m) => ({ default: m.ProjectPlannerPage })));
const SkillAssessmentPage = lazy(() => import('./pages/tools/SkillAssessmentPage').then((m) => ({ default: m.SkillAssessmentPage })));

const WorkspaceProfile = lazy(() => import('./pages/student/WorkspaceProfile').then((m) => ({ default: m.WorkspaceProfile })));
const WorkspacePortfolio = lazy(() => import('./pages/student/WorkspacePortfolio').then((m) => ({ default: m.WorkspacePortfolio })));
const WorkspaceDigitalCard = lazy(() => import('./pages/student/WorkspaceDigitalCard').then((m) => ({ default: m.WorkspaceDigitalCard })));
const WorkspaceCertificates = lazy(() => import('./pages/student/WorkspaceCertificates').then((m) => ({ default: m.WorkspaceCertificates })));
const WorkspaceAchievements = lazy(() => import('./pages/student/WorkspaceAchievements').then((m) => ({ default: m.WorkspaceAchievements })));
const WorkspaceSettings = lazy(() => import('./pages/student/WorkspaceSettings').then((m) => ({ default: m.WorkspaceSettings })));
const WorkspaceCommunity = lazy(() => import('./pages/student/WorkspaceCommunity').then((m) => ({ default: m.WorkspaceCommunity })));
const WorkspaceDiscussions = lazy(() => import('./pages/student/WorkspaceDiscussions').then((m) => ({ default: m.WorkspaceDiscussions })));
const WorkspaceNotifications = lazy(() => import('./pages/student/WorkspaceNotifications').then((m) => ({ default: m.WorkspaceNotifications })));
const WorkspaceAnnouncements = lazy(() => import('./pages/student/WorkspaceAnnouncements').then((m) => ({ default: m.WorkspaceAnnouncements })));
const WorkspaceGuide = lazy(() => import('./pages/student/WorkspaceGuide').then((m) => ({ default: m.WorkspaceGuide })));
const WorkspaceHelp = lazy(() => import('./pages/student/WorkspaceHelp').then((m) => ({ default: m.WorkspaceHelp })));

const OrganizerDashboard = lazy(() => import('./pages/organizer/OrganizerDashboard').then((m) => ({ default: m.OrganizerDashboard })));
const OrganizerEvents = lazy(() => import('./pages/organizer/OrganizerEvents').then((m) => ({ default: m.OrganizerEvents })));
const OrganizerEventCreate = lazy(() => import('./pages/organizer/OrganizerEventCreate').then((m) => ({ default: m.OrganizerEventCreate })));
const OrganizerParticipants = lazy(() => import('./pages/organizer/OrganizerParticipants').then((m) => ({ default: m.OrganizerParticipants })));
const OrganizerSubmissions = lazy(() => import('./pages/organizer/OrganizerSubmissions').then((m) => ({ default: m.OrganizerSubmissions })));
const OrganizerResults = lazy(() => import('./pages/organizer/OrganizerResults').then((m) => ({ default: m.OrganizerResults })));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventId" element={<EventDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
            </Route>

            {/* Authentication Layout */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Student Workspace Layout */}
            <Route path="/workspace" element={<WorkspaceLayout />}>
              <Route index element={<WorkspaceDashboard />} />
              <Route path="events" element={<WorkspaceEvents />} />
              <Route path="my-events" element={<WorkspaceMyEvents />} />
              <Route path="deadlines" element={<WorkspaceDeadlines />} />

              {/* Event Hub Nested Routes */}
              <Route path="event/:eventId" element={<EventHubLayout />}>
                <Route index element={<EventHubOverview />} />
                <Route path="rounds" element={<EventHubRounds />} />
                <Route path="team" element={<EventHubTeam />} />
                <Route path="submission" element={<EventHubSubmission />} />
                <Route path="results" element={<EventHubResults />} />
                <Route path="leaderboard" element={<EventHubLeaderboard />} />
              </Route>

              {/* Innovation Tools */}
              <Route path="hackmate" element={<HackMatePage />} />
              <Route path="ideacheck" element={<IdeaCheckPage />} />
              <Route path="rulebot" element={<RuleBotPage />} />
              <Route path="project-planner" element={<ProjectPlannerPage />} />
              <Route path="skill-assessment" element={<SkillAssessmentPage />} />

              {/* Credentials & Profile */}
              <Route path="profile" element={<WorkspaceProfile />} />
              <Route path="portfolio" element={<WorkspacePortfolio />} />
              <Route path="digital-card" element={<WorkspaceDigitalCard />} />
              <Route path="certificates" element={<WorkspaceCertificates />} />
              <Route path="achievements" element={<WorkspaceAchievements />} />
              <Route path="settings" element={<WorkspaceSettings />} />

              {/* Community & Guides */}
              <Route path="community" element={<WorkspaceCommunity />} />
              <Route path="discussions" element={<WorkspaceDiscussions />} />
              <Route path="notifications" element={<WorkspaceNotifications />} />
              <Route path="announcements" element={<WorkspaceAnnouncements />} />
              <Route path="guide" element={<WorkspaceGuide />} />
              <Route path="help" element={<WorkspaceHelp />} />
            </Route>

            {/* Organizer Demonstration Portal */}
            <Route path="/organizer" element={<OrganizerLayout />}>
              <Route index element={<OrganizerDashboard />} />
              <Route path="events" element={<OrganizerEvents />} />
              <Route path="events/create" element={<OrganizerEventCreate />} />
              <Route path="participants" element={<OrganizerParticipants />} />
              <Route path="submissions" element={<OrganizerSubmissions />} />
              <Route path="results" element={<OrganizerResults />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}
