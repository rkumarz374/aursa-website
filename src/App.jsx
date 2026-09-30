import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import SEOHead, { HOMEPAGE_SCHEMA } from "./components/SEOHead";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { trackEvent } from './lib/analytics';
import { useScrollDepth } from './hooks/useScrollDepth';
import { RetailPilotModalProvider, useRetailPilotModal } from './context/RetailPilotModalContext';
import RetailPilotModal from './components/retail/RetailPilotModal';

// ── Lazy-loaded Page Routes ────────────────────────────────────────────────
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const InvestorsPage = lazy(() => import("./pages/InvestorsPage"));
const Mirror = lazy(() => import("./pages/Mirror"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));
const BrandGatewayHomepage = lazy(() => import("./pages/BrandGatewayHomepage"));
const RetailPage = lazy(() => import("./pages/RetailPage"));
const AppPage = lazy(() => import("./pages/AppPage"));
const SmartFittingRoomPage = lazy(() => import("./pages/pillars/SmartFittingRoomPage"));
const FittingRoomIntelligencePage = lazy(() => import("./pages/pillars/FittingRoomIntelligencePage"));
const FittingRoomAnalyticsPage = lazy(() => import("./pages/pillars/FittingRoomAnalyticsPage"));
const InStorePersonalizationPage = lazy(() => import("./pages/pillars/InStorePersonalizationPage"));
const PersonalStyleIntelligencePage = lazy(() => import("./pages/PersonalStyleIntelligencePage"));

// ── Navbar ────────────────────────────────────────────────────────────────────

