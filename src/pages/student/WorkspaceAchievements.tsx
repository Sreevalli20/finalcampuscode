import React from 'react';
import { Trophy, Star, Zap, Code2, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceAchievements: React.FC = () => {
  const { certificates, registeredEventIds, submissions } = useApp();

  const achievements = [
    {
      id: 'ach_pioneer',
      title: 'First Mover',
      description: 'Registered for your inaugural CampusCode hackathon.',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      unlocked: registeredEventIds.length > 0,
      xp: 250,
      date: 'Nov 2026',
    },
    {
      id: 'ach_shipper',
      title: 'Proven Shipper',
      description: 'Successfully recorded project deliverables with live repository & demo URLs.',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      unlocked: Object.keys(submissions).length > 0,
      xp: 500,
      date: 'Nov 2026',
    },
    {
      id: 'ach_victor',
      title: 'Podium Finisher',
      description: 'Earned 1st place grand winner honor in a competitive technical sprint.',
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      unlocked: certificates.some((c) => c.achievement.includes('Winner')),
      xp: 1000,
      date: 'Nov 2026',
    },
    {
      id: 'ach_squad',
      title: 'Squad Architect',
      description: 'Formed a cross-college collaboration team for ReBuild 26.',
      icon: <Users className="w-5 h-5 text-sky-400" />,
      unlocked: true,
      xp: 350,
      date: 'Nov 2026',
    },
    {
      id: 'ach_polymath',
      title: 'Full-Stack Polymath',
      description: 'Maintained 5+ verified technical proficiencies on student profile.',
      icon: <Star className="w-5 h-5 text-amber-400" />,
      unlocked: true,
      xp: 400,
      date: 'Nov 2026',
    },
    {
      id: 'ach_certified',
      title: 'Cryptographic Credential',
      description: 'Generated client-verifiable SHA256 certificate record.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      unlocked: certificates.length > 0,
      xp: 300,
      date: 'Nov 2026',
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXp = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Achievements & Badges</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Technical milestones, competition podiums, and engineering accomplishments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-right">
            <span className="text-[10px] text-neutral-500 uppercase block font-mono">Total XP</span>
            <span className="text-amber-400 font-bold font-mono text-sm">{totalXp} XP</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-right">
            <span className="text-[10px] text-neutral-500 uppercase block font-mono">Unlocked</span>
            <span className="text-white font-bold font-mono text-sm">{unlockedCount} / {achievements.length}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white">Innovation Level 4 · Senior Builder</span>
          <span className="font-mono text-amber-400">{Math.round((unlockedCount / achievements.length) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-5 rounded-xl border transition-colors flex items-start gap-4 ${
              ach.unlocked
                ? 'bg-neutral-900/40 border-neutral-800'
                : 'bg-neutral-950/40 border-neutral-900 opacity-50'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
              {ach.icon}
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center justify-between text-xs">
                <h3 className="font-bold text-white truncate">{ach.title}</h3>
                <span className="font-mono text-[11px] text-amber-400 font-semibold shrink-0">
                  +{ach.xp} XP
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">{ach.description}</p>
              {ach.unlocked && (
                <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Unlocked {ach.date}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
