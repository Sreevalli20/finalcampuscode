import React, { useState } from 'react';
import { Trophy, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeaderboardEntry, Certificate } from '../../types';

export const OrganizerResults: React.FC = () => {
  const { leaderboards, updateLeaderboard, addCertificate, currentUser, addToast } = useApp();
  const entries = leaderboards['rebuild-26'] || [];

  const [activeEntries, setActiveEntries] = useState<LeaderboardEntry[]>(entries);
  const [published, setPublished] = useState(false);

  const handleScoreChange = (rank: number, newScore: number) => {
    const updated = activeEntries.map((e) => (e.rank === rank ? { ...e, totalScore: newScore } : e));
    // Sort descending by totalScore
    updated.sort((a, b) => b.totalScore - a.totalScore);
    const reRanked = updated.map((e, idx) => ({ ...e, previousRank: e.rank, rank: idx + 1 }));
    setActiveEntries(reRanked);
  };

  const handlePublishResults = () => {
    updateLeaderboard('rebuild-26', activeEntries);
    setPublished(true);

    // Automatically issue certificate for top winner if not yet present
    const topEntry = activeEntries[0];
    if (topEntry) {
      const cert: Certificate = {
        id: `cert_rebuild_${Date.now()}`,
        certificateNumber: `CC-CERT-2026-REB2-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: currentUser.id,
        studentName: currentUser.name,
        collegeName: currentUser.college,
        eventId: 'rebuild-26',
        eventName: "ReBuild '26: Premier Student Hackathon",
        achievement: 'Runner-up - 2nd Place',
        issueDate: 'November 22, 2026',
        verificationHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
        signatureName: 'Dr. Vikram Malhotra',
        signatureRole: 'Head of Jury, Academic Innovation Council',
      };
      addCertificate(cert);
    }

    addToast('Results Published', 'Standings locked and certificates dispatched.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Final Results & Leaderboard Publishing</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage standing scores, finalize grand winners, and dispatch verifiable certificates.
          </p>
        </div>

        <button
          onClick={handlePublishResults}
          className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Publish & Issue Certificates</span>
        </button>
      </div>

      {published && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official standings published to student leaderboard and certificates issued!</span>
          </div>
          <button onClick={() => setPublished(false)} className="text-[11px] text-emerald-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Standings Table with Live Score Edits */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-lg">
        <div className="p-4 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-white">ReBuild '26 Finalist Roster</span>
          <span className="text-neutral-500">Live Calculated Standings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/60 border-b border-neutral-800 font-mono text-neutral-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Squad & Project Name</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4 text-right">Score (/100)</th>
                <th className="py-3 px-4 text-right">Honors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {activeEntries.map((entry) => (
                <tr key={entry.teamOrStudentName} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sm">
                    {entry.rank === 1 ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span>1</span>
                      </span>
                    ) : (
                      <span className="text-neutral-400">{entry.rank}</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-white block">{entry.teamOrStudentName}</span>
                    <span className="text-[11px] text-neutral-400">{entry.projectName}</span>
                  </td>

                  <td className="py-3 px-4 text-neutral-400 font-mono text-[11px]">
                    {entry.track}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <input
                      type="number"
                      step="0.1"
                      min="60"
                      max="100"
                      value={entry.totalScore}
                      onChange={(e) => handleScoreChange(entry.rank, Number(e.target.value))}
                      className="w-20 px-2 py-1 text-right text-xs font-mono font-bold text-amber-400 bg-neutral-950 border border-neutral-800 rounded focus:outline-none focus:border-amber-500"
                    />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
