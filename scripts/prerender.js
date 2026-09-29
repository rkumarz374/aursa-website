import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
    console.error('prerender.js: dist/index.html not found. Run vite build first.');
    process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

// Parse blog posts from src/content/blog/*.md
const blogDir = path.join(rootDir, 'src', 'content', 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

function parseFrontmatter(fileContent) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = fileContent.match(frontmatterRegex);
    if (!match) return { metadata: {}, content: fileContent };
    const yamlBlock = match[1];
    const content = match[2];
    const metadata = {};
    yamlBlock.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (value === 'true') value = true;
            if (value === 'false') value = false;
            metadata[key] = value;
        }
    });
    return { metadata, content };
}

const blogPosts = blogFiles.map(file => {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const { metadata, content } = parseFrontmatter(raw);
    return { ...metadata, content };
}).filter(p => !p.draft);

const HOMEPAGE_SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://aursa.app/#organization',
            'name': 'AURSA',
            'url': 'https://aursa.app/',
            'logo': 'https://aursa.app/aursa-logo.svg',
            'sameAs': [
                'https://www.instagram.com/aursa.ai/',
                'https://www.linkedin.com/company/aursa',
                'https://x.com/AursaAI'
            ]
        },
        {
            '@type': 'WebSite',
            '@id': 'https://aursa.app/#website',
            'url': 'https://aursa.app/',
            'name': 'AURSA',
            'publisher': {
                '@id': 'https://aursa.app/#organization'
            }
        }
    ]
};

