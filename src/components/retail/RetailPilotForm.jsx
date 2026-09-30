import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import SEOHead from '../SEOHead';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const RetailPilotForm = () => {
    const [formData, setFormData] = useState({
        Name_First: '',
        Name_Last: '',
        Email: '',
        SingleLine: '',
        Dropdown: '-Select-',
        MultiLine: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        // Expose Zoho form expected contract arrays globally for safety
        window.zf_MandArray = ["Name_First", "Email", "SingleLine"];
        window.zf_FieldArray = ["Name_First", "Name_Last", "Email", "SingleLine", "Dropdown", "MultiLine"];
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error as user types if field becomes valid
        if (errors[name] || (name === 'Name_First' && errors.Name)) {
            setErrors(prev => {
                const newErr = { ...prev };
                if (name === 'Name_First') delete newErr.Name;
                delete newErr[name];
                return newErr;
            });
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, formData[name]);
    };

    const validateField = (fieldName, value) => {
        let fieldErr = '';
        const trimmed = (value || '').trim();

        if (fieldName === 'Name_First') {
            if (!trimmed) {
                fieldErr = 'Please enter your first name.';
            }
            setErrors(prev => ({ ...prev, Name: fieldErr }));
        } else if (fieldName === 'Email') {
            if (!trimmed) {
                fieldErr = 'Please enter your work email.';
            } else {
                // c5 email regex from Zoho validation.js
                const emailExp = /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
                if (!emailExp.test(trimmed)) {
                    fieldErr = 'Please enter a valid work email address.';
                }
            }
            setErrors(prev => ({ ...prev, Email: fieldErr }));
        } else if (fieldName === 'SingleLine') {
            if (!trimmed) {
                fieldErr = 'Please enter your brand or retailer name.';
            }
            setErrors(prev => ({ ...prev, SingleLine: fieldErr }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // 1. Mandatory check: Name_First
        if (!formData.Name_First || !formData.Name_First.trim()) {
            newErrors.Name = 'Please enter your first name.';
        }

        // 2. Mandatory check: Email + format check (c5)
        if (!formData.Email || !formData.Email.trim()) {
            newErrors.Email = 'Please enter your work email.';
        } else {
            const emailExp = /^[\w]([\w\-.+&'/]*)@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
            if (!emailExp.test(formData.Email.trim())) {
                newErrors.Email = 'Please enter a valid work email address.';
            }
        }

        // 3. Mandatory check: SingleLine (Brand/Retailer Name)
        if (!formData.SingleLine || !formData.SingleLine.trim()) {
            newErrors.SingleLine = 'Please enter your brand or retailer name.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        const isValid = validateForm();
        if (!isValid) {
            e.preventDefault();
            setTouched({
                Name_First: true,
                Email: true,
                SingleLine: true
            });
            return false;
        }
        // Native submission to Zoho endpoint proceeds when valid
        return true;
    };

    return (
        <div className="min-h-screen bg-[#0F0F13] text-[#F5F5F7] font-sans selection:bg-[#D88A3D]/30 w-full overflow-x-hidden pt-32 md:pt-40 pb-24">
            <SEOHead
                title="Request an AURSA Retail Pilot — AURSA"
                description="Request a 30-day QR-based retail pilot for your fashion stores."
                path="/contact?interest=retail-pilot"
            />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* LEFT COLUMN: 40% Contextual Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="lg:col-span-5 space-y-6 text-left"
                    >
                        <p className="text-[#D88A3D] text-xs md:text-sm uppercase tracking-[0.35em] font-bold">
                            AURSA FOR FASHION RETAIL
                        </p>

                        <h1 className="font-serif text-[#F5F5F7] text-4xl sm:text-5xl md:text-6xl leading-[1.12]">
                            Request an AURSA Retail Pilot
                        </h1>

                        <p className="font-sans text-[#A1A1AA] text-base sm:text-lg font-light leading-relaxed max-w-md">
                            Tell us a little about your retail business. We’ll get back to you personally.
                        </p>

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-xs sm:text-sm text-[#D88A3D]/90 uppercase tracking-[0.2em] font-medium">
                                30-day pilot · QR-based · No new hardware
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: 60% Form */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="lg:col-span-7"
                    >
                        <form
                            action="https://forms.zohopublic.in/helloau1/form/AURSADemoRequest/formperma/0X4uIDyMEBdV4fkqKSLoiDgjwwgeM7j0Xa9ZFdV9Ojs/htmlRecords/submit"
                            name="form"
                            id="form"
                            method="POST"
                            acceptCharset="UTF-8"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                            className="aursa-pilot-form bg-[#16161C] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 text-left shadow-2xl relative"
                        >
                            {/* Hidden Zoho Tracking Fields */}
                            <input type="hidden" name="zf_referrer_name" value="" />
                            <input type="hidden" name="zf_redirect_url" value="" />
                            <input type="hidden" name="zc_gad" value="" />

                            {/* ROW 1: First Name & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="Name_First" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#A1A1AA]">
                                        First Name <span className="text-[#D88A3D] font-bold">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="Name_First"
                                        name="Name_First"
                                        fieldType="7"
                                        maxLength={255}
                                        placeholder="Rajat"
                                        value={formData.Name_First}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        aria-required="true"
                                        aria-invalid={!!errors.Name}
                                        className={`w-full h-[50px] px-4 py-3 bg-[#1C1C24] text-[#F5F5F7] placeholder-[#71717A] border ${
                                            errors.Name && touched.Name_First ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D88A3D]'
                                        } rounded-xl font-sans text-sm md:text-base focus:ring-1 focus:ring-[#D88A3D]/40 outline-none transition-all duration-200`}
                                    />
                                    {errors.Name && touched.Name_First && (
                                        <p id="Name_error" className="text-red-400 text-xs mt-1.5 font-sans flex items-center gap-1.5">
                                            <AlertCircle size={13} className="shrink-0" />
                                            <span>{errors.Name}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="Name_Last" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#A1A1AA]">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="Name_Last"
                                        name="Name_Last"
                                        fieldType="7"
                                        maxLength={255}
                                        placeholder="Shakya"
                                        value={formData.Name_Last}
                                        onChange={handleChange}
                                        className="w-full h-[50px] px-4 py-3 bg-[#1C1C24] text-[#F5F5F7] placeholder-[#71717A] border border-white/10 focus:border-[#D88A3D] rounded-xl font-sans text-sm md:text-base focus:ring-1 focus:ring-[#D88A3D]/40 outline-none transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* ROW 2: Work Email */}
                            <div className="space-y-2">
                                <label htmlFor="Email" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#A1A1AA]">
                                    Work Email <span className="text-[#D88A3D] font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="Email"
                                    name="Email"
                                    checktype="c5"
                                    fieldType="9"
                                    maxLength={255}
                                    placeholder="you@company.com"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.Email}
                                    className={`w-full h-[50px] px-4 py-3 bg-[#1C1C24] text-[#F5F5F7] placeholder-[#71717A] border ${
                                        errors.Email && touched.Email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D88A3D]'
                                    } rounded-xl font-sans text-sm md:text-base focus:ring-1 focus:ring-[#D88A3D]/40 outline-none transition-all duration-200`}
                                />
                                {errors.Email && touched.Email && (
                                    <p id="Email_error" className="text-red-400 text-xs mt-1.5 font-sans flex items-center gap-1.5">
                                        <AlertCircle size={13} className="shrink-0" />
                                        <span>{errors.Email}</span>
                                    </p>
                                )}
                            </div>

                            {/* ROW 3: Brand / Retailer Name */}
                            <div className="space-y-2">
                                <label htmlFor="SingleLine" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#A1A1AA]">
                                    Brand / Retailer Name <span className="text-[#D88A3D] font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="SingleLine"
                                    name="SingleLine"
                                    checktype="c1"
                                    fieldType="1"
                                    maxLength={255}
                                    placeholder="Your company or brand"
                                    value={formData.SingleLine}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.SingleLine}
                                    className={`w-full h-[50px] px-4 py-3 bg-[#1C1C24] text-[#F5F5F7] placeholder-[#71717A] border ${
                                        errors.SingleLine && touched.SingleLine ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#D88A3D]'
                                    } rounded-xl font-sans text-sm md:text-base focus:ring-1 focus:ring-[#D88A3D]/40 outline-none transition-all duration-200`}
                                />
                                {errors.SingleLine && touched.SingleLine && (
                                    <p id="SingleLine_error" className="text-red-400 text-xs mt-1.5 font-sans flex items-center gap-1.5">
                                        <AlertCircle size={13} className="shrink-0" />
                                        <span>{errors.SingleLine}</span>
                                    </p>
                                )}
                            </div>

                            {/* ROW 4: Number of Stores */}
                            <div className="space-y-2">
                                <label htmlFor="Dropdown" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#A1A1AA]">
                                    Number of Stores
                                </label>
                                <select
                                    id="Dropdown"
                                    name="Dropdown"
                                    checktype="c1"
                                    value={formData.Dropdown}
                                    onChange={handleChange}
                                    className="w-full h-[50px] px-4 py-3 bg-[#1C1C24] text-[#F5F5F7] border border-white/10 focus:border-[#D88A3D] rounded-xl font-sans text-sm md:text-base focus:ring-1 focus:ring-[#D88A3D]/40 outline-none transition-all duration-200 appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23A1A1AA'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 1rem center',
                                        backgroundSize: '1.2em 1.2em'
                                    }}
                                >
                                    <option value="-Select-" className="bg-[#16161C] text-[#A1A1AA]">-Select-</option>
                                    <option value="1" className="bg-[#16161C] text-[#F5F5F7]">1</option>
                                    <option value="2-5" className="bg-[#16161C] text-[#F5F5F7]">2-5</option>
                                    <option value="6-20" className="bg-[#16161C] text-[#F5F5F7]">6-20</option>
                                    <option value="21-50" className="bg-[#16161C] text-[#F5F5F7]">21-50</option>
                                    <option value="50+" className="bg-[#16161C] text-[#F5F5F7]">50+</option>
                                </select>
                                <p id="Dropdown_error" className="text-red-400 text-xs mt-1.5 font-sans hidden">
                                    Invalid value
                                </p>
                            </div>

                            {/* ROW 5: What would you like to explore? */}
                            <div className="space-y-2">
                                <label htmlFor="MultiLine" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#A1A1AA]">
                                    What would you like to explore?
                                </label>
                                <textarea
                                    id="MultiLine"
                                    name="MultiLine"
                                    checktype="c1"
                                    maxLength={65535}
                                    placeholder="Tell us briefly what you’d like to test with AURSA."
                                    value={formData.MultiLine}
                                    onChange={handleChange}
                                    className="w-full h-[130px] min-h-[100px] resize-y px-4 py-3 bg-[#1C1C24] text-[#F5F5F7] placeholder-[#71717A] border border-white/10 focus:border-[#D88A3D] rounded-xl font-sans text-sm md:text-base focus:ring-1 focus:ring-[#D88A3D]/40 outline-none transition-all duration-200"
                                />
                                <p id="MultiLine_error" className="text-red-400 text-xs mt-1.5 font-sans hidden">
                                    Invalid value
                                </p>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full h-12 sm:h-13 bg-[#D88A3D] hover:bg-[#F0B67F] text-[#0F0F13] font-bold uppercase tracking-[0.25em] text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.99] flex items-center justify-center"
                                >
                                    REQUEST A PILOT
                                </button>
                            </div>

                            {/* PRIVACY POLICY REASSURANCE */}
                            <p className="text-xs text-[#71717A] text-center pt-2 leading-relaxed font-sans">
                                By submitting this form, you agree that AURSA may contact you about your pilot request.{' '}
                                <Link to="/privacy" className="underline hover:text-[#D88A3D] transition-colors">
                                    Privacy Policy
                                </Link>
                            </p>
                        </form>

                        {/* FALLBACK EMAIL LINK */}
                        <p className="text-xs sm:text-sm text-[#71717A] text-center pt-6 font-sans">
                            Prefer email?{' '}
                            <a
                                href="mailto:hello@aursa.app"
                                className="text-[#A1A1AA] hover:text-[#D88A3D] underline transition-colors"
                            >
                                hello@aursa.app
                            </a>
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default RetailPilotForm;
