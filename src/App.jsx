import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from 'framer-motion';
import { Camera, Sparkles, Layers, Share2, ArrowRight, Archive, Smartphone, Apple } from 'lucide-react';
import { supabase } from "./lib/supabase";

// ── Shared Utilities ──────────────────────────────────────────────────────────

function generateCode() {
    return "AURSA-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

const AursaButton = ({ text, onClick, href = '#', className = '', variant = 'outline', type = 'a' }) => {
    const cls = `relative inline-flex items-center justify-center gap-3 px-10 py-5 text-xs font-bold uppercase tracking-[0.4em] transition-all duration-300 ${variant === 'solid'
        ? 'bg-[#D88A3D] border border-[#D88A3D] hover:bg-[#F0B67F] hover:border-[#F0B67F] text-[#0F0F13]'
        : 'border border-white/20 bg-transparent hover:bg-[#D88A3D] hover:border-[#D88A3D] text-white'
        } ${className}`;
    if (type === 'button') {
        return (
            <motion.button onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cls}>
                {text}
            </motion.button>
        );
    }
    return (
        <motion.a href={href} onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cls}>
            {text}
        </motion.a>
    );
};



const SectionHeading = ({ small, title, subtitle, mb = 'mb-16', centered = true }) => (
    <div className={`${mb} ${centered ? 'text-center' : 'text-left'}`}>
        {small && (
            <p className="text-[#D88A3D] uppercase tracking-[0.35em] text-[10px] font-bold mb-4">
                {small}
            </p>
        )}
        <h2 className="text-4xl md:text-6xl font-serif mb-4 leading-tight text-[#F5F5F7]">
            {title}
        </h2>
        {subtitle && (
            <p className="text-lg max-w-2xl mx-auto leading-relaxed font-light text-[#A1A1AA]">
                {subtitle}
            </p>
        )}
    </div>
);

// ── Waitlist Modal ────────────────────────────────────────────────────────────

const WAITLIST_API = 'https://script.google.com/macros/s/AKfycbyEYsfwBsfqxKVy5tufmBfpA9VYNzA5_XlVb0e6sqW3jwzG5xyFPEBVw0ZoYxRp6LMEww/exec';

