import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30">
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-neutral-800/80 flex items-center justify-center text-neutral-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-neutral-100">{title}</h3>
      <p className="mt-1 text-xs text-neutral-400 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
