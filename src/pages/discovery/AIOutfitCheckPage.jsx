import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, Smartphone } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import AppDownloadSection from '../../components/AppDownloadSection';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const AIOutfitCheckPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://aursa.app/ai-outfit-check#webpage',
                'url': 'https://aursa.app/ai-outfit-check',
                'name': 'AI Outfit Check — Get a Second Opinion on Your Outfit | AURSA',
                'description': "Not sure about your outfit? AURSA gives you a personalized second opinion on the look you're already wearing before you step out.",
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
                '@type': 'SoftwareApplication',
                '@id': 'https://aursa.app/#softwareapplication',
                'name': 'AURSA',
                'operatingSystem': 'iOS, Android',
                'applicationCategory': 'Style & Fashion Application',
                'url': 'https://aursa.app/',
                'description': 'AURSA is an AI-powered outfit analysis app that gives people a personalized second opinion on what they are already wearing before they step out.'
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://aursa.app/ai-outfit-check#breadcrumb',
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
                        'name': 'AI Outfit Check',
                        'item': 'https://aursa.app/ai-outfit-check'
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-28 sm:pt-32 pb-24 text-left relative">
            <SEOHead
                title="AI Outfit Check — Get a Second Opinion on Your Outfit | AURSA"
                description="Not sure about your outfit? AURSA gives you a personalized second opinion on the look you're already wearing before you step out."
                path="/ai-outfit-check"
                canonical="https://aursa.app/ai-outfit-check"
                schema={PAGE_SCHEMA}
            />

            {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Sparkles size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            AI OUTFIT CHECK
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Get a Second Opinion on Your Outfit
                    </motion.h1>

                    <motion.div {...motionProps} className="bg-[#16161C]/80 border border-[#D88A3D]/30 p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm text-left space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#D88A3D] block font-neutra">
                            DIRECT ANSWER
                        </span>
                        <p className="font-sans text-base sm:text-lg text-[#F5F5F7] font-light leading-relaxed">
                            Already dressed but not sure if the outfit works? AURSA gives you a personalized second opinion on the look you're wearing so you can understand what's working and decide with more confidence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── WHAT CAN AURSA HELP WITH? ──────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">USEFUL PERSPECTIVE</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">What can AURSA help with?</h2>
                        <p className="text-base text-[#A1A1AA] font-light">
                            AURSA provides objective visual feedback when you're standing in front of the mirror and experiencing hesitation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Understanding Visual Balance", desc: "See whether the colors, proportions, and layering in your look feel harmonious and intentional." },
                            { title: "Gaining Another Perspective", desc: "Get objective, non-judgmental feedback without having to send photos or ask friends." },
                            { title: "Noticing Small Adjustments", desc: "Discover simple tweaks — like adjusting a tuck or cuff — that can make the look feel cleaner." },
                            { title: "Deciding with Clarity", desc: "Step out knowing why your outfit works, feeling completely confident in your own choice." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-2">
                                <h3 className="font-serif text-xl text-white">{item.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW DO YOU USE IT? ─────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12 text-center">
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">SIMPLE USER EXPERIENCE</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">How do you use it?</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {[
                            { step: "01", title: "Share Your Look", desc: "Share the outfit you are currently wearing." },
                            { step: "02", title: "Second Opinion", desc: "Receive an instant, personalized second opinion." },
                            { step: "03", title: "Review Feedback", desc: "Understand what's working and what you may adjust." },
                            { step: "04", title: "Step Out", desc: "Make your own decision and wear with confidence." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#16161C]/60 p-6 rounded-2xl border border-white/5 space-y-2 text-left">
                                <span className="text-xs font-bold text-[#D88A3D] font-neutra block">{item.step}</span>
                                <h3 className="font-serif text-lg text-white">{item.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHEN IS IT USEFUL? ─────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-10">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">EVERYDAY MOMENTS</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">When is an outfit check useful?</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            "Before going out",
                            "Before a first date",
                            "Before a job interview",
                            "Before work or a meeting",
                            "Before a wedding or event",
                            "While shopping alone",
                            "When an outfit feels off",
                            "When trying new styles"
                        ].map((moment, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-[#D88A3D] shrink-0" />
                                <span className="text-xs text-[#F5F5F7] font-light">{moment}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── NOT A FASHION JUDGE ────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">OUR APPROACH</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Not a fashion judge.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                        AURSA is not designed to tell you that your personal style is right or wrong. It gives you another perspective on the outfit you're already wearing so you can decide for yourself.
                    </p>
                </div>
            </section>

            {/* ── VISIBLE Q&A / FAQ ────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-10">
                    <div className="text-center space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">QUESTIONS & ANSWERS</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "What is an AI outfit checker?",
                                a: "An AI outfit checker is a digital assistant that evaluates an outfit you are wearing to provide objective feedback on visual balance, color harmony, and overall presentation."
                            },
                            {
                                q: "Can I get feedback on an outfit I'm already wearing?",
                                a: "Yes. AURSA is designed specifically for the moment after you are dressed, helping you evaluate your look before you step out."
                            },
                            {
                                q: "Can I use AURSA before going out?",
                                a: "Absolutely. AURSA provides an instant second opinion standing in front of your mirror, helping reduce hesitation before you walk out the door."
                            },
                            {
                                q: "Can I use AURSA before a date or interview?",
                                a: "Yes. You can use AURSA to check whether your outfit feels visually balanced and appropriate for specific settings like dates, work, or interviews."
                            },
                            {
                                q: "Does AURSA judge my appearance?",
                                a: "No. AURSA never scores body shapes, rates attractiveness, or judges personal style choices. It focuses purely on visual harmony and proportion."
                            },
                            {
                                q: "Is AURSA available on iPhone and Android?",
                                a: "Yes. AURSA is available on both the Apple App Store and Google Play Store."
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

            {/* ── NATURAL INTERNAL LINKS ───────────────────────────────────────── */}
            <section className="py-16 px-6 border-t border-white/5 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">EXPLORE MORE</span>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] font-neutra">
                        <Link to="/outfit-second-opinion" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Outfit Second Opinion
                        </Link>
                        <Link to="/outfit-check-for-occasions" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Occasion Outfit Check
                        </Link>
                        <Link to="/personal-style-intelligence" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Personal Style Intelligence
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── DOWNLOAD CTA SECTION ─────────────────────────────────────────── */}
            <AppDownloadSection source="ai_outfit_check_page" />
        </div>
    );
};

export default AIOutfitCheckPage;
