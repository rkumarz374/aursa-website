import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24">
            
            <div className="max-w-xl mx-auto px-6 space-y-16 md:space-y-20">
                
                {/* Intro Section */}
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex flex-col gap-4"
                >
                    <h1 className="font-serif text-[#FFFFFF] text-4xl md:text-5xl leading-tight">
                        About AURSA
                    </h1>
                    <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-md">
                        An AI mirror building a bridge between identity and style.
                    </p>
                </motion.section>

                {/* The Story Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-10"
                >
                    <div className="space-y-8 text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light">
                        <div className="space-y-1">
                            <p>I didn’t start AURSA because of fashion.</p>
                            <p>I started it because of a feeling.</p>
                        </div>

                        <div className="space-y-1">
                            <p>That small moment before stepping out —</p>
                            <p>when you look in the mirror and wonder:</p>
                            <p className="text-[#F5F5F7] font-normal italic">“Does this actually look right?”</p>
                        </div>
                        
                        <div className="space-y-1">
                            <p>You adjust something.</p>
                            <p>Check again.</p>
                            <p>Maybe ask a friend or your partner.</p>
                            <div className="pt-1">
                                <p>And even then,</p>
                                <p>you’re not fully sure.</p>
                            </div>
                        </div>

                        <div className="py-4 opacity-40">—</div>

                        <div className="space-y-1 font-normal">
                            <p>I kept noticing how common this moment is.</p>
                            <p>Not a lack of clothes.</p>
                            <p>Not a lack of inspiration.</p>
                            <p className="text-[#F5F5F7] font-medium pt-1">But a lack of clarity.</p>
                        </div>

                        <div className="space-y-1 pt-4">
                            <p>So I started exploring a different idea.</p>
                            <p>What if your outfit could be understood —</p>
                            <p>not judged, not compared —</p>
                            <p>but analyzed in a way that actually makes sense?</p>
                        </div>
                    </div>
                </motion.section>

                {/* The Solution Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="space-y-8"
                >
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
                                The Bridge
                            </h2>
                            <div className="text-[#A1A1AA] text-lg md:text-xl leading-relaxed space-y-6 font-light">
                                <div className="space-y-1">
                                    <p>AURSA is my attempt to build that.</p>
                                    <p>An AI mirror that helps you understand:</p>
                                </div>
                                <ul className="space-y-3 list-none">
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                        <span className="opacity-90">what’s working</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                        <span className="opacity-90">what feels off</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D88A3D]" />
                                        <span className="opacity-90">how to improve it</span>
                                    </li>
                                </ul>
                                <p className="pt-2">
                                    Not based on trends or opinions, <br className="hidden md:block" />
                                    but based on <span className="text-[#F5F5F7]">visual harmony</span> — <br className="hidden md:block" />
                                    and your own unique patterns.
                                </p>
                            </div>
                        </div>

                        {/* Final Sign-off */}
                        <div className="pt-12 border-t border-white/5 space-y-8">
                            <div className="space-y-4">
                                <p className="text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed">
                                    This is still early. Still learning. Still evolving. <br />
                                    But the goal is simple:
                                </p>
                                <p className="text-[#F5F5F7] text-3xl md:text-4xl font-serif leading-tight">
                                    To help you step out feeling <br className="hidden md:block" />
                                    just a little more certain.
                                </p>
                            </div>
                            
                        <div className="pt-10 space-y-1.5 border-t border-white/5">
                            <h3 className="text-[#FFFFFF] font-medium text-xl md:text-2xl">
                                — Rajat Shakya
                            </h3>
                            <p className="text-[#A1A1AA] text-sm md:text-base font-light">
                                Founder
                            </p>
                            <div className="pt-1">
                                <a 
                                    href="https://www.linkedin.com/in/rajatkumarshakya/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-block text-[#0A66C2] hover:scale-110 transition-transform duration-200"
                                >
                                    <Linkedin size={20} fill="currentColor" strokeWidth={0} />
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default AboutPage;
