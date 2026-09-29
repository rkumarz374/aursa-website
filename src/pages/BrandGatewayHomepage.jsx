import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Building2, User } from 'lucide-react';
import SEOHead, { HOMEPAGE_SCHEMA } from '../components/SEOHead';
import { trackEvent } from '../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const BrandGatewayHomepage = () => {
    const [selectedContext, setSelectedContext] = useState('all'); // 'all' | 'retail' | 'personal'
    const shouldReduceMotion = useReducedMotion();

    const handleSelectContext = (ctx) => {
        setSelectedContext(ctx);
        if (ctx === 'retail') {
            trackEvent('homepage_retail_selected');
        } else if (ctx === 'personal') {
            trackEvent('homepage_personal_selected');
        }
    };

    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-28 sm:pt-32 pb-24 text-left relative">
            <SEOHead
                title="AURSA — Personal Style & Fashion Retail Intelligence"
                description="AURSA helps people make more confident outfit decisions — at home through Personal Style Intelligence and in-store through Fashion Retail Intelligence."
                path="/"
                schema={HOMEPAGE_SCHEMA}
            />

            {/* ── SECTION 1: HERO — THE MIRROR ────────────────────────────────── */}
            <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                {/* Layer 1: Ambient Backdrop Glow */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 rounded-full blur-[140px] ${
                        selectedContext === 'retail' 
                            ? 'w-[700px] h-[700px] bg-[#D88A3D]/10' 
                            : selectedContext === 'personal'
                            ? 'w-[700px] h-[700px] bg-[#E0A868]/10'
                            : 'w-[800px] h-[800px] bg-[#D88A3D]/8'
                    }`} />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    {/* Brand Eyebrow */}
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <Sparkles size={13} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            AURSA
                        </span>
                    </motion.div>

                    {/* H1 Primary Heading */}
                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight"
                    >
                        One mirror. Two moments.
                    </motion.h1>

                    {/* Supporting Copy */}
                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        AURSA helps you understand what works when you're standing in front of the mirror and deciding.
                    </motion.p>

                    {/* Context State Toggles */}
                    <motion.div {...motionProps} className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={() => handleSelectContext('all')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 border ${
                                selectedContext === 'all'
                                    ? 'bg-white/10 border-white/30 text-white'
                                    : 'border-white/5 bg-transparent text-[#A1A1AA] hover:text-white'
                            }`}
                        >
                            All Contexts
                        </button>
                        <button
                            onClick={() => handleSelectContext('retail')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 border ${
                                selectedContext === 'retail'
                                    ? 'bg-[#D88A3D] border-[#D88A3D] text-[#0F0F13]'
                                    : 'border-white/10 bg-white/5 text-[#F5F5F7] hover:border-[#D88A3D]/40'
                            }`}
                        >
                            In Store
                        </button>
                        <button
                            onClick={() => handleSelectContext('personal')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 border ${
                                selectedContext === 'personal'
                                    ? 'bg-[#D88A3D] border-[#D88A3D] text-[#0F0F13]'
                                    : 'border-white/10 bg-white/5 text-[#F5F5F7] hover:border-[#D88A3D]/40'
                            }`}
                        >
                            Before Stepping Out
                        </button>
                    </motion.div>

                    {/* CENTRAL VISUAL METAPHOR — THE MIRROR ENVIRONMENT */}
                    <motion.div 
                        {...motionProps}
                        className="relative w-full max-w-3xl mx-auto mt-10 rounded-3xl p-8 sm:p-10 border border-white/10 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 bg-[#16161C]/80"
                    >
                        {/* Mirror Frame Light Edge */}
                        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#D88A3D]/50 to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
                            {/* RETAIL CARD */}
                            <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                                selectedContext === 'retail' || selectedContext === 'all'
                                    ? 'bg-white/5 border-[#D88A3D]/40 shadow-lg'
                                    : 'bg-transparent border-white/5 opacity-40'
                            }`}>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-[#D88A3D]">
                                        <Building2 size={16} />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] font-neutra">IN STORE</span>
                                    </div>
                                    <h3 className="font-serif text-2xl text-[#FFFFFF]">Should I buy this?</h3>
                                    <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                        The trial-room moment when a shopper decides whether a look belongs in their wardrobe.
                                    </p>
                                </div>
                                <div className="pt-6">
                                    <Link
                                        to="/retail"
                                        onClick={() => trackEvent('homepage_retail_explore_click')}
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200 group"
                                    >
                                        <span>Explore AURSA Retail</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                                    </Link>
                                </div>
                            </div>

                            {/* PERSONAL CARD */}
                            <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                                selectedContext === 'personal' || selectedContext === 'all'
                                    ? 'bg-white/5 border-[#D88A3D]/40 shadow-lg'
                                    : 'bg-transparent border-white/5 opacity-40'
                            }`}>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-[#D88A3D]">
                                        <User size={16} />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] font-neutra">BEFORE STEPPING OUT</span>
                                    </div>
                                    <h3 className="font-serif text-2xl text-[#FFFFFF]">Should I wear this?</h3>
                                    <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                        The personal mirror moment before heading out to work, dinner, or an event.
                                    </p>
                                </div>
                                <div className="pt-6">
                                    <Link
                                        to="/app"
                                        onClick={() => trackEvent('homepage_personal_explore_click')}
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200 group"
                                    >
                                        <span>Explore AURSA Personal</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Subordinate Brand Promise */}
                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <span className="text-[11px] uppercase tracking-[0.35em] text-[#A1A1AA] font-neutra">
                                Brand Promise: <strong className="text-[#F5F5F7]">Wear with Confidence.</strong>
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 2: THE SHARED PAUSE ──────────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.p {...motionProps} className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">
                        DIFFERENT PLACES. SAME PAUSE.
                    </motion.p>
                    <motion.h2 {...motionProps} className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-tight font-light">
                        You already chose the outfit.
                    </motion.h2>

                    <motion.div {...motionProps} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-left">
                        <div className="bg-[#16161C]/60 p-6 rounded-2xl border border-white/5">
                            <p className="text-xs uppercase tracking-[0.25em] text-[#D88A3D] font-bold mb-2 font-neutra">In Store</p>
                            <p className="text-lg text-[#F5F5F7] font-serif">You liked it enough to try it.</p>
                        </div>
                        <div className="bg-[#16161C]/60 p-6 rounded-2xl border border-white/5">
                            <p className="text-xs uppercase tracking-[0.25em] text-[#D88A3D] font-bold mb-2 font-neutra">At Home</p>
                            <p className="text-lg text-[#F5F5F7] font-serif">You liked it enough to put it on.</p>
                        </div>
                    </motion.div>

                    <motion.p {...motionProps} className="font-sans text-xl md:text-2xl text-[#A1A1AA] font-light leading-relaxed pt-4">
                        Now you're wondering if it actually works.
                    </motion.p>
                </div>
            </section>

            {/* ── SECTION 3: TWO DECISION JOURNEYS ─────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-5xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF]">Two Decision Journeys</h2>
                        <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto">
                            Whether standing in a fitting room or in your bedroom, the moment of decision requires clarity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* RETAIL JOURNEY */}
                        <motion.div {...motionProps} id="retail" className="bg-[#16161C]/50 p-8 rounded-3xl border border-white/5 space-y-8 scroll-mt-28">
                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">AURSA RETAIL</span>
                                <h3 className="font-serif text-3xl text-[#FFFFFF]">The Trial-Room Journey</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { step: "01", title: "TRY", desc: "Shopper selects garments and steps into the fitting room." },
                                    { step: "02", title: "PAUSE", desc: "Standing in front of the mirror, uncertainty creates hesitation." },
                                    { step: "03", title: "SECOND OPINION", desc: "AURSA provides private visual feedback on fit and balance." },
                                    { step: "04", title: "DECIDE", desc: "Shopper steps out with purchase confidence." }
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <span className="text-xs font-bold text-[#D88A3D] tracking-widest pt-0.5">{item.step}</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#F5F5F7] tracking-wider uppercase font-neutra">{item.title}</h4>
                                            <p className="text-xs text-[#A1A1AA] font-light mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-[#A1A1AA] italic font-light pt-2">
                                "The decision happens while the shopper is still in front of the mirror."
                            </p>
                        </motion.div>

                        {/* PERSONAL JOURNEY */}
                        <motion.div {...motionProps} id="personal" className="bg-[#16161C]/50 p-8 rounded-3xl border border-white/5 space-y-8 scroll-mt-28">
                            <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">AURSA PERSONAL</span>
                                <h3 className="font-serif text-3xl text-[#FFFFFF]">The Personal Mirror Journey</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { step: "01", title: "GET DRESSED", desc: "Select an outfit for the day, work, dinner, or an event." },
                                    { step: "02", title: "MIRROR MOMENT", desc: "Look in the mirror and check contrast and silhouette." },
                                    { step: "03", title: "SECOND OPINION", desc: "Get real-time feedback on visual balance and harmony." },
                                    { step: "04", title: "STEP OUT", desc: "Head out feeling completely confident in your look." }
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <span className="text-xs font-bold text-[#D88A3D] tracking-widest pt-0.5">{item.step}</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#F5F5F7] tracking-wider uppercase font-neutra">{item.title}</h4>
                                            <p className="text-xs text-[#A1A1AA] font-light mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-[#A1A1AA] italic font-light pt-2">
                                "A second opinion for the moment before you leave."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: PRIVACY ────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 text-[#D88A3D]">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-neutra">PRIVATE BY DESIGN</span>
                    </motion.div>

                    <motion.h2 {...motionProps} className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                        Your outfit photo isn't stored.
                    </motion.h2>

                    <motion.p {...motionProps} className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        AURSA uses the image solely to understand the look and deliver real-time analysis. Your photo stays private.
                    </motion.p>

                    <motion.div {...motionProps} className="pt-2">
                        <Link
                            to="/privacy"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>Read Privacy</span>
                            <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── SECTION 5: FINAL CHOICE ───────────────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 relative z-10 text-center">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="space-y-4">
                        <h2 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF]">Where are you meeting AURSA?</h2>
                        <p className="text-base text-[#A1A1AA] font-light">Select how you'd like to experience AURSA.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                        {/* RETAIL CHOICE */}
                        <div className="bg-[#16161C]/80 p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
                            <div className="space-y-3">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">FOR RETAIL</span>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFFFF]">Make the trial-room decision more confident.</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                    Bring AURSA into the fitting room when shoppers are deciding whether a look actually works for them.
                                </p>
                            </div>
                            <div className="pt-4">
                                <Link
                                    to="/retail"
                                    onClick={() => trackEvent('homepage_retail_explore_click')}
                                    className="inline-flex items-center justify-center w-full px-6 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                                >
                                    Explore AURSA Retail
                                </Link>
                            </div>
                        </div>

                        {/* PERSONAL CHOICE */}
                        <div className="bg-[#16161C]/80 p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
                            <div className="space-y-3">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D88A3D] font-neutra">FOR YOU</span>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFFFF]">Know what works before you step out.</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                    Get a private second opinion on your outfit when you're standing in front of the mirror and unsure.
                                </p>
                            </div>
                            <div className="pt-4 flex flex-col space-y-4">
                                <Link
                                    to="/app"
                                    onClick={() => trackEvent('homepage_personal_explore_click')}
                                    className="inline-flex items-center justify-center w-full px-6 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                                >
                                    Explore AURSA Personal
                                </Link>
                                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                    <a
                                        href="https://apps.apple.com/in/app/aursa/id6761254001"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackEvent('app_store_click', { store: 'apple', source: 'homepage' })}
                                        className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us" alt="Download on the App Store" className="h-[40px] w-auto object-contain" />
                                    </a>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.aursa.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackEvent('app_store_click', { store: 'google', source: 'homepage' })}
                                        className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-[40px] w-auto object-contain" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <p className="font-serif text-3xl sm:text-4xl text-[#FFFFFF]">Wear with Confidence.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BrandGatewayHomepage;
