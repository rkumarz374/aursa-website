import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Smartphone, Sparkles, ShieldCheck, CheckCircle2, QrCode, Eye, Layers } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import { useRetailPilotModal } from '../../context/RetailPilotModalContext';

const STEPS = [
    {
        id: 'try',
        num: '01',
        label: 'TRY',
        title: 'You liked it enough to try it.',
        desc: 'The shopper is already wearing the look. Discovery is over.',
        badge: 'Trial Room Moment'
    },
    {
        id: 'pause',
        num: '02',
        label: 'PAUSE',
        title: 'Does this actually work for me?',
        desc: 'This is the uncertainty AURSA is built around.',
        badge: 'The Pause'
    },
    {
        id: 'open',
        num: '03',
        label: 'OPEN AURSA',
        title: "A private second opinion, on the shopper's phone.",
        desc: 'No smart mirror required. Works cleanly through QR or store entry.',
        badge: 'Shopper Phone'
    },
    {
        id: 'second-opinion',
        num: '04',
        label: 'SECOND OPINION',
        title: 'Illustrative AURSA response',
        desc: 'A calm, private second opinion focused on visual balance and clarity.',
        badge: 'AURSA Analysis'
    },
    {
        id: 'decide',
        num: '05',
        label: 'DECIDE',
        title: 'Clarity, not pressure.',
        desc: "The shopper can keep the look, adjust it, or decide it isn't right for them — with more confidence in the decision.",
        badge: 'Decision Clarity'
    }
];

