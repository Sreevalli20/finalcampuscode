import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

interface FaqItem {
  q: string;
  a: string;
  category: 'General' | 'Eligibility' | 'HackMate & Teams' | 'Judging & Submissions';
}

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const faqs: FaqItem[] = [
    {
      q: 'What is CampusCode and who is it built for?',
      a: 'CampusCode is an autonomous student innovation ecosystem crafted specifically for university engineering students, hackathon organizers, and developer recruiters. It provides end-to-end tooling for discovering hackathons, forming teams, evaluating project ideas, and tracking structured competition rounds.',
      category: 'General',
    },
    {
      q: 'Can students from different colleges form a team for ReBuild 26?',
      a: 'Absolutely! Cross-college and cross-disciplinary collaborations are enthusiastically supported. You can assemble squads consisting of up to 4 members using our HackMate tool.',
      category: 'HackMate & Teams',
    },
    {
      q: 'How does HackMate calculate compatibility scores?',
      a: 'HackMate runs a deterministic weighted algorithm comparing complementary skill profiles (e.g. matching frontend designers with backend architects and firmware engineers), shared domain interests, and previous project experience without sending your personal data to any external server.',
      category: 'HackMate & Teams',
    },
    {
      q: 'What are the required deliverables for Round 2 submissions?',
      a: 'For Round 2, participating squads must supply an accessible public GitHub repository URL, an active live deployment link, and comprehensive architecture notes explaining key system decisions.',
      category: 'Judging & Submissions',
    },
    {
      q: 'Who retains the intellectual property rights to the projects built?',
      a: '100% of all intellectual property, source code, design assets, and commercial potential remains strictly and exclusively with the student inventors. CampusCode enforces zero claim on your intellectual property.',
      category: 'General',
    },
    {
      q: 'Are certificates verifiable?',
      a: 'Yes. Every generated certificate contains a unique cryptographic verification hash and demonstration identifier. You can preview, print, or download signed PDF certificates directly in your browser.',
      category: 'Judging & Submissions',
    },
    {
      q: 'Do I need prior hackathon experience to participate?',
      a: 'No prior experience is necessary! CampusCode includes a comprehensive Student Guide and skill assessment modules to help first-time participants get up to speed.',
      category: 'Eligibility',
    },
  ];

  const categories = ['All', 'General', 'Eligibility', 'HackMate & Teams', 'Judging & Submissions'];

  const filteredFaqs = selectedCat === 'All'
    ? faqs
    : faqs.filter((f) => f.category === selectedCat);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Breadcrumbs />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="text-amber-400 font-semibold">Knowledge Base</span>
          <span>·</span>
          <span>Rules & Guidelines</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-neutral-300">
          Find authoritative answers to common questions about competition rules, team formation, and judging criteria.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === cat
                ? 'bg-amber-500 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIdx === index;
          return (
            <div
              key={faq.q}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/60 transition-colors"
              >
                <span className="text-sm font-semibold text-neutral-100">{faq.q}</span>
                <span className="text-neutral-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
