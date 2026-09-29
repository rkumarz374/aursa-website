/**
 * AURSA Centralized SEO Route Registry
 * Single source of truth for route indexing policies, metadata, sitemap inclusion, and canonical URLs.
 */

export const DOMAIN = 'https://aursa.app';

export const STATIC_ROUTES = [
    {
        path: '/',
        canonical: `${DOMAIN}/`,
        title: 'AURSA — Personal Style & Fashion Retail Intelligence',
        description: 'AURSA helps people make more confident outfit decisions — at home through Personal Style Intelligence and in-store through Fashion Retail Intelligence.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/retail',
        canonical: `${DOMAIN}/retail`,
        title: 'Fashion Retail Intelligence for the Fitting-Room Decision | AURSA',
        description: 'AURSA helps fashion retailers support shoppers at the fitting-room decision moment with a private, personalized second opinion — without requiring a smart mirror.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/app',
        canonical: `${DOMAIN}/app`,
        title: 'AURSA — AI Outfit Checker & Personal Style App',
        description: "Use AURSA as a private AI outfit checker and personal style companion when you're standing in front of the mirror and wondering whether a look works for you.",
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/smart-fitting-room',
        canonical: `${DOMAIN}/smart-fitting-room`,
        title: 'Smart Fitting Rooms Without New Hardware | AURSA',
        description: 'Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/fitting-room-intelligence',
        canonical: `${DOMAIN}/fitting-room-intelligence`,
        title: 'What Is Fitting Room Intelligence? | AURSA',
        description: "Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.",
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/fitting-room-analytics',
        canonical: `${DOMAIN}/fitting-room-analytics`,
        title: 'Fitting Room Analytics & Shopper Decision Insights | AURSA',
        description: 'Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/in-store-personalization',
        canonical: `${DOMAIN}/in-store-personalization`,
        title: 'In-Store Personalization for Fashion Retail | AURSA',
        description: 'Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/personal-style-intelligence',
        canonical: `${DOMAIN}/personal-style-intelligence`,
        title: 'What Is Personal Style Intelligence? | AURSA',
        description: 'Explore Personal Style Intelligence: how preferences, context, recurring choices and outfit decisions can help you better understand what works for you.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/about',
        canonical: `${DOMAIN}/about`,
        title: 'About — AURSA',
        description: "Understand AURSA's mission: solving outfit uncertainty before you step out so you can wear with confidence.",
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/contact',
        canonical: `${DOMAIN}/contact`,
        title: 'Contact — AURSA',
        description: 'Get in touch with AURSA for questions, feedback, partnerships, or retail pilot inquiries.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/privacy',
        canonical: `${DOMAIN}/privacy`,
        title: 'Privacy Policy — AURSA',
        description: 'AURSA Privacy Policy: Read how AURSA handles data with a privacy-first approach and outfit image handling policy.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/insights',
        canonical: `${DOMAIN}/insights`,
        title: 'AURSA Insights — Retail & Personal Style Intelligence',
        description: 'Explore AURSA Insights: original thinking on retail decision intelligence, fitting-room decisions, personal style intelligence, outfit confidence and the Mirror Moment.',
        indexPolicy: 'index, follow',
        sitemap: true,
        ogType: 'website'
    },
    {
        path: '/investors',
        canonical: `${DOMAIN}/investors`,
        title: 'Investors — AURSA',
        description: 'AURSA is building an AI-powered system that helps people understand their style, reduce uncertainty, and feel confident.',
        indexPolicy: 'noindex, follow',
        sitemap: false,
        ogType: 'website'
    },
    {
        path: '/mirror',
        canonical: `${DOMAIN}/mirror`,
        title: 'AI Mirror — AURSA',
        description: 'AURSA AI Mirror outfit analysis tool.',
        indexPolicy: 'noindex, follow',
        sitemap: false,
        ogType: 'website'
    }
];

export const ALIAS_ROUTES = [
    {
        path: '/privacy-policy',
        canonical: `${DOMAIN}/privacy`,
        redirect: '/privacy',
        sitemap: false
    },
    {
        path: '/journal',
        canonical: `${DOMAIN}/insights`,
        redirect: '/insights',
        sitemap: false
    },
    {
        path: '/blog',
        canonical: `${DOMAIN}/insights`,
        redirect: '/insights',
        sitemap: false
    }
];
