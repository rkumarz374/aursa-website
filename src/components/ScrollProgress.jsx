import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  const isArticlePage = /^\/blog\/[^/]+$/.test(pathname);

  useEffect(() => {
    if (!isArticlePage) {
      setProgress(0);
      return;
    }

    const handleScroll = () => {
      const article = document.getElementById("blog-article-content");
      if (!article) {
        setProgress(0);
        return;
      }

      const rect = article.getBoundingClientRect();
      const articleHeight = rect.height;
      const articleTop = rect.top + window.scrollY;
      const viewportHeight = window.innerHeight;

      // Start counting when the top of the article text matches the top of the screen
      // End counting when the bottom of the article text matches the bottom of the screen
      const scrollStart = articleTop;
      const scrollEnd = articleTop + articleHeight - viewportHeight;
      const totalScrollable = scrollEnd - scrollStart;

      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }

      const currentScroll = window.scrollY - scrollStart;
      let scrolled = (currentScroll / totalScrollable) * 100;
      scrolled = Math.max(0, Math.min(100, scrolled));

      setProgress(scrolled);
    };

    // Calculate initial progress on mount or transition
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isArticlePage, pathname]);

  if (!isArticlePage) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#D88A3D] to-[#F0B67F] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(216,138,61,0.4)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

