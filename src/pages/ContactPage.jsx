import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
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
                        We’d love to hear from you — whether it’s feedback, questions, or ideas.
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
                        <div className="pt-12 border-t border-white/5 space-y-12">
                            <div className="space-y-3">
                                <p className="text-sm tracking-wider uppercase opacity-40">General Feedback</p>
                                <p className="text-lg md:text-xl text-[#A1A1AA] font-light">
                                    Using AURSA? Tell us what feels right — and what doesn’t.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm tracking-wider uppercase opacity-40">Support</p>
                                <p className="text-lg md:text-xl text-[#A1A1AA] font-light">
                                    Facing an issue? We’ll help you get back on track quickly.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm tracking-wider uppercase opacity-40">Partnerships</p>
                                <p className="text-lg md:text-xl text-[#A1A1AA] font-light">
                                    Interested in collaborating or building with us? Let’s talk.
                                </p>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-white/5 space-y-6">
                            <p className="text-sm tracking-wider uppercase opacity-40">You can reach us at</p>
                            <a 
                                href="mailto:hello@aursa.app"
                                className="inline-block text-2xl md:text-3xl text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-300 font-serif"
                            >
                                hello@aursa.app
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
                                We read everything. And we’re building AURSA with our users.
                            </p>
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default ContactPage;
