import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, ShieldCheck, CheckCircle2, ArrowRight, Briefcase, Heart, PartyPopper, ShoppingBag, Sparkles } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import AppDownloadSection from '../../components/AppDownloadSection';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const OutfitOccasionsPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://aursa.app/outfit-check-for-occasions#webpage',
                'url': 'https://aursa.app/outfit-check-for-occasions',
                'name': 'Check Your Outfit for Dates, Interviews, Weddings & More | AURSA',
                'description': 'Use AURSA for a personalized second opinion before a date, interview, meeting, wedding, event or shopping decision.',
                'isPartOf': {
                    '@type': 'WebSite',
                    '@id': 'https://aursa.app/#website'
                },
                'publisher': {
                    '@type': 'Organization',
                    '@id': 'https://aursa.app/#organization'
                }
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://aursa.app/outfit-check-for-occasions#breadcrumb',
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'AURSA',
                        'item': 'https://aursa.app/'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': 'App',
                        'item': 'https://aursa.app/app'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': 'Occasion Outfit Check',
                        'item': 'https://aursa.app/outfit-check-for-occasions'
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-28 sm:pt-32 pb-24 text-left relative">
            <SEOHead
                title="Check Your Outfit for Dates, Interviews, Weddings & More | AURSA"
                description="Use AURSA for a personalized second opinion before a date, interview, meeting, wedding, event or shopping decision."
                path="/outfit-check-for-occasions"
                canonical="https://aursa.app/outfit-check-for-occasions"
                schema={PAGE_SCHEMA}
            />

            {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Calendar size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            OCCASION OUTFIT CHECK
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Check Your Outfit Before the Moment Matters
                    </motion.h1>

                    <motion.div {...motionProps} className="bg-[#16161C]/80 border border-[#D88A3D]/30 p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm text-left space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#D88A3D] block font-neutra">
                            DIRECT ANSWER
                        </span>
                        <p className="font-sans text-base sm:text-lg text-[#F5F5F7] font-light leading-relaxed">
                            Different moments create different outfit doubts. AURSA gives you a personalized second opinion on the outfit you've chosen before the moment matters.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── OCCASION USE CASES ──────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">CONTEXT-AWARE CLARITY</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">Outfit feedback tailored for key moments</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Date */}
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-white/5 space-y-3">
                            <div className="flex items-center gap-3 text-[#D88A3D]">
                                <Heart size={20} />
                                <h3 className="font-serif text-2xl text-white">First Date</h3>
                            </div>
                            <p className="text-xs text-[#D88A3D] font-neutra uppercase tracking-wider font-bold">"Does this outfit feel right for a date?"</p>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Get feedback on whether your look feels balanced, effortless, and appropriate for your setting. AURSA helps you feel confident without pretense.
                            </p>
                        </div>

                        {/* Interview */}
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-white/5 space-y-3">
                            <div className="flex items-center gap-3 text-[#D88A3D]">
                                <Briefcase size={20} />
                                <h3 className="font-serif text-2xl text-white">Job Interview</h3>
                            </div>
                            <p className="text-xs text-[#D88A3D] font-neutra uppercase tracking-wider font-bold">"Does this outfit feel right for the interview?"</p>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Confirm that your professional attire feels neat, structured, and aligned with modern workplace dress codes before walking into the room.
                            </p>
                        </div>

                        {/* Wedding / Events */}
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-white/5 space-y-3">
                            <div className="flex items-center gap-3 text-[#D88A3D]">
                                <PartyPopper size={20} />
                                <h3 className="font-serif text-2xl text-white">Weddings & Formal Events</h3>
                            </div>
                            <p className="text-xs text-[#D88A3D] font-neutra uppercase tracking-wider font-bold">"Does this look feel right for the occasion?"</p>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Ensure your formal or festive outfit respects event dress levels and visual harmony across layers and accessories.
                            </p>
                        </div>

                        {/* Solo Shopping */}
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-white/5 space-y-3">
                            <div className="flex items-center gap-3 text-[#D88A3D]">
                                <ShoppingBag size={20} />
                                <h3 className="font-serif text-2xl text-white">Solo Shopping</h3>
                            </div>
                            <p className="text-xs text-[#D88A3D] font-neutra uppercase tracking-wider font-bold">"Do I feel confident buying this?"</p>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Standing in a trial room without a friend? Get a private second opinion on your phone before making a purchase decision.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── EMPOWERMENT PHILOSOPHY ──────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">DECISION EMPOWERMENT</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">AURSA supports the decision. You make it.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        Whether it's a major event or a casual Friday, AURSA helps you understand your look so you can walk into any room feeling authentic.
                    </p>
                </div>
            </section>

            {/* ── NATURAL LINKS ────────────────────────────────────────────────── */}
            <section className="py-16 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">EXPLORE MORE</span>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] font-neutra">
                        <Link to="/ai-outfit-check" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            AI Outfit Check
                        </Link>
                        <Link to="/outfit-second-opinion" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Outfit Second Opinion
                        </Link>
                        <Link to="/app" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Consumer App Overview
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── DOWNLOAD CTA SECTION ─────────────────────────────────────────── */}
            <AppDownloadSection source="outfit_occasions_page" />
        </div>
    );
};

export default OutfitOccasionsPage;