const RetailTrialRoomExperience = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [activeViewMode, setActiveViewMode] = useState('shopper'); // 'shopper' | 'retail'
    const shouldReduceMotion = useReducedMotion();
    const [hasStarted, setHasStarted] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const { openPilotModal } = useRetailPilotModal();

    const currentStep = STEPS[currentStepIndex];

    const changeStep = (newIndex) => {
        if (!hasStarted) {
            setHasStarted(true);
            trackEvent('retail_trial_room_started');
        }

        const step = STEPS[newIndex];
        setCurrentStepIndex(newIndex);

        trackEvent('retail_trial_room_step_viewed', { step: step.id });

        if (step.id === 'decide' && !hasCompleted) {
            setHasCompleted(true);
            trackEvent('retail_trial_room_completed');
        }
    };

    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            changeStep(currentStepIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            changeStep(currentStepIndex - 1);
        }
    };

    return (
        <section id="trial-room-experience" className="py-24 px-6 border-t border-white/5 bg-[#16161C]/40 relative z-10 scroll-mt-28">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Section Introduction */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10">
                        <Sparkles size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">
                            THE TRIAL-ROOM MOMENT
                        </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                        See where AURSA enters the decision.
                    </h2>

                    <p className="text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed">
                        An illustrative look at the moment between trying something on and deciding what to do next.
                    </p>

                    <p className="text-xs text-[#A1A1AA]/60 font-neutra tracking-wider">
                        Illustrative experience — no live shopper data.
                    </p>
                </div>

                {/* Step Stepper Navigation Bar */}
                <div className="bg-[#16161C]/90 p-2 rounded-2xl border border-white/10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1">
                    {STEPS.map((step, idx) => {
                        const isActive = idx === currentStepIndex;
                        const isCompleted = idx < currentStepIndex;

                        return (
                            <button
                                key={step.id}
                                onClick={() => changeStep(idx)}
                                aria-current={isActive ? 'step' : undefined}
                                className={`flex-1 min-w-[120px] sm:min-w-0 py-3 px-3 rounded-xl transition-all duration-200 text-center font-neutra group focus:outline-none focus:ring-2 focus:ring-[#D88A3D] ${
                                    isActive
                                        ? 'bg-[#D88A3D] text-[#0F0F13] font-bold shadow-md'
                                        : isCompleted
                                        ? 'bg-white/5 text-white hover:bg-white/10'
                                        : 'bg-transparent text-[#A1A1AA] hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <span className={`text-[10px] block font-neutra uppercase tracking-wider ${
                                    isActive ? 'text-[#0F0F13]/80' : 'text-[#D88A3D]'
                                }`}>
                                    {step.num}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider block mt-0.5 truncate">
                                    {step.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Interactive Stage */}
                <div className="bg-[#0F0F13] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                    {/* View Mode Toggle (Shown prominently in State 5 DECIDE or header) */}
                    <div className="border-b border-white/10 bg-[#16161C]/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] font-neutra">
                                STEP {currentStep.num} OF 05 — {currentStep.label}
                            </span>
                        </div>

                        {/* Shopper / Retail View Toggle */}
                        <div className="inline-flex items-center p-1 rounded-xl bg-[#0F0F13] border border-white/10">
                            <button
                                onClick={() => setActiveViewMode('shopper')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                    activeViewMode === 'shopper'
                                        ? 'bg-[#D88A3D] text-[#0F0F13]'
                                        : 'text-[#A1A1AA] hover:text-white'
                                }`}
                            >
                                Shopper View
                            </button>
                            <button
                                onClick={() => {
                                    setActiveViewMode('retail');
                                    trackEvent('retail_view_opened');
                                }}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                    activeViewMode === 'retail'
                                        ? 'bg-[#D88A3D] text-[#0F0F13]'
                                        : 'text-[#A1A1AA] hover:text-white'
                                }`}
                            >
                                Retail View
                            </button>
                        </div>
                    </div>

                    {/* Stage Content Grid */}
                    <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
                        {/* LEFT COLUMN — VISUAL ATMOSPHERE / PHONE SURFACES */}
                        <div className="lg:col-span-6 flex justify-center items-center">
                            {activeViewMode === 'shopper' ? (
                                <div className="w-full max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#16161C] to-[#0F0F13] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-xl">
                                    {/* Ambient background reflection glow */}
                                    <div className={`absolute inset-0 bg-[#D88A3D]/5 transition-opacity duration-500 ${
                                        currentStep.id === 'pause' ? 'opacity-20' : 'opacity-10'
                                    }`} />

                                    {/* STATE 1 & 2: Fitting Room Mirror Visual */}
                                    {(currentStep.id === 'try' || currentStep.id === 'pause') && (
                                        <div className="relative z-10 space-y-6 text-center my-auto">
                                            {/* Mirror Frame Silhouette */}
                                            <div className="w-28 h-44 mx-auto rounded-t-full border-2 border-white/20 bg-white/5 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                                                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 mb-2" />
                                                <div className="w-20 h-24 rounded-t-2xl bg-white/10 border-t border-white/20" />
                                                {currentStep.id === 'pause' && (
                                                    <div className="absolute inset-0 bg-[#0F0F13]/40 backdrop-blur-[2px] flex items-center justify-center">
                                                        <span className="text-xl text-[#D88A3D] font-serif">?</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-[#A1A1AA] font-light font-neutra uppercase tracking-wider">
                                                {currentStep.id === 'try' ? 'Trial Room Mirror' : 'Hesitation Moment'}
                                            </p>
                                        </div>
                                    )}

                                    {/* STATE 3: QR / Phone Store Entry */}
                                    {currentStep.id === 'open' && (
                                        <div className="relative z-10 space-y-6 text-center my-auto">
                                            <div className="w-24 h-24 mx-auto bg-white/10 p-4 rounded-2xl border border-[#D88A3D]/40 flex flex-col items-center justify-center space-y-2">
                                                <QrCode size={40} className="text-[#D88A3D]" />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="inline-block px-3 py-1 bg-[#D88A3D]/10 border border-[#D88A3D]/30 text-[#D88A3D] text-[10px] font-bold uppercase tracking-wider rounded-full font-neutra">
                                                    Illustrative store entry
                                                </span>
                                                <p className="text-xs text-white font-serif pt-1">Shopper opens AURSA on their phone</p>
                                                <p className="text-[11px] text-[#A1A1AA] font-light">No app installation or smart mirror hardware</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* STATE 4: Illustrative AURSA Response Phone View */}
                                    {currentStep.id === 'second-opinion' && (
                                        <div className="relative z-10 space-y-4 my-auto text-left bg-[#16161C]/90 p-5 rounded-2xl border border-[#D88A3D]/30 shadow-lg">
                                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles size={16} className="text-[#D88A3D]" />
                                                    <span className="text-xs font-bold uppercase tracking-wider text-white font-neutra">AURSA SECOND OPINION</span>
                                                </div>
                                                <span className="text-[9px] uppercase tracking-wider text-[#D88A3D] font-neutra bg-[#D88A3D]/10 px-2 py-0.5 rounded">Illustrative</span>
                                            </div>

                                            <div className="space-y-3 pt-1">
                                                <p className="text-sm text-white font-serif leading-relaxed">
                                                    "This look feels considered and cohesive."
                                                </p>
                                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                                    If you want it to feel a little sharper, try adding slightly more structure.
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-white/5">
                                                <p className="text-[10px] text-[#A1A1AA]/80 font-neutra uppercase tracking-wider">
                                                    A second opinion should help the shopper decide — not overwhelm them.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* STATE 5: DECIDE State */}
                                    {currentStep.id === 'decide' && (
                                        <div className="relative z-10 space-y-6 text-center my-auto">
                                            <div className="w-16 h-16 mx-auto rounded-full bg-[#D88A3D]/10 border border-[#D88A3D] flex items-center justify-center">
                                                <CheckCircle2 size={32} className="text-[#D88A3D]" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-serif text-xl text-white">Decision Resolved</h4>
                                                <p className="text-xs text-[#A1A1AA] font-light max-w-xs mx-auto">
                                                    The shopper reaches clarity — keep the look, refine it, or leave it with confidence.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* RETAIL VIEW PANEL */
                                <div className="w-full max-w-md bg-[#16161C]/90 border border-[#D88A3D]/30 p-6 rounded-3xl space-y-6 text-left">
                                    <div className="space-y-2 border-b border-white/10 pb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">RETAIL PILOT SIGNALS</span>
                                        <h3 className="font-serif text-xl text-white">What could a pilot help a retailer learn?</h3>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { label: 'Where shoppers pause', desc: 'Identify which garments prompt evaluation in the fitting room.' },
                                            { label: 'Which styling questions recur', desc: 'Understand common fit and visual balance considerations.' },
                                            { label: 'Which recommendations shoppers engage with', desc: 'See how styling suggestions support shopper decision-making.' },
                                            { label: 'Which shopping contexts appear most often', desc: 'Learn why shoppers are building looks (work, evening, occasion).' },
                                            { label: 'Where add-on suggestions become relevant', desc: 'Explore natural styling pairing opportunities at the decision point.' }
                                        ].map((signal, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                                                <CheckCircle2 size={16} className="text-[#D88A3D] shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="text-xs font-bold text-white font-neutra tracking-wider uppercase">{signal.label}</h4>
                                                    <p className="text-[11px] text-[#A1A1AA] font-light leading-snug mt-0.5">{signal.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-[10px] text-[#A1A1AA]/60 font-neutra tracking-wider pt-2 border-t border-white/5">
                                        Illustrative pilot signal categories — not live retailer data.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN — STEP DETAILS & CONTROLS */}
                        <div className="lg:col-span-6 space-y-6 text-left">
                            <div className="space-y-3">
                                <span className="inline-block px-3 py-1 bg-[#D88A3D]/10 border border-[#D88A3D]/30 text-[#D88A3D] text-[10px] font-bold uppercase tracking-widest rounded-full font-neutra">
                                    {currentStep.badge}
                                </span>
                                <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                                    {currentStep.title}
                                </h3>
                                <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                                    {currentStep.desc}
                                </p>
                            </div>

                            {/* Additional Contextual Highlights */}
                            <div className="pt-2 border-t border-white/10 space-y-3">
                                {currentStep.id === 'try' && (
                                    <p className="text-xs text-[#A1A1AA] font-light">
                                        The garment is selected. Size is decided. The physical try-on has occurred.
                                    </p>
                                )}
                                {currentStep.id === 'pause' && (
                                    <p className="text-xs text-[#A1A1AA] font-light">
                                        Standing in front of the mirror, uncertainty creates a temporary pause before taking off the look or walking to the register.
                                    </p>
                                )}
                                {currentStep.id === 'open' && (
                                    <p className="text-xs text-[#A1A1AA] font-light">
                                        The shopper scans a subtle fitting-room QR code or opens AURSA on their own smartphone without waiting for store staff.
                                    </p>
                                )}
                                {currentStep.id === 'second-opinion' && (
                                    <p className="text-xs text-[#A1A1AA] font-light">
                                        AURSA provides immediate visual evaluation focused on visual balance, fit clarity, and silhouette harmony.
                                    </p>
                                )}
                                {currentStep.id === 'decide' && (
                                    <div className="space-y-4 pt-2">
                                        <p className="text-xs text-[#A1A1AA] font-light">
                                            The decision belongs to the shopper. AURSA provides clarity to make the choice confident.
                                        </p>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={(e) => openPilotModal('trial_room', e)}
                                                className="inline-flex items-center gap-2 px-6 py-3 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 rounded-xl cursor-pointer"
                                            >
                                                <span>Request a Retail Pilot</span>
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* State Navigation Controls */}
                            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentStepIndex === 0}
                                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 font-neutra transition-all duration-200 ${
                                            currentStepIndex === 0
                                                ? 'border-white/5 bg-transparent text-white/30 cursor-not-allowed'
                                                : 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
                                        }`}
                                    >
                                        <ArrowLeft size={14} />
                                        <span>Previous</span>
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        disabled={currentStepIndex === STEPS.length - 1}
                                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 font-neutra transition-all duration-200 ${
                                            currentStepIndex === STEPS.length - 1
                                                ? 'border-white/5 bg-transparent text-white/30 cursor-not-allowed'
                                                : 'border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] text-[#0F0F13]'
                                        }`}
                                    >
                                        <span>{currentStepIndex === STEPS.length - 1 ? 'Completed' : 'Next Step'}</span>
                                        <ArrowRight size={14} />
                                    </button>
                                </div>

                                <span className="text-xs text-[#A1A1AA] font-neutra">
                                    Step {currentStepIndex + 1} of {STEPS.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RetailTrialRoomExperience;
