import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js';

// Initialize PostHog globally with singleton guard
if (!window.__POSTHOG_INITIALIZED__) {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
        api_host: "https://eu.i.posthog.com",
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true
    });

    window.posthog = posthog;
    window.__POSTHOG_INITIALIZED__ = true;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
