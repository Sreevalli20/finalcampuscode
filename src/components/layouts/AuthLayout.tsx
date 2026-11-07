import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CommandPalette } from '../common/CommandPalette';
import { ToastContainer } from '../common/ToastContainer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-950 text-neutral-100 p-4 sm:p-8">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link to="/" className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-sm inline-block" />
          <span>CampusCode</span>
        </Link>
        <Link
          to="/"
          className="text-xs text-neutral-400 hover:text-white transition-colors"
        >
          ← Back to Homepage
        </Link>
      </div>

      <div className="my-auto py-8">
        <Outlet />
      </div>

      <div className="text-center text-xs text-neutral-500 max-w-sm mx-auto">
        <p>Demonstration authentication mode. Stored strictly in client browser storage.</p>
      </div>

      <CommandPalette />
      <ToastContainer />
    </div>
  );
};
