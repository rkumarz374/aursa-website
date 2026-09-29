import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Lightbulb, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const FittingRoomIntelligencePage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/fitting-room-intelligence#webpage',
        'url': 'https://aursa.app/fitting-room-intelligence',
        'name': 'What Is Fitting Room Intelligence? | AURSA',
        'description': "Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.",
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
                title="What Is Fitting Room Intelligence? | AURSA"
                description="Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next."
                path="/fitting-room-intelligence"
                canonical="https://aursa.app/fitting-room-intelligence"
                schema={PAGE_SCHEMA}
            />

            {/* HERO SECTION */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Lightbulb size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            CATEGORY CONCEPT & DEFINITION
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto"
                    >
                        What happens between try-on and purchase?
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.
                    </motion.p>
                </div>
            </section>

            {/* 1. THE MISSING MOMENT */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE UNHEARD PAUSE</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">The missing moment in retail data</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Retail systems track what enters the store and what leaves through the register. But between browsing the rack and completing a transaction, there is a pivotal human pause inside the fitting room where the shopper decides whether an outfit actually works for them.
                    </p>
                </div>
            </section>

            {/* 2. DEFINING FITTING ROOM INTELLIGENCE */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">DEFINITION</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">What is fitting-room intelligence?</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        We use fitting-room intelligence to describe the concept of understanding shopper decision engagement, styling questions, and try-on considerations at the moment of choice — rather than relying strictly on final sales figures.
                    </p>
                </div>
            </section>

            {/* 3. FROM OUTCOME TO CONTEXT */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">TRANSACTION VS DECISION</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">From outcome to context</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-white/5 space-y-3">
                            <h3 className="font-serif text-xl text-white">Transaction Data</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Tells retailers what was purchased, when it sold, and at what price. It records the outcome of a decision that already took place.
                            </p>
                        </div>
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-[#D88A3D]/40 space-y-3 bg-[#D88A3D]/5">
                            <h3 className="font-serif text-xl text-white">Decision Context</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Surfaces what shoppers were considering, what fit or styling questions caused hesitation, and what pairing options added clarity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SHOPPER & RETAILER PERSPECTIVES */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-8 text-left">
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">DUAL VALUE</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">The decision belongs to the shopper.</h2>
                    </div>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        For the shopper, fitting room intelligence means receiving a private, objective second opinion standing in front of the mirror when hesitation occurs. For the retailer, pilots can help explore whether decision interactions surface aggregated styling and try-on insights.
                    </p>
                </div>
            </section>

            {/* PRIVACY & EXPLORE CTAS */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 text-[#D88A3D]">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-neutra">PRIVATE BY DESIGN</span>
                    </div>
                    <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto">
                        The outfit photo isn't stored. Fitting room intelligence prioritizes shopper privacy above all else.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/retail"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'fitting_room_intelligence', destination: 'retail' })}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            See AURSA Retail
                        </Link>
                        <Link
                            to="/fitting-room-analytics"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'fitting_room_intelligence', destination: 'pillar' })}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Read Fitting Room Analytics
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FittingRoomIntelligencePage;
