# CampusCode

The Next-Generation Student Innovation Ecosystem — a 100% frontend-only React application for discovering hackathons, assembling teams with HackMate, evaluating ideas with IdeaCheck, tracking deadlines, and showcasing verified portfolios.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square)

---

## 🚀 About the Project

CampusCode is a comprehensive hackathon and student innovation platform designed to connect students with hackathon events, facilitate team formation, evaluate project ideas, and track project deadlines. The platform features a sophisticated student workspace, organizer portal, and AI-powered innovation tools.

### Key Features

#### 🎯 Student Workspace
- **Dashboard**: Overview of upcoming events, deadlines, and activities
- **Event Hub**: Detailed event management with rounds, team formation, submissions, and results
- **Innovation Tools**:
  - **HackMate**: AI-powered team matching based on skills and interests
  - **IdeaCheck**: Project idea validation and feedback
  - **RuleBot**: Hackathon rules explanation and guidance
  - **Project Planner**: Task management and project timeline planning
  - **Skill Assessment**: Technical skill evaluation and badges
- **Portfolio & Credentials**: Verified certificates, achievements, and digital student cards
- **Community**: Discussions, notifications, and official announcements

#### 🎪 Organizer Portal
- Event creation and management
- Participant tracking and submission review
- Results and leaderboard management

#### 🌐 Public Pages
- Landing page with feature overview
- Event exploration and detailed event pages
- FAQ, About, and Contact pages

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.0.1 | UI framework |
| TypeScript | 7.0.2 | Type safety |
| Vite | 8.3.0 | Build tool & dev server |
| Tailwind CSS | 4.3.3 | Utility-first styling |
| React Router DOM | 7.18.5 | Client-side routing |
| Lucide React | 0.546.0 | Icon library |
| jsPDF | 4.2.1 | PDF certificate generation |
| localStorage | - | Client-side data persistence |

### Architecture Highlights
- **No Backend**: 100% frontend-only application
- **Route-Level Code Splitting**: Every page is lazily loaded via `React.lazy`
- **Versioned State Management**: localStorage with JSON state snapshots
- **Type-Safe**: Full TypeScript coverage with comprehensive type definitions

---

## 📁 Project Structure

```
campuscode/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components
│   │   └── layouts/       # Layout wrappers
│   ├── context/           # React context (AppContext)
│   ├── pages/             # Route-based pages
│   │   ├── auth/          # Login, Register, Forgot Password
│   │   ├── eventHub/      # Event-specific workspace
│   │   ├── organizer/     # Organizer dashboard
│   │   ├── public/        # Public-facing pages
│   │   ├── student/       # Student workspace pages
│   │   └── tools/         # Innovation tools
│   ├── services/          # Data services
│   │   ├── seedData.ts    # Initial mock data
│   │   └── storage.ts     # localStorage management
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main app with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── dist/                  # Production build output
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── metadata.json          # Project metadata
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Sreevalli20/finalcampuscode.git

# Navigate to project directory
cd campuscode

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 with hot module replacement |
| `npm run build` | Create production build in `dist/` directory |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` directory |

---

## 🔐 Demo Authentication

The platform includes demo authentication for testing:

- **Student Role**: Use one-click Student profile on `/login`
- **Organizer Role**: Use one-click Organizer profile on `/login`

All authentication is client-side only with localStorage persistence.

---

## 🎨 Key Routes

### Public Routes
- `/` - Landing page
- `/explore` - Explore hackathons
- `/events` - All events listing
- `/events/:eventId` - Event details
- `/about` - About page
- `/contact` - Contact page
- `/faq` - FAQ page

### Authentication Routes
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery

### Student Workspace (`/workspace`)
- `/workspace` - Dashboard
- `/workspace/events` - Available events
- `/workspace/my-events` - Registered events
- `/workspace/deadlines` - Deadline tracker
- `/workspace/event/:eventId` - Event hub with rounds, team, submission, results
- `/workspace/hackmate` - Team matching tool
- `/workspace/ideacheck` - Idea validation tool
- `/workspace/rulebot` - Rules assistant
- `/workspace/project-planner` - Project planning tool
- `/workspace/skill-assessment` - Skill evaluation
- `/workspace/profile` - User profile
- `/workspace/portfolio` - Portfolio showcase
- `/workspace/digital-card` - Digital student ID
- `/workspace/certificates` - Certificates
- `/workspace/achievements` - Achievements
- `/workspace/settings` - Settings
- `/workspace/community` - Community feed
- `/workspace/discussions` - Discussions
- `/workspace/notifications` - Notifications
- `/workspace/announcements` - Announcements
- `/workspace/guide` - User guide
- `/workspace/help` - Help center

### Organizer Portal (`/organizer`)
- `/organizer` - Organizer dashboard
- `/organizer/events` - Event management
- `/organizer/events/create` - Create new event
- `/organizer/participants` - Participant tracking
- `/organizer/submissions` - Submission review
- `/organizer/results` - Results management

---

## 📦 Data Persistence

All application state is stored in the browser's localStorage:

- **Versioned State**: JSON state with versioning for backward compatibility
- **Export/Import**: Ability to export and import state snapshots
- **No Backend Required**: Completely self-contained application

---

## 🎯 Innovation Tools

### HackMate
AI-powered team matching algorithm that matches students based on:
- Skills and expertise
- Interests and domains
- Project requirements
- Team size preferences

### IdeaCheck
Project idea validation tool providing feedback on:
- Feasibility assessment
- Innovation potential
- Technical requirements
- Market viability

### RuleBot
Interactive assistant for hackathon rules and guidelines:
- Rule explanations
- Compliance checking
- Submission requirements
- FAQ answers

### Project Planner
Task management and timeline planning:
- Task categorization (Research, Design, Frontend, Backend, Pitch)
- Deadline tracking
- Team assignment
- Progress visualization

### Skill Assessment
Technical skill evaluation:
- Quizzes across multiple categories
- Badge earning system
- Skill gap analysis
- Performance tracking

---

## 🚀 Deployment

The project is configured for deployment on Vercel. A `vercel.json` file is included with appropriate build settings.

### Manual Deployment Steps

Since you'll be doing this manually, here are the commands:

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to Vercel
vercel

# Or deploy to production directly
vercel --prod
```

### Alternative: GitHub Pages

If deploying to GitHub Pages:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages (requires gh-pages package)
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

For questions or support, please open an issue on the GitHub repository.

---

## 🙏 Acknowledgments

- Built with React 19 and TypeScript
- Styled with Tailwind CSS v4
- Icons by Lucide React
- PDF generation with jsPDF

---

**CampusCode** - Empowering the next generation of student innovators. 🚀