const WaitlistModal = ({ data, onClose }) => {
    if (!data) return null;

    // Support both the previous backend format and the new Google Form format
    const title = data.title || (data.status === 'new' ? "You're in. ✨" : "Already in. ✨");
    const subTitle = data.message || (data.status === 'new' ? 'Priority early access' : 'Your priority spot');
    const number = data.number ? `#${data.number}` : null;

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
                style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
                onClick={onClose}
            >
                <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="bg-[#16161C] border border-white/8 rounded-[20px] p-6 md:p-8 max-w-[380px] w-full max-h-[90vh] overflow-y-auto flex flex-col items-center text-center"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Title */}
                    <p className="text-[#D88A3D] text-[10px] font-bold uppercase tracking-[0.35em] mb-4">
                        {title}
                    </p>

                    {/* Waitlist number or Icon */}
                    {number ? (
                        <p className="font-serif text-[#F5F5F7] text-5xl mb-1">
                            {number}
                        </p>
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-[#D88A3D]/10 flex items-center justify-center mb-2">
                            <span className="text-[#D88A3D] text-3xl font-serif">A</span>
                        </div>
                    )}

                    <p className="text-[#A1A1AA] text-[11px] uppercase tracking-[0.2em] mb-8">
                        {subTitle}
                    </p>

                    {/* Unique code */}
                    <div className="w-full bg-[#0B0F1A] rounded-[12px] px-5 py-4 mb-4 border border-white/6">
                        <p className="text-[#A1A1AA] text-[9px] uppercase tracking-[0.3em] mb-2">Your Priority Access Code</p>
                        <p className="font-mono text-[#D88A3D] text-xl tracking-[0.15em] font-semibold">
                            {data.code}
                        </p>
                    </div>
                    <p className="text-[#A1A1AA] text-[11px] tracking-[0.05em] mb-8" style={{ opacity: 0.7 }}>
                        We’ll notify you before the public launch.
                    </p>

                    {/* Close */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="h-[44px] px-8 rounded-[10px] font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-200"
                        style={{ background: '#D88A3D', color: '#0F0F13' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F0B67F'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#D88A3D'; }}
                    >
                        Got it
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ── Waitlist Form ─────────────────────────────────────────────────────────────

const WaitlistForm = ({ theme = 'dark' }) => {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [waitlistCount, setWaitlistCount] = React.useState(47);
    const [error, setError] = React.useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const fetchCount = async () => {
        const { count, error } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true });
        if (!error && count !== null) {
            const base = 47;
            setWaitlistCount(base + count);
        }
    };

    React.useEffect(() => {
        fetchCount();
    }, []);

    const handleWaitlistSubmit = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError('Enter your email');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setError('Enter a valid email');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // Check if user already exists
            const { data: existingUser, error: checkError } = await supabase
                .from("waitlist")
                .select("*")
                .eq("email", trimmedEmail)
                .maybeSingle();

            if (checkError) throw checkError;

            let user;

            if (existingUser) {
                user = existingUser;
            } else {
                // Get current count to determine next position
                const { count: currentTotal } = await supabase
                    .from("waitlist")
                    .select("*", { count: "exact", head: true });

                const position = (currentTotal || 0) + 1;
                const code = generateCode();

                const { data: newUser, error: insertError } = await supabase
                    .from("waitlist")
                    .insert([{ email: trimmedEmail, code, position }])
                    .select()
                    .single();

                if (insertError) throw insertError;
                user = newUser;
            }

            const base = 47;
            const number = base + (user.position || 0);

            setModalData({
                title: existingUser ? `Already in. You're #${number} ✨` : `You're in. You're #${number} ✨`,
                number: number,
                code: user.code,
                message: "This code gives you early access priority. Keep it safe.",
                status: existingUser ? 'exists' : 'new'
            });

            if (!existingUser) {
                setWaitlistCount(prev => prev + 1);
            }

            setEmail('');
        } catch (err) {
            console.error("Waitlist error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isHero = theme === 'dark'; // The dark theme is used in the hero 
    const isDark = theme === 'dark';
    const inputCls = isDark
        ? 'flex-1 h-[50px] px-5 rounded-[10px] border border-white/15 text-[14px] text-[#F5F5F7] outline-none transition-all duration-200 placeholder-[#A1A1AA] focus:border-[#D88A3D]/60'
        : 'flex-1 h-[50px] px-5 rounded-[10px] border border-black/10 bg-white text-[14px] text-[#0B0F1A] outline-none transition-all duration-200 placeholder-[#A1A1AA] focus:border-[#D88A3D]';

    return (
        <>
            <WaitlistModal data={modalData} onClose={() => setModalData(null)} />

            <div className="mt-6 md:mt-10 flex flex-col items-center md:items-start w-full">

                {/* Coming Soon label */}
                <p className="text-[#D88A3D] text-[24px] font-bold uppercase tracking-[0.45em] mb-1">
                    Coming Soon
                </p>

                {/* Platform subtext */}
                <p
                    className={`text-[11px] uppercase tracking-[0.2em] mb-[40px] md:mb-[52px] ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}
                    style={{ opacity: 0.75 }}
                >
                    Launching on iOS and Android
                </p>

                {/* Action label */}
                <p className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-[#F5F5F7]' : 'text-[#0B0F1A]'}`}>
                    Get early access
                </p>

                {/* Input + button */}
                <form
                    onSubmit={handleWaitlistSubmit}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[440px]"
                >
                    <div className="relative flex-1 w-full">
                        <input
                            type="email"
                            required
                            autoFocus={isHero}
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="Enter your email for early access"
                            className={`${inputCls} w-full ${error ? 'border-red-500/50' : ''}`}
                            style={isDark ? { background: 'rgba(255,255,255,0.07)' } : {}}
                        />
                        {error && (
                            <p className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-medium tracking-wide">
                                {error}
                            </p>
                        )}
                    </div>
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-[50px] w-full sm:w-auto px-7 rounded-[10px] font-bold uppercase tracking-[0.2em] text-[11px] whitespace-nowrap transition-all duration-200"
                        style={{
                            background: '#D88A3D',
                            color: '#0F0F13',
                            opacity: loading ? 0.7 : 1,
                        }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#F0B67F'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#D88A3D'; }}
                    >
                        {loading ? 'Joining...' : 'Join Waitlist'}
                    </motion.button>
                </form>

                {/* Count */}
                <p
                    className={`mt-3 text-[12px] tracking-[0.05em] ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}
                    style={{ opacity: 0.8 }}
                >
                    {waitlistCount} people already waiting
                </p>

                {/* Urgency */}
                <p
                    className={`mt-1 text-[11px] font-medium tracking-[0.05em] ${isDark ? 'text-[#D88A3D]' : 'text-[#D88A3D]'}`}
                >
                    Early users get priority access
                </p>

                {/* Microcopy */}
                <p
                    className={`mt-1 text-[11px] tracking-[0.05em] ${isDark ? 'text-[#A1A1AA]' : 'text-[#6B7280]'}`}
                    style={{ opacity: 0.45 }}
                >
                    Limited early access. No spam.
                </p>

            </div>
        </>
    );
};

// ── Vibe Card ─────────────────────────────────────────────────────────────────

const VibeCard = ({ title, harmony, contrast, layering, insight }) => {
    const DotRow = ({ label, count }) => (
        <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-[0.2em]">{label}</span>
            <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < count ? 'bg-[#D88A3D]' : 'bg-[#3A3A40]'}`}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-[#16161C] p-[28px] rounded-[16px] border border-white/5 relative overflow-hidden w-full max-w-[380px] mx-auto transition-all duration-200 ease-in-out hover:-translate-y-[6px] hover:border-[#D88A3D]"
        >
            <h3 className="text-2xl font-serif text-[#F5F5F7] mb-8">{title}</h3>
            <div className="space-y-1 mb-8">
                <DotRow label="Color Harmony" count={harmony} />
                <DotRow label="Contrast" count={contrast} />
                <DotRow label="Layering" count={layering} />
            </div>
            <div className="pt-6 border-t border-white/5">
                <p className="text-[#A1A1AA] text-sm leading-relaxed font-light">{insight}</p>
            </div>
        </motion.div>
    );
};

// ── Navbar ────────────────────────────────────────────────────────────────────

const NavLink = ({ href, children }) => (
    <a
        href={href}
        className="relative group text-[10px] uppercase tracking-[0.4em] text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors duration-200 px-3 py-1"
    >
        {children}
        <span className="absolute left-0 -bottom-[4px] h-[1px] w-0 bg-[#D88A3D] transition-all duration-300 group-hover:w-full" />
    </a>
);

const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 40);
    });

    const navBg = scrolled
        ? 'rgba(22,22,28,0.88)'
        : 'rgba(22,22,28,0.60)';

    return (
        <>
            {/* Floating nav pill */}
            <motion.header
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center"
                style={{ paddingTop: '24px' }}
            >
                <nav
                    className="flex items-center justify-between transition-all duration-500"
                    style={{
                        background: navBg,
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '10px 16px',
                        width: '100%',
                        maxWidth: '1100px',
                        margin: '0 auto',
                    }}
                >
                    {/* Logo */}
                    <a
                        href="/"
                        className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200"
                    >
                        <img
                            src="/aursa-logo.svg"
                            alt="Aursa logo"
                            style={{ height: '28px', width: 'auto' }}
                        />
                    </a>

                    {/* Right side navigation */}
                    <div className="hidden md:flex items-center gap-2 ml-auto">
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex items-center md:hidden">
                        <button
                            className="flex flex-col gap-[5px] p-2"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="block w-5 h-px bg-[#F5F5F7]"
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.15 }}
                                className="block w-5 h-px bg-[#F5F5F7]"
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
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
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed z-40 flex flex-col items-start gap-2 px-6 py-4"
                        style={{
                            top: '90px',
                            left: '24px',
                            right: '24px',
                            background: 'rgba(22,22,28,0.95)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                        }}
                    >
                        {[['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="w-full text-[11px] uppercase tracking-[0.35em] text-[#A1A1AA] hover:text-[#F5F5F7] py-3 border-b border-white/5 last:border-0 transition-colors duration-200"
                            >
                                {label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};


// ── Hero Particles ────────────────────────────────────────────────────────────

const COLORS = ['#D88A3D', '#D88A3D', '#F0B67F', 'rgba(255,255,255,0.6)'];

const HeroParticles = ({ mouseX, mouseY }) => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let W, H, particles;

        const isMobile = () => window.innerWidth < 768;

        const rand = (min, max) => Math.random() * (max - min) + min;

        const makeParticle = () => ({
            x: rand(0, W),
            y: rand(0, H),
            r: rand(1, 2.2),
            vx: rand(-0.08, 0.08), // Slower vx
            vy: rand(-0.12, -0.04), // Slower vy
            alpha: rand(0.15, 0.3), // Opacity range 0.15 - 0.3
            alphaDir: Math.random() > 0.5 ? 1 : -1,
            alphaDelta: rand(0.001, 0.004), // Slower fade
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            // parallax weight — lighter particles shift more with mouse
            px: rand(0.015, 0.035), // Increased weight for depth
            py: rand(0.015, 0.035),
        });

        const init = () => {
            if (!canvas) return;
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            const count = isMobile() ? 18 : 32;
            particles = Array.from({ length: count }, makeParticle);
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);

            // Get smoothed mouse values from motion values
            const mx = mouseX.get() * W;
            const my = mouseY.get() * H;

            particles.forEach((p) => {
                // drift
                p.x += p.vx;
                p.y += p.vy;

                // gentle pulse
                p.alpha += p.alphaDelta * p.alphaDir;
                if (p.alpha >= 0.3 || p.alpha <= 0.1) p.alphaDir *= -1;

                // wrap around edges
                if (p.x < -10) p.x = W + 10;
                if (p.x > W + 10) p.x = -10;
                if (p.y < -10) p.y = H + 10;

                // subtle mouse parallax
                const drawX = p.x + mx * p.px;
                const drawY = p.y + my * p.py;

                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 4;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.restore();
            });

            rafRef.current = requestAnimationFrame(draw);
        };

        const onResize = () => { init(); };

        init();
        draw();
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
        };
    }, [mouseX, mouseY]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

// ── Section 1 · Hero ──────────────────────────────────────────────────────────

const AnimatedNumber = ({ value }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let start;
        const duration = 900;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            if (progress < 1) {
                setDisplay(Math.floor(easeOut * value));
                requestAnimationFrame(step);
            } else {
                setDisplay(value);
            }
        };
        const timeout = setTimeout(() => {
            requestAnimationFrame(step);
        }, 300);
        return () => clearTimeout(timeout);
    }, [value]);
    return <>{display}</>;
};

