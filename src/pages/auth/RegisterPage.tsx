import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser, addToast } = useApp();

  const [step, setStep] = useState<1 | 2>(1);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Academic & Skills states
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('B.Tech Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>(['Hackathons', 'Distributed Systems']);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddInterest = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!college.trim()) errs.college = 'College/University name is required';
    if (skills.length === 0) errs.skills = 'Please add at least 1 skill';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const newProfile: UserProfile = {
      id: 'usr_' + Date.now(),
      name,
      email,
      college,
      course,
      yearOfStudy,
      skills,
      interests,
      headline: `Builder & Engineer @ ${college}`,
      bio: 'Enthusiastic student builder developing original software and participating in collegiate innovation hackathons.',
      role: 'student',
      createdAt: new Date().toISOString(),
      studentIdNumber: `CC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatarUrl: '/src/assets/images/student_innovator_portrait_1794026124336.jpg',
    };

    setCurrentUser(newProfile);
    addToast('Account Registered', `Welcome to CampusCode, ${name}!`, 'success');
    navigate('/workspace');
  };

  return (
    <div className="max-w-lg mx-auto w-full space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Create Student Account</h1>
        <p className="text-xs text-neutral-400">
          Join 1,400+ builders, form teams, and access ReBuild '26 hackathon rounds.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-3">
        <div className={`flex items-center gap-2 text-xs font-semibold ${step === 1 ? 'text-amber-400' : 'text-neutral-500'}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${step === 1 ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
            1
          </span>
          <span>Credentials</span>
        </div>
        <span className="w-8 h-px bg-neutral-800" />
        <div className={`flex items-center gap-2 text-xs font-semibold ${step === 2 ? 'text-amber-400' : 'text-neutral-500'}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${step === 2 ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
            2
          </span>
          <span>Academics & Skills</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateStep1()) setStep(2);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Full Legal Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kavya Sharma"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
              {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                University Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kavya@university.edu"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Password <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-3.5 pr-9 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Confirm Password <span className="text-amber-400">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer"
            >
              Next: Academic & Skills
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                College or University <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. NIT Trichy, IIT Delhi, BITS Pilani"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
              {errors.college && <p className="text-[11px] text-rose-400 mt-1">{errors.college}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Degree / Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. B.Tech CSE"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 focus:outline-none focus:border-neutral-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Year of Study</label>
                <select
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-neutral-700"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            {/* Skills tag input */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Technical Skills <span className="text-amber-400">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 text-neutral-200 text-xs border border-neutral-700"
                  >
                    <span>{s}</span>
                    <button type="button" onClick={() => removeSkill(s)} className="text-neutral-400 hover:text-rose-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {errors.skills && <p className="text-[11px] text-rose-400 mt-1">{errors.skills}</p>}
            </div>

            {/* Interests tag input */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Domains of Interest</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={handleAddInterest}
                  placeholder="e.g. Distributed Systems, Edge AI"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((it) => (
                  <span
                    key={it}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800/60 text-neutral-300 text-xs border border-neutral-700/60"
                  >
                    <span>{it}</span>
                    <button type="button" onClick={() => removeInterest(it)} className="text-neutral-400 hover:text-rose-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer"
              >
                Complete Registration
              </button>
            </div>
          </form>
        )}

        <div className="text-center pt-4 text-xs text-neutral-400 border-t border-neutral-800/60 mt-4">
          <span>Already registered? </span>
          <Link to="/login" className="text-amber-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
