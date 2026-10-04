import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Copy, X } from 'lucide-react';
import { useRetailPilotModal } from '../../context/RetailPilotModalContext';
import { trackEvent } from '../../lib/analytics';

const RetailPilotModal = () => {
    const { isOpen, closePilotModal, isDeepLink } = useRetailPilotModal();
    const [copied, setCopied] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const closeButtonRef = useRef(null);
    const modalRef = useRef(null);

    // Body scroll locking
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Keyboard Escape listener & Focus trapping
    useEffect(() => {
        if (!isOpen) return;

        // Auto focus close button on open
        if (closeButtonRef.current) {
            closeButtonRef.current.focus();
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
                return;
            }

            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length === 0) return;

                const firstEl = focusableElements[0];
                const lastEl = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleClose = () => {
        closePilotModal(() => {
            if (location.pathname === '/contact' && location.search.includes('interest=retail-pilot')) {
                navigate('/contact', { replace: true });
            }
        });
    };

    const handleCopyEmail = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('hello@aursa.app')
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(() => {});
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="pilot-modal-title"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) handleClose();
                    }}
                >
                    {/* Dark Translucent Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 bg-[#050508]/80 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Modal Surface Container */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="relative z-10 w-full max-w-[560px] bg-[#16161C] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl space-y-6 my-auto select-none sm:select-auto"
                    >
                        {/* Close X Button */}
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={handleClose}
                            aria-label="Close modal"
                            className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#F5F5F7] p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        {/* Eyebrow */}
                        <p className="text-[#D88A3D] text-xs uppercase tracking-[0.35em] font-bold">
                            AURSA FOR FASHION RETAIL
                        </p>

                        {/* Title */}
                        <h2
                            id="pilot-modal-title"
                            className="font-serif text-[#F5F5F7] text-3xl sm:text-4xl md:text-5xl leading-[1.12]"
                        >
                            Request an AURSA Retail Pilot
                        </h2>

                        {/* Supporting Copy */}
                        <p className="font-sans text-[#A1A1AA] text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto">
                            Interested in exploring AURSA in your fitting rooms? Tell us a little about your retail business and we’ll take it from there.
                        </p>

                        {/* Reassurance Line */}
                        <div className="pt-3 border-t border-white/5">
                            <p className="text-xs text-[#D88A3D]/90 uppercase tracking-[0.2em] font-medium">
                                30-day pilot · QR-based · No new hardware
                            </p>
                        </div>

                        {/* Primary Email CTA & Actions */}
                        <div className="pt-4 space-y-5 flex flex-col items-center">
                            <a
                                href="mailto:hello@aursa.app?subject=AURSA%20Retail%20Pilot%20Request"
                                onClick={() => trackEvent('retail_pilot_contact_open', { contact_method: 'email', channel: 'primary_button', origin_path: window.location.pathname })}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#D88A3D] hover:bg-[#F0B67F] text-[#0F0F13] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-[0.99] w-full sm:w-auto"
                            >
                                <Mail size={16} className="shrink-0" />
                                <span>EMAIL AURSA</span>
                            </a>

                            {/* Visible Email Address & Copy Action */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                                <a
                                    href="mailto:hello@aursa.app?subject=AURSA%20Retail%20Pilot%20Request"
                                    onClick={() => trackEvent('retail_pilot_contact_open', { contact_method: 'email', channel: 'text_link', origin_path: window.location.pathname })}
                                    className="font-serif text-base sm:text-lg text-[#F5F5F7] hover:text-[#D88A3D] transition-colors"
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
            )}
        </AnimatePresence>
    );
};

export default RetailPilotModal;
