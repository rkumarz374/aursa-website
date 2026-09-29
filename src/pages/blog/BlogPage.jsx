import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { blogPosts } from './blogData';
import SEOHead from '../../components/SEOHead';
import { trackEvent } from '../../lib/analytics';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15
        }
    }
};

const RETAIL_GUIDES = [
    {
        slug: 'smart-fitting-room',
        link: '/smart-fitting-room',
        title: 'Smart Fitting Rooms Without New Hardware',
        excerpt: 'Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.',
        type: 'GUIDE',
        track: 'RETAIL INTELLIGENCE',
        trackId: 'retail'
    },
    {
        slug: 'fitting-room-intelligence',
        link: '/fitting-room-intelligence',
        title: 'What Is Fitting Room Intelligence?',
        excerpt: "Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.",
        type: 'GUIDE',
        track: 'RETAIL INTELLIGENCE',
        trackId: 'retail'
    },
    {
        slug: 'fitting-room-analytics',
        link: '/fitting-room-analytics',
        title: 'Fitting Room Analytics & Shopper Decision Insights',
        excerpt: 'Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.',
        type: 'GUIDE',
        track: 'RETAIL INTELLIGENCE',
        trackId: 'retail'
    },
    {
        slug: 'in-store-personalization',
        link: '/in-store-personalization',
        title: 'In-Store Personalization for Fashion Retail',
        excerpt: 'Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.',
        type: 'GUIDE',
        track: 'RETAIL INTELLIGENCE',
        trackId: 'retail'
    }
];

const PERSONAL_PILLAR_GUIDE = {
    slug: 'personal-style-intelligence',
    link: '/personal-style-intelligence',
    title: 'What Is Personal Style Intelligence?',
    excerpt: 'Explore Personal Style Intelligence: how preferences, context, recurring choices and outfit decisions can help you better understand what works for you.',
    type: 'GUIDE',
    track: 'PERSONAL STYLE INTELLIGENCE',
    trackId: 'personal'
};

