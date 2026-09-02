import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24 text-left">
            <div className="max-w-3xl mx-auto px-6 space-y-16 md:space-y-24">

                {/* Section 1 — Opening */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="space-y-8"
                >
                    <p className="text-[#D88A3D] text-xs md:text-sm uppercase tracking-[0.35em] font-bold">
                        About AURSA
                    </p>

                    <h1 className="font-serif text-[#F5F5F7] text-4xl md:text-6xl leading-[1.15] max-w-2xl">
                        Style is personal. <br />
                        Getting dressed shouldn't feel complicated.
                    </h1>

                    <div className="space-y-6 text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                        <p className="text-[#F5F5F7] font-normal text-xl md:text-2xl">
                            AURSA was built around a simple idea:
                        </p>
                        <p>
                            You shouldn't have to second-guess what you wear.
                        </p>
                        <p>
                            What you wear can affect how you feel, how you see yourself, and how you show up.
                        </p>
                        <p className="text-[#F5F5F7] font-normal pt-2">
                            AURSA exists to help you understand that relationship — and ultimately, wear with confidence.
                        </p>
                    </div>
                </motion.section>

                {/* Section 2 — Why AURSA Exists */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-8 pt-8 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-3xl md:text-5xl leading-tight max-w-2xl">
                        The moment before you step out.
                    </h2>

                    <div className="space-y-6 text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                        <div className="space-y-2">
                            <p>You get dressed.</p>
                            <p>You look in the mirror.</p>
                        </div>

                        <div className="space-y-2">
                            <p>Maybe you change something.</p>
                            <p>Maybe you change everything.</p>
                        </div>

                        <div className="py-2 pl-4 border-l-2 border-[#D88A3D]/40 space-y-2 text-[#F5F5F7] italic">
                            <p>“Does this actually work?”</p>
                            <p>“Does this feel like me?”</p>
                            <p>“Should I change before I leave?”</p>
                        </div>

                        <p>
                            That small moment of uncertainty is where AURSA begins.
                        </p>

                        <p className="text-[#F5F5F7] font-normal pt-2">
                            AURSA is designed to give you another perspective before you step out — so you can make your choice with more clarity and confidence.
                        </p>
                    </div>
                </motion.section>

                {/* Section 3 — What We Believe */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-8 pt-8 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-3xl md:text-5xl leading-tight max-w-2xl">
                        We believe getting dressed should feel like self-expression, not a test.
                    </h2>

                    <div className="space-y-6 max-w-2xl">
                        <ul className="space-y-4 list-none">
                            {[
                                "Your style doesn't have to follow a trend.",
                                "Your clothes don't have to be expensive.",
                                "You don't have to dress like anyone else.",
                                "And there isn't one universal definition of a \"good\" outfit."
                            ].map((statement, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed">
                                    <div className="w-2 h-2 rounded-full bg-[#D88A3D] mt-2.5 shrink-0" />
                                    <span>{statement}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 space-y-2 border-t border-white/5">
                            <p className="text-[#A1A1AA] text-lg md:text-xl font-light">
                                The goal isn't perfection.
                            </p>
                            <p className="font-serif text-[#F5F5F7] text-2xl md:text-4xl italic">
                                The goal is feeling like yourself.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 4 — Founder Story / Note */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="pt-10 border-t border-white/5 space-y-8"
                >
                    <div className="max-w-2xl space-y-6">
                        <p className="text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed">
                            This is still early. Still learning. Still evolving.
                        </p>
                        <p className="text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed">
                            But the goal remains simple: to help you step out feeling just a little more certain.
                        </p>

                        <div className="pt-6 space-y-1 border-t border-white/5">
                            <h3 className="text-[#FFFFFF] font-medium text-xl md:text-2xl">
                                — Rajat Shakya
                            </h3>
                            <p className="text-[#D88A3D] text-sm md:text-base font-light">
                                Founder, AURSA
                            </p>
                            <div className="pt-3">
                                <a
                                    href="https://www.linkedin.com/in/rajatkumarshakya/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block text-[#0A66C2] hover:scale-110 transition-transform duration-200"
                                    aria-label="Rajat Shakya LinkedIn Profile"
                                >
                                    <Linkedin size={22} fill="currentColor" strokeWidth={0} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default AboutPage;
