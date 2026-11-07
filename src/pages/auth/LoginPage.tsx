import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo } = useApp();
  const [email, setEmail] = useState('kavya.sharma@campuscode.edu');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    loginAsDemo('student');
    navigate('/workspace');
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Sign In to CampusCode</h1>
        <p className="text-xs text-neutral-400">
          Enter your student account or use the instant demonstration profiles below.
        </p>
      </div>

      {/* Quick Demo Login Buttons */}
      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
          One-Click Demo Profiles
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              loginAsDemo('student');
              navigate('/workspace');
            }}
            className="p-2.5 rounded-lg bg-neutral-950 border border-amber-500/30 hover:border-amber-500/60 text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs mb-0.5">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student Demo</span>
            </div>
            <p className="text-[10px] text-neutral-400 truncate">Kavya (NIT Trichy)</p>
          </button>

          <button
            type="button"
            onClick={() => {
              loginAsDemo('organizer');
              navigate('/organizer');
            }}
            className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-neutral-200 group-hover:text-amber-400 font-semibold text-xs mb-0.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Organizer Demo</span>
            </div>
            <p className="text-[10px] text-neutral-400 truncate">Dr. Vikram (Lead Judge)</p>
          </button>
        </div>
      </div>

      {/* Standard Form */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-neutral-300">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-amber-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-3.5 pr-9 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer"
          >
            Sign In to Workspace
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-neutral-400">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="text-amber-400 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
