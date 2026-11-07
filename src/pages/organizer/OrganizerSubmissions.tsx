import React, { useState } from 'react';
import { FileCheck, Github, Globe, FileText, CheckCircle2, Star, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProjectSubmission } from '../../types';

export const OrganizerSubmissions: React.FC = () => {
  const { submissions, evaluateSubmission, addToast } = useApp();
  const subList = Object.values(submissions);

  const [selectedSubId, setSelectedSubId] = useState<string>(subList[0]?.id || '');

  const activeSub = subList.find((s) => s.id === selectedSubId) || subList[0];

  // Grading states
  const [clarity, setClarity] = useState<number>(activeSub?.scores?.clarity || 19);
  const [innovation, setInnovation] = useState<number>(activeSub?.scores?.innovation || 19);
  const [feasibility, setFeasibility] = useState<number>(activeSub?.scores?.feasibility || 19);
  const [technicalExecution, setTechnicalExecution] = useState<number>(activeSub?.scores?.technicalExecution || 20);
  const [presentation, setPresentation] = useState<number>(activeSub?.scores?.presentation || 19);
  const [juryFeedback, setJuryFeedback] = useState<string>(
    activeSub?.scores?.juryFeedback ||
      "Distinguished engineering achievement for Round 2. Remarkable zero-server architecture with authentic client-side PDF synthesis and instant state synchronicity. User experience is crisp and highly responsive."
  );

  const totalScore = clarity + innovation + feasibility + technicalExecution + presentation;

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSub) return;

    evaluateSubmission(activeSub.id, {
      clarity: Number(clarity),
      innovation: Number(innovation),
      feasibility: Number(feasibility),
      technicalExecution: Number(technicalExecution),
      presentation: Number(presentation),
      total: totalScore,
      juryFeedback,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Submission Evaluation & Jury Rubric</h1>
        <p className="text-xs text-neutral-400">
          Grade incoming student deliverables using the official 5-axis ReBuild '26 rubric. Scores immediately update student result views.
        </p>
      </div>

      {subList.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-neutral-800 bg-neutral-900/30 text-xs text-neutral-400">
          No student submissions have been recorded in the current demonstration environment yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Submissions selector list (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Deliverables Queue ({subList.length})
            </span>

            <div className="space-y-2">
              {subList.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubId(sub.id);
                    if (sub.scores) {
                      setClarity(sub.scores.clarity);
                      setInnovation(sub.scores.innovation);
                      setFeasibility(sub.scores.feasibility);
                      setTechnicalExecution(sub.scores.technicalExecution);
                      setPresentation(sub.scores.presentation);
                      setJuryFeedback(sub.scores.juryFeedback || '');
                    }
                  }}
                  className={`w-full p-4 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    activeSub?.id === sub.id
                      ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-sm'
                      : 'bg-neutral-900/40 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold truncate text-white">{sub.projectName}</span>
                    <span className="text-[10px] font-mono text-amber-400">{sub.status}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate mt-1">{sub.tagline}</p>
                  <div className="pt-2 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                    <span>{sub.track}</span>
                    {sub.scores && <span className="text-emerald-400 font-bold">{sub.scores.total}/100</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Evaluation Workspace (8 cols) */}
          {activeSub && (
            <div className="lg:col-span-8 space-y-6">
              {/* Submission Details Card */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase block font-semibold">
                      Candidate Submission
                    </span>
                    <h2 className="text-lg font-bold text-white mt-0.5">{activeSub.projectName}</h2>
                    <p className="text-xs text-neutral-400">{activeSub.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeSub.githubUrl && (
                      <a
                        href={activeSub.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 hover:text-white inline-flex items-center gap-1.5"
                      >
                        <Github className="w-3.5 h-3.5 text-amber-400" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {activeSub.liveDemoUrl && (
                      <a
                        href={activeSub.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 hover:text-white inline-flex items-center gap-1.5"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 leading-relaxed space-y-2">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase block font-semibold">Project Abstract</span>
                  <p>{activeSub.description}</p>
                  {activeSub.organizerNotes && (
                    <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-amber-300/80">
                      <strong>Notes from Squad:</strong> {activeSub.organizerNotes}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeSub.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rubric Grading Form */}
              <form onSubmit={handleSaveEvaluation} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Official Jury Rubric Scoring</h3>
                    <p className="text-xs text-neutral-400">Assign points across the 5 evaluation criteria (max 20 pts each).</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">Composite Score</span>
                    <span className="text-2xl font-extrabold text-amber-400 font-mono tabular-nums">{totalScore}</span>
                    <span className="text-xs text-neutral-500 font-mono"> / 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-medium text-neutral-300">Problem Clarity (20%)</label>
                      <span className="font-mono text-amber-400 font-bold">{clarity} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      value={clarity}
                      onChange={(e) => setClarity(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-medium text-neutral-300">Technical Novelty (20%)</label>
                      <span className="font-mono text-amber-400 font-bold">{innovation} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      value={innovation}
                      onChange={(e) => setInnovation(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-medium text-neutral-300">Execution Feasibility (20%)</label>
                      <span className="font-mono text-amber-400 font-bold">{feasibility} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      value={feasibility}
                      onChange={(e) => setFeasibility(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="font-medium text-neutral-300">Code Architecture & Quality (20%)</label>
                      <span className="font-mono text-amber-400 font-bold">{technicalExecution} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      value={technicalExecution}
                      onChange={(e) => setTechnicalExecution(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between mb-1">
                      <label className="font-medium text-neutral-300">Live Pitch & UI Usability (20%)</label>
                      <span className="font-mono text-amber-400 font-bold">{presentation} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={20}
                      value={presentation}
                      onChange={(e) => setPresentation(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Official Jury Evaluation Feedback
                  </label>
                  <textarea
                    rows={3}
                    value={juryFeedback}
                    onChange={(e) => setJuryFeedback(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Finalize Evaluation</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
