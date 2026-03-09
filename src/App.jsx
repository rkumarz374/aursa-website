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
            className="relative min-h-screen overflow-hidden bg-[#0F0F13]"
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
            <div
                className="relative min-h-screen flex flex-col md:flex-row"
                style={{ zIndex: 10 }}
            >
                {/* ── LEFT 60% — Brand visual area ── */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    className="relative flex flex-col items-center justify-center md:items-stretch md:justify-start"
                    style={{ flex: '0 0 60%', minHeight: '50vh' }}
                >
                    {/* Layer A: Zodiac SVG — centered horizontally and vertically */}
                    <motion.div
                        className="md:absolute md:inset-0 flex items-center justify-center pointer-events-none mt-20 md:mt-0"
                        style={{ x: zodiacX, y: zodiacY }}
                    >
                        {/* Soft Glow Pulse background */}
                        <motion.div
                            className="absolute w-[400px] h-[400px] bg-[#D88A3D]/10 rounded-full blur-[80px]"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [0.95, 1.05, 0.95]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Rotating Zodiac Wheel */}
                        <motion.img
                            src="/assets/zodiac.svg"
                            alt=""
                            className="w-[75%] max-w-[320px] md:max-w-[650px] relative z-10"
                            style={{
                                height: 'auto',
                                opacity: 0.25,
                                width: '75%',
                                maxWidth: '650px'
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 60,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* ── RIGHT 40% — Text + CTA ── */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
                    className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
                    style={{
                        flex: '0 0 40%',
                        paddingLeft: 'clamp(1.5rem, 60px, 60px)',
                        paddingRight: 'clamp(1.5rem, 60px, 60px)',
                        paddingTop: 'clamp(2rem, 80px, 80px)',
                        paddingBottom: 'clamp(6rem, 80px, 80px)',
                    }}
                >
                    {/* Category Label */}
                    <p
                        className="font-sans text-[#A1A1AA] uppercase"
                        style={{ fontSize: '13px', letterSpacing: '0.2em', marginBottom: '16px' }}
                    >
                        AI Style Intelligence
                    </p>

                    {/* Line 1 */}
                    <p
                        className="font-sans text-[#F5F5F7]"
                        style={{ fontWeight: 400, fontSize: 'clamp(28px, 32px, 32px)', lineHeight: 1.3 }}
                    >
                        Your outfit says<br className="hidden md:block" /> more than you think.
                    </p>

                    {/* Line 2 — larger */}
                    <p
                        className="font-sans text-[#F5F5F7]"
                        style={{ fontWeight: 500, fontSize: 'clamp(44px, 48px, 48px)', lineHeight: 1.2, marginTop: '24px' }}
                    >
                        Understand your vibe<br className="hidden md:block" /> like never before.
                    </p>

                    {/* Supporting text */}
                    <p
                        className="font-sans text-[#A1A1AA]"
                        style={{ fontWeight: 400, fontSize: 'clamp(16px, 18px, 18px)', lineHeight: 1.5, marginTop: '24px' }}
                    >
                        See what your outfit is really saying.
                    </p>

                    {/* Product Flow Indicator */}
                    <div
                        className="flex items-center gap-4 md:gap-6 mt-8 py-4 border-y border-white/5 w-full md:w-auto overflow-x-auto no-scrollbar"
                        style={{ marginBottom: '32px' }}
                    >
                        <div className="flex items-center gap-2 shrink-0">
                            <Camera size={14} className="text-[#D88A3D]" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7]">Upload Outfit</span>
                        </div>
                        <ArrowRight size={12} className="text-white/20 shrink-0" />
                        <div className="flex items-center gap-2 shrink-0">
                            <Sparkles size={14} className="text-[#D88A3D]" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7]">AI Analysis</span>
                        </div>
                        <ArrowRight size={12} className="text-white/20 shrink-0" />
                        <div className="flex items-center gap-2 shrink-0">
                            <Share2 size={14} className="text-[#D88A3D]" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7]">Your Vibe</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div>
                        <a
                            href="#download"
                            className="inline-flex items-center font-sans font-bold uppercase tracking-widest text-[#0F0F13] transition-colors duration-200"
                            style={{
                                fontSize: '11px',
                                background: '#D88A3D',
                                borderRadius: '10px',
                                padding: '14px 24px',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#F0B67F'}
                            onMouseLeave={e => e.currentTarget.style.background = '#D88A3D'}
                        >
                            Download App
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


// ── Section 3 · Relatable Moment ──────────────────────────────────────────────

const RelatableSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const opacity1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const opacity2 = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
    const opacityFinal = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const yFinal = useTransform(scrollYProgress, [0.85, 0.95], [20, 0]);

    return (
        <section
            id="relatable-section"
            ref={containerRef}
            className="relative h-[400vh] bg-[#F5F5F7]"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-8 overflow-hidden">
                <div className="max-w-4xl text-center z-10">
                    <p className="text-[#D88A3D] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">
                        Internal Monologue
                    </p>
                    <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight text-[#0F0F13]">
                        Before stepping out, everyone <br className="hidden md:block" />
                        asks the same question.
                    </h2>

                    <div className="space-y-6 md:space-y-10 min-h-[300px] flex flex-col justify-start pt-4">
                        <motion.p style={{ opacity: opacity1 }} className="text-3xl md:text-5xl font-serif text-[#0F0F13] italic">
                            "Do I look good?"
                        </motion.p>
                        <motion.p style={{ opacity: opacity2 }} className="text-3xl md:text-5xl font-serif text-[#0F0F13] italic">
                            "Does this outfit feel right?"
                        </motion.p>
                        <motion.p style={{ opacity: opacity3 }} className="text-3xl md:text-5xl font-serif text-[#0F0F13] italic">
                            "Is this the vibe I want today?"
                        </motion.p>
                    </div>

                    <motion.div
                        style={{ opacity: opacityFinal, y: yFinal }}
                        className="mt-16 max-w-2xl mx-auto space-y-6"
                    >
                        <p className="text-xl text-[#0F0F13] font-light leading-relaxed">
                            We usually trust our instinct — or ask a friend. <br />
                            <span className="text-[#D88A3D] font-bold">Aursa helps you see the answer.</span>
                        </p>
                        <p className="text-base text-[#6B6B75] leading-relaxed max-w-lg mx-auto">
                            Upload your outfit and Aursa analyzes the visual signals — color, balance, contrast, and energy — to reveal the vibe you're putting out into the world.
                        </p>
                        <div className="w-12 h-px bg-[#D88A3D] mx-auto opacity-40" />
                    </motion.div>
                </div>

                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>
        </section>
    );
};

// ── Section 4 · How Aursa Works ───────────────────────────────────────────────

const HowItWorksSection = () => (
    <section id="how" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
            <SectionHeading small="The Methodology" title="From outfit to insight." />

            <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connector line */}
                <div className="absolute top-8 left-0 w-full h-px bg-white/5 hidden md:block" />

                {[
                    {
                        icon: <Camera size={22} />,
                        step: '01',
                        title: 'Upload your outfit',
                        desc: 'Take a photo or upload a look from your gallery.',
                    },
                    {
                        icon: <Sparkles size={22} />,
                        step: '02',
                        title: 'AI analyzes the visual signals',
                        desc: 'Aursa reads color harmony, contrast, layering, and balance.',
                    },
                    {
                        icon: <Layers size={22} />,
                        step: '03',
                        title: 'Discover your vibe',
                        desc: 'See the psychological insight behind what your outfit communicates.',
                    },
                ].map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className="flex flex-col items-center text-center p-8 bg-[#0F0F13] z-10"
                    >
                        <div className="text-[#D88A3D] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
                            {step.step}
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[#1C1C23] border border-white/5 flex items-center justify-center text-[#D88A3D] mb-8">
                            {step.icon}
                        </div>
                        <h4 className="text-xl font-serif mb-4 text-[#F5F5F7]">{step.title}</h4>
                        <p className="text-[#A1A1AA] text-sm leading-relaxed">{step.desc}</p>

                        {i < 2 && (
                            <div className="hidden md:flex absolute right-0 top-8 items-center justify-center w-8 text-[#D88A3D]/30">
                                <ArrowRight size={16} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Visual flow label */}
            <div className="mt-16 flex items-center justify-center gap-6 text-[#6B6B75] text-[10px] uppercase tracking-[0.3em]">
                <span className="text-[#F5F5F7]/50">Outfit photo</span>
                <span className="text-[#D88A3D]/40">→</span>
                <span className="text-[#F5F5F7]/50">AI analysis</span>
                <span className="text-[#D88A3D]/40">→</span>
                <span className="text-[#F5F5F7]/50">Vibe card</span>
            </div>
        </div>
    </section>
);

// ── Section 5 · Vibe Examples ─────────────────────────────────────────────────

const VibeExamplesSection = () => (
    <section id="vibe" className="py-32 px-8 bg-[#0F0F13]">
        <div className="max-w-7xl mx-auto">
            <SectionHeading
                small="The Output"
                title="See what Aursa reveals."
                subtitle="Aursa analyzes your outfit and reveals the visual signals behind it."
                mb="mb-[60px]"
            />

            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
                <VibeCard
                    title="Effortless Balance"
                    harmony={4}
                    contrast={2}
                    layering={5}
                    insight="Your outfit creates a calm and balanced presence, signaling approachability and intentionality."
                />
                <VibeCard
                    title="Bold Energy"
                    harmony={2}
                    contrast={5}
                    layering={3}
                    insight="High contrast and sharp lines communicate authority and a focus on precision."
                />
                <VibeCard
                    title="Minimal Harmony"
                    harmony={5}
                    contrast={1}
                    layering={2}
                    insight="Restraint and mono-tone cohesion signal sophistication and quiet confidence."
                />
            </div>
        </div>
    </section>
);

// ── Section 6 · Wardrobe Feature ─────────────────────────────────────────────

const WardrobeSection = () => (
    <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[#D88A3D] uppercase tracking-[0.35em] text-[10px] font-bold mb-4">
                        Wardrobe Archive
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8 text-[#F5F5F7]">
                        Your wardrobe becomes a story.
                    </h2>
                    <p className="text-[#A1A1AA] text-lg font-light leading-relaxed mb-6">
                        Save your looks and build a living archive of your style.
                    </p>
                    <p className="text-[#6B6B75] text-base font-light leading-relaxed">
                        Over time, Aursa reveals patterns in how you dress and how your vibe evolves — season by season, day by day.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {['Effortless Balance', 'Bold Energy', 'Minimal Harmony', 'Soft Contrast'].map((label, i) => (
                        <div
                            key={i}
                            className="bg-[#1C1C23] border border-white/5 rounded-2xl p-5 flex flex-col gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#D88A3D]/10 flex items-center justify-center">
                                <Archive size={14} className="text-[#D88A3D]" />
                            </div>
                            <p className="text-[#F5F5F7] text-sm font-serif">{label}</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <div
                                        key={j}
                                        className={`h-1 flex-1 rounded-full ${j < 3 ? 'bg-[#D88A3D]' : 'bg-white/5'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
);

// ── Section 7 · Share Vibe Feature ───────────────────────────────────────────

const ShareVibeSection = () => (
    <section className="py-32 px-8 bg-[#16161C]">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-last md:order-first"
                >
                    <div className="bg-[#1C1C23] rounded-3xl border border-white/5 p-8 max-w-xs mx-auto shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] uppercase tracking-widest text-[#6B6B75]">Vibe Card</span>
                            <Share2 size={14} className="text-[#D88A3D]" />
                        </div>
                        <h3 className="text-2xl font-serif text-[#F5F5F7] mb-6">Effortless Balance</h3>
                        <div className="space-y-3 mb-6">
                            {[['Color Harmony', 4], ['Contrast', 2], ['Layering', 5]].map(([label, count]) => (
                                <div key={label} className="flex justify-between items-center">
                                    <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest">{label}</span>
                                    <div className="flex gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full ${i < count ? 'bg-[#D88A3D]' : 'bg-[#16161C] border border-white/5'}`} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[#A1A1AA] text-xs italic">Made with Aursa</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[#D88A3D] uppercase tracking-[0.35em] text-[10px] font-bold mb-4">
                        Share Feature
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8 text-[#F5F5F7]">
                        Style is meant to be shared.
                    </h2>
                    <p className="text-[#A1A1AA] text-lg font-light leading-relaxed mb-8">
                        Generate Vibe Cards and share them with friends.
                    </p>
                    <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-[#6B6B75] border border-white/10 px-4 py-2">
                        Coming Soon
                    </span>
                </motion.div>
            </div>
        </div>
    </section>
);

// ── Section 8 · Editorial Statement ──────────────────────────────────────────

const EditorialSection = () => (
    <section className="py-48 px-8 flex items-center justify-center text-center overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D88A3D]/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-5xl z-10">
            <motion.h2
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="text-5xl md:text-8xl font-serif leading-tight italic text-[#F5F5F7]"
            >
                Style is more than what you wear. <br />
                <span className="text-[#D88A3D] opacity-90">It's how you show up.</span>
            </motion.h2>
        </div>
    </section>
);

// ── Section 9 · Download Section ─────────────────────────────────────────────

const DownloadSection = () => (
    <section id="download" className="py-32 px-8 bg-[#1C1C23] border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
            <p className="text-[#D88A3D] uppercase tracking-[0.35em] text-[10px] font-bold mb-4">
                Available Now
            </p>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-[#F5F5F7] leading-tight">
                Start discovering your vibe.
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-16 max-w-xl mx-auto font-light leading-relaxed">
                Download Aursa and see what your outfit says about you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <motion.a
                    href="https://testflight.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#D88A3D] hover:bg-[#F0B67F] text-[#0F0F13] px-6 py-5 transition-colors duration-200"
                >
                    <Apple size={18} />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">iPhone</span>
                </motion.a>

                <motion.a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#D88A3D] hover:bg-[#F0B67F] text-[#0F0F13] px-6 py-5 transition-colors duration-200"
                >
                    <Smartphone size={18} />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">Android</span>
                </motion.a>
            </div>

            <p className="text-[#6B6B75] text-[9px] uppercase tracking-[0.4em] mt-8 opacity-50">
                Available on iOS and Android.
            </p>
        </div>
    </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => (
    <footer className="py-12 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[#6B6B75] text-[10px] uppercase tracking-[0.3em]">
        <div>© 2026 AURSA. All rights reserved.</div>
        <div className="flex gap-8">
            <a href="#" className="hover:text-[#D88A3D] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#D88A3D] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#D88A3D] transition-colors">Instagram</a>
        </div>
    </footer>
);

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


        {/* 3 · Relatable Moment */}
        <RelatableSection />

        {/* 4 · How It Works */}
        <HowItWorksSection />

        {/* 5 · Vibe Examples */}
        <VibeExamplesSection />

        {/* 6 · Wardrobe Feature */}
        <WardrobeSection />

        {/* 7 · Share Vibe */}
        <ShareVibeSection />

        {/* 8 · Editorial Statement */}
        <EditorialSection />

        {/* 9 · Download */}
        <DownloadSection />

        <Footer />
    </div>
);

export default App;
