import { useState, useRef, useCallback, useEffect } from 'react';

interface UseInViewOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

/**
 * Custom hook to replace react-intersection-observer due to compatibility issues with React 19.
 * It uses the native Intersection Observer API to detect when an element is in the viewport.
 */
export const useInView = ({ threshold = 0.1, triggerOnce = true }: UseInViewOptions = {}) => {
    const [inView, setInView] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const ref = useCallback((node: HTMLElement | null) => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (triggerOnce && observer.current) {
                    observer.current.disconnect();
                }
            } else {
                if (!triggerOnce) {
                    setInView(false);
                }
            }
        }, { threshold });

        if (node) {
            observer.current.observe(node);
        }
    }, [threshold, triggerOnce]);

    useEffect(() => {
      // Cleanup observer on component unmount
      return () => observer.current?.disconnect();
    }, []);

    return { ref, inView };
};
