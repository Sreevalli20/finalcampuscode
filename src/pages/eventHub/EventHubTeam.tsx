import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trash2, UserPlus, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Team, TeamMember } from '../../types';
import { SEED_HACKMATE_PROFILES } from '../../services/seedData';

const EventHubTeamInner: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, teams, saveTeam, currentUser, addToast } = useApp();

  const event = events.find((e) => e.id === eventId);
  if (!event) return null;

  const currentTeam = teams[event.id];

  // Team creation / edit states
  const [teamName, setTeamName] = useState(currentTeam?.name || 'Team Astraea');
  const [description, setDescription] = useState(currentTeam?.description || 'Building CampusCode for ReBuild 26.');
  const [track, setTrack] = useState(currentTeam?.track || event.tracks[0]);
  const [isEditing, setIsEditing] = useState(!currentTeam);

  // Available demonstration students to recruit
  const availableRecruits = SEED_HACKMATE_PROFILES.filter(
    (profile) => !currentTeam?.members.some((m) => m.userId === profile.id)
  );

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const baseMembers: TeamMember[] = currentTeam?.members || [
      {
        userId: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: 'Team Lead & Lead Architect',
        college: currentUser.college,
        skills: currentUser.skills,
        isLeader: true,
      },
    ];

    const updatedTeam: Team = {
      id: currentTeam?.id || `team_${Date.now()}`,
      eventId: event.id,
      name: teamName,
      description,
      track,
      leaderId: currentUser.id,
      members: baseMembers,
      createdAt: currentTeam?.createdAt || new Date().toISOString(),
    };

    saveTeam(event.id, updatedTeam);
    setIsEditing(false);
  };

  const handleAddMember = (recruit: (typeof SEED_HACKMATE_PROFILES)[0]) => {
    if (!currentTeam) return;
    if (currentTeam.members.length >= event.maxTeamSize) {
      addToast('Team Capacity Reached', `Maximum ${event.maxTeamSize} members permitted.`, 'warning');
      return;
    }

    const newMember: TeamMember = {
      userId: recruit.id,
      name: recruit.name,
      email: recruit.email,
      role: recruit.headline,
      college: recruit.college,
      skills: recruit.skills,
      isLeader: false,
    };

    const updatedTeam: Team = {
      ...currentTeam,
      members: [...currentTeam.members, newMember],
    };

    saveTeam(event.id, updatedTeam);
    addToast('Member Added', `${recruit.name} joined ${currentTeam.name}.`, 'success');
  };

  const handleRemoveMember = (userId: string) => {
    if (!currentTeam) return;
    if (userId === currentUser.id) {
      addToast('Cannot Remove Leader', 'You are the squad creator.', 'warning');
      return;
    }

    const updatedTeam: Team = {
      ...currentTeam,
      members: currentTeam.members.filter((m) => m.userId !== userId),
    };

    saveTeam(event.id, updatedTeam);
    addToast('Member Removed', 'Team roster updated.', 'info');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Team Management & Squad Roster</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure your participating squad for {event.title}. Allowed size: {event.minTeamSize} to {event.maxTeamSize} members.
          </p>
        </div>

        {currentTeam && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
          >
            Edit Team Details
          </button>
        )}
      </div>

      {/* Team Profile Edit / Creation */}
      {isEditing ? (
        <form onSubmit={handleSaveTeam} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h3 className="text-sm font-bold text-white">
            {currentTeam ? 'Edit Squad Details' : 'Create Squad for this Hackathon'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Squad Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Team Astraea"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Assigned Track</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
              >
                {event.tracks.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Project Thesis / Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you engineering together?"
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {currentTeam && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors cursor-pointer shadow-sm"
            >
              Save Squad Configuration
            </button>
          </div>
        </form>
      ) : (
        currentTeam && (
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                  Squad Profile
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentTeam.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{currentTeam.description}</p>
              </div>
              <div className="px-3 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                {currentTeam.members.length} / {event.maxTeamSize} Builders
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-neutral-400">
              <span>Track: </span>
              <strong className="text-amber-400">{currentTeam.track}</strong>
            </div>
          </div>
        )
      )}

      {/* Squad Roster */}
      {currentTeam && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Assembled Members ({currentTeam.members.length})
            </h3>
            <span className="text-xs text-neutral-500 font-mono">
              Limit: {event.maxTeamSize} Builders
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentTeam.members.map((member) => (
              <div
                key={member.userId}
                className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{member.name}</span>
                    {member.isLeader && (
                      <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded font-semibold">
                        Leader
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate">{member.role}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{member.college}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {!member.isLeader && (
                  <button
                    onClick={() => handleRemoveMember(member.userId)}
                    className="text-neutral-500 hover:text-rose-400 p-1"
                    title="Remove from squad"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Demonstration Teammates Directory */}
      {currentTeam && currentTeam.members.length < event.maxTeamSize && (
        <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Recruit Complementary Builders</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Invite verified student profiles from the HackMate network.
              </p>
            </div>
            <Link
              to="/workspace/hackmate"
              className="text-xs text-amber-400 hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Explore All on HackMate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableRecruits.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{rec.name}</p>
                  <p className="text-[11px] text-neutral-400 truncate">{rec.headline}</p>
                  <p className="text-[10px] text-neutral-500 truncate">{rec.college}</p>
                </div>
                <button
                  onClick={() => handleAddMember(rec)}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Invite</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Keyed wrapper: forces a fresh form state when navigating between events
export const EventHubTeam: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  return <EventHubTeamInner key={eventId} />;
};
