import React, { useEffect } from 'react';
import { DOMAIN } from '../lib/seoRegistry';

export const ORGANISATION_SCHEMA = {
    '@type': 'Organization',
    '@id': `${DOMAIN}/#organization`,
    'name': 'AURSA',
    'url': `${DOMAIN}/`,
    'logo': `${DOMAIN}/aursa-logo.svg`,
    'sameAs': [
        'https://www.instagram.com/aursa.ai/',
        'https://www.linkedin.com/company/aursa',
        'https://x.com/AursaAI'
    ]
};

export const WEBSITE_SCHEMA = {
    '@type': 'WebSite',
    '@id': `${DOMAIN}/#website`,
    'url': `${DOMAIN}/`,
    'name': 'AURSA',
    'publisher': {
        '@id': `${DOMAIN}/#organization`
    }
};

export const HOMEPAGE_SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
        ORGANISATION_SCHEMA,
        WEBSITE_SCHEMA
    ]
};

/**
 * Reusable SEO Head component for title, description, canonical, OG, Twitter, robots, and JSON-LD schema.
 */
const SEOHead = ({
    title = 'AURSA — AI Outfit Analysis & Personal Style App',
    description = 'AURSA is an AI outfit analysis app that helps you understand what works in your look, improve your style, and step out with confidence.',
    canonical,
    path = '',
    ogImage = 'https://www.aursa.app/aursa-logo.png',
    ogType = 'website',
    noindex = false,
    robots,
    schema = null,
}) => {
    const fullCanonical = canonical || `${DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;
    const robotsContent = robots || (noindex ? 'noindex, follow' : 'index, follow');

    useEffect(() => {
        // 1. Title
        if (title) {
            document.title = title;
        }

        const updateMetaTag = (selector, attrName, attrValue, content) => {
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attrName, attrValue);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // 2. Description
        if (description) {
            updateMetaTag('meta[name="description"]', 'name', 'description', description);
        }

        // 3. Robots
        updateMetaTag('meta[name="robots"]', 'name', 'robots', robotsContent);

        // 4. Canonical Link
        let canonicalEl = document.querySelector('link[rel="canonical"]');
        if (!canonicalEl) {
            canonicalEl = document.createElement('link');
            canonicalEl.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalEl);
        }
        canonicalEl.setAttribute('href', fullCanonical);

        // 5. Open Graph Meta Tags
        updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
        updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
        updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
        updateMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonical);
        if (ogImage) {
            updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
        }

        // 6. Twitter Meta Tags
        updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
        updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
        updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
        if (ogImage) {
            updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
        }

        // 7. JSON-LD Schema
        let schemaScript = document.getElementById('jsonld-route-schema');
        if (schema) {
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.id = 'jsonld-route-schema';
                schemaScript.type = 'application/ld+json';
                document.head.appendChild(schemaScript);
            }
            schemaScript.textContent = JSON.stringify(schema);
        } else if (schemaScript) {
            schemaScript.remove();
        }

        return () => {
            const currentSchema = document.getElementById('jsonld-route-schema');
            if (currentSchema) {
                currentSchema.remove();
            }
        };
    }, [title, description, fullCanonical, ogImage, ogType, robotsContent, schema]);

    return null;
};

export default SEOHead;
