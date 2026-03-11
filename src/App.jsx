import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from 'framer-motion';
import { Camera, Sparkles, Layers, Share2, ArrowRight, Archive, Smartphone, Apple } from 'lucide-react';

// ── Shared Utilities ──────────────────────────────────────────────────────────

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
        <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all duration-200" />
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
                        padding: '10px 18px',
                        width: '100%',
                        maxWidth: '900px',
                        margin: '0 24px',
                    }}
                >
                    {/* Logo */}
                    <a
                        href="/"
                        className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200"
                    >
                        <img
                            src="/assets/aursa-logo.svg"
                            alt="Aursa logo"
                            style={{ height: '28px', width: 'auto' }}
                        />
                    </a>

                    {/* Center links (desktop) */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink href="#how">How It Works</NavLink>
                        <NavLink href="#vibe">The Vibe</NavLink>
                        <NavLink href="#download">Download</NavLink>
                    </div>

                    {/* Right CTA */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#download"
                            className="hidden md:inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#0F0F13] transition-colors duration-200 whitespace-nowrap"
                            style={{
                                background: '#D88A3D',
                                borderRadius: '10px',
                                padding: '10px 18px',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#F0B67F'}
                            onMouseLeave={e => e.currentTarget.style.background = '#D88A3D'}
                        >
                            Download App
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden flex flex-col gap-[5px] p-2"
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
                        {[['#how', 'How It Works'], ['#vibe', 'The Vibe'], ['#download', 'Download']].map(([href, label]) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="w-full text-[11px] uppercase tracking-[0.35em] text-[#A1A1AA] hover:text-[#F5F5F7] py-3 border-b border-white/5 last:border-0 transition-colors duration-200"
                            >
                                {label}
                            </a>
                        ))}
                        <a
                            href="#download"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 w-full text-center text-[10px] font-bold uppercase tracking-widest text-[#0F0F13] py-3 transition-colors duration-200"
                            style={{ background: '#D88A3D', borderRadius: '10px' }}
                        >
                            Download App
                        </a>
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
            className="relative h-screen overflow-hidden bg-[#0F0F13]"
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

            {/* Layer 4: Two-column split layout */}
            <div className="relative h-full flex items-center justify-center z-10 px-6 py-20 w-full pt-32">
                <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 h-full">
                    {/* ── LEFT 60% — Brand visual area + Card ── */}
                    <div className="relative flex flex-col items-center justify-center w-full md:w-[60%] h-full min-h-[400px]">
                        {/* Layer A: Zodiac SVG — centered within its column */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ x: zodiacX, y: zodiacY }}
                        >
                            {/* Rotating Zodiac Wheel */}
                            <motion.img
                                src="/assets/zodiac.svg"
                                alt=""
                                className="w-[100%] max-w-[500px] md:max-w-[750px] relative z-10"
                                style={{
                                    height: 'auto',
                                    opacity: 0.4,
                                }}
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 120,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>

                        {/* Floating Harmony Check Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            whileHover={{ y: -6 }}
                            className="absolute z-20 bg-[#1C1C23] p-[24px]"
                            style={{
                                border: '1px solid #D88A3D',
                                borderRadius: '16px',
                                minWidth: '300px',
                                bottom: '5%',
                                right: '0',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
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
                        </motion.div>
                    </div>

                    {/* ── RIGHT 40% — Text + CTA ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                        className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full md:w-[40%]"
                    >
                        {/* Headline */}
                        <h1
                            className="font-serif text-[#F5F5F7]"
                            style={{ fontSize: 'clamp(44px, 5vw, 64px)', lineHeight: 1.1 }}
                        >
                            Your outfit says<br className="hidden md:block" /> more than you think.
                        </h1>

                        {/* Subheadline */}
                        <p
                            className="font-sans text-[#F5F5F7]"
                            style={{ fontWeight: 400, fontSize: 'clamp(20px, 2vw, 24px)', lineHeight: 1.3, marginTop: '24px' }}
                        >
                            Understand the signals your style sends.
                        </p>

                        {/* Supporting text */}
                        <p
                            className="font-sans text-[#A1A1AA]"
                            style={{ fontWeight: 300, fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, marginTop: '24px', maxWidth: '440px' }}
                        >
                            AURSA is an AI mirror that analyzes your outfit and reveals the visual harmony and identity behind it — before you step out.
                        </p>

                        {/* CTA */}
                        <div className="mt-12 flex flex-col items-center md:items-start">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest text-[#0F0F13] transition-colors duration-200"
                                style={{
                                    fontSize: '12px',
                                    background: '#D88A3D',
                                    borderRadius: '10px',
                                    padding: '18px 40px',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#F0B67F'}
                                onMouseLeave={e => e.currentTarget.style.background = '#D88A3D'}
                            >
                                Coming Soon
                            </motion.button>
                            <p className="text-[#A1A1AA] text-[10px] font-medium tracking-[0.1em] mt-4 uppercase">
                                Launching on iOS and Android
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// ── Section 2 · Mirror Moment ──────────────────────────────────────────────

const MirrorMomentSection = () => {
    // Animation variants
    const headlineVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const finalStatementVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 1.0 } // delayed after paragraph
        }
    };

    return (
        <section
            id="mirror-moment"
            className="w-full bg-[#0F0F13] flex flex-col items-center justify-center text-center px-6"
            style={{ paddingTop: '160px', paddingBottom: '160px' }}
        >
            <div className="w-full mx-auto flex flex-col items-center gap-16 md:gap-24">

                {/* Paragraph Container (max 640px) */}
                <div className="max-w-[640px] w-full flex flex-col items-center gap-12">
                    {/* Headline */}
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={headlineVariants}
                        className="font-serif text-[#F5F5F7] leading-tight"
                        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
                    >
                        Before stepping out,<br />
                        there’s always a moment of doubt.
                    </motion.h2>

                    {/* Body text block */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="flex flex-col gap-6 w-full text-left md:text-center"
                    >
                        <motion.p
                            variants={textVariants}
                            className="font-sans text-[#F5F5F7]"
                            style={{ fontSize: '18px', lineHeight: 1.6, fontWeight: 300 }}
                        >
                            You look in the mirror and wonder.
                        </motion.p>

                        <div className="flex flex-col gap-2">
                            <motion.p
                                variants={textVariants}
                                className="font-sans text-[#A1A1AA]"
                                style={{ fontSize: '18px', lineHeight: 1.6, fontWeight: 300 }}
                            >
                                Do these colors actually work together?
                            </motion.p>
                            <motion.p
                                variants={textVariants}
                                className="font-sans text-[#A1A1AA]"
                                style={{ fontSize: '18px', lineHeight: 1.6, fontWeight: 300 }}
                            >
                                Does this outfit feel balanced?
                            </motion.p>
                            <motion.p
                                variants={textVariants}
                                className="font-sans text-[#A1A1AA]"
                                style={{ fontSize: '18px', lineHeight: 1.6, fontWeight: 300 }}
                            >
                                Does this look like me?
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                {/* Final Statement (stretches visually, not limited to 640px) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={finalStatementVariants}
                    className="w-full max-w-[1000px] mx-auto px-4"
                >
                    <p
                        className="font-serif"
                        style={{
                            fontSize: 'clamp(40px, 6vw, 72px)',
                            lineHeight: 1.1,
                            fontWeight: 500,
                            letterSpacing: '0.01em'
                        }}
                    >
                        <span className="text-[#D88A3D]">AURSA</span>
                        <span className="text-[#F5F5F7]"> is built for that moment.</span>
                    </p>
                </motion.div>

            </div>
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
        <section id="how" className="py-24 md:py-32 px-6 bg-[#0F0F13]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">

                {/* ── LEFT COLUMN: Text Explanation ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex flex-col items-start text-left"
                >
                    <h2
                        className="font-serif text-[#F5F5F7] mb-8"
                        style={{ fontSize: 'clamp(40px, 4vw, 56px)', lineHeight: 1.1 }}
                    >
                        An AI mirror for <br className="hidden md:block" /> your personal style.
                    </h2>

                    <div className="space-y-6">
                        <p className="font-sans text-[#F5F5F7] text-lg md:text-xl font-medium">
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
                    <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-2xl overflow-hidden bg-[#1C1C23]">
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

// ── Section 4 · Personal Style Patterns ────────────────────────────────────────

const StylePatternsSection = () => {
    // Animation variants for the staggered list
    const listContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        }
    };

    const listItem = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative py-32 px-6 bg-[#0F0F13] flex flex-col items-center justify-center text-center overflow-hidden min-h-[80vh]">

            {/* Subtle Background Pattern */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.03 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative z-10 max-w-[680px] w-full mx-auto flex flex-col items-center gap-12">

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="font-serif text-[#F5F5F7] leading-tight"
                    style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
                >
                    Your style is not random.
                </motion.h2>

                {/* Body Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col gap-4 text-[#A1A1AA] font-sans text-lg md:text-xl font-light"
                >
                    <p>Most people believe their style changes constantly.</p>
                    <p>But when multiple outfits are analyzed,<br className="hidden md:block" /> patterns begin to appear.</p>
                </motion.div>

                {/* Staggered List */}
                <motion.ul
                    variants={listContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col gap-4 w-full max-w-[400px] mx-auto text-left"
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
                            className="bg-[#1C1C23] border border-white/5 rounded-xl px-6 py-4 flex items-center justify-between shadow-lg"
                        >
                            <span className="font-sans text-[#F5F5F7] font-medium tracking-wide">{item}</span>
                            <div className="w-2 h-2 rounded-full bg-[#D88A3D]" />
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Closing text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                    className="mt-8 flex flex-col gap-2"
                >
                    <p className="font-sans text-[#F5F5F7] text-lg font-medium">
                        These patterns form a visual fingerprint.
                    </p>
                    <p className="font-sans text-[#D88A3D] text-sm uppercase tracking-widest font-bold mt-2">
                        AURSA helps you discover yours.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

// ── Section 5 · Feature Explanation ───────────────────────────────────────────

const FeatureExplanationSection = () => {
    // Staggered variants for the cards
    const gridContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const gridItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-24 md:py-32 px-6 bg-[#0F0F13]">
            <div className="max-w-[800px] w-full mx-auto flex flex-col items-center">

                <motion.div
                    variants={gridContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                >
                    {[
                        {
                            title: 'Color Harmony',
                            desc: 'How well the colors in your outfit work together.'
                        },
                        {
                            title: 'Contrast Energy',
                            desc: 'The visual intensity your outfit projects.'
                        },
                        {
                            title: 'Layering Structure',
                            desc: 'How garments interact to create depth.'
                        },
                        {
                            title: 'Visual Balance',
                            desc: 'The overall composition of your look.'
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={gridItem}
                            whileHover={{
                                scale: 1.03,
                                borderColor: "#D88A3D",
                                boxShadow: "0px 10px 30px rgba(216, 138, 61, 0.15)",
                                transition: { duration: 0.2, ease: "easeOut" }
                            }}
                            className="bg-[#1C1C23] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center cursor-default h-full"
                        >
                            <h3 className="font-serif text-[#F5F5F7] text-2xl mb-4 leading-tight">
                                {feature.title}
                            </h3>
                            <p className="font-sans text-[#A1A1AA] text-base leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

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

    return (
        <section className="py-24 md:py-32 px-6 bg-[#0F0F13] flex flex-col items-center justify-center text-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-[600px] w-full mx-auto mb-16"
            >
                <h2
                    className="font-serif text-[#F5F5F7] mb-6 leading-tight"
                    style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
                >
                    A clear reflection <br className="hidden md:block" /> of your style.
                </h2>
                <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light">
                    AURSA translates visual analysis into an intuitive result.
                </p>
            </motion.div>

            {/* The Floating Result Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
                className="relative z-10 w-full max-w-[320px] bg-[#1C1C23] border border-[#D88A3D]/30 p-6 md:p-8 flex flex-col gap-8 shadow-[0_20px_40px_rgba(216,138,61,0.08)] mb-16"
                style={{ borderRadius: '24px' }}
            >
                {/* Header Profile - purely visual context */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-serif text-[#F5F5F7] text-lg">Your Vibe</span>
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
                    <div className="flex flex-col gap-2 items-start border-b border-white/5 pb-6">
                        <span className="text-[#A1A1AA] text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                            Harmony
                        </span>
                        <div className="flex items-baseline gap-1">
                            {/* Reusing the AnimatedNumber logic for 82% */}
                            <AnimatedNumber end={82} duration={900} />
                            <span className="text-4xl font-serif text-[#F5F5F7]">%</span>
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
                                <span className="text-[#6B6B75] text-xs uppercase tracking-wider font-medium">{metric.label}</span>
                                <span className="font-serif text-[#F5F5F7] text-lg">{metric.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Closing text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                className="max-w-[500px] w-full mx-auto flex flex-col items-center border-t border-white/5 pt-12"
            >
                <p className="font-sans text-[#A1A1AA] text-lg italic mb-2">
                    AURSA doesn’t judge your style.
                </p>
                <p className="font-sans text-[#F5F5F7] text-lg font-medium">
                    It helps you understand it.
                </p>
            </motion.div>

        </section>
    );
};

// ── Section 7 · Long-Term Vision ──────────────────────────────────────────

const VisionSection = () => {
    // Animation variants for the timeline nodes
    const timelineContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3, // slower stagger for visual weight
                delayChildren: 0.4,
            }
        }
    };

    const nodeItem = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-32 px-6 bg-[#16161C] flex flex-col items-center text-center overflow-hidden">
            <div className="max-w-[700px] w-full mx-auto flex flex-col items-center gap-16">

                {/* Text Narrative */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h2
                        className="font-serif text-[#F5F5F7] mb-8 leading-tight"
                        style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
                    >
                        Over time, <br className="hidden md:block" /> AURSA learns your style.
                    </h2>

                    <div className="flex flex-col gap-2 font-sans text-[#A1A1AA] text-lg md:text-xl font-light mb-6">
                        <p>Every outfit analysis reveals patterns.</p>
                    </div>

                    <div className="flex flex-col gap-1 font-sans text-[#A1A1AA] text-base md:text-lg italic font-light">
                        <p>Your color tendencies.</p>
                        <p>Your contrast preferences.</p>
                        <p>Your layering habits.</p>
                    </div>

                    <p className="font-sans text-[#F5F5F7] text-lg md:text-xl font-medium mt-8">
                        Gradually revealing your personal style identity.
                    </p>
                </motion.div>

                {/* Timeline Visual */}
                <motion.div
                    variants={timelineContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full max-w-[500px] h-32 flex items-center justify-between mt-4 mb-4"
                >
                    {/* Connecting straight line */}
                    <div className="absolute left-6 right-6 h-px bg-white/10 top-1/2 -translate-y-1/2 z-0" />

                    {/* Active line drawing animation */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        className="absolute left-6 right-6 h-px bg-[#D88A3D] top-1/2 -translate-y-1/2 z-0 origin-left"
                    />

                    {/* Timeline Nodes */}
                    {[
                        { label: 'Day 1', desc: 'First Look', size: 'w-3 h-3' },
                        { label: 'Week 2', desc: 'Patterns Emerge', size: 'w-4 h-4' },
                        { label: 'Month 1', desc: 'Style Identity', size: 'w-5 h-5' }
                    ].map((node, idx) => (
                        <motion.div
                            key={idx}
                            variants={nodeItem}
                            className="relative z-10 flex flex-col items-center justify-center gap-3"
                        >
                            <span className="text-[#6B6B75] text-[10px] uppercase tracking-widest absolute -top-8 whitespace-nowrap">{node.label}</span>

                            {/* Node Dot */}
                            <div className={`${node.size} rounded-full bg-[#1C1C23] border-2 border-[#D88A3D] shadow-[0_0_15px_rgba(216,138,61,0.4)] flex items-center justify-center`}>
                                {idx === 2 && <div className="w-1.5 h-1.5 bg-[#D88A3D] rounded-full" />}
                            </div>

                            <span className="text-[#A1A1AA] text-xs font-medium absolute -bottom-8 whitespace-nowrap">{node.desc}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 1.8, ease: "easeOut" }}
                    className="flex flex-col gap-2 mt-8"
                >
                    <p className="font-sans text-[#A1A1AA] text-lg italic">
                        Not just outfit analysis.
                    </p>
                    <p className="font-sans text-[#D88A3D] text-[13px] uppercase tracking-[0.2em] font-bold">
                        Personal style intelligence.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

// ── Section 9 · Download Section ─────────────────────────────────────────────

// ── Section 8 · Download Section ─────────────────────────────────────────────

const DownloadSection = () => (
    <section id="download" className="py-32 px-8 bg-[#1C1C23] border-t border-white/10 flex flex-col items-center justify-center text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center">

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-serif mb-6 text-[#F5F5F7] leading-tight"
            >
                AURSA is launching soon.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-[#A1A1AA] text-lg md:text-xl mb-12 font-light leading-relaxed"
            >
                Be among the first to experience AI-powered style intelligence.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{
                    scale: 1.04,
                    boxShadow: "0px 0px 30px rgba(216, 138, 61, 0.4)",
                    transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="bg-[#D88A3D] text-[#0F0F13] px-10 py-5 font-bold uppercase tracking-[0.2em] rounded-full"
            >
                Coming Soon
            </motion.button>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[#6B6B75] text-[11px] uppercase tracking-[0.3em] font-medium mt-6"
            >
                Launching on iOS and Android.
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
        <footer className="w-full bg-[#0F0F13] flex flex-col justify-between overflow-hidden relative" style={{ paddingTop: '140px', paddingBottom: '0px' }}>
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
                        { name: 'X', url: 'https://x.com/AursaAI' }
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
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
                    className="font-serif text-[#F5F5F7] text-center w-full flex justify-center"
                    style={{
                        fontSize: '26vw',
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
    <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Questrial&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Instrument+Serif:ital@0;1&display=swap');

            .font-serif  { font-family: 'Instrument Serif', serif; }
            .font-sans   { font-family: 'Inter', sans-serif; }
            .font-neutra { font-family: 'Questrial', sans-serif; }
            .font-hatton { font-family: 'Fraunces', serif; }
        `}</style>

        <Navbar />

        {/* 1 · Hero */}
        <HeroSection />


        {/* 2 · Mirror Moment */}
        <MirrorMomentSection />

        {/* 3 · AI Mirror Explanation */}
        <AIMirrorSection />

        {/* 4 · Personal Style Patterns */}
        <StylePatternsSection />

        {/* 5 · Feature Explanation (Visual Elements) */}
        <FeatureExplanationSection />

        {/* 6 · Result Card Display */}
        <ResultCardSection />

        {/* 7 · Long-Term Vision */}
        <VisionSection />

        {/* 9 · Download */}
        <DownloadSection />

        <Footer />
    </div>
);

export default App;
