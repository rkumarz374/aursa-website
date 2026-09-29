import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cpu, Smartphone, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const SmartFittingRoomPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const PAGE_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/smart-fitting-room#webpage',
        'url': 'https://aursa.app/smart-fitting-room',
        'name': 'Smart Fitting Rooms Without New Hardware | AURSA',
        'description': 'Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.',
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
                title="Smart Fitting Rooms Without New Hardware | AURSA"
                description="Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror."
                path="/smart-fitting-room"
                canonical="https://aursa.app/smart-fitting-room"
                schema={PAGE_SCHEMA}
            />

            {/* HERO SECTION */}
            <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Cpu size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            RETAIL TECHNOLOGY EVALUATION
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto"
                    >
                        Make the fitting room smarter — without making the mirror smart.
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.
                    </motion.p>
                </div>
            </section>

            {/* 1. QUICK DEFINITION */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">CATEGORY OVERVIEW</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">What is a smart fitting room?</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        A smart fitting room (or smart trial room) refers to physical retail fitting-room spaces enhanced with technology to support shopper decisions, streamline associate assistance, or provide interactive visual and styling guidance.
                    </p>
                </div>
            </section>

            {/* 2. WHY FITTING ROOMS ARE BECOMING DIGITAL */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE RETAIL TRANSITION</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Why fitting rooms are becoming digital</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        The fitting room is where product consideration transforms into a purchase decision. Retailers introduce technology into this space to address key operational and customer experience challenges:
                    </p>
                    <ul className="space-y-3 pt-2">
                        {[
                            "Access to sizing and inventory availability without leaving the fitting room",
                            "Assistance requests directly to store associates",
                            "Styling advice and outfit pairing suggestions",
                            "Understanding shopper hesitation before they leave the store"
                        ].map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-[#A1A1AA] font-light">
                                <CheckCircle2 size={16} className="text-[#D88A3D] shrink-0 mt-1" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 3. COMMON SMART FITTING ROOM APPROACHES */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">APPROACHES & ARCHITECTURE</span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-white">Common smart-fitting-room approaches</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Smart Mirror / Display Screens", desc: "Digital screens embedded directly into or behind the mirror glass to display product information and controls." },
                            { title: "RFID / Item Recognition", desc: "Sensors built into the fitting room walls or racks that automatically detect which garments the shopper brought in." },
                            { title: "Virtual Try-On Hardware", desc: "3D camera or augmented reality systems attempting to simulate garments virtually." },
                            { title: "Shopper-Phone Experience", desc: "QR or web-based entry allowing shoppers to access intelligent decision support using their own smartphones." }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-2">
                                <h3 className="font-serif text-xl text-white">{card.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. THE HARDWARE QUESTION */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">HARDWARE VS EXPERIENCE</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">Does a smart fitting room need a smart mirror?</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed">
                        No. The value of a smart fitting room comes from decision support and intelligence, not physical screen hardware. High-CAPEX smart mirrors require custom electrical installation, maintenance, and regular hardware upgrades. By separating the intelligence layer from the physical mirror, retailers can introduce trial-room intelligence faster.
                    </p>
                </div>
            </section>

            {/* 5. A SHOPPER-PHONE ALTERNATIVE & 6. WHERE AURSA FITS */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">THE AURSA APPROACH</span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white">AURSA focuses on the decision, not the display.</h2>
                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                        AURSA connects physical trial rooms to the shopper's smartphone via QR-based entry. The shopper receives a private second opinion standing right in front of their mirror, while retailers explore decision signals without rebuilding their store hardware.
                    </p>
                    <div className="flex justify-center gap-6 pt-4 text-xs font-neutra text-[#A1A1AA]">
                        <span>FITTING ROOM</span> → <span>SHOPPER'S PHONE</span> → <span>AURSA</span>
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
                        The outfit photo isn't stored. AURSA uses the image to deliver real-time decision clarity without storing customer photos.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/retail"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'smart_fitting_room', destination: 'retail' })}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Explore AURSA Retail
                        </Link>
                        <Link
                            to="/fitting-room-intelligence"
                            onClick={() => trackEvent('retail_pillar_cta_click', { pillar: 'smart_fitting_room', destination: 'pillar' })}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            Read Fitting Room Intelligence
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SmartFittingRoomPage;