// Defined marketing routes to prerender
const routes = [
    {
        path: '/',
        title: 'AURSA — Personal Style & Fashion Retail Intelligence',
        description: 'AURSA helps people make more confident outfit decisions — at home through Personal Style Intelligence and in-store through Fashion Retail Intelligence.',
        canonical: 'https://aursa.app/',
        sitemap: true,
        schema: HOMEPAGE_SCHEMA,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>AURSA</p>
                <h1>One mirror. Two moments.</h1>
                <p>AURSA helps you understand what works when you're standing in front of the mirror and deciding.</p>
                <div>
                    <div>
                        <p>IN STORE</p>
                        <h2>Should I buy this?</h2>
                        <p>The trial-room moment when a shopper decides whether a look belongs in their wardrobe.</p>
                        <a href="#retail">Explore AURSA Retail</a>
                    </div>
                    <div>
                        <p>BEFORE STEPPING OUT</p>
                        <h2>Should I wear this?</h2>
                        <p>The personal mirror moment before heading out to work, dinner, or an event.</p>
                        <a href="#personal">Explore AURSA Personal</a>
                    </div>
                </div>
                <p>Brand Promise: Wear with Confidence.</p>
            </section>
            <section>
                <p>DIFFERENT PLACES. SAME PAUSE.</p>
                <h2>You already chose the outfit.</h2>
                <p>You liked it enough to try it. You liked it enough to put it on. Now you're wondering if it actually works.</p>
            </section>
            <section id="retail">
                <h2>Two Decision Journeys</h2>
                <div>
                    <h3>AURSA RETAIL — The Trial-Room Journey</h3>
                    <ol>
                        <li>TRY — Shopper selects garments and steps into the fitting room.</li>
                        <li>PAUSE — Standing in front of the mirror, uncertainty creates hesitation.</li>
                        <li>SECOND OPINION — AURSA provides private visual feedback on fit and balance.</li>
                        <li>DECIDE — Shopper steps out with purchase confidence.</li>
                    </ol>
                    <p>"The decision happens while the shopper is still in front of the mirror."</p>
                </div>
                <div id="personal">
                    <h3>AURSA PERSONAL — The Personal Mirror Journey</h3>
                    <ol>
                        <li>GET DRESSED — Select an outfit for the day, work, dinner, or an event.</li>
                        <li>MIRROR MOMENT — Look in the mirror and check contrast and silhouette.</li>
                        <li>SECOND OPINION — Get real-time feedback on visual balance and harmony.</li>
                        <li>STEP OUT — Head out feeling completely confident in your look.</li>
                    </ol>
                    <p>"A second opinion for the moment before you leave."</p>
                </div>
            </section>
            <section>
                <p>PRIVATE BY DESIGN</p>
                <h2>Your outfit photo isn't stored.</h2>
                <p>AURSA uses the image solely to understand the look and deliver real-time analysis. Your photo stays private.</p>
                <a href="/privacy">Read Privacy</a>
            </section>
            <section>
                <h2>Where are you meeting AURSA?</h2>
                <div>
                    <h3>FOR RETAIL</h3>
                    <h4>Make the trial-room decision more confident.</h4>
                    <p>Bring AURSA into the fitting room when shoppers are deciding whether a look actually works for them.</p>
                    <a href="/contact">Talk to AURSA</a>
                </div>
                <div>
                    <h3>FOR YOU</h3>
                    <h4>Know what works before you step out.</h4>
                    <p>Get a private second opinion on your outfit when you're standing in front of the mirror and unsure.</p>
                    <a href="https://apps.apple.com/in/app/aursa/id6761254001">Download on the App Store</a>
                    <a href="https://play.google.com/store/apps/details?id=com.aursa.app">Get it on Google Play</a>
                </div>
                <p>Wear with Confidence.</p>
            </section>
        </main>`
    },
    {
        path: '/retail',
        title: 'Fashion Retail Intelligence for the Fitting-Room Decision | AURSA',
        description: 'AURSA helps fashion retailers support shoppers at the fitting-room decision moment with a private, personalized second opinion — without requiring a smart mirror.',
        canonical: 'https://aursa.app/retail',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>FASHION RETAIL INTELLIGENCE</p>
                <h1>Make the fitting-room decision more confident.</h1>
                <p>AURSA gives shoppers a private second opinion at the moment they're deciding whether a look actually works for them — while helping retailers better understand that decision moment.</p>
                <a href="#retail-pilot">Request a Retail Pilot</a>
                <a href="#trial-room-experience">See How It Works</a>
                <p>No smart mirror required. Works through the shopper's phone.</p>
            </section>
            <section>
                <p>THE DECISION MOMENT</p>
                <h2>They liked it enough to try it.</h2>
                <p>Now they have to decide.</p>
                <p>The shopper has already discovered the garment, selected their size, and stepped into the fitting room. The question is no longer "What should I browse?" It is "Does this look actually work for me?"</p>
            </section>
            <section id="how-it-works">
                <h2>AURSA starts after discovery.</h2>
                <p>DISCOVER -> RECOMMEND -> TRY -> DECIDE [AURSA HERE] -> BUY</p>
                <p>AURSA enters when the shopper is already considering the look and wants confidence in the decision.</p>
            </section>
            <section id="trial-room-experience">
                <p>THE TRIAL-ROOM MOMENT</p>
                <h2>See where AURSA enters the decision.</h2>
                <p>An illustrative look at the moment between trying something on and deciding what to do next.</p>
                <p>Illustrative experience — no live shopper data.</p>
                <ol>
                    <li>01 — TRY: You liked it enough to try it. The shopper is already wearing the look. Discovery is over.</li>
                    <li>02 — PAUSE: Does this actually work for me? This is the uncertainty AURSA is built around.</li>
                    <li>03 — OPEN AURSA: A private second opinion, on the shopper's phone. No smart mirror required.</li>
                    <li>04 — SECOND OPINION: Illustrative AURSA response — "This look feels considered and cohesive. If you want it to feel a little sharper, try adding slightly more structure."</li>
                    <li>05 — DECIDE: Clarity, not pressure. The shopper can keep the look, adjust it, or decide it isn't right for them — with more confidence in the decision.</li>
                </ol>
                <div>
                    <h3>What could a pilot help a retailer learn?</h3>
                    <ul>
                        <li>Where shoppers pause</li>
                        <li>Which styling questions recur</li>
                        <li>Which recommendations shoppers engage with</li>
                        <li>Which shopping contexts appear most often</li>
                        <li>Where add-on suggestions become relevant</li>
                    </ul>
                </div>
            </section>
            <section>
                <p>FOR THE SHOPPER</p>
                <h2>A private second opinion, right when they need it.</h2>
                <p>AURSA helps the shopper understand whether the look feels right — standing in front of the mirror when hesitation occurs. The goal is clarity, not pressure.</p>
            </section>
            <section>
                <p>FOR THE RETAILER</p>
                <h2>Understand more than what sold.</h2>
                <p>AURSA is designed to help retailers understand shopper consideration, decision engagement, styling interest, and recommendation interaction at the fitting-room decision moment.</p>
            </section>
            <section>
                <p>START WITH WHAT THE SHOPPER ALREADY HAS</p>
                <h2>No smart mirror required.</h2>
                <p>AURSA is designed to work through the shopper's own phone, so retailers can explore the experience without rebuilding the fitting room.</p>
                <p>FITTING ROOM -> SHOPPER'S PHONE -> AURSA</p>
            </section>
            <section>
                <p>PRIVATE BY DESIGN</p>
                <h2>The outfit photo isn't stored.</h2>
                <p>AURSA uses the image to deliver the experience without keeping the shopper's outfit photo.</p>
                <a href="/privacy">Read Privacy</a>
            </section>
            <section id="retail-pilot">
                <p>START SMALL</p>
                <h2>Explore AURSA in a real retail environment.</h2>
                <p>We're speaking with fashion retailers about focused pilots designed to test AURSA at the fitting-room decision moment.</p>
                <a href="/contact?interest=retail-pilot">Request a Retail Pilot</a>
            </section>
        </main>`
    },
    {
        path: '/app',
        title: 'AURSA — AI Outfit Checker & Personal Style App',
        description: "Use AURSA as a private AI outfit checker and personal style companion when you're standing in front of the mirror and wondering whether a look works for you.",
        canonical: 'https://aursa.app/app',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>YOUR AI STYLE MIRROR</p>
                <h1>Does this actually work for me?</h1>
                <p>AURSA gives you a private second opinion on your outfit when you're standing in front of the mirror and unsure.</p>
                <a href="/mirror">Try AURSA</a>
                <a href="#download-aursa">Download AURSA</a>
                <p>Wear with Confidence.</p>
            </section>
            <section>
                <p>THE MIRROR MOMENT</p>
                <h2>You're already dressed.</h2>
                <p>Something still feels uncertain.</p>
                <p>You chose the outfit. You put it on. You looked in the mirror. Now something makes you pause. The question is no longer "What clothes exist?" It is "Does this look actually work for me?" AURSA works as a private AI outfit checker for that exact moment of hesitation before you step out.</p>
            </section>
            <section>
                <p>A SECOND OPINION</p>
                <h2>Understand the look before you step out.</h2>
                <p>GET DRESSED -> LOOK IN THE MIRROR -> CHECK WITH AURSA -> UNDERSTAND WHAT WORKS -> STEP OUT</p>
            </section>
            <section>
                <p>MADE FOR YOU</p>
                <h2>Because the same outfit doesn't work the same way for everyone.</h2>
                <p>AURSA is designed to help you understand what works for you — not simply what is trending across social media.</p>
            </section>
            <section>
                <p>PERSONAL STYLE INTELLIGENCE</p>
                <h2>Your style should become clearer over time.</h2>
                <p>AURSA is not only about checking a single outfit. Over time, Personal Style Intelligence helps you recognize your recurring preferences, visual balance, and personal style direction. The goal isn't to tell you what to wear — it's to help you understand what works for you.</p>
            </section>
            <section>
                <p>PRIVATE BY DESIGN</p>
                <h2>Your outfit photo isn't stored.</h2>
                <p>AURSA uses the image to understand the look and deliver the experience without keeping your outfit photo.</p>
                <a href="/privacy">Read Privacy</a>
            </section>
            <section id="download-aursa">
                <p>WEAR WITH CONFIDENCE</p>
                <h2>Take AURSA to your mirror.</h2>
                <p>Available on iPhone and Android.</p>
                <a href="https://apps.apple.com/in/app/aursa/id6761254001">Download on the App Store</a>
                <a href="https://play.google.com/store/apps/details?id=com.aursa.app">Get it on Google Play</a>
            </section>
        </main>`
    },
    {
        path: '/personal-style-intelligence',
        title: 'What Is Personal Style Intelligence? | AURSA',
        description: 'Explore Personal Style Intelligence: how preferences, context, recurring choices and outfit decisions can help you better understand what works for you.',
        canonical: 'https://aursa.app/personal-style-intelligence',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>PERSONAL STYLE INTELLIGENCE</p>
                <h1>Your style is more than what looks good in general.</h1>
                <p>Personal Style Intelligence is about understanding what works for you — your preferences, context, choices, and the way you want to show up.</p>
                <a href="/app">Explore AURSA Personal</a>
                <a href="/mirror">Try AURSA</a>
            </section>
            <section>
                <p>BEYOND TRENDS</p>
                <h2>What's fashionable isn't automatically what's right for you.</h2>
                <p>We use Personal Style Intelligence to describe moving away from copying generic trend feeds toward recognizing your own visual balance and preferences.</p>
            </section>
            <section>
                <p>THE MIRROR MOMENT</p>
                <h2>Personal style becomes visible when you have to decide.</h2>
                <p>That exact moment of pause — when you wonder "Does this actually work for me?" — is where personal style decisions take place.</p>
                <a href="/app">See how AURSA approaches the Mirror Moment</a>
            </section>
            <section>
                <p>CONTEXT MATTERS</p>
                <h2>The same outfit can feel different in a different moment.</h2>
                <p>Style decisions depend on occasion, desired impression, and personal comfort.</p>
            </section>
            <section>
                <p>FROM ONE LOOK TO A PATTERN</p>
                <h2>One outfit can be feedback. Repeated choices can become understanding.</h2>
                <p>DISCOVERY -> FEEDBACK -> STYLE INTELLIGENCE</p>
            </section>
            <section>
                <p>STYLE IDENTITY</p>
                <h2>Style identity is the pattern behind the choices.</h2>
                <p>Style identity is a way of recognizing the recurring preferences, tendencies, and visual proportions that make a person's style feel uniquely like them.</p>
            </section>
            <section>
                <p>AURSA PERSONAL</p>
                <h2>The goal isn't to tell you what to wear. It's to help you understand what works for you.</h2>
                <a href="/app">Explore AURSA Personal</a>
            </section>
        </main>`
    },
    {
        path: '/smart-fitting-room',
        title: 'Smart Fitting Rooms Without New Hardware | AURSA',
        description: 'Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.',
        canonical: 'https://aursa.app/smart-fitting-room',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>RETAIL TECHNOLOGY EVALUATION</p>
                <h1>Make the fitting room smarter — without making the mirror smart.</h1>
                <p>Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.</p>
            </section>
            <section>
                <h2>What is a smart fitting room?</h2>
                <p>A smart fitting room refers to physical retail fitting-room spaces enhanced with technology to support shopper decisions, streamline associate assistance, or provide interactive visual and styling guidance.</p>
            </section>
            <section>
                <h2>Does a smart fitting room need a smart mirror?</h2>
                <p>No. The value of a smart fitting room comes from decision support and intelligence, not physical screen hardware.</p>
                <a href="/retail">Explore AURSA Retail</a>
            </section>
        </main>`
    },
    {
        path: '/fitting-room-intelligence',
        title: 'What Is Fitting Room Intelligence? | AURSA',
        description: "Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.",
        canonical: 'https://aursa.app/fitting-room-intelligence',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>CATEGORY CONCEPT & DEFINITION</p>
                <h1>What happens between try-on and purchase?</h1>
                <p>Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.</p>
            </section>
            <section>
                <h2>What is fitting-room intelligence?</h2>
                <p>We use fitting-room intelligence to describe understanding shopper decision engagement, styling questions, and try-on considerations at the moment of choice.</p>
                <a href="/retail">See AURSA Retail</a>
            </section>
        </main>`
    },
    {
        path: '/fitting-room-analytics',
        title: 'Fitting Room Analytics & Shopper Decision Insights | AURSA',
        description: 'Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.',
        canonical: 'https://aursa.app/fitting-room-analytics',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>MEASUREMENT & SIGNALS</p>
                <h1>Purchase data tells you what sold. What happened before it?</h1>
                <p>Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.</p>
            </section>
            <section>
                <h2>What is fitting room analytics?</h2>
                <p>Fitting room analytics refers to measuring try-on activity, decision engagement, and styling interactions inside physical fitting rooms.</p>
                <a href="/retail">Explore AURSA Retail</a>
            </section>
        </main>`
    },
    {
        path: '/in-store-personalization',
        title: 'In-Store Personalization for Fashion Retail | AURSA',
        description: 'Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.',
        canonical: 'https://aursa.app/in-store-personalization',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>PERSONALIZATION & EXPERIENCE</p>
                <h1>Personalization shouldn't stop when the shopper enters the store.</h1>
                <p>Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.</p>
            </section>
            <section>
                <h2>The same answer shouldn't work for every shopper.</h2>
                <p>AURSA is designed around individual clarity — helping the shopper understand what works for them rather than pushing general fashion trends.</p>
                <a href="/retail">Explore AURSA Retail</a>
            </section>
        </main>`
    },
    {
        path: '/about',
        title: 'About — AURSA',
        description: "Understand AURSA's mission: solving outfit uncertainty before you step out so you can wear with confidence.",
        canonical: 'https://aursa.app/about',
        sitemap: true,
        htmlContent: `<main class="prerendered-content"><section><h1>About AURSA — Style is personal</h1><p>You shouldn't have to second-guess what you wear. What you wear can affect how you feel, how you see yourself, and how you show up. AURSA exists to help you understand that relationship — and ultimately, wear with confidence.</p></section></main>`
    },
    {
        path: '/contact',
        title: 'Contact — AURSA',
        description: 'Get in touch with AURSA for questions, feedback, partnerships, or retail pilot inquiries.',
        canonical: 'https://aursa.app/contact',
        sitemap: true,
        htmlContent: `<main class="prerendered-content"><section><h1>Contact AURSA — Let's Talk</h1><p>For questions, feedback, partnerships, or retail pilot inquiries, reach out to us directly at hello@aursa.app.</p></section></main>`
    },
    {
        path: '/privacy',
        title: 'Privacy Policy — AURSA',
        description: 'AURSA Privacy Policy: Read how AURSA handles data with a privacy-first approach and outfit image handling policy.',
        canonical: 'https://aursa.app/privacy',
        sitemap: true,
        htmlContent: `<main class="prerendered-content"><section><h1>Privacy Policy</h1><p>AURSA is designed as a private, personal experience. AURSA analyzes the outfit image solely to deliver the real-time experience and does not store the user's outfit photo.</p></section></main>`
    },
    {
        path: '/investors',
        title: 'Investors — AURSA',
        description: 'AURSA is building an AI-powered system that helps people understand their style, reduce uncertainty, and feel confident.',
        canonical: 'https://aursa.app/investors',
        robots: 'noindex, follow',
        sitemap: false,
        htmlContent: `<main class="prerendered-content"><section><h1>Investors — A new layer in personal style</h1><p>AURSA is building an AI-powered system that helps people understand their style, reduce uncertainty, and feel confident before stepping out.</p></section></main>`
    },
    {
        path: '/insights',
        title: 'AURSA Insights — Retail & Personal Style Intelligence',
        description: 'Explore AURSA Insights: original thinking on retail decision intelligence, fitting-room decisions, personal style intelligence, outfit confidence and the Mirror Moment.',
        canonical: 'https://aursa.app/insights',
        sitemap: true,
        htmlContent: `<main class="prerendered-content">
            <section>
                <p>AURSA INSIGHTS</p>
                <h1>Ideas for the moments where style decisions happen.</h1>
                <p>Original thinking from AURSA on retail decision intelligence and personal style intelligence.</p>
            </section>
            <section id="retail-intelligence">
                <h2>Retail Intelligence</h2>
                <p>Understanding what happens between trying something on and deciding what to do next. Decision support, fitting-room analytics, and in-store personalization.</p>
                <article>
                    <span>GUIDE</span>
                    <h3><a href="/smart-fitting-room">Smart Fitting Rooms Without New Hardware</a></h3>
                    <p>Learn what smart fitting rooms are, how traditional fitting-room technology works, and how shopper-phone experiences can add intelligence without requiring a smart mirror.</p>
                </article>
                <article>
                    <span>GUIDE</span>
                    <h3><a href="/fitting-room-intelligence">What Is Fitting Room Intelligence?</a></h3>
                    <p>Explore fitting room intelligence: understanding the shopper's decision moment between trying an item on and deciding what to do next.</p>
                </article>
                <article>
                    <span>GUIDE</span>
                    <h3><a href="/fitting-room-analytics">Fitting Room Analytics & Shopper Decision Insights</a></h3>
                    <p>Understand fitting room analytics, the gap between try-on and purchase data, and the types of decision signals retailers may explore through fitting-room experiences.</p>
                </article>
                <article>
                    <span>GUIDE</span>
                    <h3><a href="/in-store-personalization">In-Store Personalization for Fashion Retail</a></h3>
                    <p>Explore in-store personalization for fashion retail and how personal decision support can extend personalization into the physical fitting-room experience.</p>
                </article>
                <a href="/retail">Explore AURSA Retail</a>
            </section>
            <section id="personal-style-intelligence">
                <h2>Personal Style Intelligence</h2>
                <p>Understanding what works for you — beyond trends and one-size-fits-all advice. Mirror Moment, style identity, outfit confidence, and recurring choices.</p>
                <article>
                    <span>GUIDE</span>
                    <h3><a href="/personal-style-intelligence">What Is Personal Style Intelligence?</a></h3>
                    <p>Explore Personal Style Intelligence: how preferences, context, recurring choices and outfit decisions can help you better understand what works for you.</p>
                </article>
                ${blogPosts.map(post => `
                <article>
                    <span>ARTICLE</span>
                    <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
                    <p>${post.excerpt || ''}</p>
                    <time>${post.date || ''}</time>
                </article>
                `).join('')}
            </section>
        </main>`
    }
];

