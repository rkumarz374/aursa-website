import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const FittingRoomAnalyticsPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/fitting-room-analytics#webpage',
        'url': 'https://aursa.app/fitting-room-analytics',
        'name': 'Fitting Room Analytics & Shopper Decision Insights | AURSA',
        'description': 'Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.',
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
                title="Fitting Room Analytics & Shopper Decision Insights | AURSA"
                description="Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences."
                path="/fitting-room-analytics"
                canonical="https://aursa.app/fitting-room-analytics"
                schema={PAGE_SCHEMA}
            />

            {/* HERO SECTION */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <BarChart2 size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            MEASUREMENT & SIGNALS
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto"
                    >
                        Purchase data tells you what sold. What happened before it?
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.
                    </motion.p>
                </div>
            </section>

            {/* 1. THE OUTCOME GAP */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE OUTCOME GAP</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Sales data starts at the end of the story.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Transaction records document completed sales, but they cannot automatically explain why a shopper tried on three garments and purchased only one. Fitting room analytics focuses on exploring the signals generated during the decision phase itself.
                    </p>
                </div>
            </section>

            {/* 2. WHAT IS FITTING ROOM ANALYTICS */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">DEFINITION & SCOPE</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">What is fitting room analytics?</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Fitting room analytics refers to measuring try-on activity, decision engagement, and styling interactions inside physical fitting rooms. While traditional approaches focus primarily on counting foot traffic, modern frameworks focus on understanding decision context.
                    </p>
                </div>
            </section>

            {/* 3. WHAT DECISION SIGNALS MIGHT A RETAILER EXPLORE? */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">PILOT SIGNAL CATEGORIES</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">What decision signals might a retailer explore?</h2>
                        <p className="text-xs text-[#A1A1AA] font-light font-neutra">
                            Illustrative pilot signal categories — not live retailer data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Where Shoppers Pause", desc: "Identifying which garment combinations prompt evaluation or hesitation in the fitting room." },
                            { title: "Recurring Styling Questions", desc: "Understanding common visual balance, fit, and proportions questions across collections." },
                            { title: "Recommendation Engagement", desc: "Observing how shoppers interact with second-opinion styling suggestions." },
                            { title: "Add-On & Pairing Relevance", desc: "Exploring natural pairing opportunities at the exact moment of decision." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-2">
                                <h3 className="font-serif text-xl text-white">{item.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRIVACY & EXPLORE CTAS */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 text-[#D88A3D]">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-neutra">PRIVATE BY DESIGN</span>
                    </div>
                    <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto">
                        The outfit photo isn't stored. Analytics explore aggregated decision signals without compromising individual shopper privacy.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/retail"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'fitting_room_analytics', destination: 'retail' })}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Explore AURSA Retail
                        </Link>
                        <Link
                            to="/retail#trial-room-experience"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'fitting_room_analytics', destination: 'trial_room' })}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            See Interactive Trial-Room Experience
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FittingRoomAnalyticsPage;
