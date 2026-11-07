import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events, registeredEventIds, registerForEvent, addToast } = useApp();

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Event Not Found</h2>
        <p className="text-sm text-neutral-400">The hackathon you requested does not exist or has ended.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Hackathons</span>
        </Link>
      </div>
    );
  }

  const isRegistered = registeredEventIds.includes(event.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Direct URL copied to clipboard.', 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs />

      {/* Header Banner */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden relative">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950">
          <img
            src={event.bannerImage}
            alt={event.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-amber-400 border border-neutral-800">
              {event.category}
            </span>
            <span className="bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-neutral-300 border border-neutral-800 capitalize">
              {event.status.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 -mt-16 relative space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-base text-neutral-300 max-w-3xl leading-relaxed">
              {event.tagline}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs">
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase">Total Prize Pool</span>
              <span className="text-amber-400 font-bold text-sm">{event.prizePool}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase">Participation</span>
              <span className="text-neutral-200 capitalize font-medium">{event.participationType} ({event.minTeamSize}-{event.maxTeamSize} builders)</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase">Registered</span>
              <span className="text-neutral-200 font-medium">{event.registeredCount} Students</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase">Deadline</span>
              <span className="text-neutral-200 font-medium">{new Date(event.registrationDeadline).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {isRegistered ? (
              <Link
                to={`/workspace/event/${event.id}`}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Enter Event Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={() => {
                  registerForEvent(event.id);
                  navigate(`/workspace/event/${event.id}`);
                }}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
              >
                Register for Hackathon
              </button>
            )}

            <Link
              to="/workspace/hackmate"
              className="px-4 py-2.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/60 transition-colors inline-flex items-center gap-2"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Find Teammates via HackMate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Overview + Prizes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Full Event Overview</h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {event.fullOverview}
            </p>
          </section>

          {/* Tracks */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white">Competition Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.tracks.map((track, i) => (
                <div key={track} className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400">Track 0{i + 1}</span>
                  <h3 className="text-xs font-semibold text-neutral-100">{track}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Structured Rounds */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white">Milestone Evaluation Rounds</h2>
            <div className="space-y-4">
              {event.rounds.map((round) => (
                <div key={round.id} className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Round 0{round.roundNumber}: {round.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-amber-400 uppercase">
                      {round.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{round.description}</p>
                  <div>
                    <span className="text-[11px] text-neutral-500 font-medium block mb-1">Deliverables Required:</span>
                    <ul className="space-y-1">
                      {round.requirements.map((req) => (
                        <li key={req} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white">Event Schedule</h2>
            <div className="space-y-3">
              {event.schedule.map((item) => (
                <div key={item.title} className="p-4 rounded-lg bg-neutral-900/30 border border-neutral-800 flex items-start gap-4">
                  <div className="text-right shrink-0 w-28">
                    <span className="text-xs font-mono text-amber-400 block">{item.date}</span>
                    <span className="text-[11px] font-mono text-neutral-500 block">{item.time}</span>
                  </div>
                  <div className="border-l border-neutral-800 pl-4 space-y-1">
                    <h4 className="text-xs font-semibold text-neutral-200">{item.title}</h4>
                    <p className="text-xs text-neutral-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Prizes, Rules, and FAQ */}
        <div className="lg:col-span-4 space-y-6">
          {/* Prize breakdown */}
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Prize Breakdown</span>
            </div>
            <div className="space-y-3">
              {event.prizeDetails.map((p) => (
                <div key={p.place} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{p.place}</span>
                    <span className="text-amber-400 font-mono font-bold">{p.amount}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">{p.perks}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility checklist */}
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Eligibility Checklist</h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              {event.eligibility.map((el) => (
                <li key={el} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Event FAQ */}
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {event.faqs.map((faq) => (
                <div key={faq.question} className="space-y-1 text-xs">
                  <p className="font-semibold text-neutral-200">{faq.question}</p>
                  <p className="text-neutral-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
