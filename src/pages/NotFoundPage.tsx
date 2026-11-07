import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <span className="font-mono text-5xl font-extrabold text-amber-400">404</span>
      <h1 className="text-2xl font-bold text-white tracking-tight">Route Not Found</h1>
      <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
        The route you navigated to does not exist in the CampusCode application.
      </p>

      <div className="flex items-center gap-3 pt-4">
        <Link
          to="/"
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>CampusCode Home</span>
        </Link>
        <Link
          to="/workspace"
          className="px-4 py-2 text-xs font-medium rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white"
        >
          Student Workspace
        </Link>
      </div>
    </div>
  );
};
