import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-24 md:pt-32">
            
            {/* HER0 - Centered Title */}
            <motion.section 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="py-[70px] md:py-[120px] flex flex-col items-center justify-center text-center px-6"
            >
                <h1 className="font-serif text-[#FFFFFF] text-5xl md:text-7xl mb-6 leading-tight">
                    About AURSA
                </h1>
                <p className="font-sans text-[#A1A1AA] text-xl md:text-2xl font-light">
                    Understanding the identity behind your style.
                </p>
            </motion.section>

            {/* Content Sections */}
            <div className="pb-[70px] md:pb-[140px]">
                
                {/* Section 2 — Why We Built AURSA */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="py-[90px] border-t border-white/5"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
                                Why AURSA Exists
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6 font-light">
                            <p>Getting dressed is personal.</p>
                            <p>But most people still rely on mirrors, friends, or guesswork to know if an outfit works.</p>
                            <p>AURSA was created to answer a simple question:</p>
                            <p className="text-[#F5F5F7] font-medium">What does your outfit actually communicate?</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 3 — What AURSA Does */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="py-[90px] border-t border-white/5"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
                                An AI mirror for your style
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6 font-light">
                            <p>AURSA analyzes your outfit and reveals the visual harmony behind it.</p>
                            <p>It studies:</p>
                            <ul className="list-disc pl-6 space-y-2 text-[#D88A3D] font-medium marker:text-[#D88A3D]">
                                <li><span className="text-[#A1A1AA] font-light">Color harmony</span></li>
                                <li><span className="text-[#A1A1AA] font-light">Contrast</span></li>
                                <li><span className="text-[#A1A1AA] font-light">Layering</span></li>
                                <li><span className="text-[#A1A1AA] font-light">Visual balance</span></li>
                            </ul>
                            <p>Then it translates these signals into a clear reflection of your style.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 4 — Philosophy */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="py-[90px] border-t border-white/5"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
                                Style is identity
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6 font-light">
                            <p>Style is not about trends.</p>
                            <p>It is about identity.</p>
                            <p>Over time, AURSA helps people discover their visual patterns — the colors, contrasts and structures they naturally return to.</p>
                            <p>Your style is not random.</p>
                            <p className="text-[#F5F5F7] font-medium">It is a reflection of who you are.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 5 — Vision */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="py-[90px] border-t border-white/5"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
                                The future of AURSA
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6 font-light">
                            <p>As you continue uploading outfits, AURSA begins to learn your style patterns.</p>
                            <p className="text-[#F5F5F7]">Your wardrobe history.</p>
                            <p className="text-[#F5F5F7]">Your saved vibes.</p>
                            <p className="text-[#F5F5F7]">Your visual identity.</p>
                            <p>Over time, AURSA becomes your personal style intelligence system.</p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default AboutPage;
