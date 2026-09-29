import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24 text-left">
            <SEOHead
                title="Contact — AURSA"
                description="Get in touch with AURSA for questions, feedback, partnerships, or retail pilot inquiries."
                path="/contact"
            />
            <div className="max-w-2xl mx-auto px-6 space-y-16 md:space-y-20">
                
                {/* Header Section */}
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="space-y-6"
                >
                    <p className="text-[#D88A3D] text-xs md:text-sm uppercase tracking-[0.35em] font-bold">
                        Contact AURSA
                    </p>

                    <h1 className="font-serif text-[#F5F5F7] text-4xl md:text-6xl leading-[1.15]">
                        Let's Talk
                    </h1>

                    <p className="font-sans text-[#A1A1AA] text-lg md:text-xl font-light leading-relaxed max-w-xl">
                        Have a question, idea, partnership opportunity, or simply want to say hello? We'd love to hear from you.
                    </p>
                </motion.section>

                {/* Email Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="pt-10 border-t border-white/5 space-y-6"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl">
                        Get in touch
                    </h2>

                    <p className="font-sans text-[#A1A1AA] text-base md:text-lg font-light leading-relaxed">
                        For questions, feedback, partnerships, or anything AURSA-related, reach out to us directly.
                    </p>

                    <div className="pt-2">
                        <a 
                            href="mailto:hello@aursa.app"
                            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-300"
                        >
                            <Mail size={22} className="text-[#D88A3D]" />
                            <span>hello@aursa.app</span>
                        </a>
                    </div>
                </motion.section>

                {/* Social Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="pt-10 border-t border-white/5 space-y-6"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl">
                        Follow AURSA
                    </h2>

                    <div className="flex flex-col gap-4 max-w-xs">
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
                                className="inline-flex items-center justify-between text-lg text-[#A1A1AA] hover:text-[#D88A3D] transition-colors duration-200 font-light group py-1 border-b border-white/5"
                            >
                                <span>{social.name}</span>
                                <ArrowUpRight size={18} className="text-[#D88A3D] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                            </a>
                        ))}
                    </div>
                </motion.section>

                {/* Closing Tag */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="pt-12 border-t border-white/5"
                >
                    <p className="font-serif italic text-[#D88A3D] text-2xl md:text-3xl opacity-90">
                        Wear with Confidence.
                    </p>
                </motion.section>

            </div>
        </div>
    );
};

export default ContactPage;
