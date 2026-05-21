/**
 * AURSA Journal Static-Markdown Aggregator & Frontmatter Parser
 * Uses Vite's native `import.meta.glob` to import and parse all .md files.
 */

export function parseFrontmatter(fileContent) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = fileContent.match(frontmatterRegex);
    
    if (!match) {
        return { metadata: {}, content: fileContent };
    }
    
    const yamlBlock = match[1];
    const content = match[2];
    const metadata = {};
    
    yamlBlock.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            // Remove wrapping quotes if any
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

// Dynamically import all markdown files in the content folder eagerly and raw
const rawFiles = import.meta.glob('/src/content/blog/*.md', { query: '?raw', eager: true });

// Parse and format the files
export const blogPosts = Object.keys(rawFiles).map((path) => {
    const rawContent = rawFiles[path].default || rawFiles[path];
    const { metadata, content } = parseFrontmatter(rawContent);
    return {
        slug: metadata.slug,
        title: metadata.title,
        excerpt: metadata.excerpt,
        metaDescription: metadata.metaDescription || metadata.excerpt || '',
        canonicalUrl: metadata.canonicalUrl || '',
        category: metadata.category,
        readTime: metadata.readTime,
        date: metadata.date,
        featured: metadata.featured === true,
        coverImage: metadata.coverImage,
        heroImage: metadata.heroImage || metadata.coverImage || '',
        heroAlt: metadata.heroAlt || metadata.title || '',
        ogImage: metadata.ogImage || metadata.coverImage || '',
        publishedAt: metadata.publishedAt || metadata.date || '',
        updatedAt: metadata.updatedAt || metadata.date || '',
        author: metadata.author || 'AURSA',
        draft: metadata.draft === true,
        content: content.trim()
    };
}).filter(post => post.draft !== true).sort((a, b) => {
    // Sort featured posts first, then by date descending
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
});
