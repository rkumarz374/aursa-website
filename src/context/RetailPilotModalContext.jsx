import React, { createContext, useContext, useState } from 'react';
import { trackEvent } from '../lib/analytics';

const RetailPilotModalContext = createContext();

export const RetailPilotModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [triggerEl, setTriggerEl] = useState(null);
    const [isDeepLink, setIsDeepLink] = useState(false);

    const openPilotModal = (source = 'unknown', event = null, fromDeepLink = false) => {
        if (event && event.currentTarget) {
            setTriggerEl(event.currentTarget);
        } else if (document.activeElement) {
            setTriggerEl(document.activeElement);
        }
        setIsDeepLink(fromDeepLink);
        trackEvent('retail_pilot_cta_click', { source, origin_path: window.location.pathname });
        setIsOpen(true);
    };

    const closePilotModal = (onCloseCallback) => {
        setIsOpen(false);
        if (isDeepLink && typeof onCloseCallback === 'function') {
            onCloseCallback();
        }
        setIsDeepLink(false);
        if (triggerEl && typeof triggerEl.focus === 'function') {
            setTimeout(() => {
                try {
                    triggerEl.focus();
                } catch (e) {
                    // Ignore focus errors if element unmounted
                }
            }, 50);
        }
    };

    return (
        <RetailPilotModalContext.Provider value={{ isOpen, openPilotModal, closePilotModal, isDeepLink }}>
            {children}
        </RetailPilotModalContext.Provider>
    );
};

export const useRetailPilotModal = () => {
    const context = useContext(RetailPilotModalContext);
    if (!context) {
        throw new Error('useRetailPilotModal must be used within a RetailPilotModalProvider');
    }
    return context;
};
