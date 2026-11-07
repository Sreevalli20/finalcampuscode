import React, { useState } from 'react';
import { Award, RotateCcw, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillQuizResult } from '../../types';

export const SkillAssessmentPage: React.FC = () => {
  const { addToast } = useApp();

  const quizzes = [
    {
      id: 'quiz_frontend',
      title: 'Modern Frontend Architecture & State Machines',
      category: 'Frontend Engineering',
      questions: [
        {
          id: 'q1',
          question: 'What is the primary advantage of storing serialized JSON snapshots in localStorage for hackathon apps?',
          options: [
            'It provides encrypted remote backups to cloud vendors',
            'It guarantees instant state retrieval and offline resilience in low-bandwidth venues',
            'It runs faster than React component state variables in RAM',
            'It bypasses browser memory allocations entirely',
          ],
          correctIndex: 1,
          explanation: 'localStorage survives page reloads, tab closes, and network outages, making it ideal for self-contained hackathon evaluation.',
        },
        {
          id: 'q2',
          question: 'Which CSS strategy avoids split-brain contrast failures in Tailwind CSS v4 dual themes?',
          options: [
            'Using !important on all color properties in index.css',
            'Declaring @custom-variant dark (&:where(.dark, .dark *)); and complete dark:* utility pairs',
            'Applying inverted CSS filter: invert(1) on the body element',
            'Using inline styles with hardcoded hex codes',
          ],
          correctIndex: 1,
          explanation: 'Tailwind CSS v4 defaults dark utilities to system media query unless custom-variant dark is configured.',
        },
        {
          id: 'q3',
          question: 'In client-side PDF generation via jsPDF, what is critical for crisp typography and layout integrity?',
          options: [
            'Taking a low-res raster screenshot of the DOM and stretching it',
            'Setting precise vector coordinates in millimeters and using standard scalable font metrics',
            'Using remote server headless Chrome print APIs',
            'Generating HTML string files instead of binary PDFs',
          ],
          correctIndex: 1,
          explanation: 'Native vector coordinates (mm) and text API calls produce crisp, compact, client-side vector PDFs without external dependencies.',
        },
      ],
    },
    {
      id: 'quiz_hackathon',
      title: 'Hackathon Strategy & Jury Pitch Defense',
      category: 'Hackathon Mastery',
      questions: [
        {
          id: 'q4',
          question: 'What is the recommended focal point in a 3-minute hackathon jury presentation?',
          options: [
            'Reading through 10 theoretical market size and TAM slides',
            'Demonstrating the working prototype live within the first 60 seconds',
            'Explaining your team members previous academic credentials',
            'Apologizing for incomplete features and discussing what you could build next year',
          ],
          correctIndex: 1,
          explanation: 'Jury panels evaluate dozens of teams; showing a working prototype immediately builds undeniable credibility.',
        },
        {
          id: 'q5',
          question: 'How should teams handle missing API endpoints during a live hackathon demonstration?',
          options: [
            'Show empty error screens and blame network connectivity',
            'Implement local deterministic state machines that handle simulated workflows gracefully',
            'Skip the feature entirely and never mention it',
            'Hardcode random prompt alerts',
          ],
          correctIndex: 1,
          explanation: 'Graceful local state machines allow judges to experience complete workflows without crashing on dead clicks.',
        },
      ],
    },
  ];

  const [activeQuizId, setActiveQuizId] = useState<string>('quiz_frontend');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<SkillQuizResult[]>([]);

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];
  const activeQuestion = activeQuiz.questions[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: optIdx });
  };

  const handleNext = () => {
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate score
      let score = 0;
      activeQuiz.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          score += 1;
        }
      });
      const pct = Math.round((score / activeQuiz.questions.length) * 100);
      const res: SkillQuizResult = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        category: activeQuiz.category,
        score,
        totalQuestions: activeQuiz.questions.length,
        percentage: pct,
        completedAt: new Date().toLocaleDateString(),
        badgeEarned: pct >= 80 ? `${activeQuiz.category} Specialist` : undefined,
      };

      setHistory([res, ...history]);
      setIsFinished(true);
      addToast('Assessment Complete', `Score: ${score}/${activeQuiz.questions.length} (${pct}%)`, 'success');
    }
  };

  const handleRestart = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-bold">INNOVATION TOOL</span>
          <span>·</span>
          <span>TECHNICAL READINESS ASSESSMENT</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Skill Assessment Quizzes & Badges
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
          Test your engineering mastery in modern frontend architectures, client state management, and hackathon presentation strategy. Earn verified skill badges for your student profile.
        </p>
      </div>

      {/* Quiz Selector */}
      <div className="flex items-center gap-2">
        {quizzes.map((q) => (
          <button
            key={q.id}
            onClick={() => handleRestart(q.id)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeQuizId === q.id
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            {q.category}
          </button>
        ))}
      </div>

      {!isFinished ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-800">
            <span className="font-mono text-amber-400 uppercase font-semibold">
              Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
            </span>
            <span className="text-neutral-500 font-mono">{activeQuiz.title}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {activeQuestion.question}
          </h3>

          <div className="space-y-3">
            {activeQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === idx;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-medium'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
            <span className="text-[11px] text-neutral-500">Select the most accurate response</span>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIdx] === undefined}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              {currentQuestionIdx < activeQuiz.questions.length - 1 ? 'Next Question' : 'Complete Assessment'}
            </button>
          </div>
        </div>
      ) : (
        /* Finished Results Card */
        <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Award className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Assessment Complete</h3>
            <p className="text-xs text-neutral-400">{activeQuiz.title}</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-xs mx-auto text-xs font-mono">
            <span className="text-neutral-500 block uppercase text-[10px]">Your Score</span>
            <span className="text-3xl font-extrabold text-amber-400">
              {history[0]?.score} / {history[0]?.totalQuestions}
            </span>
            <span className="text-neutral-400 block mt-1">({history[0]?.percentage}%)</span>
          </div>

          {history[0]?.badgeEarned && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400 inline-flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Skill Badge Unlocked: <strong>{history[0].badgeEarned}</strong></span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => handleRestart(activeQuizId)}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
