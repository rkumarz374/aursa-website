import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { blogPosts } from './blogData';
import MarkdownRenderer from './MarkdownRenderer';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = React.useState(false);

    const post = blogPosts.find((p) => p.slug === slug);

    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex > -1 
        ? (currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : blogPosts[0]) 
        : null;
    const nextPost = currentIndex > -1 
        ? (currentIndex > 0 ? blogPosts[currentIndex - 1] : blogPosts[blogPosts.length - 1]) 
        : null;

    const relatedPosts = React.useMemo(() => {
        if (!post) return [];
        return blogPosts
            .filter((p) => p.slug !== slug)
            .sort((a, b) => {
                const aMatches = a.category === post.category ? 1 : 0;
                const bMatches = b.category === post.category ? 1 : 0;
                if (aMatches !== bMatches) {
                    return bMatches - aMatches;
                }
                return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 2);
    }, [slug, post]);

    const handleCopyLink = (e) => {
        e.preventDefault();
        if (!post) return;
        const cleanUrl = `${window.location.origin}/#/blog/${post.slug}`;
        navigator.clipboard.writeText(cleanUrl)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {});
    };

    const cleanShareUrl = post ? `${window.location.origin}/#/blog/${post.slug}` : '';
    const shareUrl = encodeURIComponent(cleanShareUrl);
    const shareTitle = encodeURIComponent(`AURSA Journal — ${post ? post.title : ''}`);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

    useEffect(() => {
        if (!post) {
            document.title = 'AURSA Journal';
            return;
        }

        // 1. Title
        document.title = `AURSA Journal — ${post.title}`;

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

        // 2. Custom Meta & Social Sharing
        const seoDescription = post.metaDescription || post.excerpt;
        const currentUrl = window.location.href;

        updateMetaTag('description', seoDescription);
        
        updateMetaTag('og:title', `AURSA Journal — ${post.title}`, true);
        updateMetaTag('og:description', seoDescription, true);
        updateMetaTag('og:type', 'article', true);
        updateMetaTag('og:url', currentUrl, true);
        updateMetaTag('og:image', post.ogImage || post.coverImage, true);

        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', `AURSA Journal — ${post.title}`);
        updateMetaTag('twitter:description', seoDescription);
        updateMetaTag('twitter:image', post.ogImage || post.coverImage);

        // 3. Canonical Link Support
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', post.canonicalUrl || currentUrl);

        // 4. JSON-LD Schema.org Structured Data
        let schemaScript = document.getElementById('jsonld-article-schema');
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = 'jsonld-article-schema';
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }

        // Safe Date Parsing
        let datePublished;
        try {
            datePublished = new Date(post.publishedAt || post.date).toISOString();
        } catch (e) {
            datePublished = new Date().toISOString();
        }

        let dateModified;
        try {
            dateModified = new Date(post.updatedAt || post.date).toISOString();
        } catch (e) {
            dateModified = new Date().toISOString();
        }

        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": seoDescription,
            "image": post.ogImage || post.coverImage,
            "datePublished": datePublished,
            "dateModified": dateModified,
            "author": {
                "@type": "Person",
                "name": post.author || "AURSA",
                "url": window.location.origin
            },
            "publisher": {
                "@type": "Organization",
                "name": "AURSA",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${window.location.origin}/logo.png`
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": post.canonicalUrl || currentUrl
            }
        };
        schemaScript.textContent = JSON.stringify(schemaData);

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
            const schema = document.getElementById('jsonld-article-schema');
            if (schema) schema.remove();
        };
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans flex flex-col items-center justify-center p-6 text-center">
                <h1 className="font-serif text-4xl mb-4 text-[#FFFFFF]">Entry Not Found</h1>
                <p className="text-[#A1A1AA] text-lg mb-8 max-w-md">
                    We couldn't locate that journal entry. It may have been archived or moved.
                </p>
                <Link
                    to="/journal"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-transparent hover:bg-[#D88A3D] hover:border-[#D88A3D] text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200"
                >
                    <ArrowLeft size={14} />
                    Back to Journal
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24 text-left relative">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D88A3D]/5 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                {/* Back Link */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-12">
                    <Link
                        to="/journal"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Journal
                    </Link>
                </motion.div>

                {/* ─── SECTION A: HERO ─── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-16 md:mb-20 flex flex-col items-start gap-4"
                >
                    <h1 className="font-serif text-[#FFFFFF] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight mt-2">
                        {post.title}
                    </h1>

                    <p className="font-sans text-[#E5E7EB] text-lg md:text-xl font-light leading-relaxed max-w-3xl mt-6 opacity-90">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#A1A1AA] border-t border-white/5 w-full pt-6 mt-8 font-neutra">
                        <span className="text-[#D88A3D] font-bold">{post.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 hidden sm:inline-block" />
                        <span>{post.readTime}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 hidden sm:inline-block" />
                        <span>Published on {post.date}</span>
                    </div>
                </motion.section>

                {/* Cinematic Cover Frame */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden relative mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/5"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a35] via-[#16161c] to-[#0F0F13] opacity-30 z-10" />
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%232a2a35'/><stop offset='50%25' stop-color='%2316161c'/><stop offset='100%25' stop-color='%230f0f13'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>";
                        }}
                        className="w-full h-full object-cover grayscale opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
                </motion.div>

                {/* ─── SECTION B: ARTICLE BODY ─── */}
                <motion.article
                    id="blog-article-content"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="w-full"
                >
                    <MarkdownRenderer content={post.content} />
                </motion.article>

                {/* ─── SHARE ACTIONS ─── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={fadeInUp}
                    className="w-full border-t border-white/5 pt-8 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A1A1AA] font-neutra">
                        <span>Share this essay</span>
                    </div>
                    <div className="flex items-center gap-6 text-xs uppercase tracking-[0.25em] font-neutra">
                        <button
                            onClick={handleCopyLink}
                            className="text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5 active:scale-95 bg-transparent border-none p-0"
                        >
                            <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
                        </button>
                        <span className="text-white/10 hidden sm:inline">|</span>
                        <a
                            href={twitterShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 flex items-center gap-1.5"
                        >
                            <span>Share on X</span>
                        </a>
                        <span className="text-white/10 hidden sm:inline">|</span>
                        <a
                            href={linkedinShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 flex items-center gap-1.5"
                        >
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </motion.div>

                {/* ─── SECTION C: INLINE CTA ─── */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeInUp}
                    className="w-full mt-24 pt-12 border-t border-white/5 text-center"
                >
                    <div className="bg-[#16161C]/50 backdrop-blur-md rounded-2xl border border-white/5 p-8 md:p-10 flex flex-col items-center gap-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D88A3D]/40 to-transparent" />
                        
                        <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-[#D88A3D]/20 bg-[#D88A3D]/5">
                            <Sparkles size={12} className="text-[#D88A3D]" />
                            <span className="text-[#D88A3D] text-[9px] uppercase tracking-[0.25em] font-bold font-neutra">
                                Style Resonance
                            </span>
                        </div>

                        <h3 className="font-serif text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-2xl font-light">
                            "Visual harmony is a quiet dialogue between who you are and what you wear."
                        </h3>
                        
                        <p className="font-sans text-[#A1A1AA] text-sm md:text-base font-light leading-relaxed max-w-xl">
                            Step into our AI Mirror to analyze contrast intensity, silhouette weight, and balancing tones—a scientific mirror to your aesthetic fingerprint.
                        </p>

                        <a
                            href="https://apps.apple.com/in/app/aursa/id6761254001"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                        >
                            <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us" alt="App Store" className="h-[74px] md:h-[84px] w-auto" />
                        </a>
                    </div>
                </motion.section>

                {/* ─── SECTION D: CONTINUE READING ─── */}
                {relatedPosts.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={fadeInUp}
                        className="w-full mt-24 pt-16 border-t border-white/5"
                    >
                        <h4 className="text-xs uppercase tracking-[0.3em] text-[#D88A3D] mb-10 font-bold font-neutra text-center sm:text-left">
                            Continue Reading
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link 
                                    key={relatedPost.slug} 
                                    to={`/blog/${relatedPost.slug}`} 
                                    className="block group"
                                >
                                    <div className="bg-[#16161C]/30 hover:bg-[#16161C]/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-5 cursor-pointer shadow-lg hover:border-[#D88A3D]/20 transition-all duration-300 h-full">
                                        <div className="space-y-4">
                                            {/* Thumbnail Image Frame */}
                                            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a35] via-[#16161c] to-[#0F0F13] opacity-35 z-10" />
                                                <img
                                                    src={relatedPost.coverImage}
                                                    alt={relatedPost.title}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%232a2a35'/><stop offset='50%25' stop-color='%2316161c'/><stop offset='100%25' stop-color='%230f0f13'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>";
                                                    }}
                                                    className="w-full h-full object-cover grayscale opacity-75 group-hover:opacity-90 transition-all duration-500"
                                                />
                                            </div>
                                            
                                            <div className="space-y-2 text-left">
                                                <span className="text-[9px] tracking-[0.25em] font-bold text-[#D88A3D] uppercase font-neutra">
                                                    {relatedPost.category}
                                                </span>
                                                <h5 className="font-serif text-xl text-[#FFFFFF] leading-snug group-hover:text-[#D88A3D] transition-colors duration-200">
                                                    {relatedPost.title}
                                                </h5>
                                                <p className="font-sans text-[#A1A1AA] text-xs font-light leading-relaxed line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4 text-[10px] font-bold uppercase tracking-wider">
                                            <span className="text-[#A1A1AA]">{relatedPost.readTime}</span>
                                            <span className="text-[#D88A3D] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                                                Read
                                                <ArrowRight size={10} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* ─── SECTION E: FOOTER NAVIGATION ─── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeInUp}
                    className="w-full mt-16 pt-8 border-t border-white/5 flex items-center justify-between font-neutra text-xs tracking-[0.2em] uppercase"
                >
                    {prevPost ? (
                        <Link
                            to={`/blog/${prevPost.slug}`}
                            className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
                            Prev
                        </Link>
                    ) : (
                        <span className="text-[#A1A1AA]/30">Prev</span>
                    )}

                    <Link
                        to="/journal"
                        className="text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200"
                    >
                        Journal
                    </Link>

                    {nextPost ? (
                        <Link
                            to={`/blog/${nextPost.slug}`}
                            className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 group"
                        >
                            Next
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    ) : (
                        <span className="text-[#A1A1AA]/30">Next</span>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPostPage;
