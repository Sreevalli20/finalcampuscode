import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-neutral-200 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formatted = value
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            {isLast ? (
              <span className="text-neutral-200 font-medium truncate max-w-[200px]" aria-current="page">
                {formatted}
              </span>
            ) : (
              <Link to={to} className="hover:text-neutral-200 transition-colors truncate max-w-[150px]">
                {formatted}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
