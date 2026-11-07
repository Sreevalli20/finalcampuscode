import React, { useRef, useState } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  ShieldAlert,
  Database,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceSettings: React.FC = () => {
  const { theme, toggleTheme, exportState, importState, resetDemoData } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importState(content);
      }
    };
    reader.readAsText(file);
  };

  const handleResetConfirm = () => {
    resetDemoData();
    setResetConfirmOpen(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Workspace Settings & Data</h1>
        <p className="text-xs text-neutral-400">
          Manage local client-side persistence, interface preferences, and state snapshots.
        </p>
      </div>

      {/* Interface Theme */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-white">Visual Appearance</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Switch between deep dark obsidian styling and high-contrast light mode.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (theme !== 'dark') toggleTheme();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all inline-flex items-center gap-2 cursor-pointer ${
              theme === 'dark'
                ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark Obsidian Theme</span>
          </button>

          <button
            onClick={() => {
              if (theme !== 'light') toggleTheme();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all inline-flex items-center gap-2 cursor-pointer ${
              theme === 'light'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light Clean Theme</span>
          </button>
        </div>
      </div>

      {/* Local Data Storage Backup & Snapshot */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider mb-1">
            <Database className="w-4 h-4 text-amber-400" />
            <span>Client State Snapshots</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            All CampusCode state (registrations, submissions, team records, certificates) resides entirely in your browser's persistent localStorage. You can export complete JSON backups or restore previous snapshots.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportState}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Workspace JSON</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span>Import Snapshot JSON</span>
          </button>
        </div>
      </div>

      {/* Danger Zone: Environment Reset */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-rose-900/40 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-rose-300">Environment Reset</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Reset all events, submissions, teams, and local notifications back to pristine demonstration seed data.
          </p>
        </div>

        {!resetConfirmOpen ? (
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Environment...</span>
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-neutral-950 border border-rose-500/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Are you sure you want to restore original seed data?</span>
            </div>
            <p className="text-xs text-neutral-400">
              This will overwrite any custom teams, scores, or submissions with the default ReBuild '26 demonstration records.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleResetConfirm}
                className="px-4 py-1.5 text-xs font-semibold rounded-md bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
              >
                Yes, Reset Environment
              </button>
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
