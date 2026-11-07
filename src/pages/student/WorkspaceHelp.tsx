import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';

export const WorkspaceHelp: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const supportFaqs = [
    {
      q: 'Where is my application data stored?',
      a: 'CampusCode operates entirely within your browser using persistent, versioned localStorage. There is no remote cloud server or external database. All project submissions, team formations, and certificates remain securely stored locally on your device.',
    },
    {
      q: 'How do I download or backup my project state?',
      a: 'Navigate to Workspace Settings (/workspace/settings) and click "Export Workspace JSON". This generates a full JSON file containing your active state. You can restore it on any computer via "Import Snapshot JSON".',
    },
    {
      q: 'How do I test organizer grading and results publishing?',
      a: 'Click "Organizer Demo" at the bottom of the sidebar or switch roles in the header. As an organizer (Dr. Vikram Malhotra), you can inspect submissions, assign rubric scores, and publish updated leaderboard results that instantly reflect in student views.',
    },
    {
      q: 'Can I generate PDF certificates without an internet connection?',
      a: 'Yes. Our certificate engine uses client-side jsPDF. It renders high-resolution, vector-crisp PDF documents right in your browser memory without querying any external rendering service.',
    },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Help & Technical Support</h1>
        <p className="text-xs text-neutral-400">
          Troubleshooting tips, architecture FAQs, and organizer demonstration guides.
        </p>
      </div>

      <div className="space-y-3">
        {supportFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.q}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/60 transition-colors"
              >
                <span className="text-xs font-semibold text-neutral-100">{faq.q}</span>
                <span className="text-neutral-500">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Quick Keyboard Shortcuts</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <span className="text-neutral-400">Global Command Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400">⌘K / Ctrl+K</kbd>
          </div>
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <span className="text-neutral-400">Dismiss Modal / Dialog</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">ESC</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