const ContentCard = ({ item }) => {
    const isGuide = item.type === 'GUIDE';

    const handleClick = () => {
        trackEvent('insights_content_click', {
            content_type: item.type.toLowerCase(),
            content_track: item.trackId,
            slug_or_route: item.link
        });
    };

    return (
        <Link to={item.link} onClick={handleClick} className="block group/card h-full">
            <motion.div
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                className={`bg-[#16161C]/60 backdrop-blur-md rounded-2xl border p-6 flex flex-col justify-between h-full transition-all duration-300 ${
                    isGuide
                        ? 'border-[#D88A3D]/25 hover:border-[#D88A3D]/60 shadow-[0_10px_30px_rgba(216,138,61,0.05)]'
                        : 'border-white/5 hover:border-[#D88A3D]/30 shadow-lg'
                }`}
            >
                <div className="space-y-4">
                    {/* Badge Row */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[9px] tracking-[0.25em] font-bold text-[#D88A3D] uppercase">
                            {item.track}
                        </span>
                        <span
                            className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border ${
                                isGuide
                                    ? 'bg-[#D88A3D]/15 text-[#D88A3D] border-[#D88A3D]/30'
                                    : 'bg-white/5 text-[#A1A1AA] border-white/10'
                            }`}
                        >
                            {item.type}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-[#FFFFFF] leading-snug group-hover/card:text-[#D88A3D] transition-colors duration-200">
                        {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-[#A1A1AA] text-sm font-light leading-relaxed">
                        {item.excerpt}
                    </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                    <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                        {item.date ? (
                            <>
                                <Clock size={12} className="text-[#D88A3D]" />
                                <span>{item.date}</span>
                            </>
                        ) : (
                            <>
                                <BookOpen size={12} className="text-[#D88A3D]" />
                                <span>Foundational Resource</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#D88A3D] font-bold text-[11px] uppercase tracking-wider">
                        <span>{isGuide ? 'Explore Guide' : 'Read Article'}</span>
                        <ArrowRight size={12} className="group-hover/card:translate-x-1 transition-transform duration-200" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const BlogPage = () => {
    const [selectedTrack, setSelectedTrack] = useState('all');

    const showRetail = selectedTrack === 'all' || selectedTrack === 'retail';
    const showPersonal = selectedTrack === 'all' || selectedTrack === 'personal';

    const personalArticles = blogPosts.map((post) => ({
        slug: post.slug,
        link: `/blog/${post.slug}`,
        title: post.title,
        excerpt: post.excerpt,
        type: 'ARTICLE',
        track: 'PERSONAL STYLE INTELLIGENCE',
        trackId: 'personal',
        date: post.date,
        readTime: post.readTime
    }));

    const handleTrackFilter = (track) => {
        setSelectedTrack(track);
        trackEvent('insights_track_selected', { track });
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24 text-left relative">
            <SEOHead
                title="AURSA Insights — Retail & Personal Style Intelligence"
                description="Explore AURSA Insights: original thinking on retail decision intelligence, fitting-room decisions, personal style intelligence, outfit confidence and the Mirror Moment."
                path="/insights"
                canonical="https://aursa.app/insights"
            />
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D88A3D]/5 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* ─── HERO ─── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-14 md:mb-20 flex flex-col items-start gap-4"
                >
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/5">
                        <Sparkles size={12} className="text-[#D88A3D] animate-pulse" />
                        <span className="text-[#D88A3D] text-[10px] uppercase tracking-[0.25em] font-bold">
                            AURSA INSIGHTS
                        </span>
                    </div>

                    <h1 className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl md:text-7xl leading-[1.1] tracking-wide mt-2">
                        Ideas for the moments where style decisions happen.
                    </h1>

                    <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-3">
                        Original thinking from AURSA on retail decision intelligence and personal style intelligence.
                    </p>
                </motion.section>

                {/* ─── TRACK SELECTOR / CONTROLS ─── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-14 border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <button
                            onClick={() => handleTrackFilter('all')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                                selectedTrack === 'all'
                                    ? 'bg-[#D88A3D] text-[#0F0F13] border border-[#D88A3D]'
                                    : 'bg-transparent text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/10 hover:border-white/20'
                            }`}
                        >
                            All Tracks
                        </button>
                        <button
                            onClick={() => handleTrackFilter('retail')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                                selectedTrack === 'retail'
                                    ? 'bg-[#D88A3D] text-[#0F0F13] border border-[#D88A3D]'
                                    : 'bg-transparent text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/10 hover:border-white/20'
                            }`}
                        >
                            Retail Intelligence
                        </button>
                        <button
                            onClick={() => handleTrackFilter('personal')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                                selectedTrack === 'personal'
                                    ? 'bg-[#D88A3D] text-[#0F0F13] border border-[#D88A3D]'
                                    : 'bg-transparent text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/10 hover:border-white/20'
                            }`}
                        >
                            Personal Style Intelligence
                        </button>
                    </div>

                    <div className="text-[11px] text-[#A1A1AA] font-light">
                        Showing authority guides & editorial insights
                    </div>
                </motion.div>

                {/* ─── TRACK 1: RETAIL INTELLIGENCE ─── */}
                {showRetail && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeInUp}
                        className="mb-20 md:mb-28"
                        id="retail-intelligence-track"
                    >
                        <div className="mb-10 max-w-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#D88A3D]" />
                                <span className="text-xs uppercase tracking-[0.3em] text-[#D88A3D] font-bold">
                                    TRACK 1 — RETAIL INTELLIGENCE
                                </span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#FFFFFF] mb-3">
                                Retail Intelligence
                            </h2>
                            <p className="font-sans text-[#A1A1AA] text-base font-light leading-relaxed">
                                Understanding what happens between trying something on and deciding what to do next. Decision support, fitting-room analytics, and in-store personalization.
                            </p>
                        </div>

                        {/* Retail Guides Grid */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10"
                        >
                            {RETAIL_GUIDES.map((guide) => (
                                <ContentCard key={guide.slug} item={guide} />
                            ))}
                        </motion.div>

                        {/* Retail Track Secondary CTA */}
                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <p className="text-xs text-[#A1A1AA] font-light">
                                Explore how AURSA brings decision intelligence into physical fitting rooms.
                            </p>
                            <Link
                                to="/retail"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D88A3D] hover:text-[#F0B67F] transition-colors duration-200 group"
                            >
                                <span>Explore AURSA Retail</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>
                    </motion.section>
                )}

                {/* ─── TRACK 2: PERSONAL STYLE INTELLIGENCE ─── */}
                {showPersonal && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeInUp}
                        className="mb-16 md:mb-24"
                        id="personal-style-intelligence-track"
                    >
                        <div className="mb-10 max-w-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#D88A3D]" />
                                <span className="text-xs uppercase tracking-[0.3em] text-[#D88A3D] font-bold">
                                    TRACK 2 — PERSONAL STYLE INTELLIGENCE
                                </span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#FFFFFF] mb-3">
                                Personal Style Intelligence
                            </h2>
                            <p className="font-sans text-[#A1A1AA] text-base font-light leading-relaxed">
                                Understanding what works for you — beyond trends and one-size-fits-all advice. Mirror Moment, style identity, outfit confidence, and recurring choices.
                            </p>
                        </div>

                        {/* Personal Pillar Guide + Articles Grid */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                        >
                            {/* Foundational Guide Card */}
                            <ContentCard item={PERSONAL_PILLAR_GUIDE} />

                            {/* 5 Personal Articles */}
                            {personalArticles.map((article) => (
                                <ContentCard key={article.slug} item={article} />
                            ))}
                        </motion.div>
                    </motion.section>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
