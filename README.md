# CampusCode

The Next-Generation Student Innovation Ecosystem — a 100% frontend-only React application for discovering hackathons, assembling teams with HackMate, evaluating ideas with IdeaCheck, tracking deadlines, and showcasing verified portfolios.

## Stack

- React 19 + TypeScript
- Vite 8 + Tailwind CSS v4
- react-router-dom v7
- lucide-react icons
- jsPDF (lazy-loaded, client-side certificate export)
- localStorage persistence (versioned JSON state, export/import snapshots)

No backend, no database, no external API calls. All state lives in the browser.

## Run Locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |

## Notes

- Demo auth: use the one-click Student/Organizer profiles on `/login`.
- All routes are code-split via `React.lazy`; `jspdf` is dynamically imported only when a certificate PDF is generated.
