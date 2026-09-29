import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Heart, User, Layers, HelpCircle, CheckCircle2, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackEvent } from '../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const PersonalStyleIntelligencePage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/personal-style-intelligence#webpage',
        'url': 'https://aursa.app/personal-style-intelligence',
        'name': 'What Is Personal Style Intelligence? | AURSA',
        'description': 'Explore Personal Style Intelligence: how preferences, context, recurring choices and outfit decisions can help you better understand what works for you.',
        'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://aursa.app/#website'
        },
        'publisher': {
            '@type': 'Organization',
            '@id': 'https://aursa.app/#organization'
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-28 sm:pt-32 pb-24 text-left relative">
            <SEOHead
                title="What Is Personal Style Intelligence? | AURSA"
                description="Explore Personal Style Intelligence: how preferences, context, recurring choices and outfit decisions can help you better understand what works for you."
                path="/personal-style-intelligence"
                canonical="https://aursa.app/personal-style-intelligence"
                schema={PAGE_SCHEMA}
            />

            {/* ── SECTION 1: HERO — WHAT IS PERSONAL STYLE INTELLIGENCE? ──────── */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Compass size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            PERSONAL STYLE INTELLIGENCE
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto"
                    >
                        Your style is more than what looks good in general.
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Personal Style Intelligence is about understanding what works for you — your preferences, context, choices, and the way you want to show up.
                    </motion.p>

                    <motion.p {...motionProps} className="text-xs text-[#A1A1AA]/80 font-neutra tracking-wider">
                        AURSA uses this idea to move beyond one-size-fits-all outfit advice.
                    </motion.p>

                    <motion.div {...motionProps} className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link
                            to="/app"
                            onClick={() => trackEvent('personal_style_app_click')}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Explore AURSA Personal
                        </Link>
                        <Link
                            to="/mirror"
                            onClick={() => trackEvent('personal_style_mirror_click')}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Try AURSA
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 2: STYLE IS NOT THE SAME AS TREND ───────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">BEYOND TRENDS</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">What's fashionable isn't automatically what's right for you.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Fashion trends describe what is currently popular across the market. Personal style, however, is about what repeatedly feels authentic and right for the individual. We use Personal Style Intelligence to describe moving away from copying generic trend feeds toward recognizing your own visual balance and preferences.
                    </p>
                </div>
            </section>

            {/* ── SECTION 3: THE MIRROR MOMENT ────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE MIRROR MOMENT</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Personal style becomes visible when you have to decide.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        You choose an outfit. You put it on. You look in the mirror. That exact moment of pause — when you wonder "Does this actually work for me?" — is where personal style decisions take place. A second opinion at that moment should help you understand why an outfit feels right or off.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/app"
                            onClick={() => trackEvent('personal_style_app_click')}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>See how AURSA approaches the Mirror Moment</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: CONTEXT CHANGES THE ANSWER ───────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">CONTEXT MATTERS</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">The same outfit can feel different in a different moment.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Occasion & Setting", desc: "An outfit built for an informal dinner carries different balance expectations than one for a creative presentation." },
                            { title: "Desired Impression", desc: "Whether you want a look to feel relaxed, sharp, understated, or structured shapes how visual proportions feel." },
                            { title: "Personal Comfort", desc: "How an outfit feels on you physically and emotionally determines whether you wear it with true confidence." }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-2">
                                <h3 className="font-serif text-xl text-white">{card.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: FROM OUTFIT FEEDBACK TO STYLE UNDERSTANDING ───────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto space-y-8 text-left">
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">FROM ONE LOOK TO A PATTERN</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">One outfit can be feedback. Repeated choices can become understanding.</h2>
                    </div>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Checking a single outfit helps resolve hesitation for a single day. Over time, observing recurring choices, favorite combinations, and visual proportions can help reveal deeper personal style patterns:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#D88A3D] font-neutra block">DISCOVERY</span>
                            <p className="text-xs text-[#A1A1AA] font-light">"What might I like?"</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#D88A3D] font-neutra block">FEEDBACK</span>
                            <p className="text-xs text-[#A1A1AA] font-light">"Does this look work today?"</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#D88A3D]/10 border border-[#D88A3D]/40 space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#D88A3D] font-neutra block">STYLE INTELLIGENCE</span>
                            <p className="text-xs text-white font-light">"What works for me — and why?"</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: STYLE IDENTITY ────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">STYLE IDENTITY</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Style identity is the pattern behind the choices.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Style identity is not a rigid category label or an artificial box. It is a way of recognizing the recurring preferences, tendencies, and visual proportions that make a person's style feel uniquely like them. Your style identity should help you understand yourself — not box you into a generic category.
                    </p>
                </div>
            </section>

            {/* ── SECTION 7: WHERE AURSA FITS ─────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">AURSA PERSONAL</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">The goal isn't to tell you what to wear.</h2>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#D88A3D] font-light">It's to help you understand what works for you.</h3>
                    <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto leading-relaxed">
                        AURSA begins with the Mirror Moment, giving you an immediate private second opinion when standing in front of the mirror. Over time, Personal Style Intelligence builds toward deeper personal clarity.
                    </p>
                </div>
            </section>

            {/* ── SECTION 8: FINAL CTA ────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/50 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 text-[#D88A3D]">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-neutra">WEAR WITH CONFIDENCE</span>
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl text-white">Understand your style one decision at a time.</h2>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/app"
                            onClick={() => trackEvent('personal_style_app_click')}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Explore AURSA Personal
                        </Link>
                        <Link
                            to="/mirror"
                            onClick={() => trackEvent('personal_style_mirror_click')}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Try AURSA
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PersonalStyleIntelligencePage;
