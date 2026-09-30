import React from 'react';
import { trackEvent } from '../lib/analytics';

const AppDownloadSection = ({ source = 'app_page', className = '' }) => {
    return (
        <section id="download-aursa" className={`py-24 px-6 border-t border-white/5 bg-[#16161C]/50 relative z-10 scroll-mt-28 ${className}`}>
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <p className="text-[#D88A3D] text-xs font-bold uppercase tracking-[0.35em]">
                    WEAR WITH CONFIDENCE
                </p>

                <h2 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF]">
                    Take AURSA to your mirror.
                </h2>

                <p className="font-sans text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-xl mx-auto">
                    Available on iPhone and Android. Download the personal style app to get an instant private second opinion whenever you stand in front of the mirror.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="https://apps.apple.com/in/app/aursa/id6761254001"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('app_store_click', { store: 'apple', source, platform: 'ios' })}
                        className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                    >
                        <img 
                            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                            alt="Download on the App Store" 
                            className="h-[44px] sm:h-[48px] w-auto object-contain" 
                        />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.aursa.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('app_store_click', { store: 'google', source, platform: 'android' })}
                        className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                    >
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                            alt="Get it on Google Play" 
                            className="h-[44px] sm:h-[48px] w-auto object-contain" 
                        />
                    </a>
                </div>

                <p className="text-xs text-[#A1A1AA] font-light pt-6">
                    Wear with Confidence.
                </p>
            </div>
        </section>
    );
};

export default AppDownloadSection;
