import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'electric' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer whitespace-nowrap shrink-0';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-sm sm:text-base px-6 py-2.5 rounded-lg gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 font-semibold shadow-sm hover:shadow',
    electric: 'bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 font-bold hover:brightness-110 shadow-sm active:scale-[0.98]',
    secondary: 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-700/60',
    outline: 'bg-transparent text-neutral-200 hover:text-white hover:bg-neutral-800/60 border border-neutral-700/80',
    ghost: 'bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/50',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 font-medium',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
