import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Hackathon Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid university or personal email is required';
    if (!formData.message.trim() || formData.message.length < 15) errs.message = 'Please provide at least 15 characters describing your question';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    addToast('Message Dispatched', 'Your query has been logged to the demonstration inbox.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Breadcrumbs />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="text-amber-400 font-semibold">Communication</span>
          <span>·</span>
          <span>Organizer & Support Desk</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Get in Touch with the CampusCode Team
        </h1>
        <p className="text-sm text-neutral-300">
          Have questions regarding ReBuild '26 judging guidelines, team eligibility, or platform partnerships? Send us a direct note.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Received</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. In demonstration mode, your query has been acknowledged and saved locally.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Hackathon Question', message: '' });
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 text-neutral-200 hover:text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kavya Sharma"
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="kavya@university.edu"
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Topic Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
                >
                  <option value="Hackathon Question">Hackathon Rules & Judging</option>
                  <option value="Team Matching">HackMate & Teammate Inquiries</option>
                  <option value="Platform Feedback">Frontend UX Feedback</option>
                  <option value="Host a Hackathon">Organizer Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Message <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Explain your inquiry in detail..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                />
                {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 space-y-4">
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Fast-Track Answers</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Need immediate answers regarding eligibility, round dates, or permitted technologies? Use our RuleBot knowledge assistant.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Office Hours</h3>
            <p className="text-xs text-neutral-400 font-mono">Mon–Fri: 09:00 – 18:00 UTC</p>
            <p className="text-xs text-neutral-500">Mentorship sprint support 24/7 during active hackathon weekends.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
