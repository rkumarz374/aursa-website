import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackEvent } from '../../lib/analytics';
import { useRetailPilotModal } from '../../context/RetailPilotModalContext';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const RetailPilotPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const { openPilotModal } = useRetailPilotModal();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://aursa.app/retail-pilot#webpage',
                'url': 'https://aursa.app/retail-pilot',
                'name': 'Pilot AURSA in Your Fashion Stores | AURSA',
                'description': 'Explore a lightweight AURSA retail pilot designed to support shoppers during the fitting-room decision.',
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
                '@type': 'Service',
                '@id': 'https://aursa.app/retail-pilot#service',
                'name': 'AURSA Retail Pilot',
                'serviceType': 'Fashion Retail Fitting Room Decision Support Pilot',
                'provider': {
                    '@type': 'Organization',
                    '@id': 'https://aursa.app/#organization'
                },
                'description': 'A lightweight retail pilot allowing fashion stores to test personalized fitting-room decision support via shoppers\' smartphones without smart mirrors.'
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://aursa.app/retail-pilot#breadcrumb',
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
                        'name': 'Retail',
                        'item': 'https://aursa.app/retail'
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'name': 'Retail Pilot',
                        'item': 'https://aursa.app/retail-pilot'
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-28 sm:pt-32 pb-24 text-left relative">
            <SEOHead
                title="Pilot AURSA in Your Fashion Stores | AURSA"
                description="Explore a lightweight AURSA retail pilot designed to support shoppers during the fitting-room decision."
                path="/retail-pilot"
                canonical="https://aursa.app/retail-pilot"
                schema={PAGE_SCHEMA}
            />

            {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Building2 size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            RETAIL PILOT PROGRAM
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Pilot AURSA in Your Stores
                    </motion.h1>

                    <motion.div {...motionProps} className="bg-[#16161C]/80 border border-[#D88A3D]/30 p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm text-left space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#D88A3D] block font-neutra">
                            DIRECT ANSWER
                        </span>
                        <p className="font-sans text-base sm:text-lg text-[#F5F5F7] font-light leading-relaxed">
                            AURSA gives fashion retailers a lightweight way to test personalized fitting-room decision support for shoppers who are unsure about an outfit.
                        </p>
                    </motion.div>

                    <motion.div {...motionProps} className="pt-2">
                        <button
                            type="button"
                            onClick={(e) => openPilotModal('retail_pilot_hero', e)}
                            className="px-10 py-5 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl cursor-pointer"
                        >
                            Request a Retail Pilot
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── PILOT APPROACH ──────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">LOW-FRICTION DEPLOYMENT</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">How the pilot works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "No Specialized Hardware", desc: "Deployed through QR-based entry in fitting rooms, running on the shopper's own phone." },
                            { title: "Focused Store Scope", desc: "Test in selected store locations to observe shopper interaction during trial-room decision moments." },
                            { title: "Privacy-First Setup", desc: "Outfit photos are processed in real time and are not stored, ensuring complete customer privacy." }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-3">
                                <CheckCircle2 size={20} className="text-[#D88A3D]" />
                                <h3 className="font-serif text-xl text-white">{card.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SHOPPER EXPERIENCE ─────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12 text-center">
                    <div className="space-y-4">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">IN-STORE EXPERIENCE</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">The shopper journey</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <div className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/10 w-full sm:w-60 text-center space-y-2">
                            <span className="text-xs font-bold text-[#D88A3D] font-neutra">01 — TRY OUTFIT</span>
                            <p className="text-xs text-[#A1A1AA] font-light">Shopper selects garments and enters fitting room</p>
                        </div>
                        <ArrowRight size={20} className="text-[#D88A3D] hidden sm:block" />
                        <div className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/10 w-full sm:w-60 text-center space-y-2">
                            <span className="text-xs font-bold text-[#D88A3D] font-neutra">02 — OPEN AURSA</span>
                            <p className="text-xs text-[#A1A1AA] font-light">Scans QR code on phone standing at mirror</p>
                        </div>
                        <ArrowRight size={20} className="text-[#D88A3D] hidden sm:block" />
                        <div className="bg-[#16161C]/80 p-6 rounded-2xl border border-[#D88A3D]/40 w-full sm:w-60 text-center space-y-2 bg-[#D88A3D]/5">
                            <span className="text-xs font-bold text-[#D88A3D] font-neutra">03 — DECIDE</span>
                            <p className="text-xs text-white font-light">Receives private second opinion & decides with clarity</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PILOT PURPOSE ──────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">PURPOSE & LEARNING</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Understand shopper decision engagement.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        The pilot is designed to help retailers understand how shoppers engage with decision support during the fitting-room experience.
                    </p>
                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={(e) => openPilotModal('retail_pilot_mid', e)}
                            className="px-10 py-5 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl cursor-pointer"
                        >
                            Request a Retail Pilot
                        </button>
                    </div>
                </div>
            </section>

            {/* ── NATURAL LINKS ────────────────────────────────────────────────── */}
            <section className="py-16 px-6 border-t border-white/5 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">EXPLORE RETAIL CONCEPTS</span>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] font-neutra">
                        <Link to="/retail" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            AURSA Retail Overview
                        </Link>
                        <Link to="/smart-fitting-room" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Smart Fitting Room
                        </Link>
                        <Link to="/fitting-room-intelligence" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Fitting Room Intelligence
                        </Link>
                        <Link to="/fitting-room-analytics" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            Fitting Room Analytics
                        </Link>
                        <Link to="/in-store-personalization" className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                            In-Store Personalization
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RetailPilotPage;
