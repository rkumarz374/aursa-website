import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
};

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-24 md:pt-32 pb-24 text-left">
            <div className="max-w-3xl mx-auto px-6 space-y-12">
                
                {/* Header */}
                <motion.section 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="pb-8 border-b border-white/5"
                >
                    <h1 className="font-serif text-[#F5F5F7] text-4xl md:text-6xl mb-4 leading-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-[#6B7280] text-sm font-light uppercase tracking-wider">
                        Last updated: March 2026
                    </p>
                </motion.section>

                {/* Introduction */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 text-[#A1A1AA] text-lg font-light leading-relaxed transition-all duration-300"
                >
                    <p>AURSA is designed as a private, personal experience.</p>
                    <p>This Privacy Policy explains what data we collect, how we use it, and how we protect it.</p>
                </motion.section>

                {/* 1. Information We Collect */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        1. Information We Collect
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed">
                        <p>We collect limited information necessary to provide and improve the product.</p>
                        <p>This may include:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Email address (for account access, waitlist, or communication)</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Basic usage data (such as feature interactions and app activity)</span></li>
                        </ul>
                        
                        <p className="pt-4">We do NOT collect:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Personal identity information from your images</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Facial recognition data</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Biometric identifiers</span></li>
                        </ul>
                    </div>
                </motion.section>

                {/* 2. Image Processing */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        2. Image Processing
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed">
                        <p>When you upload an outfit photo, it is processed securely to analyze visual elements such as color, contrast, layering, and balance.</p>
                        <p className="text-[#F5F5F7] font-medium mt-6">Important:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Images are NOT stored on our servers</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Images remain on your device unless you choose to save them locally</span></li>
                            <li><span className="text-[#A1A1AA] font-light">We do not use your images for training or identification</span></li>
                        </ul>
                        <p className="pt-4">
                            The system treats images purely as clothing compositions, not as personal identity data.
                        </p>
                    </div>
                </motion.section>

                {/* 3. How We Use Information */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        3. How We Use Information
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed">
                        <p>We use collected data to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Provide outfit analysis and feedback</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Improve product performance and accuracy</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Understand usage patterns to enhance the experience</span></li>
                        </ul>
                        <p className="pt-4 text-[#F5F5F7]">We do not sell your personal data.</p>
                    </div>
                </motion.section>

                {/* 4. Analytics & Third-Party Services */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        4. Analytics & Third-Party Services
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed">
                        <p>We may use trusted third-party services (such as analytics tools) to understand how users interact with AURSA.</p>
                        <p>These services:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Collect anonymized or aggregated usage data</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Follow their own privacy and security standards</span></li>
                        </ul>
                    </div>
                </motion.section>

                {/* 5. Data Storage & Security */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        5. Data Storage & Security
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed">
                        <p>We take reasonable measures to protect your information.</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Sensitive processing is handled securely</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Minimal data is stored</span></li>
                            <li><span className="text-[#A1A1AA] font-light">We avoid storing unnecessary personal data</span></li>
                        </ul>
                    </div>
                </motion.section>

                {/* 6. Your Data & Control */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        6. Your Data & Control
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed">
                        <p>You have control over your data.</p>
                        <p>You can:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[#F5F5F7] font-medium">
                            <li><span className="text-[#A1A1AA] font-light">Stop using the service at any time</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Choose not to upload images</span></li>
                            <li><span className="text-[#A1A1AA] font-light">Request deletion of your data</span></li>
                        </ul>
                        <p className="pt-4">
                            If you would like us to delete your data, you can contact us at:
                        </p>
                        <a 
                            href="mailto:hello@aursa.app"
                            className="inline-block text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-200 font-medium"
                        >
                            hello@aursa.app
                        </a>
                        <p className="text-sm italic opacity-60">
                            We will process such requests within a reasonable timeframe.
                        </p>
                    </div>
                </motion.section>

                {/* 7. Children’s Privacy */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        7. Children’s Privacy
                    </h2>
                    <p className="text-[#A1A1AA] text-lg font-light leading-relaxed">
                        AURSA is not intended for use by individuals under the age of 13.
                    </p>
                </motion.section>

                {/* 8. Changes to This Policy */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        8. Changes to This Policy
                    </h2>
                    <p className="text-[#A1A1AA] text-lg font-light leading-relaxed">
                        We may update this Privacy Policy from time to time.<br />
                        Any updates will be reflected on this page with a revised date.
                    </p>
                </motion.section>

                {/* 9. Contact */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="space-y-6 pt-12 border-t border-white/5"
                >
                    <h2 className="font-serif text-[#F5F5F7] text-2xl md:text-3xl leading-tight">
                        9. Contact
                    </h2>
                    <div className="space-y-4 text-[#A1A1AA] text-lg font-light leading-relaxed font-sans">
                        <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
                        <a 
                            href="mailto:hello@aursa.app"
                            className="inline-block text-[#F5F5F7] hover:text-[#D88A3D] transition-colors duration-200 font-medium"
                        >
                            hello@aursa.app
                        </a>
                    </div>
                </motion.section>

                {/* Closing Tagline */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="pt-16 pb-24 border-t border-white/5 space-y-6 font-sans mb-32"
                >
                    <p className="text-[#F5F5F7] text-2xl md:text-3xl font-serif leading-tight">
                        AURSA is built to help you feel confident — not exposed.
                    </p>
                    <p className="text-[#A1A1AA] text-lg font-light">
                        Your privacy is a core part of that experience.
                    </p>
                </motion.section>

            </div>
        </div>
    );
};


export default PrivacyPolicyPage;
