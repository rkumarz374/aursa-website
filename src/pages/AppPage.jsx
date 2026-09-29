import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Smartphone, ShieldCheck, Sparkles, CheckCircle2, Heart, Layers, UserCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackEvent } from '../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const AppPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const APP_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/app#webpage',
        'url': 'https://aursa.app/app',
        'name': 'AURSA — AI Outfit Checker & Personal Style App',
        'description': "Use AURSA as a private AI outfit checker and personal style companion when you're standing in front of the mirror and wondering whether a look works for you.",
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
                title="AURSA — AI Outfit Checker & Personal Style App"
                description="Use AURSA as a private AI outfit checker and personal style companion when you're standing in front of the mirror and wondering whether a look works for you."
                path="/app"
                canonical="https://aursa.app/app"
                schema={APP_SCHEMA}
            />

            {/* ── SECTION 1: HERO — MIRROR MOMENT ─────────────────────────────── */}
            <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Smartphone size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            YOUR AI STYLE MIRROR
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Does this actually work for me?
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        AURSA gives you a private second opinion on your outfit when you're standing in front of the mirror and unsure.
                    </motion.p>

                    <motion.div {...motionProps} className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link
                            to="/mirror"
                            onClick={() => trackEvent('consumer_try_aursa_click', { source: 'hero' })}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Try AURSA
                        </Link>
                        <a
                            href="#download-aursa"
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Download AURSA
                        </a>
                    </motion.div>

                    <motion.p {...motionProps} className="text-xs text-[#A1A1AA] font-light font-neutra tracking-wider pt-2">
                        Wear with Confidence.
                    </motion.p>
                </div>
            </section>

            {/* ── SECTION 2: THE MOMENT OF UNCERTAINTY ───────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.p {...motionProps} className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">
                        THE MIRROR MOMENT
                    </motion.p>

                    <motion.div {...motionProps} className="space-y-3">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            You're already dressed.
                        </h2>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#D88A3D] font-light">
                            Something still feels uncertain.
                        </h3>
                    </motion.div>

                    <motion.p {...motionProps} className="font-sans text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                        You chose the outfit. You put it on. You looked in the mirror. Now something makes you pause. The question is no longer "What clothes exist?" It is "Does this look actually work for me?" AURSA works as a private AI outfit checker for that exact moment of hesitation before you step out.
                    </motion.p>
                </div>
            </section>

            {/* ── SECTION 3: HOW AURSA HELPS ──────────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12 text-center">
                    <div className="space-y-4">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">A SECOND OPINION</p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            Understand the look before you step out.
                        </h2>
                        <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto">
                            AURSA provides objective visual feedback on visual balance, fit, and composition so you can step out feeling confident.
                        </p>
                    </div>

                    {/* Step Flow Journey */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
                        {[
                            { step: "01", name: "GET DRESSED", desc: "Select your outfit" },
                            { step: "02", name: "LOOK IN MIRROR", desc: "Check your reflection" },
                            { step: "03", name: "CHECK WITH AURSA", desc: "Get an AI outfit analysis" },
                            { step: "04", name: "UNDERSTAND", desc: "See what works" },
                            { step: "05", name: "STEP OUT", desc: "Wear with confidence" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-4 rounded-xl border border-white/5 text-center space-y-1">
                                <span className="text-[10px] text-[#D88A3D] uppercase tracking-widest font-neutra block font-bold">
                                    {item.step}
                                </span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider font-neutra block">
                                    {item.name}
                                </span>
                                <span className="text-[10px] text-[#A1A1AA] font-light block">
                                    {item.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: PERSONAL, NOT GENERIC ────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">MADE FOR YOU</p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            Because the same outfit doesn't work the same way for everyone.
                        </h2>
                        <p className="text-base text-[#A1A1AA] font-light">
                            AURSA is designed to help you understand what works for you — not simply what is trending across social media.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-3">
                            <UserCheck size={20} className="text-[#D88A3D]" />
                            <h3 className="font-serif text-xl text-white">Your Personal Context</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Evaluates your look based on your occasion, environment, and personal style direction.
                            </p>
                        </div>
                        <div className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-3">
                            <Layers size={20} className="text-[#D88A3D]" />
                            <h3 className="font-serif text-xl text-white">Objective Visual Harmony</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Focuses on visual proportion, contrast, and silhouette alignment rather than trend rules.
                            </p>
                        </div>
                        <div className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-3">
                            <Heart size={20} className="text-[#D88A3D]" />
                            <h3 className="font-serif text-xl text-white">Clarity Over Pressure</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Helps you refine your own choices so you feel like yourself whenever you step out.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: PERSONAL STYLE INTELLIGENCE ───────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">
                        PERSONAL STYLE INTELLIGENCE
                    </p>

                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                        Your style should become clearer over time.
                    </h2>

                    <p className="text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                        AURSA is not only about checking a single outfit. Over time, Personal Style Intelligence helps you recognize your recurring preferences, visual balance, and personal style direction. The goal isn't to tell you what to wear — it's to help you understand what works for you.
                    </p>

                    <div className="pt-2">
                        <Link
                            to="/personal-style-intelligence"
                            onClick={() => trackEvent('consumer_personal_style_intelligence_click')}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>Learn about Personal Style Intelligence</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: PRIVACY ────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 text-[#D88A3D]">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-neutra">PRIVATE BY DESIGN</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF]">
                        Your outfit photo isn't stored.
                    </h2>

                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        AURSA uses the image to understand the look and deliver the experience without keeping your outfit photo.
                    </p>

                    <div className="pt-2">
                        <Link
                            to="/privacy"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>Read Privacy</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 7: DOWNLOAD AURSA ────────────────────────────────────── */}
            <section id="download-aursa" className="py-24 px-6 border-t border-white/5 bg-[#16161C]/50 relative z-10 scroll-mt-28">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">WEAR WITH CONFIDENCE</p>

                    <h2 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF]">
                        Take AURSA to your mirror.
                    </h2>

                    <p className="text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        Available on iPhone and Android. Download the personal style app to get an instant private second opinion whenever you stand in front of the mirror.
                    </p>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://apps.apple.com/in/app/aursa/id6761254001"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('app_store_click', { store: 'apple', source: 'app_page' })}
                            className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                        >
                            <img 
                                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                alt="Download on the App Store" 
                                className="h-[44px] sm:h-[48px] w-auto object-contain" 
                            />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.aursa.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('app_store_click', { store: 'google', source: 'app_page' })}
                            className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                        >
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                                alt="Get it on Google Play" 
                                className="h-[44px] sm:h-[48px] w-auto object-contain" 
                            />
                        </a>
                    </div>

                    <p className="text-xs text-[#A1A1AA] font-light pt-6 font-neutra">
                        Wear with Confidence.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AppPage;
