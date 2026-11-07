import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'editorial' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const baseClasses =
    'rounded-xl text-neutral-100 transition-all duration-200 relative overflow-hidden';

  const variantClasses = {
    default:
      'bg-neutral-900/40 border border-neutral-800/80 shadow-sm',
    interactive:
      'bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 hover:bg-neutral-900/70 hover:shadow-md cursor-pointer',
    editorial:
      'bg-gradient-to-br from-neutral-900/80 to-neutral-950 border border-neutral-800 shadow-xl',
    elevated:
      'bg-neutral-900/80 border border-neutral-800/90 shadow-2xl backdrop-blur-md',
    glass:
      'bg-neutral-950/60 border border-neutral-800/60 backdrop-blur-lg',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3
      className={`text-base font-bold text-white tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p
      className={`text-xs text-neutral-400 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`mt-4 pt-3.5 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
