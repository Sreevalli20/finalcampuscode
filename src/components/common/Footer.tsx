import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <Link to="/" className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-sm inline-block" />
              <span>CampusCode</span>
            </Link>
            <p className="mt-3 text-neutral-400 max-w-sm leading-relaxed text-xs">
              The next-generation student innovation ecosystem. Designed for college builders to discover hackathons, assemble teams, validate ideas, and ship verified software projects.
            </p>
            <div className="mt-4 flex items-center gap-3 text-neutral-500 text-xs">
              <span>ReBuild '26 Round 2 Entry</span>
              <span>·</span>
              <span>Frontend Architecture</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">Ecosystem</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-neutral-200 transition-colors">Explore Tracks</Link></li>
              <li><Link to="/events" className="hover:text-neutral-200 transition-colors">Hackathon Catalog</Link></li>
              <li><Link to="/workspace/hackmate" className="hover:text-neutral-200 transition-colors">HackMate Matcher</Link></li>
              <li><Link to="/workspace/ideacheck" className="hover:text-neutral-200 transition-colors">IdeaCheck Rubric</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">Workspace</h4>
            <ul className="space-y-2">
              <li><Link to="/workspace" className="hover:text-neutral-200 transition-colors">Overview Dashboard</Link></li>
              <li><Link to="/workspace/my-events" className="hover:text-neutral-200 transition-colors">My Registrations</Link></li>
              <li><Link to="/workspace/digital-card" className="hover:text-neutral-200 transition-colors">Digital ID Card</Link></li>
              <li><Link to="/workspace/certificates" className="hover:text-neutral-200 transition-colors">Verified Credentials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-neutral-200 transition-colors">About Mission</Link></li>
              <li><Link to="/faq" className="hover:text-neutral-200 transition-colors">FAQ & Rules</Link></li>
              <li><Link to="/contact" className="hover:text-neutral-200 transition-colors">Contact Support</Link></li>
              <li><Link to="/organizer" className="text-amber-400 hover:text-amber-300 transition-colors">Organizer Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© 2026 CampusCode. All rights reserved. Locally executed student innovation showcase.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-neutral-400 font-mono">100% Client-Side Engine</span>
            <span>·</span>
            <span>No External Data Transmission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
