import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import posthog from 'posthog-js';

const API_BASE = import.meta.env.VITE_API_URL;

// ─── Device ID for Usage Tracking ─────────────────────────────────────────────
const getDeviceId = () => {
    let id = localStorage.getItem('aursa_device_id');
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('aursa_device_id', id);
    }
    try {
        posthog.identify(id);
    } catch (err) { /* silent fail */ }
    return id;
};

// ─── Anonymous user ID (Legacy/Analytics) ──────────────────────────────────────
const getPwaUserId = () => {
    let id = localStorage.getItem('aursa_user_id');
    if (!id) {
        id = `pwa_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem('aursa_user_id', id);
    }
    return id;
};

// ─── Image Compression ────────────────────────────────────────────────────────
const compressImage = (file, maxWidth = 800) =>
    new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            const scale = Math.min(1, maxWidth / img.width);
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.82);
        };
        img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
        img.src = url;
    });

const S = {
    root: {
        minHeight: '100vh',
        background: '#0B0B0F',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", sans-serif',
        padding: '24px',
        position: 'relative',
        overflowX: 'hidden',
    },
    badge: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#D88A3D',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: '16px',
        opacity: 0.9,
    },
    heading: {
        fontFamily: '"Instrument Serif", serif',
        fontSize: '42px',
        fontWeight: '400',
        textAlign: 'center',
        margin: '0 0 40px 0',
        lineHeight: 1.1,
        maxWidth: '340px',
    },
    primaryBtn: {
        background: '#D88A3D',
        color: '#000',
        border: 'none',
        padding: '18px 36px',
        borderRadius: '100px',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(216,138,61,0.2)',
    },
    ghostBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        padding: '12px 24px',
        marginTop: '20px',
        fontSize: '14px',
        cursor: 'pointer',
        opacity: 0.7,
        fontWeight: '500',
        letterSpacing: '0.05em',
        borderRadius: '100px',
    },
    uploadHint: {
        fontSize: '14px',
        color: 'rgba(255,255,255,0.4)',
        fontWeight: '400',
    },
    uploadBox: {
        width: '100%',
        maxWidth: '320px',
        height: '240px',
        border: '1px dashed rgba(255,255,255,0.25)',
        borderRadius: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.02)',
        marginBottom: '40px',
    },
    cameraIcon: {
        fontSize: '32px',
        marginBottom: '16px',
    },
    spinner: {
        width: '48px',
        height: '48px',
        border: '3px solid rgba(216,138,61,0.1)',
        borderTop: '3px solid #D88A3D',
        borderRadius: '50%',
        marginBottom: '24px',
        animation: 'spin 1s linear infinite',
    },
    loadingMsg: {
        fontSize: '14px',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '500',
        letterSpacing: '0.05em',
    },
    sectionCard: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '24px',
        width: '100%',
        marginBottom: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    },
    score: {
        fontFamily: '"Instrument Serif", serif',
        fontSize: '84px',
        color: '#fff',
        margin: '20px 0 10px 0',
        fontWeight: '400',
        lineHeight: 1,
    },
    scoreLabel: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: '40px',
    },
    sectionLabel: {
        fontSize: '12px',
        color: '#D88A3D',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        alignSelf: 'flex-start',
        marginBottom: '16px',
    },
    observation: {
        fontSize: '15px',
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: '20px',
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    dot: {
        color: '#D88A3D',
        marginRight: '12px',
        fontWeight: '900',
    },
    suggestion: {
        background: 'rgba(216,138,61,0.1)',
        borderLeft: '4px solid #D88A3D',
        padding: '16px',
        borderRadius: '0 12px 12px 0',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: '24px',
        width: '100%',
        boxSizing: 'border-box'
    },
    errorText: {
        color: '#FF4D4D',
        fontSize: '14px',
        marginBottom: '24px',
        textAlign: 'center',
        background: 'rgba(255,77,77,0.1)',
        padding: '8px 16px',
        borderRadius: '100px',
        fontWeight: '500',
    }
};

export default function Mirror() {
    if (!window.posthog) {
        console.warn("PostHog not ready");
    }
    const [step, setStep] = useState('entry');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [animatedScoreOffset, setAnimatedScoreOffset] = useState(0);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const fileInputRef = useRef(null);
    const tracked = useRef({
        open: false,
        limit: false,
        result: false
    });

    const loadingMessages = [
        "Reading color harmony…",
        "Understanding balance…",
        "Checking contrast and layering…",
        "Aligning with your style…",
        "Almost there…"
    ];

    useEffect(() => {
        if (!tracked.current.open) {
            try {
                posthog.capture('pwa_open');
                tracked.current.open = true;
            } catch (err) { /* silent fail */ }
        }
    }, []);

    useEffect(() => {
        let interval;
        if (step === 'loading') {
            setLoadingMessageIndex(0);
            interval = setInterval(() => {
                setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
            }, 1200);
        }
        return () => clearInterval(interval);
    }, [step]);

    useEffect(() => {
        if (step === 'limit' && !tracked.current.limit) {
            try {
                posthog.capture('pwa_limit_hit');
                tracked.current.limit = true;
            } catch (err) { /* silent fail */ }
        } else if (step !== 'limit') {
            tracked.current.limit = false;
        }
    }, [step]);

    useEffect(() => {
        if (step === 'result' && result) {
            const radius = 28;
            const circumference = 2 * Math.PI * radius;
            const score = Math.floor(result.harmonyScore);
            const targetOffset = circumference - (score / 100) * circumference;
            
            // Set to full first to ensure animation starts from zero
            setAnimatedScoreOffset(circumference);
            
            const timer = setTimeout(() => {
                setAnimatedScoreOffset(targetOffset);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [step, result]);

    const handleFile = async (file) => {
        if (!file) return;

        setError(null);
        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        setStep('loading');
        try {
            posthog.capture('pwa_upload');
        } catch (err) { /* silent fail */ }

        try {
            const blob = await compressImage(file);
            const compressed = new File([blob], 'look.jpg', { type: 'image/jpeg' });

            const form = new FormData();
            form.append('image', compressed);

            const res = await fetch(`${API_BASE}/api/v1/ai/mirror-analyze`, {
                method: 'POST',
                headers: {
                    'x-client': 'pwa',
                    'x-user-id': getPwaUserId(),
                    'x-device-id': getDeviceId(),
                },
                body: form,
            });

            if (res.status === 403) {
                const fault = await res.json();
                if (fault.error === 'limit_reached') {
                    setStep('limit');
                    return;
                }
            }

            if (!res.ok) {
                setError('Service momentarily unavailable. Try again.');
                setStep('entry');
                return;
            }

            const data = await res.json();

            if (!data?.harmonyScore) {
                setError('We couldn\'t capture the details. Try a clearer shot.');
                setStep('entry');
                return;
            }

            setResult(data);
            if (!tracked.current.result) {
                try {
                    posthog.capture('pwa_result', {
                        score: data.harmonyScore
                    });
                    tracked.current.result = true;
                } catch (err) { /* silent fail */ }
            }
            setStep('result');
        } catch {
            setError('Connection lost. Please check your network.');
            setStep('entry');
        }
    };

    const reset = () => {
        setStep('entry');
        setResult(null);
        setError(null);
        setImageFile(null);
        setPreview(null);
        tracked.current.result = false;
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getScoreSubtext = (score) => {
        if (score >= 85) return 'Strong alignment';
        if (score >= 70) return 'Moderate alignment';
        return 'Needs balance';
    };

    const getConfidenceText = (score) => {
        if (score >= 85) return "This look feels sharp and naturally put together.";
        if (score >= 70) return "Your outfit works well, with a few subtle imbalances.";
        return "This look has potential — a small shift could elevate it.";
    };

    if (step === 'entry') {
        return (
            <div style={S.root}>
                <div className="noise-layer" />
                <div className="relative z-10 w-full flex flex-col items-center">
                <style>
                    {`
                    @keyframes pulseSparkle {
                        0% { opacity: 0.6; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.08); }
                        100% { opacity: 0.6; transform: scale(1); }
                    }
                    .pulse-icon {
                        animation: pulseSparkle 2.5s ease-in-out infinite;
                        display: inline-block;
                    }
                    .noise-layer {
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                        opacity: 0.03;
                        mix-blend-mode: soft-light;
                        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                        z-index: 1;
                    }
                    .card-glow-wrapper {
                        position: relative;
                        z-index: 1;
                    }
                    .card-glow-wrapper::before {
                        content: '';
                        position: absolute;
                        inset: -20px;
                        background: rgba(216,138,61,0.25);
                        filter: blur(60px);
                        z-index: -1;
                        border-radius: 40px;
                        opacity: 0.6;
                    }
                    .upload-card-primary {
                        transition: all 200ms ease-out;
                        transform: scale(1);
                        background: linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.01)) !important;
                        border: 1px solid rgba(255,255,255,0.08) !important;
                        box-shadow: 0 4px 24px rgba(0,0,0,0.2) !important;
                    }
                    .upload-card-primary:hover {
                        transform: scale(1.02);
                        border: 1px solid rgba(255,255,255,0.15) !important;
                        box-shadow: 0 0 25px rgba(216,138,61,0.15) !important;
                    }
                    .upload-card-primary:active {
                        transform: scale(0.97);
                        box-shadow: 0 0 20px rgba(216,138,61,0.25) !important;
                    }
                    .btn-primary-interaction {
                        transition: all 200ms ease-out;
                    }
                    .btn-primary-interaction:hover {
                        transform: scale(1.02);
                        box-shadow: 0 0 30px rgba(216,138,61,0.25) !important;
                    }
                    .btn-primary-interaction:active {
                        transform: scale(0.96);
                    }
                    .result-card-interaction {
                        transition: all 200ms ease-out;
                    }
                    @media (min-width: 1024px) {
                        .result-card-interaction:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 10px 30px rgba(0,0,0,0.25) !important;
                        }
                    }
                    .tag-interaction {
                        transition: all 300ms ease-out;
                    }
                    .tag-interaction:hover {
                        transform: scale(1.05);
                    }
                    .tag-interaction:active {
                        transform: scale(0.95);
                    }
                    `}
                </style>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h1 style={{
                        ...S.heading,
                        fontSize: '28px',
                        maxWidth: '300px',
                        marginBottom: '12px',
                        lineHeight: 1.2,
                        letterSpacing: '0.01em'
                    }}>
                        You already feel when a look works. Now see it clearly.
                    </h1>
                    <p style={{
                        fontSize: '13px',
                        opacity: 0.5,
                        textAlign: 'center',
                        marginBottom: '32px',
                        fontWeight: '400',
                        letterSpacing: '0.02em'
                    }}>
                        You’re one step away from clarity.
                    </p>

                    {/* Illustration with Floating Tags */}
                    <div className="relative flex justify-center items-center mt-8 mb-2">
                        <img
                            src="/Illustration.svg"
                            alt="AI Style Analysis"
                            className="w-[250px] h-auto select-none pointer-events-none"
                        />

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: [0, -2, 0] }}
                            transition={{
                                opacity: { duration: 0.4, delay: 0.2 },
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                            }}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 px-[10px] py-[4px] rounded-full border border-[rgba(216,138,61,0.35)] bg-[rgba(216,138,61,0.15)] text-[#FFFFFF] text-[10px] md:text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap backdrop-blur-[6px] pointer-events-none tag-interaction"
                        >
                            Color Harmony
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: [0, -2, 0] }}
                            transition={{
                                opacity: { duration: 0.4, delay: 0.4 },
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
                            }}
                            className="absolute left-[-10px] top-[45%] -translate-y-1/2 px-[10px] py-[4px] rounded-full border border-[rgba(216,138,61,0.35)] bg-[rgba(216,138,61,0.15)] text-[#FFFFFF] text-[10px] md:text-[11px] font-bold tracking-[0.08em] uppercase backdrop-blur-[6px] pointer-events-none tag-interaction"
                        >
                            Balance
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: [0, -2, 0] }}
                            transition={{
                                opacity: { duration: 0.4, delay: 0.6 },
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                            }}
                            className="absolute right-[-10px] top-[45%] -translate-y-1/2 px-[10px] py-[4px] rounded-full border border-[rgba(216,138,61,0.35)] bg-[rgba(216,138,61,0.15)] text-[#FFFFFF] text-[10px] md:text-[11px] font-bold tracking-[0.08em] uppercase backdrop-blur-[6px] pointer-events-none tag-interaction"
                        >
                            Contrast
                        </motion.div>
                    </div>

                    {error && <p style={S.errorText}>{error}</p>}

                    <div className="card-glow-wrapper" style={{ marginTop: '-10px' }}>
                        <div
                            className="upload-card-primary"
                            style={{
                                ...S.uploadBox,
                                height: 'auto',
                                padding: '24px 20px',
                                marginBottom: '16px',
                                borderStyle: 'solid' // Override dashed from S.uploadBox logic
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <span style={{ ...S.cameraIcon, marginBottom: '8px' }} className="pulse-icon">✨</span>
                            <p style={{ color: '#fff', fontWeight: '700', margin: '0 0 6px 0', fontSize: '15px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Tap to check your look
                            </p>
                            <p style={S.uploadHint}>Take a photo or choose from your library</p>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', opacity: 0.5, textAlign: 'center', margin: 0 }}>
                        Takes ~3 seconds
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        style={{ display: 'none' }}
                        onChange={e => handleFile(e.target.files?.[0])}
                    />
                </div>
            </div>
            </div>
        );
    }

    if (step === 'loading') {
        return (
            <div style={S.root}>
                <div className="noise-layer" />
                <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* User Image Analysis View */}
                    <div className="relative w-[220px] h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={preview}
                            alt="Analysis Preview"
                            className="w-full h-full object-cover scale-[1.05]"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40" />
                        
                        {/* Subtle Analysis Pulse */}
                        <div className="absolute inset-0 bg-[#D88A3D]/10 blur-2xl animate-pulse" style={{ animationDuration: '2s' }} />
                    </div>

                    <div className="mt-10 text-center">
                        <p 
                            key={loadingMessageIndex}
                            className="text-white text-lg font-medium transition-opacity duration-300 font-serif italic tracking-wide"
                        >
                            {loadingMessages[loadingMessageIndex]}
                        </p>
                        <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-bold mt-4">
                            Insights generating...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'result') {
        if (!result) {
            return (
                <div style={S.root}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={S.spinner} />
                        <p style={S.loadingMsg}>Preparing analysis...</p>
                    </div>
                </div>
            );
        }

        return (
            <div style={S.root}>
                <div className="noise-layer" />
                <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="relative w-full flex flex-col items-center">
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col items-center w-full" style={{ maxWidth: '440px', paddingBottom: '60px', paddingTop: '80px' }}>
                    <p style={{ ...S.badge, marginBottom: '24px' }}>Result Analysis</p>

                    {/* 1. Image Card */}
                    <div style={{
                        width: '100%',
                        marginTop: '12px',
                        marginBottom: '24px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <img
                            src={preview}
                            alt="Your Look"
                            className="rounded-xl shadow-[0_0_25px_rgba(216,138,61,0.2)]"
                            style={{
                                height: '240px',
                                width: 'auto',
                                maxWidth: '100%',
                                objectFit: 'cover',
                                borderRadius: '18px',
                                display: 'block',
                                margin: '0 auto'
                            }}
                        />
                    </div>

                    {/* 2. Confidence Line */}
                    <p style={{
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: '500',
                        marginBottom: '24px',
                        textAlign: 'center',
                        fontFamily: '"Instrument Serif", serif',
                        fontStyle: 'italic',
                        letterSpacing: '0.02em'
                    }}>
                        ✨ This look feels balanced and confident.
                    </p>

                    {/* 3. Score Card */}
                    {(() => {
                        const score = Math.floor(result.harmonyScore);
                        const radius = 28;
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference - (score / 100) * circumference;
                        const checksUsed = Number(localStorage.getItem('aursa_pwa_count') || 0);

                        return (
                            <div className="w-full p-6 mb-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(0,0,0,0.2)] flex items-center justify-between result-card-interaction">
                                {/* LEFT SIDE */}
                                <div>
                                    <p className="text-white text-base font-medium">Harmony Score</p>
                                    <p className="text-white/60 text-sm mt-1">{getScoreSubtext(score)}</p>
                                    <div className="mt-4 inline-block px-3 py-1 text-[11px] font-semibold tracking-wider rounded-full bg-[#D88A3D]/20 text-[#D88A3D] uppercase">
                                        {checksUsed} / 3 checks used
                                    </div>
                                </div>

                                {/* RIGHT SIDE: Circular Ring */}
                                <div className="relative w-[64px] h-[64px]">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r={radius}
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r={radius}
                                            stroke="#D88A3D"
                                            strokeWidth="4"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={animatedScoreOffset}
                                            strokeLinecap="round"
                                            fill="none"
                                            style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                                        {score}%
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* 4. Observations Card */}
                    {result.observations?.length > 0 && (
                        <div className="result-card-interaction" style={{ ...S.sectionCard, marginBottom: '24px' }}>
                            <p style={S.sectionLabel}>WHAT STOOD OUT</p>
                            {result.observations.slice(0, 3).map((o, i) => (
                                <p key={i} style={{ ...S.observation, fontSize: '14px', marginBottom: '12px', opacity: 0.8 }}>
                                    <span style={S.dot}>•</span>
                                    {o}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* 5. Suggestion Card */}
                    {result?.suggestion && (
                        <div style={S.suggestion}>
                            <span style={{ opacity: 0.8, fontWeight: '600', color: '#D88A3D' }}>Refinement: </span>
                            <span>{result.suggestion}</span>
                        </div>
                    )}

                    {/* PREMIUM LOCKED PREVIEW */}
                    <div 
                        className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            padding: '20px',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.02)',
                            position: 'relative',
                            width: '100%',
                            boxSizing: 'border-box',
                            marginBottom: '24px',
                            overflow: 'hidden',
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        {/* 1. Blurred Fake Content Behind CTA */}
                        <div className="absolute inset-0 px-6 py-8 opacity-30 blur-[3px] pointer-events-none select-none">
                            <div className="flex gap-2 flex-wrap mb-4">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-[10px] uppercase tracking-wider font-bold">Office</span>
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-[10px] uppercase tracking-wider font-bold">Date Night</span>
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-[10px] uppercase tracking-wider font-bold">Creative</span>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed max-w-[280px]">
                                This look performs differently across contexts, adapting its balance and expression to the environment.
                            </p>
                        </div>

                        {/* 2. Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/80 to-[#0B0B0F] pointer-events-none" />

                        {/* 3. CTA Content Top Layer */}
                        <div className="relative z-10 flex flex-col items-center justify-center text-center">
                            <p style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#fff', fontFamily: '"Instrument Serif", serif' }}>
                                Unlock your full style insight
                            </p>
                            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: '300px', lineHeight: 1.5 }}>
                                See how your look works across different settings and understand your style on a deeper level
                            </p>
                            <button 
                                style={{ ...S.primaryBtn, padding: '12px 28px', fontSize: '13px', marginBottom: '14px' }} 
                                className="btn-primary-interaction"
                                onClick={() => {
                                    try {
                                        posthog.capture('cta_click_full_experience');
                                    } catch (err) { /* silent fail */ }
                                    window.location.href = "/#/";
                                    setTimeout(() => {
                                        const el = document.getElementById("hero");
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                    }, 200);
                                }}
                            >
                                Get full AURSA experience
                            </button>
                            <p style={{ margin: '0', fontSize: '10px', opacity: 0.4, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: '600' }}>
                                Coming soon on iOS & Android
                            </p>
                        </div>
                    </div>

                    <button
                        style={{ ...S.primaryBtn, width: '100%' }}
                        className="btn-primary-interaction"
                        onClick={reset}
                    >
                        Check another look
                    </button>
                </div>
            </div>
        </div>
        </div>
        );
    }

    if (step === 'limit') {
        return (
            <div style={S.root}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={S.badge}>Daily Alignment Used</p>
                    <h1 style={{ ...S.heading, fontSize: '28px', marginBottom: '16px' }}>
                        You’ve checked a few looks today.
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.4)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                        maxWidth: '300px',
                        margin: '0 0 40px 0',
                        fontWeight: '300'
                    }}>
                        AURSA works best when it understands your patterns over time.
                    </p>
                    <button 
                        style={S.primaryBtn}
                        onClick={() => {
                            window.location.href = "/#/";
                            setTimeout(() => {
                                const el = document.getElementById("hero");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                            }, 200);
                        }}
                    >
                        Join Early Access
                    </button>
                    <button style={S.ghostBtn} onClick={() => setStep('entry')}>
                        Try again later
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={S.root}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
                Something went wrong. <button onClick={() => setStep('entry')} style={{ color: '#D88A3D', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Return Home</button>
            </div>
        </div>
    );
}
