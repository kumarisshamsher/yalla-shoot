import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('yalla_theme');
      if (saved) return saved === 'dark';
    } catch { }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    try { localStorage.setItem('yalla_theme', dark ? 'dark' : 'light'); } catch { }
  }, [dark]);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <div className={dark ? 'dark' : ''}>
      <div dir="rtl" className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center font-tajawal transition-colors">
        <header className="relative w-full bg-gradient-to-r from-blue-700 to-blue-500 dark:from-slate-800 dark:to-slate-700 text-white py-3 text-center text-xl font-extrabold rounded-b-2xl shadow-lg tracking-wide select-none mb-3 drop-shadow-lg">
          <span className="inline-block align-middle">{import.meta.env.VITE_HEADER_ICON ?? '💸'}</span> {import.meta.env.VITE_HEADER_TITLE ?? 'يلا شوت'}
          <button
            type="button"
            onClick={() => setDark(v => !v)}
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 hover:bg-white/30 text-white px-3 py-1 text-sm shadow transition cursor-pointer"
            title={dark ? 'الوضع الفاتح' : 'الوضع الليلي'}
          >
            {dark ? '☀️' : '🌙'}
            <span className="hidden sm:inline">{dark ? 'فاتح' : 'ليلي'}</span>
          </button>
        </header>
        <main className="w-full max-w-6xl mx-auto  bg-white/90 dark:bg-slate-800/80 rounded-3xl shadow-2xl flex flex-col gap-6 items-stretch mt-2 mb-8 border border-blue-100 dark:border-slate-700 backdrop-blur-sm transition-colors">
          {import.meta.env.VITE_IFRAME_URL && (
            <iframe
              src={import.meta.env.VITE_IFRAME_URL}
              className="w-full rounded-2xl border border-blue-100 dark:border-slate-700 shadow"
              style={{ height: '93vh', minHeight: '700px' }}
              allowFullScreen
              loading="lazy"
              title="yalla-shoot"
            />
          )}
        </main>
        <footer className="w-full text-center mt-auto py-6 text-gray-500 dark:text-gray-400 text-base tracking-wide font-tajawal select-none bg-transparent">
          <span className="opacity-80">جميع الحقوق محفوظة © {new Date().getFullYear()} - <a href={import.meta.env.VITE_SEO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline">{import.meta.env.VITE_SEO_AUTHOR}</a></span>
        </footer>
      </div>
    </div>
  );
}

export default App

