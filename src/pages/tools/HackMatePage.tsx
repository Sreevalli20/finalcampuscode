import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  UserPlus,
  Sparkles,
  Github,
  Linkedin,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_HACKMATE_PROFILES } from '../../services/seedData';
import { UserProfile } from '../../types';

export const HackMatePage: React.FC = () => {
  const { currentUser, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  // Collect all unique skills
  const allSkills = [
    'All',
    'C++',
    'Rust',
    'Go',
    'PostgreSQL',
    'Figma',
    'UI/UX Design',
    'D3.js',
    'Python',
    'Embedded Systems',
  ];

  // Calculate dynamic compatibility score and explanation
  const getMatchAnalysis = (profile: UserProfile) => {
    let score = 70; // baseline
    const complementaryPairs: [string, string][] = [
      ['React', 'Go'],
      ['TypeScript', 'Rust'],
      ['Tailwind CSS', 'Figma'],
      ['Distributed Systems', 'PostgreSQL'],
      ['React', 'Embedded Systems'],
      ['TypeScript', 'Python'],
    ];

    let matches: string[] = [];

    // Check complementary pairs between current user and profile
    currentUser.skills.forEach((userSkill) => {
      profile.skills.forEach((profileSkill) => {
        complementaryPairs.forEach(([a, b]) => {
          if ((userSkill === a && profileSkill === b) || (userSkill === b && profileSkill === a)) {
            score += 6;
            matches.push(`${userSkill} ↔ ${profileSkill}`);
          }
        });
      });
    });

    // Check shared interests
    const sharedInterests = currentUser.interests.filter((it) => profile.interests.includes(it));
    if (sharedInterests.length > 0) {
      score += 8 * sharedInterests.length;
    }

    const finalScore = Math.min(98, Math.max(72, score));

    return {
      score: finalScore,
      explanation:
        matches.length > 0
          ? `High complementary synergy in ${matches.slice(0, 2).join(' and ')}.`
          : `Diverse technical background with shared interest in ${profile.interests[0] || 'software'}.`,
    };
  };

  const filteredProfiles = SEED_HACKMATE_PROFILES.filter((p) => {
    const matchSkill = selectedSkill === 'All' || p.skills.includes(selectedSkill);
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.headline.toLowerCase().includes(search.toLowerCase()) ||
      p.college.toLowerCase().includes(search.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchSkill && matchSearch;
  });

  const handleSendInvite = (profile: UserProfile) => {
    setSentRequests([...sentRequests, profile.id]);
    addToast('Collaboration Invite Sent', `Invitation sent to ${profile.name}. Saved in local state.`, 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">INNOVATION TOOL</span>
          <span>·</span>
          <span>AUTONOMOUS TEAMMATE MATCHER</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          HackMate — Teammate Discovery & Synergy Engine
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
          Find collegiate partners with complementary skills for ReBuild '26 and national hackathons. Matches are calculated client-side using deterministic skill pairing matrices.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search candidates by name, college, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800 overflow-x-auto">
          {allSkills.map((sk) => (
            <button
              key={sk}
              onClick={() => setSelectedSkill(sk)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedSkill === sk
                  ? 'bg-amber-500 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {sk}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfiles.map((candidate) => {
          const match = getMatchAnalysis(candidate);
          const hasInvited = sentRequests.includes(candidate.id);

          return (
            <div
              key={candidate.id}
              className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Header with Candidate Info & Compatibility Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidate.avatarUrl || '/src/assets/images/student_innovator_portrait_1794026124336.jpg'}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 shadow-sm"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{candidate.name}</h3>
                      <p className="text-[11px] text-amber-400 font-medium">{candidate.headline}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">
                        {candidate.college} · {candidate.yearOfStudy}
                      </p>
                    </div>
                  </div>

                  {/* Compatibility Badge */}
                  <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-right shrink-0">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Synergy</span>
                    <span className="text-base font-extrabold text-amber-400 font-mono tabular-nums">
                      {match.score}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{candidate.bio}</p>

                {/* Algorithmic Match Explanation */}
                <div className="p-3 rounded-lg bg-neutral-950 border border-amber-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why You Match</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">{match.explanation}</p>
                </div>

                {/* Skills & Interests */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-neutral-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <span>Focus:</span>
                    <span className="text-neutral-400 truncate">{candidate.interests.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {candidate.githubUrl && (
                    <a
                      href={candidate.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-500 hover:text-white p-1"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {candidate.linkedinUrl && (
                    <a
                      href={candidate.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-500 hover:text-white p-1"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {hasInvited ? (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Invite Sent</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleSendInvite(candidate)}
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Request Collaboration</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
