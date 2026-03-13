import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-24 md:pt-32">
            
            <div className="pb-[70px] md:pb-[140px] pt-[70px] md:pt-[100px]">
                
                {/* Section 1 */}
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
                                Contact AURSA
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6">
                            <p>Questions about your style insights?</p>
                            <p>Feedback about the AURSA experience?</p>
                            <p>Ideas for improving the product?</p>
                            <p>We would love to hear from you.</p>
                            <p>AURSA is being built in public and we welcome feedback from early users and the community.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 2 */}
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
                                Email
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6">
                            <p>For support, feedback, product questions, or collaboration inquiries, reach us at:</p>
                            <p>
                                <a 
                                    href="mailto:aursa.app@gmail.com"
                                    className="inline-block text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-200 font-medium"
                                >
                                    aursa.app@gmail.com
                                </a>
                            </p>
                            <div className="mt-8 space-y-2 text-[#A1A1AA]">
                                <p>Typical topics include:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Questions about outfit analysis</li>
                                    <li>Feedback on style insights</li>
                                    <li>Product suggestions</li>
                                    <li>Collaboration or partnership inquiries</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section 3 */}
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
                                Follow the journey
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-4">
                            <p className="mb-6">Follow the development of AURSA and stay updated as we continue building the future of personal style intelligence.</p>
                            <div>
                                <a 
                                    href="https://www.instagram.com/aursa.ai/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[#A1A1AA] text-sm md:text-base hover:text-[#D88A3D] transition-colors duration-200"
                                >
                                    Instagram
                                </a>
                            </div>
                            <div>
                                <a 
                                    href="https://www.linkedin.com/company/aursa" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[#A1A1AA] text-sm md:text-base hover:text-[#D88A3D] transition-colors duration-200"
                                >
                                    LinkedIn
                                </a>
                            </div>
                            <div>
                                <a 
                                    href="https://x.com/AursaAI" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[#A1A1AA] text-sm md:text-base hover:text-[#D88A3D] transition-colors duration-200"
                                >
                                    X
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section 4 */}
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
                                Response time
                            </h2>
                        </div>
                        <div className="text-[#A1A1AA] text-lg leading-relaxed space-y-6">
                            <p>We usually respond within <span className="font-medium text-[#F5F5F7]">24–48 hours</span>.</p>
                            <p>As AURSA is currently in development, responses may occasionally take longer — but we read every message.</p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default ContactPage;
