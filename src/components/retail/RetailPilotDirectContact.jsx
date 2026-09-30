import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Check, Copy } from 'lucide-react';
import SEOHead from '../SEOHead';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const RetailPilotDirectContact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('hello@aursa.app')
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => {
                    // Fail gracefully without breaking usability
                });
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24">
            <SEOHead
                title="Request an AURSA Retail Pilot — AURSA"
                description="Get in touch with AURSA to request a 30-day QR-based retail pilot for your fashion stores."
                path="/contact"
            />

            <div className="max-w-2xl mx-auto px-6 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="space-y-8 md:space-y-10"
                >
                    {/* Eyebrow */}
                    <p className="text-[#D88A3D] text-xs md:text-sm uppercase tracking-[0.35em] font-bold">
                        AURSA FOR FASHION RETAIL
                    </p>

                    {/* H1 Title */}
                    <h1 className="font-serif text-[#F5F5F7] text-4xl sm:text-5xl md:text-6xl leading-[1.12]">
                        Request an AURSA Retail Pilot
                    </h1>

                    {/* Supporting Copy */}
                    <p className="font-sans text-[#A1A1AA] text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto">
                        Interested in exploring AURSA in your fitting rooms? Tell us a little about your retail business and we’ll take it from there.
                    </p>

                    {/* Reassurance Line */}
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs sm:text-sm text-[#D88A3D]/90 uppercase tracking-[0.2em] font-medium">
                            30-day pilot · QR-based · No new hardware
                        </p>
                    </div>

                    {/* Primary Email CTA & Direct Contact Options */}
                    <div className="pt-6 space-y-6 flex flex-col items-center">
                        <a
                            href="mailto:hello@aursa.app?subject=AURSA%20Retail%20Pilot%20Request"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D88A3D] hover:bg-[#F0B67F] text-[#0F0F13] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-[0.99]"
                        >
                            <Mail size={18} className="shrink-0" />
                            <span>EMAIL AURSA</span>
                        </a>

                        {/* Visible Email Address & Copy Action */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <a
                                href="mailto:hello@aursa.app?subject=AURSA%20Retail%20Pilot%20Request"
                                className="font-serif text-lg sm:text-xl text-[#F5F5F7] hover:text-[#D88A3D] transition-colors"
                            >
                                hello@aursa.app
                            </a>
                            <span className="hidden sm:inline text-white/20">·</span>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                aria-label="Copy email address to clipboard"
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-medium text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/10 hover:border-white/20 rounded-lg transition-colors cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check size={12} className="text-[#D88A3D]" />
                                        <span className="text-[#D88A3D]">COPIED</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={12} />
                                        <span>COPY EMAIL</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RetailPilotDirectContact;