const HeroSection = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize mouse position to -0.5 to 0.5 range
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    // Parallax transforms — very subtle (2px - 6px total movement)
    const zodiacX = useTransform(x, [-0.5, 0.5], [-4, 4]);
    const zodiacY = useTransform(y, [-0.5, 0.5], [-4, 4]);

    return (
        <section
            className="relative min-h-screen md:h-screen overflow-hidden bg-[#0F0F13]"
            onMouseMove={handleMouseMove}
        >
            {/* Layer 1: copper radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#D88A3D]/6 rounded-full blur-[160px]" />
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#D88A3D]/4 rounded-full blur-[100px]" />
            </div>

            {/* Layer 2: particle canvas */}
            <HeroParticles mouseX={x} mouseY={y} />

            {/* Layer 3: dot grid */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)',
                    backgroundSize: '36px 36px',
                    zIndex: 2,
                }}
            />

            {/* Layer 5: Bottom gradient fade — smooth transition into next section */}
            <div
                className="absolute left-0 w-full pointer-events-none"
                style={{
                    bottom: 0,
                    height: '180px',
                    background: 'linear-gradient(180deg, rgba(15,15,19,0) 0%, rgba(15,15,19,0.7) 70%, rgba(15,15,19,1) 100%)',
                    zIndex: 5,
                }}
            />

            {/* Layer 4: Content Layout */}
            <div className="relative z-10 w-full px-5 md:px-8 lg:px-12 py-10 md:py-[90px] lg:py-[120px] pt-28 md:pt-32">
                <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

                    {/* MOBILE-ONLY STORYTELLING FLOW (Visual -> Text -> Scroll Guide -> CTA) */}
                    <div className="flex md:hidden flex-col items-center text-center w-full">
                        {/* 1. Zodiac Visual + Card Group */}
                        <div className="relative w-full max-w-[280px] flex flex-col items-center justify-center mb-8 mt-6">
                            {/* Layer A: Zodiac SVG */}
                            <div className="relative w-[115%] aspect-square flex items-center justify-center z-1">
                                <motion.img
                                    src="/zodiac.svg"
                                    alt=""
                                    className="w-full h-auto"
                                    style={{ opacity: 0.3, scale: 1.1 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                />
                                <div
                                    className="absolute bg-[#D88A3D]/20 rounded-full blur-[40px]"
                                    style={{ width: '140px', height: '140px' }}
                                />
                            </div>

                            {/* Copper glow vignette behind the harmony card (mobile) */}
                            <div
                                className="absolute pointer-events-none"
                                style={{
                                    bottom: '-20px',
                                    right: '0',
                                    width: '180px',
                                    height: '180px',
                                    background: 'radial-gradient(circle, rgba(216,138,61,0.2) 0%, transparent 70%)',
                                    filter: 'blur(30px)',
                                    opacity: 0.4,
                                    zIndex: 1,
                                }}
                            />

                            {/* Layer B: Style Harmony Card (mobile version) */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="absolute z-2 bg-[#1C1C23] p-[16px] w-[240px] bottom-[-10px] right-[-10px] sm:right-[-20px]"
                                style={{
                                    border: '1px solid #D88A3D',
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.6)',
                                    scale: 0.85
                                }}
                            >
                                <div className="h-full flex flex-col justify-center">
                                    <p className="text-[#A1A1AA] uppercase tracking-[0.2em] text-[8px] mb-3 font-bold">Harmony Check</p>
                                    <div className="flex justify-between items-end mb-3 border-b border-white/5 pb-3">
                                        <span className="text-[#F5F5F7] font-sans text-xs">Harmony</span>
                                        <span className="text-[#D88A3D] font-serif text-[28px] leading-none"><AnimatedNumber value={82} />%</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-[#A1A1AA] uppercase tracking-wider">Style Energy</span>
                                            <span className="text-[#F5F5F7] font-medium">Libra Balance</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-[#A1A1AA] uppercase tracking-wider">Contrast</span>
                                            <span className="text-[#F5F5F7] font-medium">Medium</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 2. Text Content */}
                        <div className="space-y-3">
                            <h1 className="font-serif text-[#F5F5F7]" style={{ fontSize: '32px', lineHeight: 1.15 }}>
                                Your outfit says<br /> more than you think.
                            </h1>
                            <p className="font-sans text-[#F5F5F7] text-[18px] font-medium leading-[1.4] px-4">
                                Understand what your outfit communicates — before you step out.
                            </p>
                            <p className="font-sans text-[#A1A1AA] text-[15px] font-light leading-[1.6] px-6">
                                AURSA is an AI mirror that analyzes your outfit — revealing balance, contrast, and visual harmony.
                            </p>
                        </div>

                        {/* 3. Scroll Guidance */}
                        <motion.div
                            className="mt-6 flex flex-col items-center gap-2 opacity-60"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Join early access</span>
                            <ArrowRight className="w-4 h-4 rotate-90 text-[#D88A3D]" />
                        </motion.div>

                        {/* 4. Waitlist CTA (Below Fold Context) */}
                        <div className="mt-12 w-full">
                            <WaitlistForm theme="dark" />
                        </div>
                    </div>

                    {/* DESKTOP-ONLY LAYOUT (Unchanged) */}
                    <div className="hidden md:flex w-full items-center justify-between gap-12">
                        {/* ── LEFT 60% — Brand visual area + Card ── */}
                        <div className="relative flex flex-col items-center justify-center w-[60%] h-full min-h-[400px]">
                            {/* Layer A: Zodiac SVG */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                style={{ x: zodiacX, y: zodiacY }}
                            >
                                <motion.img
                                    src="/zodiac.svg"
                                    alt=""
                                    className="w-[120%] max-w-[850px] relative z-10 mx-auto"
                                    style={{ height: 'auto', opacity: 0.4 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.div>

                            {/* Copper glow behind the harmony card */}
                            <div
                                className="absolute pointer-events-none"
                                style={{
                                    bottom: 'calc(5% + 20px)',
                                    right: '20px',
                                    width: '260px',
                                    height: '260px',
                                    background: 'radial-gradient(circle, rgba(216,138,61,0.25) 0%, transparent 70%)',
                                    filter: 'blur(40px)',
                                    opacity: 0.5,
                                    zIndex: 18,
                                }}
                            />

                            {/* Floating Harmony Check Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                whileHover={{ y: -6 }}
                                className="absolute z-20 bg-[#1C1C23] p-[24px] w-auto min-w-[300px] bottom-[5%] right-0 translate-x-0"
                                style={{
                                    border: '1px solid #D88A3D',
                                    borderRadius: '16px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                <div className="h-full flex flex-col justify-center">
                                    <p className="text-[#A1A1AA] uppercase tracking-[0.2em] text-[10px] mb-6 font-bold">Harmony Check</p>
                                    <div className="flex justify-between items-end mb-5 border-b border-white/5 pb-5">
                                        <span className="text-[#F5F5F7] font-sans text-sm">Harmony</span>
                                        <span className="text-[#D88A3D] font-serif text-[42px] leading-none"><AnimatedNumber value={82} />%</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#A1A1AA] text-xs uppercase tracking-wider">Style Energy</span>
                                            <span className="text-[#F5F5F7] text-sm font-medium">Libra Balance</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#A1A1AA] text-xs uppercase tracking-wider">Contrast</span>
                                            <span className="text-[#F5F5F7] text-sm font-medium">Medium</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#A1A1AA] text-xs uppercase tracking-wider">Layering</span>
                                            <span className="text-[#F5F5F7] text-sm font-medium">Structured</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── RIGHT 40% — Text + CTA ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                            className="flex flex-col justify-center items-start text-left w-[40%]"
                        >
                            <h1 className="font-serif text-[#F5F5F7]" style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.1 }}>
                                Your outfit says<br className="hidden md:block" /> more than you think.
                            </h1>
                            <p className="font-sans text-[#F5F5F7]" style={{ fontWeight: 400, fontSize: '24px', lineHeight: 1.3, marginTop: '24px' }}>
                                Understand what your outfit communicates — before you step out.
                            </p>
                            <p className="font-sans text-[#A1A1AA]" style={{ fontWeight: 300, fontSize: '18px', lineHeight: 1.6, marginTop: '24px', maxWidth: '440px' }}>
                                AURSA is an AI mirror that analyzes your outfit — revealing balance, contrast, and visual harmony — so you know what it says before you step out.
                            </p>
                            <WaitlistForm theme="dark" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};


// ── Section 2 · Mirror Moment ──────────────────────────────────────────

const MirrorMomentSection = () => {
    const pillContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
    };
    const pillVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };
    const thoughts = [
        'Do these colors actually work together?',
        'Does this outfit feel balanced?',
        'Does this look like me?'
    ];

    return (
        <section
            id="mirror-moment"
            className="w-full bg-[#FFFFFF] px-5 md:px-8 lg:px-12 py-[70px] md:py-[90px] lg:py-[120px] overflow-hidden"
            style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
            {/* Two-column layout */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

                {/* LEFT — Image */}
                <div className="relative flex-shrink-0">
                    <img
                        src="https://images.pexels.com/photos/7383117/pexels-photo-7383117.jpeg"
                        alt="Person checking outfit in mirror"
                        className="w-full max-w-[640px] rounded-2xl object-cover shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
                    />
                </div>

                {/* RIGHT — Text */}
                <div className="flex flex-col items-start text-left max-w-[520px] gap-6">

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="font-serif text-[#0B0F1A] leading-tight"
                        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
                    >
                        Before stepping out,<br />
                        there's always a moment of doubt.
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                        className="font-sans text-[#6B7280] text-lg font-light"
                    >
                        You look in the mirror and wonder.
                    </motion.p>

                    {/* Thought Pills */}
                    <motion.div
                        variants={pillContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="flex flex-col gap-3 mt-4"
                    >
                        {thoughts.map((thought, i) => (
                            <motion.div
                                key={i}
                                variants={pillVariant}
                                className="bg-white border border-black/10 rounded-full px-6 py-3 text-sm font-medium shadow-md text-[#374151] w-fit"
                            >
                                {thought}
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

            </div>

            {/* Divider */}
            <div className="w-[120px] h-[1px] bg-black/10 mx-auto my-12" />

            {/* Final Reveal Line */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="w-full max-w-[1000px] mx-auto px-4 text-center"
            >
                <p
                    className="font-serif text-center"
                    style={{
                        fontSize: 'clamp(36px, 5vw, 64px)',
                        lineHeight: 1.1,
                        fontWeight: 500,
                        letterSpacing: '0.01em'
                    }}
                >
                    <span className="text-[#D88A3D]">AURSA</span>
                    <span className="text-[#0B0F1A]"> is built for that moment.</span>
                </p>
            </motion.div>

        </section>
    );
};


// ── Section 3 · AI Mirror ───────────────────────────────────────────────

const AIMirrorSection = () => {
    // Staggered labels animation variants
    const labelContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15, // 150ms delay between labels
                delayChildren: 0.6, // Start after grid draw
            }
        }
    };

    const labelItem = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
    };

    return (
        <section id="how" className="py-[70px] md:py-[90px] lg:py-[120px] px-5 md:px-8 lg:px-12 bg-[#0B0F1A]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* ── LEFT COLUMN: Text Explanation ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex flex-col items-start text-left"
                >
                    <h2
                        className="font-serif text-[#FFFFFF] mb-8"
                        style={{ fontSize: 'clamp(40px, 4vw, 56px)', lineHeight: 1.1 }}
                    >
                        An AI mirror for <br className="hidden md:block" /> your personal style.
                    </h2>

                    <div className="space-y-6">
                        <p className="font-sans text-[#D1D5DB] text-lg md:text-xl font-medium">
                            Upload your outfit.
                        </p>

                        <p className="font-sans text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-md">
                            AURSA analyzes the visual composition of your look — from color harmony to contrast, layering, and balance.
                        </p>

                        <p className="font-sans text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-md">
                            Then it reveals the vibe your outfit projects.
                        </p>
                    </div>

                    <div className="mt-12 pt-12 border-t border-white/10">
                        <p className="font-sans text-[#A1A1AA] text-sm md:text-base leading-relaxed italic border-l-2 border-[#D88A3D] pl-4">
                            Not trends.<br />
                            Not fashion rules.<br />
                            <span className="text-[#F5F5F7] font-medium not-italic block mt-3">Just understanding your style.</span>
                        </p>
                    </div>
                </motion.div>

                {/* ── RIGHT COLUMN: Outfit Grid Animation ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 relative flex justify-center items-center"
                >
                    <div className="relative w-full max-w-[360px] md:w-[400px] h-[450px] md:h-[600px] rounded-2xl overflow-hidden bg-[#1C1C23] mx-auto">
                        {/* Placeholder image for outfit — using a gradient block if actual image is missing */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a35] to-[#1C1C23]" />
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                            alt="Outfit Example"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                        />

                        {/* Animated Grid Overlay */}
                        <motion.div
                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {/* Horizontal scanning lines */}
                            <div className="absolute top-1/4 left-0 w-full h-px bg-[#D88A3D]/40" />
                            <div className="absolute top-2/4 left-0 w-full h-px bg-[#D88A3D]/40" />
                            <div className="absolute top-3/4 left-0 w-full h-px bg-[#D88A3D]/40" />

                            {/* Vertical scanning lines */}
                            <div className="absolute top-0 left-1/3 w-px h-full bg-[#D88A3D]/40" />
                            <div className="absolute top-0 left-2/3 w-px h-full bg-[#D88A3D]/40" />

                            {/* Corner brackets */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D88A3D]" />
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D88A3D]" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D88A3D]" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D88A3D]" />
                        </motion.div>

                        {/* Sequential Labels */}
                        <motion.div
                            variants={labelContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="absolute inset-y-0 right-4 flex flex-col justify-center gap-12"
                        >
                            {['Color Harmony', 'Contrast', 'Layering', 'Balance'].map((label, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={labelItem}
                                    className="flex items-center justify-end gap-3"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                    <span className="bg-[#16161C]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D88A3D]/20 text-[10px] uppercase tracking-wider font-bold text-[#F5F5F7] whitespace-nowrap shadow-xl">
                                        {label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ── Section 4+5 · Style Analysis (merged) ──────────────────────────────────

const StyleAnalysisSection = () => {
    const listContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    };
    const listItem = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };
    const gridContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };
    const gridItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <section
            className="py-[70px] md:py-[90px] lg:py-[120px] px-5 md:px-8 lg:px-12 bg-[#FFFFFF]"
            style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-24">

                {/* LEFT COLUMN — Style Patterns */}
                <div className="w-full md:w-1/2 flex flex-col gap-10">

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="font-serif text-[#0B0F1A] leading-tight"
                        style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
                    >
                        Your style is not random.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                        className="flex flex-col gap-4 text-[#374151] font-sans text-lg md:text-xl font-light"
                    >
                        <p>Most people believe their style changes constantly.</p>
                        <p>But when multiple outfits are analyzed, patterns begin to appear.</p>
                    </motion.div>

                    <motion.ul
                        variants={listContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="flex flex-col gap-3 md:gap-4 text-left"
                    >
                        {[
                            'Color palette patterns',
                            'Contrast preferences',
                            'Layering habits',
                            'Visual balance'
                        ].map((item, idx) => (
                            <motion.li
                                key={idx}
                                variants={listItem}
                                className="bg-[#F9FAFB] border rounded-[16px] px-6 py-4 flex items-center justify-between"
                                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
                            >
                                <span className="font-sans text-[#374151] font-medium tracking-wide">{item}</span>
                                <div className="w-2 h-2 rounded-full bg-[#D88A3D]" />
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                        className="flex flex-col gap-2"
                    >
                        <p className="font-sans text-[#374151] text-lg font-medium">
                            These patterns form a visual fingerprint.
                        </p>
                        <p className="font-sans text-[#D88A3D] text-sm uppercase tracking-widest font-bold mt-2">
                            AURSA helps you discover yours.
                        </p>
                    </motion.div>

                </div>

                {/* RIGHT COLUMN — Feature Cards */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        variants={gridContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="flex flex-col gap-6 max-w-[420px]"
                    >
                        {[
                            { title: 'Color Harmony', desc: 'How well the colors in your outfit work together.' },
                            { title: 'Contrast Energy', desc: 'The visual intensity your outfit projects.' },
                            { title: 'Layering Structure', desc: 'How garments interact to create depth.' },
                            { title: 'Visual Balance', desc: 'The overall composition of your look.' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={gridItem}
                                whileHover={{
                                    scale: 1.03,
                                    borderColor: '#D88A3D',
                                    boxShadow: '0px 10px 30px rgba(216,138,61,0.15)',
                                    transition: { duration: 0.2, ease: 'easeOut' }
                                }}
                                className="w-full bg-[#F9FAFB] border border-black/[0.06] rounded-2xl p-8 flex flex-col items-start cursor-default"
                            >
                                <h3 className="font-serif text-[#0B0F1A] text-xl mb-3 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="font-sans text-[#6B7280] text-base leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};


// ── Section 6 · Result Card ───────────────────────────────────────────

const ResultCardSection = () => {
    // Staggered variants for the card metrics
    const metricsContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12, // 120ms stagger
                delayChildren: 0.4,
            }
        }
    };

    const metricItem = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const labelsContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.6,
            }
        }
    };

    const labelAnim = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="vibe-section" className="py-[70px] md:py-[90px] lg:py-[120px] px-5 md:px-8 lg:px-12 bg-[#FFFFFF] flex flex-col items-center justify-center text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-[600px] w-full mx-auto mb-16"
            >
                <h2
                    className="font-serif text-[#0B0F1A] mb-6 leading-tight"
                    style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
                >
                    A clear reflection of your style. <br className="hidden md:block" />
                </h2>
                <p className="font-sans text-[#374151] text-lg md:text-xl font-light">
                    AURSA translates visual analysis into an intuitive result.
                </p>
            </motion.div>

            {/* The Floating Result Card Area */}
            <div className="relative w-full flex justify-center mb-16">

                {/* Glow Behind the Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        width: '420px',
                        height: '420px',
                        background: 'radial-gradient(circle, rgba(216,138,61,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: 0
                    }}
                />

                {/* Floating Labels */}
                <motion.div
                    variants={labelsContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute inset-0 pointer-events-none z-10"
                >
                    {/* Top Left */}
                    <motion.div variants={labelAnim} className="hidden md:flex items-center gap-2 absolute" style={{ top: '20%', right: 'calc(50% + 140px)' }}>
                        <span className="text-[#6B7280] uppercase tracking-[0.12em] text-[11px] font-medium whitespace-nowrap">Color Harmony</span>
                        <div className="w-[60px] h-[1px] bg-black/10" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                    </motion.div>

                    {/* Top Right */}
                    <motion.div variants={labelAnim} className="hidden md:flex items-center gap-2 absolute" style={{ top: '30%', left: 'calc(50% + 140px)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                        <div className="w-[60px] h-[1px] bg-black/10" />
                        <span className="text-[#6B7280] uppercase tracking-[0.12em] text-[11px] font-medium whitespace-nowrap">Contrast Energy</span>
                    </motion.div>

                    {/* Bottom Left */}
                    <motion.div variants={labelAnim} className="hidden md:flex items-center gap-2 absolute" style={{ bottom: '25%', right: 'calc(50% + 140px)' }}>
                        <span className="text-[#6B7280] uppercase tracking-[0.12em] text-[11px] font-medium whitespace-nowrap">Layering Structure</span>
                        <div className="w-[60px] h-[1px] bg-black/10" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                    </motion.div>

                    {/* Bottom Right */}
                    <motion.div variants={labelAnim} className="hidden md:flex items-center gap-2 absolute" style={{ bottom: '15%', left: 'calc(50% + 140px)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                        <div className="w-[60px] h-[1px] bg-black/10" />
                        <span className="text-[#6B7280] uppercase tracking-[0.12em] text-[11px] font-medium whitespace-nowrap">Visual Balance</span>
                    </motion.div>
                </motion.div>

                {/* The Floating Result Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
                    className="relative z-20 w-full max-w-[360px] bg-[#FFFFFF] p-6 md:p-8 flex flex-col gap-8 transition duration-300 ease-out hover:scale-[1.03] hover:shadow-xl"
                    style={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
                >
                    {/* Header Profile - purely visual context */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <span className="font-serif text-[#0B0F1A] text-lg">Your Vibe</span>
                        <span className="text-[#D88A3D] text-[10px] uppercase tracking-[0.3em] font-bold">Analysis Complete</span>
                    </div>

                    <motion.div
                        variants={metricsContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        {/* Primary Metric: Harmony */}
                        <div className="flex flex-col gap-2 items-start border-b border-black/5 pb-6">
                            <span className="text-[#6B7280] text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                Harmony
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-serif text-[#0B0F1A]">82%</span>
                            </div>
                        </div>

                        {/* Secondary Metrics */}
                        <div className="flex flex-col gap-5">
                            {[
                                { label: 'Style Energy', value: 'Libra Balance' },
                                { label: 'Contrast', value: 'Medium' },
                                { label: 'Layering', value: 'Structured' }
                            ].map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={metricItem}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-[#6B7280] text-xs uppercase tracking-wider font-medium">{metric.label}</span>
                                    <span className="font-serif text-[#0B0F1A] text-lg">{metric.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="w-[120px] h-[1px] bg-black/10 mx-auto my-2"></div>

            {/* Closing focus statement */}
            <div
                className="w-full flex justify-center text-center"
                style={{ marginTop: "60px" }}
            >
                <p
                    className="font-sans text-[#D88A3D] uppercase tracking-[0.25em] font-bold text-center"
                    style={{ fontSize: "24px" }}
                >
                    AURSA doesn't judge your style. It helps you understand it.
                </p>
            </div>

        </section>
    );
};

// ── Section 6.5 · Save Your Vibe ──────────────────────────────────────────

const SaveVibeSection = () => {
    return (
        <section className="py-[70px] md:py-[90px] lg:py-[120px] px-5 md:px-8 lg:px-12 bg-[#0B0F1A]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* ── LEFT COLUMN: Visual Stacked Cards ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 flex justify-center items-center"
                >
                    <div className="relative w-full max-w-[320px] h-[320px] flex items-center justify-center">

                        {/* Card 3 (Back) */}
                        <div
                            className="absolute bg-[#1C1C23] border border-white/10 rounded-2xl p-6 shadow-lg w-full max-w-[260px]"
                            style={{
                                transform: 'translateX(20px) translateY(20px) rotate(3deg)',
                                opacity: 0.4,
                                zIndex: 1
                            }}
                        >
                            <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                                <span className="font-serif text-[#F5F5F7] text-sm">Vibe Saved</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-white/5 rounded" />
                                <div className="h-2 w-3/4 bg-white/5 rounded" />
                                <div className="h-2 w-5/6 bg-white/5 rounded" />
                                <div className="h-2 w-2/3 bg-white/5 rounded" />
                            </div>
                        </div>

                        {/* Card 2 (Middle) */}
                        <div
                            className="absolute bg-[#1C1C23] border border-white/10 rounded-2xl p-6 shadow-lg w-full max-w-[260px]"
                            style={{
                                transform: 'translateX(-20px) translateY(20px) rotate(-3deg)',
                                opacity: 0.6,
                                zIndex: 2
                            }}
                        >
                            <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                                <span className="font-serif text-[#F5F5F7] text-sm">Vibe Saved</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-white/10 rounded" />
                                <div className="h-2 w-3/4 bg-white/10 rounded" />
                                <div className="h-2 w-5/6 bg-white/10 rounded" />
                                <div className="h-2 w-2/3 bg-white/10 rounded" />
                            </div>
                        </div>

                        {/* Card 1 (Front) — overflow visible so pill can bleed outside */}
                        <motion.div
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            className="absolute bg-[#1C1C23] border border-white/10 rounded-2xl shadow-xl w-full max-w-[280px]"
                            style={{ zIndex: 3, overflow: 'visible' }}
                        >
                            {/* Top Meta Bar */}
                            <div className="flex items-center justify-between px-4 py-3 rounded-t-2xl overflow-hidden">
                                <span className="text-xs uppercase tracking-widest text-[#A1A1AA]">Saved Look</span>
                                <span className="text-xs uppercase tracking-widest text-[#A1A1AA]">Oct 21</span>
                            </div>

                            {/* Image Area */}
                            <div className="relative rounded-none">
                                <img
                                    src="https://images.pexels.com/photos/1310524/pexels-photo-1310524.jpeg"
                                    alt="Person outfit"
                                    className="w-full h-[200px] object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                                {/* Bottom-left Harmony Score */}
                                <div className="absolute bottom-4 left-4 flex flex-col">
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Harmony Score</span>
                                    <span className="font-serif text-[42px] text-[#D88A3D] leading-none drop-shadow-lg">88%</span>
                                </div>

                                {/* Right-side Energy Pill — bleeds outside card */}
                                <div
                                    className="absolute bottom-[18px] bg-[#1C1C23] border border-[#D88A3D]/40 rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#F5F5F7] shadow-[0_6px_20px_rgba(0,0,0,0.45)] whitespace-nowrap"
                                    style={{ right: '-28px' }}
                                >
                                    Soft Precision
                                </div>
                            </div>

                            {/* Bottom Stats Area */}
                            <div className="px-5 pt-8 pb-2 flex flex-col gap-3">
                                {[
                                    { label: 'Contrast', value: 'Low' },
                                    { label: 'Layering', value: 'Structured' },
                                    { label: 'Balance', value: 'Clean' }
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between text-sm">
                                        <span className="text-[#A1A1AA]">{label}</span>
                                        <span className="text-[#F5F5F7]">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Insight Text */}
                            <p className="text-sm italic text-[#A1A1AA] border-t border-white/5 mx-5 mt-2 pt-4 pb-5">
                                "The focused color palette creates a unified style energy."
                            </p>
                        </motion.div>

                    </div>
                </motion.div>

                {/* ── RIGHT COLUMN: Text Explanation ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-1/2 flex flex-col items-start text-left"
                >
                    {/* Section Label */}
                    <p className="text-xs uppercase tracking-[0.35em] text-[#D88A3D] mb-4">
                        Save Vibe
                    </p>

                    {/* Main Heading */}
                    <h2
                        className="font-serif text-[#F5F5F7] leading-tight mb-6"
                        style={{ fontSize: 'clamp(34px, 4vw, 42px)' }}
                    >
                        Save the looks that feel right.
                    </h2>

                    {/* Body Copy */}
                    <p className="font-sans text-[#A1A1AA] text-base md:text-[18px] leading-relaxed max-w-md">
                        Sometimes an outfit just clicks.
                    </p>

                    <p className="font-sans text-[#A1A1AA] text-base md:text-[18px] leading-relaxed max-w-md mt-4">
                        The colors feel right. The balance feels effortless. The vibe feels like you.
                    </p>

                    <p className="font-sans text-[#A1A1AA] text-base md:text-[18px] leading-relaxed max-w-md mt-4">
                        When that happens, AURSA lets you save the moment.
                    </p>

                    <p className="font-sans text-[#A1A1AA] text-base md:text-[18px] leading-relaxed max-w-md mt-4">
                        Your best looks become part of a personal style library you can revisit, refine, and build on.
                    </p>


                </motion.div>

            </div>

            {/* Centered Closing Statement */}
            <div className="w-full flex justify-center" style={{ marginTop: "120px" }}>
                <p
                    className="font-sans text-[#D88A3D] uppercase tracking-[0.25em] font-bold text-center"
                    style={{ fontSize: '24px' }}
                >
                    Your Strongest Looks. Your Evolving Style.
                </p>
            </div>
        </section>
    );
};

// ── Section 6.75 · Wardrobe Archive ──────────────────────────────────────────

const WardrobeSection = () => {
    const [showUnlockMsg, setShowUnlockMsg] = React.useState(false);

    const wardrobeImages = [
        { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', dot: true },
        { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', dot: false },
        { src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', dot: true },
        { src: 'https://images.unsplash.com/photo-1520975922327-1c0d0d6f2c1c?auto=format&fit=crop&w=600&q=80', dot: false },
        { src: 'https://images.unsplash.com/photo-1520974735194-7f2a2e6b7f0d?auto=format&fit=crop&w=600&q=80', dot: true },
        { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80', dot: false },
        { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80', dot: true },
        { src: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=600&q=80', dot: false },
        { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', dot: true },
    ];

    const gridContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 }
        }
    };

    const tileAnim = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <section
            className="py-[70px] md:py-[90px] lg:py-[120px] px-5 md:px-8 lg:px-12 bg-[#FFFFFF] flex flex-col items-center justify-center"
            style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* LEFT COLUMN — TEXT */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    <h2
                        className="font-serif text-[#0B0F1A] leading-tight"
                        style={{ fontSize: 'clamp(40px,4vw,56px)', marginBottom: '28px' }}
                    >
                        Your wardrobe becomes a style archive.
                    </h2>

                    <p className="font-sans text-[#374151] text-lg md:text-xl leading-relaxed max-w-md">
                        Every outfit you analyze becomes part of your personal wardrobe.
                    </p>

                    <p className="font-sans text-[#374151] text-lg md:text-xl leading-relaxed max-w-md" style={{ marginTop: '16px' }}>
                        Over time AURSA reveals patterns in how you actually dress.
                    </p>


                </div>

                {/* RIGHT COLUMN — WARDROBE UI */}
                <div className="w-full md:w-1/2 flex flex-col items-start">

                    {/* Archive label */}
                    <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">
                        Your Wardrobe Archive
                    </p>

                    {/* Image Grid */}
                    <motion.div
                        variants={gridContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="grid grid-cols-3 gap-3 w-full max-w-[320px]"
                    >
                        {wardrobeImages.map(({ src, dot }, i) => (
                            <motion.div
                                key={i}
                                variants={tileAnim}
                                className="aspect-square rounded-xl overflow-hidden relative cursor-default transition duration-200 ease-out hover:scale-[1.05] hover:shadow-xl"
                            >
                                <img
                                    src={src}
                                    alt="Outfit from wardrobe"
                                    className="w-full h-full object-cover rounded-xl"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback Placeholder */}
                                <div className="hidden absolute inset-0 bg-[#f4f4f4] rounded-xl flex-col items-center justify-center p-4 text-center">
                                    <svg className="w-8 h-8 text-neutral-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Outfit from<br />wardrobe</span>
                                </div>
                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                                {/* Analysis dot */}
                                {dot && (
                                    <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#D88A3D]" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

            </div>

            {/* AI Wardrobe Search (Centered below grid) */}
            <div className="w-full flex flex-col items-center justify-center mt-6">
                <p className="text-[15px] opacity-90 text-[#555] text-center mb-[18px] max-w-[520px] leading-relaxed mx-auto">
                    Choose your mood and the occasion — AURSA will find the best outfit from your wardrobe.
                </p>
                <div className="flex items-center justify-center gap-[14px] flex-wrap w-full mt-[10px]">

                    {/* Occasion Dropdown */}
                    <div className="relative w-full md:w-auto group">
                        <select className="appearance-none w-full md:w-auto h-[48px] pl-[18px] pr-[36px] rounded-[28px] border border-black/10 bg-white text-[15px] text-[#333] min-w-[170px] outline-none transition-all duration-300 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-black/15 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] focus:border-[#c9822f] focus:shadow-[0_0_0_3px_rgba(201,130,47,0.12)] cursor-pointer">
                            <option value="">Occasion</option>
                            <option>Work</option>
                            <option>Casual</option>
                            <option>Date</option>
                            <option>Party</option>
                            <option>Travel</option>
                        </select>
                        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>

                    {/* Mood Dropdown */}
                    <div className="relative w-full md:w-auto group">
                        <select className="appearance-none w-full md:w-auto h-[48px] pl-[18px] pr-[36px] rounded-[28px] border border-black/10 bg-white text-[15px] text-[#333] min-w-[170px] outline-none transition-all duration-300 ease-out shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-black/15 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] focus:border-[#c9822f] focus:shadow-[0_0_0_3px_rgba(201,130,47,0.12)] cursor-pointer">
                            <option value="">Mood</option>
                            <option>Minimal</option>
                            <option>Bold</option>
                            <option>Relaxed</option>
                            <option>Elegant</option>
                            <option>Confident</option>
                        </select>
                        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={() => setShowUnlockMsg(true)}
                        className="w-full md:w-auto h-[48px] px-[22px] rounded-[28px] bg-[#D08A3C] text-white text-[15px] font-medium transition-all duration-300 shadow-[0_6px_18px_rgba(201,130,47,0.25)] hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(201,130,47,0.30)] flex items-center justify-center">
                        Find Outfit
                    </button>

                </div>

                {/* Unlock Message */}
                {showUnlockMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex flex-col items-center mt-[14px]"
                    >
                        <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', letterSpacing: '0.3px', opacity: 0.9 }}>
                            Unlock this in the AURSA app.
                        </p>
                        <a
                            href="#download"
                            className="mt-3 h-[40px] px-[18px] rounded-[20px] bg-neutral-800 text-white text-[13px] font-medium flex items-center justify-center hover:bg-neutral-700 transition-colors"
                        >
                            Download the App
                        </a>
                    </motion.div>
                )}

            </div>

            {/* Colors closing statement */}
            <div className="w-full flex justify-center" style={{ marginTop: '60px' }}>
                <p
                    className="font-sans text-[#D88A3D] uppercase tracking-[0.25em] font-bold text-center"
                    style={{ fontSize: '24px' }}
                >
                    Your Colors. Your Contrast. Your Layering Habits.
                </p>
            </div>


        </section>
    );
};


// ── Section 7 · Long-Term Vision ──────────────────────────────────────────

const VisionSection = () => {
    const cardContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
    };
    const cardAnim = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const stages = [
        {
            subtitle: 'Day 1',
            title: 'Outfit Analysis',
            body: 'Each outfit reveals signals like color harmony, contrast, layering, and balance.'
        },
        {
            subtitle: 'Week 2',
            title: 'Pattern Discovery',
            body: 'AURSA begins detecting patterns in your color palette, contrast level, and layering habits.'
        },
        {
            subtitle: 'Month 1',
            title: 'Style Identity',
            body: 'Your wardrobe reveals a clear visual identity and consistent style energy.'
        }
    ];

    return (
        <section
            className="py-[70px] md:py-[90px] lg:py-[120px] px-5 md:px-8 lg:px-12 bg-[#0B0F1A] flex flex-col items-center text-center overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
            {/* Section Label */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4 text-center"
            >
                The Future of Your Style
            </motion.p>

            {/* Main Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="font-serif text-4xl md:text-5xl text-white text-center mb-6 leading-tight"
            >
                Your style becomes clearer over time.
            </motion.h2>

            {/* Explanation */}
            <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-neutral-400 text-lg text-center max-w-[600px] mx-auto mb-16"
            >
                Every outfit you analyze helps AURSA understand how you actually dress.
            </motion.p>

            {/* 3-Stage Card Timeline */}
            <div className="relative w-full max-w-4xl mx-auto">
                {/* Connecting line behind cards */}
                <div
                    className="absolute hidden md:block top-[72px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)]"
                    style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}
                />

                <motion.div
                    variants={cardContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="flex justify-center items-start gap-6 flex-wrap"
                >
                    {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            variants={cardAnim}
                            className="bg-[#1a1a22] rounded-2xl border border-white/5 p-6 max-w-[240px] text-center flex flex-col items-center gap-3"
                        >
                            {/* Step number dot */}
                            <div className="w-8 h-8 rounded-full border border-[#D88A3D]/60 flex items-center justify-center mb-1">
                                <span className="text-[#D88A3D] text-xs font-bold">{i + 1}</span>
                            </div>
                            {/* Subtitle */}
                            <span className="text-neutral-500 text-[10px] uppercase tracking-[0.2em]">
                                {stage.subtitle}
                            </span>
                            {/* Title */}
                            <h3 className="font-serif text-white text-lg leading-tight">
                                {stage.title}
                            </h3>
                            {/* Body */}
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                {stage.body}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Closing Statement */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                className="mt-20 text-center"
            >
                {/* Copper divider */}
                <div className="w-16 h-px bg-[#D88A3D] mx-auto mb-6" />
                {/* Focus text */}
                <p className="font-serif text-3xl md:text-4xl text-white leading-tight">
                    Your style was never random.<br />
                    AURSA simply helps you see it.
                </p>
            </motion.div>

        </section>
    );
};

// ── Section 9 · Download Section ─────────────────────────────────────────────

// ── Section 8 · Download Section ─────────────────────────────────────────────

const DownloadSection = () => (
    <section id="download" className="py-[80px] md:py-[120px] px-5 md:px-8 bg-[#FFFFFF] flex flex-col items-center justify-center text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="max-w-xl mx-auto flex flex-col items-center">

            <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[11px] uppercase tracking-[0.3em] text-[#999] mb-5 font-medium"
            >
                Early Access
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-4xl md:text-5xl font-serif mb-4 text-[#0B0F1A] leading-tight"
            >
                Be the first to try AURSA.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="text-[#555] text-[16px] mb-0 font-light leading-relaxed max-w-[440px]"
            >
                Join the waitlist and get early access before public launch.
            </motion.p>

            {/* Shared waitlist form — light theme, same backend */}
            <WaitlistForm theme="light" />

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#aaa] text-[11px] uppercase tracking-[0.3em] font-medium mt-6"
            >
                Launching on iOS and Android
            </motion.p>

        </div>
    </section>
);


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
        <footer className="w-full bg-[#0F0F13] flex flex-col justify-between overflow-hidden relative pt-[70px] md:pt-[100px] lg:pt-[140px] pb-0">
            {/* Top Area */}
            <div className="w-full px-6 flex flex-col items-center text-center justify-center mb-16 md:mb-24 max-w-[1400px] mx-auto gap-8 z-10 w-full">
                {/* Text */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-sans text-[#F5F5F7] text-xl md:text-2xl font-medium">
                        Stay connected with AURSA.
                    </h3>
                    <p className="font-sans text-[#A1A1AA] text-sm md:text-base font-light">
                        Follow the journey of personal style intelligence.
                    </p>
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
                    {[
                        { name: 'Instagram', url: 'https://www.instagram.com/aursa.ai/' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/aursa' },
                        { name: 'X', url: 'https://x.com/AursaAI' },
                        { name: 'Privacy Policy', url: '/privacy-policy' }
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target={link.url.startsWith('/') ? "_self" : "_blank"}
                            rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                            className="group relative font-sans text-[16px] text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors duration-300"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D88A3D] transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Area: Large Brand Typography */}
            <div className="w-full flex justify-center items-end relative mt-20 px-4">
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    className="font-serif text-[#F5F5F7] text-center w-full flex justify-center text-[22vw] md:text-[26vw]"
                    style={{
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        margin: 0,
                        padding: 0
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
                    className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none z-20"
                    style={{ background: 'linear-gradient(180deg, transparent 0%, #0F0F13 70%)' }}
                />
            </div>
        </footer>
    );
};

// ── Root App ──────────────────────────────────────────────────────────────────

const App = () => (
    <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Questrial&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Instrument+Serif:ital@0;1&display=swap');

            .font-serif  { font-family: 'Instrument Serif', serif; }
            .font-sans   { font-family: 'Inter', sans-serif; }
            .font-neutra { font-family: 'Questrial', sans-serif; }
            .font-hatton { font-family: 'Fraunces', serif; }
        `}</style>

        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={
                    <>
                        {/* 1 · Hero */}
                        <HeroSection />


                        {/* 2 · Mirror Moment */}
                        <MirrorMomentSection />

                        {/* 3 · AI Mirror Explanation */}
                        <AIMirrorSection />

                        {/* 4+5 · Style Analysis (merged) */}
                        <StyleAnalysisSection />

                        {/* 6 · Result Card Display */}
                        <ResultCardSection />

                        {/* 6.5 · Save Your Vibe */}
                        <SaveVibeSection />

                        {/* 6.75 · Wardrobe Archive */}
                        <WardrobeSection />

                        {/* 7 · Long-Term Vision */}
                        <VisionSection />

                        {/* 9 · Download */}
                        <DownloadSection />
                    </>
                } />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>

            <Footer />
        </Router>
    </div>
);

export default App;
