import React, { useEffect, useState } from 'react';

export const IMAGE_FALLBACK_SRC = '/images/asset-fallback.svg';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Alternate source tried once if the primary src fails to load. */
  fallbackSrc?: string;
}

/**
 * Drop-in <img> replacement with graceful degradation.
 * - Preserves aspect ratio / object-fit via the caller's className.
 * - Requires meaningful alt text (defaults to empty = decorative).
 * - Lazy-loads by default; pass loading="eager" for above-the-fold art.
 * - On error, retries once with fallbackSrc (a local branded placeholder),
 *   then renders a styled neutral panel so layout never collapses.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = '',
  fallbackSrc = IMAGE_FALLBACK_SRC,
  className,
  loading = 'lazy',
  onError,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasFailed(false);
  }, [src]);

  if (!currentSrc || hasFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-950 ${className ?? ''}`}
        role="img"
        aria-label={alt || 'Image unavailable'}
        data-smart-image-fallback="true"
      />
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setHasFailed(true);
        }
        onError?.(e);
      }}
      {...rest}
    />
  );
};
