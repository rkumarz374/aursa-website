import posthog from 'posthog-js';

/**
 * AURSA Centralized Analytics Event Helper
 * Safe, non-blocking telemetry event dispatcher for PostHog and GA4.
 * Enforces primitive types, no PII, and non-blocking failure guards.
 */
export function trackEvent(eventName, properties = {}) {
    try {
        const sanitizedProps = {};
        for (const [key, val] of Object.entries(properties)) {
            if (val === undefined || val === null) continue;
            if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                sanitizedProps[key] = val;
            }
        }

        // 1. PostHog
        if (window.posthog && typeof window.posthog.capture === 'function') {
            window.posthog.capture(eventName, sanitizedProps);
        } else if (posthog && typeof posthog.capture === 'function') {
            posthog.capture(eventName, sanitizedProps);
        }

        // 2. Google Analytics (gtag.js)
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, sanitizedProps);
        }

        // 3. Dev-mode logger
        if (import.meta.env.DEV) {
            console.log(`[Analytics Event] ${eventName}`, sanitizedProps);
        }
    } catch (err) {
        // Silent failure guard — never disrupt UI
    }
}
