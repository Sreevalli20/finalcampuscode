import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ForgotPasswordPage: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSent(true);
    addToast('Reset Token Issued', 'Demo password reset instructions generated.', 'info');
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Reset Password</h1>
        <p className="text-xs text-neutral-400">
          Enter your university email address to receive a demo reset link.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">Reset Link Dispatched</h3>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              In this client demonstration environment, use code <span className="font-mono text-amber-400">CC-DEMO-99</span> to unlock your session, or return to login.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kavya.sharma@campuscode.edu"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer"
            >
              Send Reset Instructions
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
