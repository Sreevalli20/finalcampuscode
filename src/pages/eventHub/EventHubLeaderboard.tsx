import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, TrendingUp, TrendingDown, Minus, Filter, Sparkles, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EventHubLeaderboard: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { leaderboards, events } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<string>('All');

  const event = events.find((e) => e.id === eventId);
  const entries = leaderboards[eventId || ''] || [];

  const tracks = ['All', ...(event?.tracks || [])];

  const filtered = selectedTrack === 'All'
    ? entries
    : entries.filter((e) => e.track === selectedTrack);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Live Competition Leaderboard</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time ranked standings computed from jury rubric evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
            Demonstration Rankings
          </span>
        </div>
      </div>

      {/* Track Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 overflow-x-auto">
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTrack(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedTrack === t
                ? 'bg-amber-500 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 font-mono text-neutral-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Squad & Project Name</th>
                <th className="py-3 px-4">Category Track</th>
                <th className="py-3 px-4 text-right">Score (/100)</th>
                <th className="py-3 px-4 text-center">Trend</th>
                <th className="py-3 px-4 text-right">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {filtered.map((entry) => {
                const rankDelta = entry.previousRank - entry.rank;

                return (
                  <tr
                    key={entry.teamOrStudentName}
                    className={`transition-colors ${
                      entry.rank === 1
                        ? 'bg-amber-500/5 hover:bg-amber-500/10'
                        : entry.rank <= 3
                        ? 'hover:bg-neutral-800/40'
                        : 'hover:bg-neutral-800/20'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      {entry.rank === 1 ? (
                        <span className="text-amber-400 flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span>1</span>
                        </span>
                      ) : entry.rank === 2 ? (
                        <span className="text-neutral-300">2</span>
                      ) : entry.rank === 3 ? (
                        <span className="text-amber-600">3</span>
                      ) : (
                        <span className="text-neutral-500">{entry.rank}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-semibold text-white text-xs">{entry.teamOrStudentName}</div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-md">{entry.projectName}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-400 font-mono text-[11px] truncate max-w-[200px]">
                      {entry.track}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm tabular-nums">
                      {entry.totalScore.toFixed(1)}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-xs">
                      {rankDelta > 0 ? (
                        <span className="text-emerald-400 inline-flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" /> +{rankDelta}
                        </span>
                      ) : rankDelta < 0 ? (
                        <span className="text-rose-400 inline-flex items-center gap-0.5">
                          <TrendingDown className="w-3.5 h-3.5" /> {rankDelta}
                        </span>
                      ) : (
                        <span className="text-neutral-500 inline-flex items-center gap-0.5">
                          <Minus className="w-3 h-3" /> 0
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          entry.status === 'Winner'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : entry.status === 'Runner-up'
                            ? 'bg-neutral-800 text-neutral-200'
                            : 'bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
        <span>Rankings update dynamically when organizers submit jury reviews.</span>
        <Link to="/organizer/results" className="text-amber-400 hover:underline font-mono text-[11px]">
          Organizer Scoring Portal →
        </Link>
      </div>
    </div>
  );
};