const NavLink = ({ href, children }) => {
    const location = useLocation();
    const isExactMatch = location.pathname === href;
    const isActive = isExactMatch || (href === '/insights' && (location.pathname.startsWith('/blog/') || location.pathname.startsWith('/journal/')));

    return (
        <Link
            to={href}
            aria-current={isExactMatch ? 'page' : undefined}
            className={`relative group text-[11px] uppercase tracking-[0.3em] font-medium px-3 py-1 transition-colors duration-200 ${
                isActive ? 'text-[#D88A3D]' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
            }`}
        >
            {children}
            <span
                className={`absolute left-0 -bottom-[4px] h-[1px] bg-[#D88A3D] transition-all duration-150 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
            />
        </Link>
    );
};

const Navbar = () => {
    const location = useLocation();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { openPilotModal } = useRetailPilotModal();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 40);
    });

    const navBg = scrolled
        ? 'rgba(22,22,28,0.92)'
        : 'rgba(22,22,28,0.70)';

    return (
        <>
            {/* Floating nav pill */}
            <motion.header
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6"
                style={{ paddingTop: '16px' }}
            >
                <nav
                    className="flex items-center justify-between transition-all duration-150 w-full max-w-[1100px] mx-auto px-4 py-2.5 sm:px-6 sm:py-3"
                    style={{
                        background: navBg,
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                    }}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200"
                    >
                        <img
                            src="/aursa-logo.svg"
                            alt="Aursa logo"
                            className="h-6 sm:h-7 w-auto"
                        />
                    </Link>

                    {/* Desktop navigation links */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-3 ml-auto mr-4">
                        <NavLink href="/app">Consumer App</NavLink>
                        <NavLink href="/insights">Insights</NavLink>
                        <NavLink href="/about">About</NavLink>
                    </div>

                    {/* Primary Commercial CTA Button */}
                    <div className="hidden md:flex items-center">
                        <button
                            type="button"
                            onClick={(e) => openPilotModal('navbar', e)}
                            className="px-4 py-2 rounded-xl border border-[#D88A3D] bg-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13] text-[10px] uppercase font-bold tracking-[0.25em] transition-all duration-200 shrink-0 cursor-pointer"
                        >
                            Request a Pilot
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex items-center md:hidden">
                        <button
                            className="flex flex-col justify-center items-center gap-[5px] p-2 text-[#F5F5F7]"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.15 }}
                                className="block w-5 h-px bg-[#F5F5F7]"
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.12 }}
                                className="block w-5 h-px bg-[#F5F5F7]"
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.15 }}
                                className="block w-5 h-px bg-[#F5F5F7]"
                            />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden fixed z-40 flex flex-col items-start gap-1 px-6 py-5 left-4 right-4 sm:left-6 sm:right-6"
                        style={{
                            top: '80px',
                            background: 'rgba(22,22,28,0.96)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                        }}
                    >
                        {[
                            ['/app', 'Consumer App'],
                            ['/insights', 'Insights'],
                            ['/about', 'About']
                        ].map(([href, label]) => {
                            const isExactMatch = location.pathname === href;
                            const isActive = isExactMatch || (href === '/insights' && (location.pathname.startsWith('/blog/') || location.pathname.startsWith('/journal/')));
                            return (
                                <Link
                                    key={href}
                                    to={href}
                                    aria-current={isExactMatch ? 'page' : undefined}
                                    onClick={() => setMenuOpen(false)}
                                    className={`w-full text-[11px] uppercase tracking-[0.35em] py-3 border-b border-white/5 font-medium transition-colors duration-200 flex items-center justify-between ${
                                        isActive ? 'text-[#D88A3D]' : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                                    }`}
                                >
                                    <span>{label}</span>
                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />}
                                </Link>
                            );
                        })}

                        <div className="w-full pt-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    setMenuOpen(false);
                                    openPilotModal('mobile_nav', e);
                                }}
                                className="w-full py-3.5 flex items-center justify-center rounded-xl border border-[#D88A3D] bg-[#D88A3D] text-[#0F0F13] text-xs uppercase font-bold tracking-[0.25em] cursor-pointer"
                            >
                                Request a Pilot
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => {
    const letters = "AURSA".split('');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 }
        }
    };

    const letterAnim = {
        hidden: { opacity: 0, y: 120 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <footer className="w-full bg-[#0F0F13] flex flex-col justify-between overflow-hidden relative pt-[80px] md:pt-[120px] pb-0">
            {/* Top Area: Refined Split Layout */}
            <div className="w-full px-6 md:px-12 flex flex-col md:flex-row items-center md:items-end justify-between max-w-[1400px] mx-auto gap-8 md:gap-12 z-10">

                {/* Left Column: Mission + Socials */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                    <h3 className="font-serif text-[#F5F5F7] text-xl md:text-2xl max-w-[300px] leading-snug opacity-90">
                        Understand what your outfit communicates.
                    </h3>

                    {/* Social links */}
                    <div className="flex items-center gap-6 md:gap-8">
                        {[
                            { name: 'Instagram', url: 'https://www.instagram.com/aursa.ai/' },
                            { name: 'LinkedIn', url: 'https://www.linkedin.com/company/aursa' },
                            { name: 'X', url: 'https://x.com/AursaAI' }
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative font-sans text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-300"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D88A3D] transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Column: Origin + Links */}
                <div className="flex flex-col items-center md:items-end gap-8">
                    {/* Navigation links */}
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
                        {[
                            { name: 'Retail', url: '/retail' },
                            { name: 'Consumer App', url: '/app' },
                            { name: 'Insights', url: '/insights' },
                            { name: 'About', url: '/about' },
                            { name: 'Contact', url: '/contact' },
                            { name: 'Privacy Policy', url: '/privacy' }
                        ].map((link) => (
                            <Link
                                key={link.name}
                                to={link.url}
                                className="group relative font-sans text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-300"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D88A3D] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <p className="font-sans text-[#A1A1AA] text-xs md:text-sm tracking-[0.1em] opacity-60">
                        Made in India 🇮🇳
                    </p>
                </div>
            </div>

            {/* Bottom Area: Large Brand Typography */}
            <div className="w-full flex justify-center items-end relative mt-16 md:mt-24 px-4 overflow-hidden">
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    className="font-serif text-[#D88A3D] text-center w-full flex justify-center text-[22vw] md:text-[26vw]"
                    style={{
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        margin: 0,
                        padding: 0,
                        opacity: 0.8
                    }}
                >
                    {letters.map((char, index) => (
                        <motion.span key={index} variants={letterAnim} className="inline-block relative z-10">
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Cinematic subtle gradient fade toward the bottom */}
                <div
                    className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-20"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, #0F0F13 95%)' }}
                />
            </div>
        </footer>
    );
};

// ── Analytics Tracker ────────────────────────────────────────────────────────
const AnalyticsTracker = () => {
    const location = useLocation();

    const getPageMetadata = (pathname) => {
        if (pathname === '/') return { pageType: 'brand_gateway', contentTrack: 'brand', title: 'AURSA — Personal Style & Fashion Retail Intelligence' };
        if (pathname === '/retail') return { pageType: 'retail_commercial', contentTrack: 'retail', title: 'Fashion Retail Intelligence for the Fitting-Room Decision | AURSA' };
        if (pathname === '/app') return { pageType: 'consumer_product', contentTrack: 'personal', title: 'AURSA — AI Outfit Checker & Personal Style App' };
        if (pathname === '/smart-fitting-room') return { pageType: 'retail_pillar', contentTrack: 'retail', title: 'Smart Fitting Rooms Without New Hardware | AURSA' };
        if (pathname === '/fitting-room-intelligence') return { pageType: 'retail_pillar', contentTrack: 'retail', title: 'What Is Fitting Room Intelligence? | AURSA' };
        if (pathname === '/fitting-room-analytics') return { pageType: 'retail_pillar', contentTrack: 'retail', title: 'Fitting Room Analytics & Shopper Decision Insights | AURSA' };
        if (pathname === '/in-store-personalization') return { pageType: 'retail_pillar', contentTrack: 'retail', title: 'In-Store Personalization for Fashion Retail | AURSA' };
        if (pathname === '/personal-style-intelligence') return { pageType: 'consumer_pillar', contentTrack: 'personal', title: 'What Is Personal Style Intelligence? | AURSA' };
        if (pathname === '/insights') return { pageType: 'insights_hub', contentTrack: 'brand', title: 'AURSA Insights — Retail & Personal Style Intelligence' };
        if (pathname.startsWith('/blog/')) return { pageType: 'article', contentTrack: 'personal', title: 'AURSA Insights' };
        return { pageType: 'trust', contentTrack: 'trust', title: 'AURSA' };
    };

    const { pageType, contentTrack, title } = getPageMetadata(location.pathname);

    // Instrument scroll depth tracking per page view
    useScrollDepth(location.pathname, pageType);

    useEffect(() => {
        if (!location.pathname.startsWith('/blog/')) {
            document.title = title;
        }

        trackEvent('page_view', {
            path: location.pathname,
            page_type: pageType,
            content_track: contentTrack,
            page_title: title
        });
    }, [location.pathname, pageType, contentTrack, title]);

    return null;
};

// ── Legacy Hash & SPA 404 Redirect Helper ─────────────────────────────────
const LegacyHashRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const normalizePath = (p) => {
            if (!p) return '/';
            let clean = p;
            if (clean.startsWith('#/')) clean = clean.slice(1);
            if (clean.length > 1 && clean.endsWith('/')) {
                clean = clean.slice(0, -1);
            }
            if (clean === '/journal') return '/insights';
            if (clean === '/privacy-policy') return '/privacy';
            if (clean === '/blog') return '/insights';
            return clean;
        };

        // 1. Handle GitHub Pages / 404 query redirect "?/about"
        const search = window.location.search;
        if (search && search.startsWith('?/')) {
            const rawPath = search.slice(2).replace(/~and~/g, '&');
            const targetPath = normalizePath(rawPath);
            navigate(targetPath, { replace: true });
            return;
        }

        // 2. Handle legacy hash URLs e.g. "/#/about" or "/#/privacy-policy"
        const hash = window.location.hash;
        if (hash && hash.startsWith('#/')) {
            const targetPath = normalizePath(hash);
            navigate(targetPath, { replace: true });
            return;
        }

        // 3. Handle sessionStorage redirect fallback
        const redirect = sessionStorage.getItem("redirect");
        if (redirect) {
            sessionStorage.removeItem("redirect");
            const targetPath = normalizePath(redirect);
            navigate(targetPath, { replace: true });
        }
    }, [navigate]);

    return null;
};

// ── Page Transition Wrapper ──────────────────────────────────────────────────
const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

// ── 404 Not Found Component ──────────────────────────────────────────────────
const NotFoundPage = () => (
    <PageWrapper>
        <SEOHead
            title="404: Page Not Found — AURSA"
            description="The requested page could not be found."
            robots="noindex, nofollow"
        />
        <div className="min-h-[#70vh] bg-[#0F0F13] text-[#F5F5F7] font-sans flex flex-col items-center justify-center p-6 text-center pt-32 pb-24">
            <h1 className="font-serif text-5xl md:text-6xl mb-4 text-[#F5F5F7]">404 — Page Not Found</h1>
            <p className="text-[#A1A1AA] text-lg mb-8 max-w-md font-light">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-transparent hover:bg-[#D88A3D] hover:border-[#D88A3D] text-white text-xs font-bold uppercase tracking-[0.3em] transition-all duration-200"
            >
                Return Home
            </Link>
        </div>
    </PageWrapper>
);

// ── Animated Routes Component ────────────────────────────────────────────────
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0F0F13]" />}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><BrandGatewayHomepage /></PageWrapper>} />
                    <Route path="/retail" element={<PageWrapper><RetailPage /></PageWrapper>} />
                    <Route path="/app" element={<PageWrapper><AppPage /></PageWrapper>} />
                    <Route path="/smart-fitting-room" element={<PageWrapper><SmartFittingRoomPage /></PageWrapper>} />
                    <Route path="/fitting-room-intelligence" element={<PageWrapper><FittingRoomIntelligencePage /></PageWrapper>} />
                    <Route path="/fitting-room-analytics" element={<PageWrapper><FittingRoomAnalyticsPage /></PageWrapper>} />
                    <Route path="/in-store-personalization" element={<PageWrapper><InStorePersonalizationPage /></PageWrapper>} />
                    <Route path="/personal-style-intelligence" element={<PageWrapper><PersonalStyleIntelligencePage /></PageWrapper>} />

                    <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
                    <Route path="/privacy" element={<PageWrapper><PrivacyPolicyPage /></PageWrapper>} />
                    <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicyPage /></PageWrapper>} />
                    <Route path="/investors" element={<PageWrapper><InvestorsPage /></PageWrapper>} />
                    <Route path="/mirror" element={<Mirror />} />
                    <Route path="/insights" element={<PageWrapper><BlogPage /></PageWrapper>} />
                    <Route path="/journal" element={<Navigate to="/insights" replace />} />
                    <Route path="/blog" element={<Navigate to="/insights" replace />} />
                    <Route path="/blog/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
                    <Route path="/journal/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};

// ── Root App ──────────────────────────────────────────────────────────────────

const App = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden">
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

            .font-serif  { font-family: 'Instrument Serif', serif; }
            .font-sans   { font-family: 'Inter', sans-serif; }
        `}</style>

            <Router>
                <RetailPilotModalProvider>
                    <LegacyHashRedirect />
                    <AnalyticsTracker />
                    <ScrollToTop />
                    <ScrollProgress />
                    <Navbar />

                    <main className="relative z-10">
                        <AnimatedRoutes />
                    </main>

                    <Footer />
                    <RetailPilotModal />
                </RetailPilotModalProvider>
            </Router>
        </div>
    );
};

export default App;
