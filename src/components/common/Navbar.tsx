import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Command } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setCommandPaletteOpen } = useApp();

  const navLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Events', href: '/events' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="w-2 h-2 bg-amber-500 rounded-sm inline-block group-hover:scale-125 transition-transform" />
          <span>CampusCode</span>
        </Link>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
                isActive(link.href) ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick search trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-400 bg-neutral-900 hover:text-neutral-200 border border-neutral-800 rounded-md transition-colors"
            title="Global Quick Action (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="font-mono text-[10px] bg-neutral-800 px-1 py-0.5 rounded text-neutral-300">⌘K</kbd>
          </button>

          <Link
            to="/workspace"
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Enter Workspace
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive(link.href) ? 'bg-neutral-900 text-amber-400' : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <Link
              to="/organizer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-neutral-400 hover:text-neutral-200"
            >
              Organizer Portal Demo
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
