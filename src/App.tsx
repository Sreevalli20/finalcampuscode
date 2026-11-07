import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import { PublicLayout } from './components/layouts/PublicLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { WorkspaceLayout } from './components/layouts/WorkspaceLayout';
import { OrganizerLayout } from './components/layouts/OrganizerLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExplorePage } from './pages/public/ExplorePage';
import { EventsPage } from './pages/public/EventsPage';
import { EventDetailPage } from './pages/public/EventDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { FaqPage } from './pages/public/FaqPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Student Workspace Pages
import { WorkspaceDashboard } from './pages/student/WorkspaceDashboard';
import { WorkspaceEvents } from './pages/student/WorkspaceEvents';
import { WorkspaceMyEvents } from './pages/student/WorkspaceMyEvents';
import { WorkspaceDeadlines } from './pages/student/WorkspaceDeadlines';
import { WorkspaceCertificates } from './pages/student/WorkspaceCertificates';
import { WorkspaceNotifications } from './pages/student/WorkspaceNotifications';
import { WorkspaceAnnouncements } from './pages/student/WorkspaceAnnouncements';
import { WorkspaceProfile } from './pages/student/WorkspaceProfile';
import { WorkspacePortfolio } from './pages/student/WorkspacePortfolio';
import { WorkspaceDigitalCard } from './pages/student/WorkspaceDigitalCard';
import { WorkspaceAchievements } from './pages/student/WorkspaceAchievements';
import { WorkspaceSettings } from './pages/student/WorkspaceSettings';
import { WorkspaceCommunity } from './pages/student/WorkspaceCommunity';
import { WorkspaceDiscussions } from './pages/student/WorkspaceDiscussions';
import { WorkspaceGuide } from './pages/student/WorkspaceGuide';
import { WorkspaceHelp } from './pages/student/WorkspaceHelp';

// Event Hub Pages
import { EventHubLayout } from './pages/eventHub/EventHubLayout';
import { EventHubOverview } from './pages/eventHub/EventHubOverview';
import { EventHubRounds } from './pages/eventHub/EventHubRounds';
import { EventHubTeam } from './pages/eventHub/EventHubTeam';
import { EventHubSubmission } from './pages/eventHub/EventHubSubmission';
import { EventHubResults } from './pages/eventHub/EventHubResults';
import { EventHubLeaderboard } from './pages/eventHub/EventHubLeaderboard';

// Innovation Tools
import { HackMatePage } from './pages/tools/HackMatePage';
import { IdeaCheckPage } from './pages/tools/IdeaCheckPage';
import { RuleBotPage } from './pages/tools/RuleBotPage';
import { ProjectPlannerPage } from './pages/tools/ProjectPlannerPage';
import { SkillAssessmentPage } from './pages/tools/SkillAssessmentPage';

// Organizer Pages
import { OrganizerDashboard } from './pages/organizer/OrganizerDashboard';
import { OrganizerEvents } from './pages/organizer/OrganizerEvents';
import { OrganizerEventCreate } from './pages/organizer/OrganizerEventCreate';
import { OrganizerParticipants } from './pages/organizer/OrganizerParticipants';
import { OrganizerSubmissions } from './pages/organizer/OrganizerSubmissions';
import { OrganizerResults } from './pages/organizer/OrganizerResults';

// 404
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  );
}
