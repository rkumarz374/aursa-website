import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, Eye } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import AppDownloadSection from '../../components/AppDownloadSection';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const OutfitSecondOpinionPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://aursa.app/outfit-second-opinion#webpage',
                'url': 'https://aursa.app/outfit-second-opinion',
                'name': 'Get a Second Opinion on Your Outfit | AURSA',
                'description': 'Already dressed but still unsure? AURSA gives you a private, personalized second opinion before you step out.',
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
                '@id': 'https://aursa.app/outfit-second-opinion#breadcrumb',
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
                        'name': 'Outfit Second Opinion',
                        'item': 'https://aursa.app/outfit-second-opinion'
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-28 sm:pt-32 pb-24 text-left relative">
            <SEOHead
                title="Get a Second Opinion on Your Outfit | AURSA"
                description="Already dressed but still unsure? AURSA gives you a private, personalized second opinion before you step out."
                path="/outfit-second-opinion"
                canonical="https://aursa.app/outfit-second-opinion"
                schema={PAGE_SCHEMA}
            />

            {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Eye size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            SECOND OPINION
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Not Sure About Your Outfit? Get a Second Opinion.
                    </motion.h1>

                    <motion.div {...motionProps} className="bg-[#16161C]/80 border border-[#D88A3D]/30 p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm text-left space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#D88A3D] block font-neutra">
                            DIRECT ANSWER
                        </span>
                        <p className="font-sans text-base sm:text-lg text-[#F5F5F7] font-light leading-relaxed">
                            Sometimes you're already dressed — you just want another perspective before deciding. AURSA gives you a private, personalized second opinion on the outfit you're wearing.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── THE MIRROR MOMENT AURSA IS BUILT FOR ───────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-10">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE MIRROR MOMENT</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">The moment AURSA is built for</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Checking the mirror one last time before leaving",
                            "Wondering if the outfit actually works together",
                            "Thinking about changing one piece but feeling unsure",
                            "Wanting feedback without texting a friend",
                            "Leaving home still feeling slightly uncertain"
                        ].map((situation, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-5 rounded-xl border border-white/5 flex items-center gap-4">
                                <CheckCircle2 size={18} className="text-[#D88A3D] shrink-0" />
                                <span className="text-sm text-[#F5F5F7] font-light">{situation}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pt-4">
                        <p className="text-sm text-[#D88A3D] font-neutra tracking-wider uppercase font-bold">
                            AURSA makes that second opinion available right when you need it.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── ABOUT YOUR ACTUAL OUTFIT ────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">FOCUS ON YOUR LOOK</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">About your actual outfit.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                        AURSA focuses on the look you're already wearing. Rather than pushing new shopping items or trend feeds, it provides objective feedback on proportion, balance, and visual composition for what you have already chosen.
                    </p>
                </div>
            </section>

            {/* ── WHAT DO YOU RECEIVE? ────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">WHAT YOU RECEIVE</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">What do you receive?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Another Perspective", desc: "An objective, private evaluation of your look standing in front of the mirror." },
                            { title: "Clarity on What Works", desc: "Positive reinforcement highlighting the strongest visual elements in your outfit." },
                            { title: "Small Adjustments", desc: "Subtle suggestions on areas you may want to reconsider or adjust." },
                            { title: "Decision Confidence", desc: "The confidence to step out feeling comfortable and authentic in your own choice." }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-2">
                                <h3 className="font-serif text-xl text-white">{card.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VISIBLE Q&A / FAQ ────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-10">
                    <div className="text-center space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">QUESTIONS & ANSWERS</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "Is there an app that gives a second opinion on my outfit?",
                                a: "Yes. AURSA provides a private, personalized second opinion on the outfit you are wearing before you step out."
                            },
                            {
                                q: "Can I get outfit feedback without asking friends?",
                                a: "Yes. AURSA offers instant, private feedback directly on your phone, so you don't need to text friends or post online."
                            },
                            {
                                q: "Can I privately check an outfit before going out?",
                                a: "Yes. Your outfit photo is processed in real time to deliver feedback and is not stored."
                            },
                            {
                                q: "Can AURSA help when something feels off?",
                                a: "Yes. AURSA highlights visual balance and proportion to help you diagnose why a look might feel off."
                            },
                            {
                                q: "Does AURSA tell me what trend to follow?",
                                a: "No. AURSA focuses on helping you understand what works for you rather than pushing general fashion trends."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-2 text-left">
                                <h3 className="font-serif text-xl text-white flex items-center gap-2">
                                    <HelpCircle size={16} className="text-[#D88A3D] shrink-0" />
                                    <span>{faq.q}</span>
                                </h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed pl-6">{faq.a}</p>
                            </div>
                        ))}
                    </div>
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
                        <Link to="/outfit-check-for-occasions" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Occasion Outfit Check
                        </Link>
                        <Link to="/app" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Consumer App Overview
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── DOWNLOAD CTA SECTION ─────────────────────────────────────────── */}
            <AppDownloadSection source="outfit_second_opinion_page" />
        </div>
    );
};

export default OutfitSecondOpinionPage;
