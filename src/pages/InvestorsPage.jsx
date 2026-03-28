import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
};

const InvestorsPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24 text-left">

            <div className="max-w-3xl mx-auto px-6 space-y-12">

                {/* Signature Line & Hero */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex flex-col gap-0"
                >
                    <p className="text-white/60 text-[10px] md:text-sm uppercase tracking-[0.3em] font-medium mb-8">
                        Built for the moment before you step out.
                    </p>
                    <h1 className="font-serif text-[#FFFFFF] text-4xl md:text-5xl leading-tight mb-4">
                        A new layer in personal style
                    </h1>
                    <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-xl">
                        AURSA is building an AI-powered system that helps people understand their style, reduce uncertainty, and feel confident before stepping out.
                    </p>
                </motion.section>

                {/* Section 3: The Problem */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                        The problem
                    </h2>
                    <div className="max-w-xl space-y-6 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
                        <p>Every day, people experience a small but repeated moment of uncertainty before leaving home.</p>
                        
                        <div className="space-y-1 py-4">
                            <p className="text-[#F5F5F7] font-normal italic">They look in the mirror and wonder:</p>
                            <p>Does this actually look right?</p>
                            <p>Do these colors work together?</p>
                            <p>Does this represent me?</p>
                        </div>

                        <p>
                            This is not a discovery problem.<br />
                            <span className="text-[#F5F5F7] font-medium">It is a clarity problem.</span>
                        </p>

                        <p>
                            Existing platforms focus on trends, shopping, and inspiration —<br />
                            but none solve the moment before stepping out.
                        </p>
                    </div>
                </motion.section>

                {/* Section 4: The Solution */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                        The solution
                    </h2>
                    <div className="max-w-xl space-y-6 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
                        <p>AURSA acts as an AI mirror.</p>
                        <p>Users upload an outfit, and the system analyzes:</p>
                        <ul className="space-y-3 list-none">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">color harmony</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">contrast</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">layering</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">visual balance</span>
                            </li>
                        </ul>
                        <p>
                            It then provides clear feedback and small improvements.
                        </p>
                        <p className="pt-2">
                            Not based on trends or opinions —<br />
                            but based on <span className="text-[#F5F5F7]">visual structure</span> and personal patterns.
                        </p>
                    </div>
                </motion.section>

                {/* Section 5: Product Evolution */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                        From tool to intelligence system
                    </h2>
                    <div className="max-w-xl space-y-6 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
                        <p>Each outfit analyzed adds to a growing dataset of personal style signals:</p>
                        <ul className="space-y-3 list-none">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">color preferences</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">contrast tendencies</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                <span className="opacity-90">layering habits</span>
                            </li>
                        </ul>
                        <p>
                            Over time, AURSA builds a user’s style identity — <span className="text-[#F5F5F7]">a visual fingerprint.</span>
                        </p>
                        <p>This allows the system to:</p>
                        <ul className="space-y-2 text-[#F5F5F7] font-medium opacity-90">
                            <li>• detect patterns</li>
                            <li>• predict alignment</li>
                            <li>• guide future decisions</li>
                        </ul>
                        <p className="pt-2">
                            This transforms AURSA from a tool into a personal style intelligence system.
                        </p>
                        <p className="pt-2 text-[#F5F5F7]/80">
                            This creates a compounding layer of user-specific data that becomes more valuable with every interaction.
                        </p>
                    </div>
                </motion.section>

                {/* Section 6: Why Now */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                        Why now
                    </h2>
                    <div className="max-w-xl space-y-6 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
                        <p>
                            Recent advances in computer vision and AI make real-time visual analysis possible.
                        </p>
                        <p>
                            At the same time, users are shifting from trend-following to self-expression and identity.
                        </p>
                        <p className="text-[#F5F5F7]">
                            AURSA sits at the intersection of both.
                        </p>
                    </div>
                </motion.section>

                {/* Section 7: Traction */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                        Early traction
                    </h2>
                    <ul className="max-w-xl space-y-4 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light list-disc pl-6">
                        <li>Live beta product</li>
                        <li>Waitlist users growing</li>
                        <li>Strong early user validation from real-world feedback</li>
                    </ul>
                    <p className="text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-xl italic opacity-80">
                        Early usage patterns are already showing consistent repeat behavior and strong engagement signals.
                    </p>
                </motion.section>

                {/* Section 8: Vision */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                        The vision
                    </h2>
                    <div className="max-w-xl space-y-6 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
                        <p>
                            AURSA aims to become the personal style intelligence layer.
                        </p>
                        <p className="text-[#F5F5F7] text-2xl md:text-3xl font-serif">
                            What Spotify is to music taste,<br />
                            AURSA aims to be for visual identity.
                        </p>
                        <p className="text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-xl italic opacity-80 pt-4">
                            This is still early — but the underlying patterns suggest something much deeper than a typical fashion product.
                        </p>
                    </div>
                </motion.section>

                {/* Section 9: CTA */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-8 pt-12 border-t border-white/5"
                >
                    <div className="space-y-4">
                        <h2 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
                            Build this with us
                        </h2>
                        <p className="text-[#A1A1AA] text-lg md:text-xl font-light">
                            If you're interested in investing in AURSA, reach out at:
                        </p>
                        <a 
                            href="mailto:aursa.app@gmail.com"
                            className="inline-block text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-200 text-xl font-medium border-b border-[#D88A3D]/30"
                        >
                            aursa.app@gmail.com
                        </a>
                    </div>
                </motion.section>

                {/* Final Investor Hook */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="pt-12 border-t border-white/5 pb-12"
                >
                    <p className="text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-xl italic opacity-80">
                        More detailed insights, product metrics, and system depth are shared with investors and partners.
                    </p>
                </motion.section>

            </div>
        </div>
    );
};

export default InvestorsPage;
