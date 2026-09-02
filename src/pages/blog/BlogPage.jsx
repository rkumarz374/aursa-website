import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { blogPosts } from './blogData';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2
        }
    }
};

const BlogPage = () => {
    const featuredPost = blogPosts[0];
    const archivePosts = blogPosts.slice(1);

    useEffect(() => {
        document.title = 'The AURSA Journal — Style, Confidence & Identity';

        // Helper to update or create a meta tag safely
        const updateMetaTag = (name, value, isProperty = false) => {
            let el = isProperty 
                ? document.querySelector(`meta[property="${name}"]`) 
                : document.querySelector(`meta[name="${name}"]`);
            
            if (!el) {
                el = document.createElement('meta');
                if (isProperty) {
                    el.setAttribute('property', name);
                } else {
                    el.setAttribute('name', name);
                }
                document.head.appendChild(el);
            }
            el.setAttribute('content', value);
        };

        const listDescription = 'Thoughts on style, confidence, identity, and the moments before we step out.';
        const currentUrl = window.location.origin + '/#/journal';
        const fallbackImage = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80';
        const listImage = featuredPost ? featuredPost.coverImage : fallbackImage;

        updateMetaTag('description', listDescription);
        
        updateMetaTag('og:title', 'The AURSA Journal — Style, Confidence & Identity', true);
        updateMetaTag('og:description', listDescription, true);
        updateMetaTag('og:type', 'website', true);
        updateMetaTag('og:url', currentUrl, true);
        updateMetaTag('og:image', listImage, true);

        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', 'The AURSA Journal — Style, Confidence & Identity');
        updateMetaTag('twitter:description', listDescription);
        updateMetaTag('twitter:image', listImage);

        // Canonical URL element
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', currentUrl);

        // Cleanup on unmount
        return () => {
            const tagsToRemove = [
                'meta[name="description"]',
                'meta[property="og:title"]',
                'meta[property="og:description"]',
                'meta[property="og:type"]',
                'meta[property="og:url"]',
                'meta[property="og:image"]',
                'meta[name="twitter:card"]',
                'meta[name="twitter:title"]',
                'meta[name="twitter:description"]',
                'meta[name="twitter:image"]',
                'link[rel="canonical"]'
            ];
            tagsToRemove.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) el.remove();
            });
        };
    }, [featuredPost]);

    if (!featuredPost) {
        return (
            <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans flex flex-col items-center justify-center p-6 text-center">
                <h2 className="font-serif text-3xl mb-4 text-[#FFFFFF]">No Journal Entries</h2>
                <p className="text-[#A1A1AA] text-base mb-8 max-w-sm">
                    We are currently composing our thoughts. Check back soon for style insights.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24 text-left relative">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D88A3D]/5 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* ─── SECTION A: HERO ─── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-16 md:mb-24 flex flex-col items-start gap-4"
                >
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#D88A3D]/30 bg-[#D88A3D]/5">
                        <Sparkles size={12} className="text-[#D88A3D] animate-pulse" />
                        <span className="text-[#D88A3D] text-[10px] uppercase tracking-[0.25em] font-bold">
                            AURSA Journal
                        </span>
                    </div>

                    <h1 className="font-serif text-[#FFFFFF] text-5xl md:text-7xl leading-[1.1] tracking-wide mt-2">
                        The AURSA Journal
                    </h1>

                    <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-4">
                        Thoughts on style, confidence, identity, and the moments before we step out.
                    </p>
                </motion.section>

                {/* ─── SECTION B: FEATURED ARTICLE ─── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-20 md:mb-28"
                >
                    <h2 className="text-xs uppercase tracking-[0.3em] text-[#D88A3D] mb-8 font-bold">
                        Featured Entry
                    </h2>

                    <Link to={`/blog/${featuredPost.slug}`} className="block group/card">
                        <motion.div
                            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                            className="bg-[#16161C]/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden flex flex-col lg:flex-row gap-8 p-6 md:p-8 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#D88A3D]/30"
                        >
                            {/* Featured Image Frame */}
                            <div className="w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:h-[380px] rounded-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a35] via-[#16161c] to-[#0F0F13] opacity-40 z-10" />
                                <img
                                    src={featuredPost.coverImage}
                                    alt={featuredPost.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%232a2a35'/><stop offset='50%25' stop-color='%2316161c'/><stop offset='100%25' stop-color='%230f0f13'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>";
                                    }}
                                    className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
                            </div>

                            {/* Featured Details */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-between py-2 text-left">
                                <div className="space-y-4">
                                    <span className="text-[10px] tracking-[0.25em] font-bold text-[#D88A3D] uppercase">
                                        {featuredPost.category}
                                    </span>
                                    <h3 className="font-serif text-3xl md:text-4xl text-[#FFFFFF] leading-tight group-hover/card:text-[#D88A3D] transition-colors duration-200">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="font-sans text-[#A1A1AA] text-base md:text-lg font-light leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                                    <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                                        <Clock size={14} className="text-[#D88A3D]" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#D88A3D] font-bold text-xs uppercase tracking-wider">
                                        <span>Read Article</span>
                                        <ArrowRight size={14} className="group-hover/card:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </motion.section>

                {/* ─── SECTION C: ARTICLE GRID ─── */}
                <section className="mb-12">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-[#D88A3D] mb-10 font-bold">
                        Journal Archive
                    </h2>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
                    >
                        {archivePosts.map((article) => (
                            <Link key={article.slug} to={`/blog/${article.slug}`} className="block group/card">
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                                    className="bg-[#16161C]/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 cursor-pointer shadow-lg hover:border-[#D88A3D]/20 transition-all duration-300 h-full"
                                >
                                    <div className="space-y-4">
                                        {/* Thumbnail Frame */}
                                        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden relative group mb-4">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a35] via-[#16161c] to-[#0F0F13] opacity-35 z-10" />
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%232a2a35'/><stop offset='50%25' stop-color='%2316161c'/><stop offset='100%25' stop-color='%230f0f13'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>";
                                                }}
                                                className="w-full h-full object-cover grayscale opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#16161C] via-transparent to-transparent z-20" />
                                        </div>

                                        <div className="space-y-2 text-left">
                                            <span className="text-[9px] tracking-[0.25em] font-bold text-[#D88A3D] uppercase">
                                                {article.category}
                                            </span>
                                            <h3 className="font-serif text-2xl text-[#FFFFFF] leading-snug group-hover/card:text-[#D88A3D] transition-colors duration-200">
                                                {article.title}
                                            </h3>
                                            <p className="font-sans text-[#A1A1AA] text-sm font-light leading-relaxed">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                                        <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                                            <Clock size={12} className="text-[#D88A3D]" />
                                            <span>{article.readTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#D88A3D] font-bold text-[11px] uppercase tracking-wider">
                                            <span>Read</span>
                                            <ArrowRight size={12} className="group-hover/card:translate-x-1 transition-transform duration-200" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default BlogPage;
