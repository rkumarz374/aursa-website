import posthog from 'posthog-js';

/**
 * AURSA Centralized Analytics & AI Attribution Engine
 * Privacy-First, Non-Blocking Telemetry and Acquisition Attribution.
 * Enforces Primitive Types, Zero PII, Referrer Hostname Only, and Session Persistence.
 */

// ── 1. Route to Content Cluster Mapper ────────────────────────────────────
export function getRouteCluster(pathname = window.location.pathname) {
    if (!pathname) return 'other';
    const path = pathname.toLowerCase();

    if (
        path === '/app' ||
        path === '/ai-outfit-check' ||
        path === '/outfit-second-opinion' ||
        path === '/outfit-check-for-occasions' ||
        path === '/personal-style-intelligence'
    ) {
        return 'consumer';
    }

    if (
        path === '/retail' ||
        path === '/retail-pilot' ||
        path === '/smart-fitting-room' ||
        path === '/fitting-room-intelligence' ||
        path === '/fitting-room-analytics' ||
        path === '/in-store-personalization'
    ) {
        return 'retail';
    }

    if (path === '/insights' || path.startsWith('/blog/') || path.startsWith('/journal/')) {
        return 'journal';
    }

    if (path === '/' || path === '/about' || path === '/contact' || path === '/privacy') {
        return 'company';
    }

    return 'other';
}

// ── 2. Centralized AI Referral Detection ──────────────────────────────────
export function detectAIReferral() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = (urlParams.get('utm_source') || '').toLowerCase();
        
        let referrerHost = '';
        if (document.referrer) {
            try {
                referrerHost = new URL(document.referrer).hostname.toLowerCase();
            } catch (e) {
                referrerHost = '';
            }
        }

        // 1. Explicit UTM source detection (Authoritative)
        if (utmSource === 'chatgpt.com') {
            return {
                isAIReferral: true,
                aiSource: 'chatgpt',
                detectionMethod: 'utm',
                referrerHost: referrerHost || 'chatgpt.com',
                landingPath: window.location.pathname
            };
        }

        // 2. Recognized Referrer Hostname fallback
        if (referrerHost.includes('chatgpt.com') || referrerHost.includes('chat.openai.com')) {
            return {
                isAIReferral: true,
                aiSource: 'chatgpt',
                detectionMethod: 'referrer',
                referrerHost,
                landingPath: window.location.pathname
            };
        }

        if (referrerHost.includes('claude.ai')) {
            return {
                isAIReferral: true,
                aiSource: 'claude',
                detectionMethod: 'referrer',
                referrerHost,
                landingPath: window.location.pathname
            };
        }

        if (referrerHost.includes('copilot.microsoft.com')) {
            return {
                isAIReferral: true,
                aiSource: 'bing_ai',
                detectionMethod: 'referrer',
                referrerHost,
                landingPath: window.location.pathname
            };
        }

        return {
            isAIReferral: false,
            aiSource: 'unknown',
            detectionMethod: 'none',
            referrerHost,
            landingPath: window.location.pathname
        };
    } catch (err) {
        return {
            isAIReferral: false,
            aiSource: 'unknown',
            detectionMethod: 'error',
            referrerHost: '',
            landingPath: window.location ? window.location.pathname : '/'
        };
    }
}

// ── 3. AI Session Initialization & Persistence ───────────────────────────
const AI_SESSION_KEY = 'aursa_ai_session_v1';
const AI_EVENT_FIRED_KEY = 'aursa_ai_event_fired_v1';

export function getStoredAISession() {
    try {
        const raw = sessionStorage.getItem(AI_SESSION_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
}

export function initAISession() {
    try {
        if (typeof window === 'undefined') return;

        let sessionData = getStoredAISession();

        if (!sessionData) {
            const detected = detectAIReferral();
            if (detected.isAIReferral) {
                sessionData = {
                    ai_source: detected.aiSource,
                    ai_detection_method: detected.detectionMethod,
                    ai_landing_path: detected.landingPath,
                    ai_referrer_host: detected.referrerHost
                };
                sessionStorage.setItem(AI_SESSION_KEY, JSON.stringify(sessionData));
            }
        }

        // Fire single ai_referral_visit event per session
        if (sessionData && sessionData.ai_source && !sessionStorage.getItem(AI_EVENT_FIRED_KEY)) {
            sessionStorage.setItem(AI_EVENT_FIRED_KEY, 'true');
            trackEvent('ai_referral_visit', {
                ai_source: sessionData.ai_source,
                detection_method: sessionData.ai_detection_method,
                landing_path: sessionData.ai_landing_path,
                referrer_host: sessionData.ai_referrer_host,
                content_cluster: getRouteCluster(sessionData.ai_landing_path)
            });
        }
    } catch (err) {
        // Safe silent guard
    }
}

// Auto-run AI Session initialization on script evaluation in browser
if (typeof window !== 'undefined') {
    setTimeout(() => {
        initAISession();
    }, 100);
}

// ── 4. Unified Event Dispatcher ──────────────────────────────────────────
export function trackEvent(eventName, properties = {}) {
    try {
        const storedSession = getStoredAISession();
        const currentCluster = getRouteCluster();

        const sanitizedProps = {
            content_cluster: currentCluster
        };

        if (storedSession && storedSession.ai_source) {
            sanitizedProps.ai_source = storedSession.ai_source;
        }

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
        if (import.meta.env && import.meta.env.DEV) {
            console.log(`[Analytics Event] ${eventName}`, sanitizedProps);
        }
    } catch (err) {
        // Silent failure guard — never disrupt UI
    }
}

