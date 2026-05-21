import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A highly-optimized, zero-dependency, and extremely safe markdown renderer
 * crafted specifically to fit the AURSA premium, high-luxury aesthetic.
 */
export const MarkdownRenderer = ({ content }) => {
    if (!content) return null;

    // Split content by double newlines to isolate paragraphs, headings, blockquotes, lists
    const blocks = content.split(/\n\s*\n/);

    return (
        <div className="font-sans text-[#D1D5DB] text-left">
            {blocks.map((block, idx) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                // 1. Headings: #, ##, ###
                if (trimmed.startsWith('#')) {
                    const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
                    if (match) {
                        const level = match[1].length;
                        const text = match[2];
                        if (level === 1) {
                            return (
                                <h1 key={idx} className="font-serif text-[#FFFFFF] text-3xl md:text-4xl font-normal tracking-wide mt-16 mb-6 leading-tight pt-8">
                                    {renderInlineMarkdown(text)}
                                </h1>
                            );
                        } else if (level === 2) {
                            return (
                                <div key={idx} className="w-full">
                                    {idx > 0 && (
                                        <div className="w-24 h-[1px] bg-gradient-to-r from-[#D88A3D]/30 to-transparent my-16 md:my-20" />
                                    )}
                                    <h2 className="font-serif text-[#FFFFFF] text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide mt-12 md:mt-16 mb-6 leading-tight">
                                        {renderInlineMarkdown(text)}
                                    </h2>
                                </div>
                            );
                        } else {
                            return (
                                <h3 key={idx} className="font-serif text-[#FFFFFF] text-xl md:text-2xl font-normal tracking-wide mt-12 mb-4 pt-4 leading-snug">
                                    {renderInlineMarkdown(text)}
                                </h3>
                            );
                        }
                    }
                }

                // 2. Blockquotes: > quote
                if (trimmed.startsWith('>')) {
                    const lines = trimmed.split('\n').map(line => line.replace(/^>\s?/, ''));
                    return (
                        <blockquote key={idx} className="border-l-2 border-[#D88A3D] pl-6 md:pl-8 italic text-[#E5E7EB] my-12 md:my-14 font-serif text-lg md:text-xl lg:text-2xl leading-relaxed py-4 pr-6 bg-white/[0.01] rounded-r-2xl border-y border-r border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#D88A3D]" />
                            {lines.map((line, lIdx) => <p key={lIdx} className="whitespace-pre-line my-1">{renderInlineMarkdown(line)}</p>)}
                        </blockquote>
                    );
                }

                // 3. Unordered Lists: - item or * item
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    const items = trimmed.split('\n').map(line => line.replace(/^[-*]\s+/, ''));
                    return (
                        <ul key={idx} className="list-disc pl-6 space-y-3.5 text-[#D1D5DB] my-6 md:my-8 text-base md:text-[18px] lg:text-[19px] font-light">
                            {items.map((item, iIdx) => (
                                <li key={iIdx} className="font-sans pl-2 leading-[1.8]">
                                    {renderInlineMarkdown(item)}
                                </li>
                            ))}
                        </ul>
                    );
                }

                // 4. Ordered Lists: 1. item
                if (/^\d+\.\s+/.test(trimmed)) {
                    const items = trimmed.split('\n').map(line => line.replace(/^\d+\.\s+/, ''));
                    return (
                        <ol key={idx} className="list-decimal pl-6 space-y-3.5 text-[#D1D5DB] my-6 md:my-8 text-base md:text-[18px] lg:text-[19px] font-light">
                            {items.map((item, iIdx) => (
                                <li key={iIdx} className="font-sans pl-2 leading-[1.8]">
                                    {renderInlineMarkdown(item)}
                                </li>
                            ))}
                        </ol>
                    );
                }

                // 5. Images: ![alt](url)
                if (trimmed.startsWith('![')) {
                    const match = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                    if (match) {
                        return (
                            <div key={idx} className="w-full rounded-3xl overflow-hidden my-10 md:my-14 border border-white/5 relative group shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#D88A3D]/20">
                                <img src={match[2]} alt={match[1]} className="w-full h-auto object-cover opacity-90 group-hover:opacity-95 group-hover:scale-[1.01] transition-all duration-700 ease-out" />
                                {match[1] && (
                                    <div className="bg-[#16161C]/90 px-6 py-4 text-xs md:text-sm text-[#A1A1AA] text-center italic border-t border-white/5 tracking-wide font-sans">
                                        {match[1]}
                                    </div>
                                )}
                            </div>
                        );
                    }
                }

                // 6. Default: Paragraph
                return (
                    <p key={idx} className="text-left font-sans text-base md:text-[18px] lg:text-[19px] font-light leading-[1.9] text-[#D1D5DB] whitespace-pre-line my-6 md:my-8 tracking-wide font-sans">
                        {renderInlineMarkdown(trimmed)}
                    </p>
                );
            })}
        </div>
    );
};

// Inline parser for bold (**text**), italics (*text* or _text_), links ([text](url))
function renderInlineMarkdown(text) {
    if (!text) return '';
    
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Parse bold segments
    while ((match = boldRegex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) {
            parts.push(...parseLinksAndItalics(before));
        }
        parts.push(<strong key={match.index} className="font-bold text-white">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
    }
    
    const remaining = text.slice(lastIndex);
    if (remaining) {
        parts.push(...parseLinksAndItalics(remaining));
    }
    
    return parts.length > 0 ? parts : text;
}

function parseLinksAndItalics(text) {
    const parts = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lastIndex = 0;
    
    while ((match = linkRegex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) {
            parts.push(...parseItalics(before));
        }
        
        const href = match[2];
        const isInternal = href.startsWith('/') || href.startsWith('#') || !href.startsWith('http');
        
        if (isInternal) {
            let toPath = href;
            if (toPath.startsWith('#')) {
                toPath = toPath.slice(1);
            }
            parts.push(
                <Link 
                    key={match.index} 
                    to={toPath}
                    className="text-[#D88A3D] hover:text-[#F0B67F] hover:underline transition-colors duration-150 font-medium"
                >
                    {match[1]}
                </Link>
            );
        } else {
            parts.push(
                <a 
                    key={match.index} 
                    href={href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D88A3D] hover:text-[#F0B67F] hover:underline transition-colors duration-150 font-medium"
                >
                    {match[1]}
                </a>
            );
        }
        lastIndex = linkRegex.lastIndex;
    }
    
    const remaining = text.slice(lastIndex);
    if (remaining) {
        parts.push(...parseItalics(remaining));
    }
    
    return parts;
}

function parseItalics(text) {
    const parts = [];
    const italicRegex = /\*([^*]+)\*/g;
    let match;
    let lastIndex = 0;
    
    while ((match = italicRegex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) {
            parts.push(before);
        }
        parts.push(<em key={match.index} className="italic text-[#F5F5F7]">{match[1]}</em>);
        lastIndex = italicRegex.lastIndex;
    }
    
    const remaining = text.slice(lastIndex);
    if (remaining) {
        parts.push(remaining);
    }
    
    return parts;
}

export default MarkdownRenderer;
