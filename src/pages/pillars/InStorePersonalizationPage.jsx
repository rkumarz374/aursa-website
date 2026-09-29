import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const InStorePersonalizationPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/in-store-personalization#webpage',
        'url': 'https://aursa.app/in-store-personalization',
        'name': 'In-Store Personalization for Fashion Retail | AURSA',
        'description': 'Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.',
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
                title="In-Store Personalization for Fashion Retail | AURSA"
                description="Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience."
                path="/in-store-personalization"
                canonical="https://aursa.app/in-store-personalization"
                schema={PAGE_SCHEMA}
            />

            {/* HERO SECTION */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <UserCheck size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            PERSONALIZATION & EXPERIENCE
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto"
                    >
                        Personalization shouldn't stop when the shopper enters the store.
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.
                    </motion.p>
                </div>
            </section>

            {/* 1. THE PHYSICAL STORE GAP */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE PHYSICAL GAP</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Extending personalization into physical retail</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        Digital channels offer personalized recommendations, search filters, and tailored feeds. However, when a shopper enters a physical store and steps into the fitting room, personalization often drops off. Extending personalization in-store requires supporting the shopper's individual decision moment.
                    </p>
                </div>
            </section>

            {/* 2. PRODUCT VS DECISION PERSONALIZATION */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">TWO TYPES OF PERSONALIZATION</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">Product personalization vs decision personalization</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-white/5 space-y-3">
                            <h3 className="font-serif text-xl text-white">Product Personalization</h3>
                            <p className="text-xs font-neutra uppercase tracking-wider text-[#D88A3D]">"What might I like?"</p>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Curates item recommendations, trending styles, and catalogue suggestions based on browsing history.
                            </p>
                        </div>
                        <div className="bg-[#16161C]/80 p-8 rounded-2xl border border-[#D88A3D]/40 space-y-3 bg-[#D88A3D]/5">
                            <h3 className="font-serif text-xl text-white">Decision Personalization</h3>
                            <p className="text-xs font-neutra uppercase tracking-wider text-[#D88A3D]">"Does this work for me?"</p>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Provides tailored visual feedback when the shopper is wearing the look, accounting for their personal proportion, occasion, and style direction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. AURSA PHILOSOPHY */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">OUR PHILOSOPHY</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">The same answer shouldn't work for every shopper.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        A useful second opinion starts with the person wearing the look. AURSA is designed around individual clarity — helping the shopper understand what works for them rather than pushing general fashion trends.
                    </p>
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
                        The outfit photo isn't stored. Personalization happens securely through the shopper's smartphone without keeping outfit images.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/retail"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'in_store_personalization', destination: 'retail' })}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Explore AURSA Retail
                        </Link>
                        <Link
                            to="/retail#retail-pilot"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'in_store_personalization', destination: 'pilot' })}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Request a Retail Pilot
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InStorePersonalizationPage;
