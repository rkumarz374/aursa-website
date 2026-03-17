import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-48 pb-32">
            
            <div className="max-w-xl mx-auto px-6 space-y-24 md:space-y-32">
                
                {/* Heading Section */}
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex flex-col gap-6"
                >
                    <h1 className="font-serif text-[#FFFFFF] text-4xl md:text-6xl leading-tight">
                        Get in touch
                    </h1>
                    <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed">
                        Feedback, ideas, or questions about your style journey.
                    </p>
                </motion.section>

                {/* Contact Method */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="space-y-12"
                >
                    <div className="space-y-8">
                        <div className="pt-12 border-t border-white/5 space-y-6">
                            <p className="text-sm tracking-wider uppercase opacity-40">Reach us at</p>
                            <a 
                                href="mailto:aursa.app@gmail.com"
                                className="inline-block text-2xl md:text-3xl text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-300 font-serif"
                            >
                                aursa.app@gmail.com
                            </a>
                        </div>

                        <div className="pt-12 border-t border-white/5 space-y-8">
                            <p className="text-sm tracking-wider uppercase opacity-40">Follow the build</p>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: 'Instagram', url: 'https://www.instagram.com/aursa.ai/' },
                                    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/aursa' },
                                    { name: 'X', url: 'https://x.com/AursaAI' }
                                ].map((social) => (
                                    <a 
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-lg text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors duration-200 font-light"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="pt-24 border-t border-white/5">
                            <p className="text-[#A1A1AA] text-sm md:text-base font-light italic opacity-60">
                                We usually respond within 24–48 hours.
                            </p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default ContactPage;
