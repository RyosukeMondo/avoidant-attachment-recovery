import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (path: string) =>
    pathname === path
      ? "text-accent-700 font-medium"
      : "text-stone-500 hover:text-stone-800";

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold text-accent-900 hover:text-accent-700 transition-colors"
        >
          Avoidant Attachment Recovery
        </Link>
        <button
          className="md:hidden text-stone-500 hover:text-stone-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/categories" className={linkClass("/categories")}>Categories</Link>
        </nav>
      </div>
      {open && (
        <nav className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-3 text-sm">
          <Link to="/" className="text-stone-700 hover:text-accent-700" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/categories" className="text-stone-700 hover:text-accent-700" onClick={() => setOpen(false)}>Categories</Link>
        </nav>
      )}
    </header>
  );
}
