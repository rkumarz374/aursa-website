import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, QrCode, ShieldCheck, ArrowUpRight, Sliders } from 'lucide-react';
import SEOHead, { HOMEPAGE_SCHEMA } from '../components/SEOHead';
import AppDownloadSection from '../components/AppDownloadSection';
import { trackEvent } from '../lib/analytics';
import { useRetailPilotModal } from '../context/RetailPilotModalContext';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const BrandGatewayHomepage = () => {
    const shouldReduceMotion = useReducedMotion();
    const [sliderPos, setSliderPos] = useState(55); // 0 = Full Retail, 100 = Full Personal. Default 55% Retail / 45% Personal
    const { openPilotModal } = useRetailPilotModal();

    const motionProps = shouldReduceMotion
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden text-left relative">
            <SEOHead
                title="AURSA — Personal Style & Fashion Retail Intelligence"
                description="AURSA provides fitting-room decision intelligence for fashion retail on the shopper's own phone — no smart mirror required."
                path="/"
                schema={HOMEPAGE_SCHEMA}
            />

            {/* ── SECTION 1: HERO — DECISION INTELLIGENCE FOR THE FITTING ROOM ── */}
            <section className="relative min-h-screen min-h-[100svh] flex flex-col justify-center pt-28 sm:pt-32 pb-12 sm:pb-16 px-6 overflow-hidden bg-[#0F0F13]">
                {/* Layer 0 & 1: Hero Background Photography & Dark Overlay */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Background Photograph */}
                    <div
                        className="absolute inset-0 bg-no-repeat bg-cover bg-[65%_center] sm:bg-[65%_center] lg:bg-[65%_center]"
                        style={{
                            backgroundImage: `url('/hero%20background.png')`
                        }}
                    />

                    {/* Dark Cinematic Gradients (Horizontal + Vertical) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                                linear-gradient(90deg, rgba(15,15,19,0.96) 0%, rgba(15,15,19,0.90) 35%, rgba(15,15,19,0.70) 60%, rgba(15,15,19,0.35) 100%),
                                linear-gradient(180deg, rgba(15,15,19,0.6) 0%, transparent 20%, transparent 80%, rgba(15,15,19,0.95) 100%)
                            `
                        }}
                    />

                    {/* Ambient Glow Accent */}
                    <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-[1200px] mx-auto relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        {/* Left Column: Asymmetric 58% Narrative */}
                        <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <motion.div {...motionProps} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10">
                                <Sparkles size={13} className="text-[#D88A3D]" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                                    AURSA FOR FASHION RETAIL
                                </span>
                            </motion.div>

                            <motion.h1
                                {...motionProps}
                                className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] sm:leading-[1.05] tracking-tight text-center lg:text-left"
                            >
                                Decision intelligence for the fitting room.
                            </motion.h1>

                            <motion.p
                                {...motionProps}
                                className="font-sans text-[#A1A1AA] text-base sm:text-xl font-light leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0"
                            >
                                AURSA helps shoppers answer “Does this actually work for me?” before they buy — with a private, personalized second opinion on their own phone.
                            </motion.p>

                            <motion.div {...motionProps} className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2 w-full sm:w-auto">
                                <a
                                    href="#how-aursa-helps"
                                    className="px-6 py-3.5 rounded-xl border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs uppercase font-bold tracking-[0.25em] transition-all duration-200 inline-flex items-center gap-2 shadow-lg shadow-[#D88A3D]/10"
                                >
                                    <span>See How It Works</span>
                                    <ArrowRight size={14} />
                                </a>

                                <button
                                    type="button"
                                    onClick={(e) => openPilotModal('hero_secondary', e)}
                                    className="px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10 text-white text-xs uppercase font-bold tracking-[0.25em] transition-all duration-200 cursor-pointer"
                                >
                                    Request a Retail Pilot
                                </button>
                            </motion.div>

                            {/* Compact Hero Proof Strip */}
                            <motion.div {...motionProps} className="pt-4 md:pt-6 border-t border-white/10 max-w-xl w-full mx-auto lg:mx-0">
                                {/* Mobile 1-Line Compact Proof Strip (< md) */}
                                <div className="flex md:hidden items-center justify-center sm:justify-between gap-3 sm:gap-4 whitespace-nowrap text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#D88A3D] mx-auto">
                                    <span>PRIVATE</span>
                                    <span className="text-[#D88A3D]/70 font-normal">•</span>
                                    <span>QR-BASED</span>
                                    <span className="text-[#D88A3D]/70 font-normal">•</span>
                                    <span>DEPLOY FAST</span>
                                </div>

                                {/* Desktop & Tablet Full 3-Column Proof Strip (>= md) */}
                                <div className="hidden md:grid md:grid-cols-3 gap-4 divide-x divide-white/10 text-left">
                                    <div className="pr-2 space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D88A3D] block">
                                            PRIVATE
                                        </span>
                                        <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                            Your outfit photo isn't stored.
                                        </p>
                                    </div>
                                    <div className="px-4 space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D88A3D] block">
                                            QR-BASED
                                        </span>
                                        <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                            No new hardware required.
                                        </p>
                                    </div>
                                    <div className="pl-4 space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D88A3D] block">
                                            DEPLOY FAST
                                        </span>
                                        <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                            Deploy in minutes.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Compact Floating AURSA Analysis Panel (~75% Desktop Scale) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <motion.div
                                {...motionProps}
                                className="w-full max-w-[264px] rounded-xl border border-white/10 bg-[#16161C]/92 backdrop-blur-md p-3.5 shadow-2xl space-y-2.5 relative"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D88A3D]/40 to-transparent" />

                                {/* Compact Panel Header */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                        <span className="text-[9px] uppercase font-bold tracking-[0.22em] text-[#F5F5F7]">
                                            AURSA ANALYSIS
                                        </span>
                                    </div>
                                    <span className="text-[8px] uppercase font-bold tracking-[0.18em] text-[#D88A3D]">
                                        DECISION MOMENT
                                    </span>
                                </div>

                                {/* Portrait 4:5 Visual of the fitting room selfie moment */}
                                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-[#0F0F13]">
                                    <img
                                        src="/selfie%20rial%20room.png"
                                        alt="Shopper fitting room selfie analysis"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>

                                {/* Readout Content */}
                                <div className="space-y-2">
                                    {/* OVERALL READ */}
                                    <div className="space-y-0.5">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#D88A3D] block">
                                            OVERALL READ
                                        </span>
                                        <p className="text-[13px] font-medium text-white leading-snug font-serif">
                                            Balanced, elegant, and polished.
                                        </p>
                                    </div>

                                    {/* WHAT'S WORKING */}
                                    <div className="space-y-0.5 pt-1.5 border-t border-white/5">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#A1A1AA] block">
                                            WHAT’S WORKING
                                        </span>
                                        <ul className="space-y-0.5 text-[11px] text-[#A1A1AA] font-light leading-relaxed">
                                            <li className="flex items-start gap-1">
                                                <span className="text-[#D88A3D] font-bold">•</span>
                                                <span>Strong contrast between dark top & light trousers</span>
                                            </li>
                                            <li className="flex items-start gap-1">
                                                <span className="text-[#D88A3D] font-bold">•</span>
                                                <span>The silhouette feels clean and refined</span>
                                            </li>
                                            <li className="flex items-start gap-1">
                                                <span className="text-[#D88A3D] font-bold">•</span>
                                                <span>The outfit reads confident and composed</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* TRY THIS */}
                                    <div className="space-y-0.5 pt-1.5 border-t border-white/5">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#D88A3D] block">
                                            TRY THIS
                                        </span>
                                        <p className="text-[11px] text-[#A1A1AA] font-light leading-relaxed">
                                            Add a structured outer layer if you want a sharper finish.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ── SECTION 2: THE DECISION MOMENT ───────────────────────────────── */}
            <section className="py-24 sm:py-32 px-6 bg-[#F5F5F7] text-[#0F0F13] relative z-10">
                <div className="max-w-[1100px] mx-auto space-y-16">
                    <div className="max-w-3xl space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                            THE DECISION MOMENT
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0F0F13] leading-tight font-normal">
                            The decision happens after the try-on.
                        </h2>
                        <p className="font-sans text-lg sm:text-xl text-[#4A4A52] font-light leading-relaxed">
                            They've already found it. Picked their size. Put it on. Then comes the pause: “Does this actually work for me?”
                        </p>
                    </div>

                    {/* Simple Editorial TRY -> PAUSE -> DECIDE Sequence */}
                    <div className="pt-8 border-t border-black/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">

                            <div className="space-y-3 opacity-60">
                                <span className="font-serif text-3xl sm:text-4xl text-[#D88A3D]">01</span>
                                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#0F0F13]">TRY</h3>
                                <p className="text-sm text-[#4A4A52] font-light leading-relaxed">
                                    Garments selected on the floor and brought into the fitting room.
                                </p>
                            </div>

                            <div className="space-y-3 p-6 rounded-2xl bg-white shadow-md border-l-4 border-[#D88A3D] -mt-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-serif text-4xl text-[#D88A3D] font-bold">02</span>
                                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#D88A3D]/10 text-[#D88A3D]">
                                        THE PAUSE
                                    </span>
                                </div>
                                <h3 className="text-base font-bold uppercase tracking-[0.25em] text-[#0F0F13]">PAUSE</h3>
                                <p className="text-sm text-[#0F0F13] font-normal leading-relaxed">
                                    Standing in front of the mirror, uncertainty creates hesitation.
                                </p>
                            </div>

                            <div className="space-y-3 opacity-60">
                                <span className="font-serif text-3xl sm:text-4xl text-[#D88A3D]">03</span>
                                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#0F0F13]">DECIDE</h3>
                                <p className="text-sm text-[#4A4A52] font-light leading-relaxed">
                                    Shopper steps out with purchase clarity and confidence.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 3: HOW AURSA HELPS ───────────────────────────────────── */}
            <section id="how-aursa-helps" className="py-24 sm:py-32 px-6 bg-[#0F0F13] border-t border-white/5 relative z-10 scroll-mt-28">
                <div className="max-w-[1100px] mx-auto space-y-16">
                    <div className="max-w-3xl space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                            HOW AURSA HELPS
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-tight font-normal">
                            A second opinion, right when it matters.
                        </h2>
                        <p className="font-sans text-lg sm:text-xl text-[#A1A1AA] font-light leading-relaxed">
                            The shopper checks the look with AURSA on their phone, gets a private personalized second opinion, and decides with more clarity.
                        </p>
                    </div>

                    {/* Simple 3-step Product Flow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#16161C] p-6 rounded-2xl border border-white/5 space-y-3">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D]">01</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">TRY THE LOOK</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Shopper steps into the fitting room and tries on the garment.
                            </p>
                        </div>

                        <div className="bg-[#16161C] p-6 rounded-2xl border border-[#D88A3D]/40 space-y-3 shadow-lg">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D]">02</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">CHECK WITH AURSA</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Scans QR, checks visual balance and proportions privately on phone.
                            </p>
                        </div>

                        <div className="bg-[#16161C] p-6 rounded-2xl border border-white/5 space-y-3">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D]">03</span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">DECIDE</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Steps out to buy with purchase clarity and fit confidence.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-light">
                            <ShieldCheck size={16} className="text-[#D88A3D] shrink-0" />
                            <span>Your outfit photo isn't stored.</span>
                        </div>

                        <Link
                            to="/retail#trial-room-experience"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>See the full retail experience</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* ── SECTION 4: RETAIL INTELLIGENCE ──────────────────────────────── */}
            <section className="py-24 sm:py-32 px-6 bg-[#16161C] border-t border-white/5 relative z-10">
                <div className="max-w-[1100px] mx-auto space-y-16">
                    <div className="max-w-3xl space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                            RETAIL INTELLIGENCE
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-tight font-normal">
                            Understand more than what sold.
                        </h2>
                        <p className="font-sans text-lg sm:text-xl text-[#A1A1AA] font-light leading-relaxed">
                            Retailers already know what sold. AURSA helps illuminate the decision moment that happens before checkout.
                        </p>
                    </div>

                    {/* Exactly 3 Signal Rows */}
                    <div className="space-y-0 border-t border-b border-white/10 divide-y divide-white/10">
                        {[
                            {
                                num: '01',
                                title: 'WHERE SHOPPERS HESITATE',
                                desc: 'Identify consideration patterns and fit hesitation across garment categories and silhouettes.'
                            },
                            {
                                num: '02',
                                title: 'WHAT STYLING QUESTIONS RECUR',
                                desc: 'Gain visibility into common proportions, fabric pairing, and fit concerns voiced during try-on.'
                            },
                            {
                                num: '03',
                                title: 'WHICH RECOMMENDATIONS ATTRACT ATTENTION',
                                desc: 'Understand how shoppers respond to subtle styling suggestions and second-opinion guidance.'
                            }
                        ].map((signal) => (
                            <div key={signal.num} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-white/[0.02] transition-colors duration-200 px-4">
                                <div className="md:col-span-1">
                                    <span className="font-serif text-2xl text-[#D88A3D] font-light">{signal.num}</span>
                                </div>
                                <div className="md:col-span-4">
                                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5F5F7]">
                                        {signal.title}
                                    </h3>
                                </div>
                                <div className="md:col-span-7">
                                    <p className="text-sm text-[#A1A1AA] font-light leading-relaxed">
                                        {signal.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/retail"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>Explore AURSA Retail</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* ── SECTION 5: ONE MIRROR. TWO MOMENTS. (COMPARISON SLIDER) ──────── */}
            <section className="py-24 sm:py-32 px-6 bg-[#F9F6F0] text-[#0F0F13] border-t border-black/5 relative z-10">
                <div className="max-w-[1100px] mx-auto space-y-12">
                    <div className="max-w-3xl space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                            ONE MIRROR. TWO MOMENTS.
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0F0F13] leading-tight font-normal">
                            The same need for validation. Two different places.
                        </h2>
                        <p className="font-sans text-lg sm:text-xl text-[#4A4A52] font-light leading-relaxed">
                            In a fitting room: “Should I buy this?” At home: “Should I wear this?” In both moments, AURSA helps answer: “Does this actually work for me?”
                        </p>
                    </div>

                    {/* Image Reveal Comparison Slider */}
                    <div className="relative w-full max-w-4xl mx-auto space-y-6">
                        {/* Comparison Labels Header */}
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.25em] text-[#0F0F13] px-2">
                            <span className="flex items-center gap-2 text-[#D88A3D]">
                                <span>RETAIL MOMENT</span>
                                <span className="text-[10px] font-normal text-[#666670] hidden sm:inline">— Should I buy this?</span>
                            </span>
                            <span className="flex items-center gap-2 text-[#0F0F13]">
                                <span className="text-[10px] font-normal text-[#666670] hidden sm:inline">Should I wear this? —</span>
                                <span>PERSONAL MOMENT</span>
                            </span>
                        </div>

                        {/* Visual Frame Container */}
                        <div className="relative aspect-[4/5] sm:aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#0F0F13] select-none">
                            {/* Layer 1: Retail View (Base Left) */}
                            <div className="absolute inset-0">
                                <img
                                    src="/Trial%20room.png"
                                    alt="Retail fitting room trial moment"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-left text-white pointer-events-none">
                                    <div
                                        className="space-y-1.5 sm:space-y-2 max-w-[270px] sm:max-w-[360px] md:max-w-[420px] rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl backdrop-blur-md"
                                        style={{
                                            background: 'rgba(10, 10, 14, 0.42)',
                                            WebkitBackdropFilter: 'blur(12px)',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)'
                                        }}
                                    >
                                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.3em] text-[#D88A3D] block">
                                            IN FITTING ROOM
                                        </span>
                                        <h3
                                            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal leading-tight"
                                            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.28)' }}
                                        >
                                            Should I buy this?
                                        </h3>
                                        <p
                                            className="text-xs sm:text-sm text-white/85 font-light leading-relaxed hidden sm:block"
                                            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.18)' }}
                                        >
                                            The shopper deciding whether a garment belongs in their wardrobe.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Layer 2: Personal View (Clipped Right) */}
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                            >
                                <img
                                    src="/mirror%20moment%201.png"
                                    alt="Personal home mirror moment"
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-right text-white pointer-events-none">
                                    <div
                                        className="space-y-1.5 sm:space-y-2 max-w-[270px] sm:max-w-[360px] md:max-w-[420px] ml-auto rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl backdrop-blur-md"
                                        style={{
                                            background: 'rgba(10, 10, 14, 0.42)',
                                            WebkitBackdropFilter: 'blur(12px)',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)'
                                        }}
                                    >
                                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.3em] text-[#D88A3D] block">
                                            BEFORE STEPPING OUT
                                        </span>
                                        <h3
                                            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal leading-tight"
                                            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.28)' }}
                                        >
                                            Should I wear this?
                                        </h3>
                                        <p
                                            className="text-xs sm:text-sm text-white/85 font-light leading-relaxed hidden sm:block"
                                            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.18)' }}
                                        >
                                            The personal mirror check before work, dinner, or an event.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider Line & Handle */}
                            <div
                                className="absolute top-0 bottom-0 w-[2px] bg-[#D88A3D] z-20 pointer-events-none"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#D88A3D] text-[#0F0F13] flex items-center justify-center shadow-lg border-2 border-white">
                                    <Sliders size={16} />
                                </div>
                            </div>

                            {/* Accessible HTML Range Input Overlay */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPos}
                                onChange={(e) => setSliderPos(Number(e.target.value))}
                                aria-label="Compare Retail fitting room vs Personal home mirror moment"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                            />
                        </div>

                        {/* Drag Instructions */}
                        <p className="text-[11px] text-[#666670] text-center font-light uppercase tracking-wider">
                            Drag slider left to reveal Retail • Drag right for Personal
                        </p>
                    </div>

                    <div className="pt-4 text-center">
                        <Link
                            to="/app"
                            onClick={() => trackEvent('homepage_personal_explore_click')}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0F0F13] hover:text-[#D88A3D] transition-colors duration-200"
                        >
                            <span>Explore AURSA Personal</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* ── SECTION 6: NO SMART MIRROR REQUIRED ─────────────────────────── */}
            <section className="py-24 sm:py-32 px-6 bg-[#0F0F13] border-t border-white/5 relative z-10">
                <div className="max-w-[1100px] mx-auto space-y-16">
                    <div className="max-w-3xl space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                            LOW-FRICTION DEPLOYMENT
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-tight font-normal">
                            No smart mirror required.
                        </h2>
                        <p className="font-sans text-lg sm:text-xl text-[#A1A1AA] font-light leading-relaxed">
                            The shopper already has the interface: their phone. Deploy decision intelligence across your store network without rebuilding fitting rooms or installing hardware.
                        </p>
                    </div>

                    {/* Flow Sequence: Fitting Room -> Scan QR -> Shopper Phone -> AURSA */}
                    <div className="pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {[
                                {
                                    step: '01',
                                    label: 'FITTING ROOM',
                                    desc: 'Shopper enters the physical fitting room with selected garments.'
                                },
                                {
                                    step: '02',
                                    label: 'SCAN QR / ENTRY POINT',
                                    desc: 'Shopper scans a discreet QR code inside the room.'
                                },
                                {
                                    step: '03',
                                    label: "SHOPPER'S PHONE",
                                    desc: 'AURSA opens instantly on their device without mandatory downloads.'
                                },
                                {
                                    step: '04',
                                    label: 'AURSA DECISION',
                                    desc: 'Shopper receives instant, private visual feedback on fit and balance.'
                                }
                            ].map((item, idx) => (
                                <div key={item.step} className="bg-[#16161C] p-6 rounded-2xl border border-white/5 space-y-4 relative">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-[#D88A3D] font-serif text-xl">{item.step}</span>
                                        {idx < 3 && <ArrowRight size={14} className="text-[#A1A1AA]/40 hidden lg:block" />}
                                    </div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5F5F7]">
                                        {item.label}
                                    </h3>
                                    <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ── SECTION 7: FINAL RETAIL CTA ──────────────────────────────────── */}
            <section className="py-28 sm:py-36 px-6 bg-[#0F0F13] border-t border-white/5 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D]">
                        GET STARTED
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-tight font-normal">
                        Bring AURSA into the fitting room.
                    </h2>
                    <p className="font-sans text-lg text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        Speak with our team to explore a focused retail pilot designed for your store locations.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={(e) => openPilotModal('final_cta', e)}
                            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs uppercase font-bold tracking-[0.25em] transition-all duration-200 shadow-xl shadow-[#D88A3D]/10 cursor-pointer"
                        >
                            Request a Retail Pilot
                        </button>
                        <Link
                            to="/retail"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs uppercase font-bold tracking-[0.25em] transition-all duration-200"
                        >
                            Explore AURSA Retail
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 8: CONSUMER APP DOWNLOAD ────────────────────────────── */}
            <AppDownloadSection source="homepage_download_section" />

        </div>
    );
};

export default BrandGatewayHomepage;
