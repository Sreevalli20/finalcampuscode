import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HackathonEvent } from '../../types';

export const OrganizerEventCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createEvent } = useApp();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<HackathonEvent['category']>('Open Innovation');
  const [description, setDescription] = useState('');
  const [prizePool, setPrizePool] = useState('$20,000 in Grants');
  const participationType: HackathonEvent['participationType'] = 'both';
  const minTeamSize = 1;
  const maxTeamSize = 4;
  const [startDate, setStartDate] = useState('2026-12-01');
  const [endDate, setEndDate] = useState('2026-12-03');
  const [deadline, setDeadline] = useState('2026-11-28');

  const [tracks, setTracks] = useState<string[]>(['Smart Infrastructure', 'Distributed Data']);
  const [trackInput, setTrackInput] = useState('');

  const handleAddTrack = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (trackInput.trim() && !tracks.includes(trackInput.trim())) {
      setTracks([...tracks, trackInput.trim()]);
      setTrackInput('');
    }
  };

  const handleRemoveTrack = (t: string) => {
    setTracks(tracks.filter((item) => item !== t));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newEvent: HackathonEvent = {
      id: `ev_${Date.now()}`,
      title,
      tagline: tagline || title,
      slug,
      category,
      description,
      fullOverview: description,
      bannerImage: '/src/assets/images/campuscode_hero_banner_1794026123043.jpg',
      registrationDeadline: `${deadline}T23:59:59Z`,
      startDate: `${startDate}T09:00:00Z`,
      endDate: `${endDate}T18:00:00Z`,
      participationType,
      minTeamSize: Number(minTeamSize),
      maxTeamSize: Number(maxTeamSize),
      prizePool,
      prizeDetails: [
        { place: '1st Place Winner', amount: prizePool, perks: 'Direct Venture Fast-Track' },
      ],
      status: 'registration_open',
      registeredCount: 1,
      eligibility: ['Undergraduate & Postgraduate collegiate students worldwide'],
      tracks: tracks.length > 0 ? tracks : ['General Track'],
      schedule: [
        { date: startDate, time: '09:00 AM', title: 'Opening Kickoff', description: 'Problem statements unlocked' },
      ],
      rounds: [
        {
          id: `r1_${Date.now()}`,
          roundNumber: 1,
          title: 'Final Implementation Submission',
          description: 'Working live demo and public GitHub repository submission',
          startDate: `${startDate}T09:00:00Z`,
          endDate: `${endDate}T18:00:00Z`,
          submissionDeadline: `${endDate}T16:00:00Z`,
          requirements: ['GitHub repo URL', 'Live demo deployment URL'],
          status: 'active',
        },
      ],
      rules: ['All code must be original and built during the hackathon window.'],
      faqs: [{ question: 'Who can register?', answer: 'Open to all university students.' }],
    };

    createEvent(newEvent);
    navigate('/organizer/events');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/organizer/events')}
          className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Create & Publish Hackathon</h1>
          <p className="text-xs text-neutral-400">
            Publish a new competition into active demonstration state.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Hackathon Title <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. NeoHacks: Autonomous Agents Sprint"
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Tagline / Subtitle
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Architecting client-side intelligence for student developers"
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
            >
              <option value="Open Innovation">Open Innovation</option>
              <option value="AI & Machine Learning">AI & Machine Learning</option>
              <option value="Sustainable Tech">Sustainable Tech</option>
              <option value="Web3 & Fintech">Web3 & Fintech</option>
              <option value="Mobile & Cloud">Mobile & Cloud</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Prize Pool</label>
            <input
              type="text"
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
              placeholder="e.g. $25,000 in Grants"
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Registration Cutoff</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
            />
          </div>
        </div>

        {/* Tracks Tag Input */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">Competition Tracks</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              onKeyDown={handleAddTrack}
              placeholder="Add track name (press Enter)"
              className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            />
            <button
              type="button"
              onClick={handleAddTrack}
              className="px-3 py-1.5 text-xs bg-neutral-800 text-neutral-200 rounded-lg hover:text-white"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tracks.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 text-neutral-200 text-xs border border-neutral-700"
              >
                <span>{t}</span>
                <button type="button" onClick={() => handleRemoveTrack(t)} className="text-neutral-400 hover:text-rose-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Description & Problem Scope <span className="text-amber-400">*</span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the hackathon mission and expectations..."
            className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer"
          >
            Publish Hackathon to Catalog
          </button>
        </div>
      </form>
    </div>
  );
};
