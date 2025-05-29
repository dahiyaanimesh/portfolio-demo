import { useEffect, useState, useRef } from 'react';

interface UseCounterAnimationProps {
  end: number;
  duration?: number;
  startOnView?: boolean;
  threshold?: number;
  prefix?: string;
  suffix?: string;
}

export const useCounterAnimation = ({
  end,
  duration = 2000,
  startOnView = true,
  threshold = 0.1,
  prefix = '',
  suffix = ''
}: UseCounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!startOnView) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          startAnimation();
          setHasStarted(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [startOnView, hasStarted, threshold]);

  const startAnimation = () => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const displayValue = `${prefix}${count}${suffix}`;

  return { count, displayValue, elementRef };
}; 