// Array to track sitemap entries
const sitemapEntries = [];

// Add static indexable routes to sitemap
routes.filter(r => r.sitemap).forEach(r => {
    sitemapEntries.push({
        url: r.canonical,
        lastmod: null
    });
});

// Add article routes dynamically
blogPosts.forEach(post => {
    const articleTitle = `AURSA Insights — ${post.title}`;
    const articleDesc = post.metaDescription || post.excerpt || '';
    let articleCanonical = post.canonicalUrl || `https://aursa.app/blog/${post.slug}`;
    articleCanonical = articleCanonical.replace(/https?:\/\/(www\.)?aursa\.(com|app)\/#\//g, 'https://aursa.app/');
    if (!articleCanonical.startsWith('http')) {
        articleCanonical = `https://aursa.app${articleCanonical.startsWith('/') ? articleCanonical : `/${articleCanonical}`}`;
    }
    const articleHtml = `<main class="prerendered-content"><article><h1>${post.title}</h1><p>${post.excerpt || ''}</p></article></main>`;

    // Format lastmod if date exists
    let lastmod = null;
    const rawDate = post.updatedAt || post.publishedAt || post.date;
    if (rawDate) {
        try {
            const d = new Date(rawDate);
            if (!isNaN(d.getTime())) {
                lastmod = d.toISOString().split('T')[0];
            }
        } catch (e) { /* silent fail */ }
    }

    let datePublished = new Date().toISOString();
    let dateModified = null;
    if (rawDate) {
        try {
            const d = new Date(rawDate);
            if (!isNaN(d.getTime())) {
                datePublished = d.toISOString();
            }
        } catch (e) { /* silent fail */ }
    }
    if (post.updatedAt) {
        try {
            const d = new Date(post.updatedAt);
            if (!isNaN(d.getTime())) {
                dateModified = d.toISOString();
            }
        } catch (e) { /* silent fail */ }
    }

    const blogPostingObj = {
        "@type": "BlogPosting",
        "@id": `${articleCanonical}#article`,
        "url": articleCanonical,
        "headline": post.title,
        "description": articleDesc,
        "image": post.ogImage || post.coverImage || '',
        "datePublished": datePublished,
        "author": post.author && post.author !== 'AURSA' ? {
            "@type": "Person",
            "name": post.author
        } : {
            "@type": "Organization",
            "@id": "https://aursa.app/#organization",
            "name": "AURSA"
        },
        "publisher": {
            "@type": "Organization",
            "@id": "https://aursa.app/#organization",
            "name": "AURSA"
        },
        "isPartOf": {
            "@type": "WebSite",
            "@id": "https://aursa.app/#website"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleCanonical
        },
        "articleSection": "Personal Style Intelligence"
    };

    if (dateModified) {
        blogPostingObj.dateModified = dateModified;
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://aursa.app/#organization",
                "name": "AURSA",
                "url": "https://aursa.app/",
                "logo": "https://aursa.app/aursa-logo.svg",
                "sameAs": [
                    "https://www.instagram.com/aursa.ai/",
                    "https://www.linkedin.com/company/aursa",
                    "https://x.com/AursaAI"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://aursa.app/#website",
                "url": "https://aursa.app/",
                "name": "AURSA",
                "publisher": {
                    "@id": "https://aursa.app/#organization"
                }
            },
            blogPostingObj,
            {
                "@type": "BreadcrumbList",
                "@id": `${articleCanonical}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "AURSA",
                        "item": "https://aursa.app/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Insights",
                        "item": "https://aursa.app/insights"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": post.title,
                        "item": articleCanonical
                    }
                ]
            }
        ]
    };

    // Add canonical blog route to sitemap
    sitemapEntries.push({
        url: `https://aursa.app/blog/${post.slug}`,
        lastmod: lastmod
    });

    routes.push({
        path: `/blog/${post.slug}`,
        title: articleTitle,
        description: articleDesc,
        canonical: articleCanonical,
        ogImage: post.ogImage || post.coverImage || '',
        ogType: 'article',
        schema: articleSchema,
        htmlContent: articleHtml
    });
});

console.log(`prerender.js: Generating static HTML for ${routes.length} routes...`);

routes.forEach(route => {
    let html = templateHtml;

    // 1. Title
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${route.title}</title>`);

    // 2. Meta description
    if (html.includes('<meta name="description"')) {
        html = html.replace(/<meta name="description"[^>]*>/gi, `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`);
    } else {
        html = html.replace('</head>', `  <meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />\n</head>`);
    }

    // 3. Canonical tag
    const canonicalTag = `<link rel="canonical" href="${route.canonical}" />`;
    if (html.includes('<link rel="canonical"')) {
        html = html.replace(/<link rel="canonical"[^>]*>/gi, canonicalTag);
    } else {
        html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
    }

    // 4. Open Graph tags
    const ogTitle = `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`;
    const ogDesc = `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`;
    const ogUrl = `<meta property="og:url" content="${route.canonical}" />`;
    const ogType = `<meta property="og:type" content="${route.ogType || 'website'}" />`;

    html = html.replace(/<meta property="og:title"[^>]*>/gi, ogTitle);
    html = html.replace(/<meta property="og:description"[^>]*>/gi, ogDesc);
    html = html.replace(/<meta property="og:url"[^>]*>/gi, ogUrl);
    html = html.replace(/<meta property="og:type"[^>]*>/gi, ogType);

    if (route.ogImage) {
        const ogImgTag = `<meta property="og:image" content="${route.ogImage}" />`;
        if (html.includes('<meta property="og:image"')) {
            html = html.replace(/<meta property="og:image"[^>]*>/gi, ogImgTag);
        } else {
            html = html.replace('</head>', `  ${ogImgTag}\n</head>`);
        }
    }

    // 5. Meta robots tag
    const robotsPolicy = route.robots || 'index, follow';
    const robotsTag = `<meta name="robots" content="${robotsPolicy}" />`;
    if (html.includes('<meta name="robots"')) {
        html = html.replace(/<meta name="robots"[^>]*>/gi, robotsTag);
    } else {
        html = html.replace('</head>', `  ${robotsTag}\n</head>`);
    }

    // 6. JSON-LD schema script
    if (route.schema) {
        const schemaTag = `<script id="jsonld-route-schema" type="application/ld+json">${JSON.stringify(route.schema)}</script>`;
        html = html.replace('</head>', `  ${schemaTag}\n</head>`);
    }

    // 7. Inject Pre-rendered HTML inside root
    html = html.replace('<div id="root"></div>', `<div id="root">${route.htmlContent}</div>`);

    // 6. Write out static HTML file
    if (route.path === '/') {
        fs.writeFileSync(templatePath, html, 'utf8');
    } else {
        const routeSubdir = path.join(distDir, route.path.replace(/^\//, ''));
        fs.mkdirSync(routeSubdir, { recursive: true });
        fs.writeFileSync(path.join(routeSubdir, 'index.html'), html, 'utf8');
    }
});

console.log('prerender.js: Static HTML prerendering complete!');

// 7. Generate dist/sitemap.xml
console.log(`prerender.js: Generating dist/sitemap.xml with ${sitemapEntries.length} canonical URLs...`);

const xmlUrlNodes = sitemapEntries.map(entry => {
    let node = `  <url>\n    <loc>${entry.url}</loc>`;
    if (entry.lastmod) {
        node += `\n    <lastmod>${entry.lastmod}</lastmod>`;
    }
    node += `\n  </url>`;
    return node;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrlNodes}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('prerender.js: dist/sitemap.xml successfully created!');
