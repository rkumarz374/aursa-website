import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/analytics';

/**
 * Custom hook to measure scroll depth at 25%, 50%, 75%, and 90% thresholds.
 * Thresholds fire once per page view and reset cleanly on SPA route changes.
 */
export function useScrollDepth(pathname, pageType = 'general') {
    const firedDepthsRef = useRef(new Set());
    const currentPathRef = useRef(pathname);

    useEffect(() => {
        // Reset fired thresholds on pathname change
        if (currentPathRef.current !== pathname) {
            firedDepthsRef.current = new Set();
            currentPathRef.current = pathname;
        }

        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;

            ticking = true;
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const docHeight = document.documentElement.scrollHeight;

                if (docHeight <= windowHeight) {
                    ticking = false;
                    return;
                }

                const totalScrollable = docHeight - windowHeight;
                const scrollPercent = Math.min(100, Math.round((scrollTop / totalScrollable) * 100));

                const thresholds = [25, 50, 75, 90];

                thresholds.forEach((depth) => {
                    if (scrollPercent >= depth && !firedDepthsRef.current.has(depth)) {
                        firedDepthsRef.current.add(depth);
                        trackEvent('scroll_depth_reached', {
                            path: pathname,
                            depth: depth,
                            page_type: pageType
                        });
                    }
                });

                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check in case page is short or pre-scrolled
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname, pageType]);
}
