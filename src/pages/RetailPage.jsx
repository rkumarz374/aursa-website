import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Smartphone, ShieldCheck, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import RetailTrialRoomExperience from '../components/retail/RetailTrialRoomExperience';
import { trackEvent } from '../lib/analytics';
import { useRetailPilotModal } from '../context/RetailPilotModalContext';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const RetailPage = () => {
    const shouldReduceMotion = useReducedMotion();
    const { openPilotModal } = useRetailPilotModal();
    const motionProps = shouldReduceMotion 
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeInUp };

    const RETAIL_SCHEMA = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aursa.app/retail#webpage',
        'url': 'https://aursa.app/retail',
        'name': 'Fashion Retail Intelligence for the Fitting-Room Decision | AURSA',
        'description': 'AURSA helps fashion retailers support shoppers at the fitting-room decision moment with a private, personalized second opinion — without requiring a smart mirror.',
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
                title="Fashion Retail Intelligence for the Fitting-Room Decision | AURSA"
                description="AURSA helps fashion retailers support shoppers at the fitting-room decision moment with a private, personalized second opinion — without requiring a smart mirror."
                path="/retail"
                canonical="https://aursa.app/retail"
                schema={RETAIL_SCHEMA}
            />

            {/* ── SECTION 1: HERO — FASHION RETAIL INTELLIGENCE ───────────────── */}
            <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 pt-8 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#D88A3D]/8 rounded-full blur-[140px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div {...motionProps} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/10 backdrop-blur-md">
                        <Building2 size={14} className="text-[#D88A3D]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#D88A3D] font-neutra">
                            FASHION RETAIL INTELLIGENCE
                        </span>
                    </motion.div>

                    <motion.h1 
                        {...motionProps}
                        className="font-serif text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Make the fitting-room decision more confident.
                    </motion.h1>

                    <motion.p 
                        {...motionProps}
                        className="font-sans text-[#A1A1AA] text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        AURSA gives shoppers a private second opinion at the moment they're deciding whether a look actually works for them — while helping retailers better understand that decision moment.
                    </motion.p>

                    <motion.div {...motionProps} className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={(e) => openPilotModal('hero', e)}
                            className="px-8 py-4 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl cursor-pointer"
                        >
                            Request a Retail Pilot
                        </button>
                        <a
                            href="#trial-room-experience"
                            onClick={() => trackEvent('retail_trial_room_cta_click', { source: 'hero' })}
                            className="px-8 py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl"
                        >
                            See How It Works
                        </a>
                    </motion.div>

                    <motion.p {...motionProps} className="text-xs text-[#A1A1AA] font-light font-neutra tracking-wider pt-2">
                        No smart mirror required. Works through the shopper's phone.
                    </motion.p>
                </div>
            </section>

            {/* ── SECTION 2: THE DECISION MOMENT ──────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.p {...motionProps} className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">
                        THE DECISION MOMENT
                    </motion.p>

                    <motion.div {...motionProps} className="space-y-3">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            They liked it enough to try it.
                        </h2>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#D88A3D] font-light">
                            Now they have to decide.
                        </h3>
                    </motion.div>

                    <motion.p {...motionProps} className="font-sans text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                        A shopper in your store has already browsed the rack, picked up the garment, and walked into the fitting room. The question is no longer "What should I look at?" The question is "Does this actually work for me?" AURSA focuses specifically on this critical pause.
                    </motion.p>
                </div>
            </section>

            {/* ── SECTION 3: WHERE AURSA FITS ─────────────────────────────────── */}
            <section id="how-it-works" className="py-24 px-6 border-t border-white/5 relative z-10 scroll-mt-28">
                <div className="max-w-4xl mx-auto space-y-12 text-center">
                    <div className="space-y-4">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">THE JOURNEY</p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">AURSA starts after discovery.</h2>
                    </div>

                    {/* Step Flow Banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
                        {[
                            { step: "01", name: "DISCOVER", active: false },
                            { step: "02", name: "RECOMMEND", active: false },
                            { step: "03", name: "TRY", active: false },
                            { step: "04", name: "DECIDE", active: true },
                            { step: "05", name: "BUY", active: false }
                        ].map((item) => (
                            <div 
                                key={item.step} 
                                className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                                    item.active 
                                        ? 'bg-[#D88A3D]/10 border-[#D88A3D] shadow-lg scale-[1.03]' 
                                        : 'bg-[#16161C]/50 border-white/5 opacity-60'
                                }`}
                            >
                                <span className={`text-[10px] uppercase tracking-widest font-neutra block ${item.active ? 'text-[#D88A3D] font-bold' : 'text-[#A1A1AA]'}`}>
                                    {item.step}
                                </span>
                                <span className={`text-xs font-bold tracking-wider uppercase font-neutra block mt-1 ${item.active ? 'text-white' : 'text-[#A1A1AA]'}`}>
                                    {item.name}
                                </span>
                                {item.active && (
                                    <span className="inline-block px-2 py-0.5 mt-2 text-[9px] uppercase tracking-wider font-bold bg-[#D88A3D] text-[#0F0F13] rounded-full font-neutra">
                                        AURSA HERE
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        AURSA enters when the shopper is already considering the look and wants confidence in the decision.
                    </p>
                </div>
            </section>

            {/* ── INTERACTIVE TRIAL ROOM EXPERIENCE ─────────────────────────────── */}
            <RetailTrialRoomExperience />

            {/* ── SECTION 4: SHOPPER VALUE ────────────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">FOR THE SHOPPER</p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            A private second opinion, right when they need it.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "In the Moment",
                                desc: "Replaces hesitation with clarity while standing right in front of the fitting room mirror."
                            },
                            {
                                title: "Completely Private",
                                desc: "No photo storage, no public feedback, and no sales pressure—just an objective second opinion."
                            },
                            {
                                title: "Personalized Clarity",
                                desc: "Helps shoppers understand whether an outfit feels like them, not just what's generally trending."
                            }
                        ].map((card, index) => (
                            <div key={index} className="bg-[#16161C]/80 p-6 rounded-2xl border border-white/5 space-y-3">
                                <CheckCircle2 size={20} className="text-[#D88A3D]" />
                                <h3 className="font-serif text-xl text-white">{card.title}</h3>
                                <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: RETAILER VALUE ───────────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto space-y-12 text-center">
                    <div className="space-y-4">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">FOR THE RETAILER</p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            Understand more than what sold.
                        </h2>
                        <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto">
                            Traditional POS systems record what was purchased. AURSA is designed to help retailers explore decision signals at the fitting-room moment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                        <div className="bg-[#16161C]/50 p-6 rounded-2xl border border-white/5 space-y-3">
                            <h3 className="font-serif text-xl text-white">Shopper Consideration Signals</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Pilots can help explore try-on decision patterns and understand what factors lead to shopper hesitation before leaving the store.
                            </p>
                        </div>
                        <div className="bg-[#16161C]/50 p-6 rounded-2xl border border-white/5 space-y-3">
                            <h3 className="font-serif text-xl text-white">Styling & Combination Insights</h3>
                            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                                Learn how shoppers pair garments together in real fitting rooms to inform visual merchandising and store curation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: NO NEW HARDWARE ──────────────────────────────────── */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">START WITH WHAT THE SHOPPER ALREADY HAS</p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF]">
                            No smart mirror required.
                        </h2>
                        <p className="text-base text-[#A1A1AA] font-light max-w-xl mx-auto">
                            AURSA is designed to work through the shopper's own phone, so retailers can explore the experience without rebuilding the fitting room.
                        </p>
                    </div>

                    {/* Flow Diagram */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <div className="bg-[#16161C] p-6 rounded-2xl border border-white/10 w-full sm:w-56 text-center space-y-2">
                            <Building2 size={24} className="text-[#D88A3D] mx-auto" />
                            <h4 className="text-sm font-serif text-white">FITTING ROOM</h4>
                            <p className="text-[11px] text-[#A1A1AA] font-light">Existing physical space</p>
                        </div>
                        <ArrowRight size={20} className="text-[#D88A3D] hidden sm:block" />
                        <div className="bg-[#16161C] p-6 rounded-2xl border border-white/10 w-full sm:w-56 text-center space-y-2">
                            <Smartphone size={24} className="text-[#D88A3D] mx-auto" />
                            <h4 className="text-sm font-serif text-white">SHOPPER'S PHONE</h4>
                            <p className="text-[11px] text-[#A1A1AA] font-light">Simple QR-based entry</p>
                        </div>
                        <ArrowRight size={20} className="text-[#D88A3D] hidden sm:block" />
                        <div className="bg-[#16161C] p-6 rounded-2xl border border-[#D88A3D]/40 w-full sm:w-56 text-center space-y-2 bg-[#D88A3D]/5">
                            <Sparkles size={24} className="text-[#D88A3D] mx-auto" />
                            <h4 className="text-sm font-serif text-white">AURSA</h4>
                            <p className="text-[11px] text-[#A1A1AA] font-light">Instant private second opinion</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 7: PRIVACY ────────────────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 text-[#D88A3D]">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-neutra">PRIVATE BY DESIGN</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF]">
                        The outfit photo isn't stored.
                    </h2>

                    <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        AURSA uses the image to deliver the experience without keeping the shopper's outfit photo.
                    </p>

                    <div className="pt-2">
                        <Link
                            to="/privacy"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D88A3D] hover:text-white transition-colors duration-200"
                        >
                            <span>Read Privacy</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── EDUCATIONAL PILLAR LANDSCAPE ─────────────────────────────────── */}
            <section className="py-20 px-6 border-t border-white/5 bg-[#16161C]/30 relative z-10">
                <div className="max-w-4xl mx-auto space-y-8 text-center">
                    <div className="space-y-3">
                        <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">RETAIL LANDSCAPE</p>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF]">Explore retail intelligence concepts.</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-2">
                        {[
                            { title: "Smart Fitting Room", path: "/smart-fitting-room", desc: "Understanding hardware vs experience approaches" },
                            { title: "Fitting Room Intelligence", path: "/fitting-room-intelligence", desc: "The concept behind the decision moment" },
                            { title: "Fitting Room Analytics", path: "/fitting-room-analytics", desc: "Decision context vs outcome data" },
                            { title: "In-Store Personalization", path: "/in-store-personalization", desc: "Extending personalization in physical retail" }
                        ].map((pillar, idx) => (
                            <Link
                                key={idx}
                                to={pillar.path}
                                className="bg-[#16161C]/80 p-5 rounded-2xl border border-white/5 hover:border-[#D88A3D]/40 transition-all duration-200 group flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <h3 className="font-serif text-lg text-white group-hover:text-[#D88A3D] transition-colors">{pillar.title}</h3>
                                    <p className="text-[11px] text-[#A1A1AA] font-light leading-snug">{pillar.desc}</p>
                                </div>
                                <div className="pt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D88A3D] font-neutra">
                                    <span>Read Topic</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 8: RETAIL PILOT CTA ──────────────────────────────────── */}
            <section id="retail-pilot" className="py-24 px-6 border-t border-white/5 bg-[#16161C]/50 relative z-10 scroll-mt-28">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em] font-neutra">START SMALL</p>

                    <h2 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF]">
                        Explore AURSA in a real retail environment.
                    </h2>

                    <p className="text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                        We're speaking with fashion retailers about focused pilots designed to test AURSA at the fitting-room decision moment.
                    </p>

                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={(e) => openPilotModal('final_pilot', e)}
                            className="inline-flex items-center justify-center px-10 py-5 border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 rounded-xl cursor-pointer"
                        >
                            Request a Retail Pilot
                        </button>
                    </div>

                    <p className="text-xs text-[#A1A1AA] font-light pt-4 font-neutra">
                        Wear with Confidence.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default RetailPage;
