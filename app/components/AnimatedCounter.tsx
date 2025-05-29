"use client";

import { useCounterAnimation } from '../../utils/useCounterAnimation';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  startOnView?: boolean;
  threshold?: number;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  startOnView = true,
  threshold = 0.1
}: AnimatedCounterProps) {
  const { count, displayValue, elementRef } = useCounterAnimation({
    end,
    duration,
    prefix,
    suffix,
    startOnView,
    threshold
  });

  return (
    <span 
      ref={elementRef as React.RefObject<HTMLSpanElement>}
      className={`${className} ${count > 0 ? 'animate-count-up' : ''} transition-all duration-300`}
      style={{
        textShadow: count > 0 ? '0 0 10px currentColor' : 'none'
      }}
    >
      {displayValue}
    </span>
  );
} 