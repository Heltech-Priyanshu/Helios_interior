import { useState, useEffect } from "react";

const navItems = ["Home", "Our Story", "Services", "Portfolio", "Design Process", "INSIGHTS"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-10 
        ${scrolled ? "py-4 bg-stone-950/90 backdrop-blur-lg border-b border-stone-800" : "py-7 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Brand */}
          <a href="#" className="flex flex-col gap-0.5">
            <span className="font-serif text-xl tracking-widest text-stone-100 uppercase">Heltech</span>
            <span className="text-[9px] tracking-[0.38em] text-amber-700 uppercase font-light">Interior Design Studio</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex gap-9">
            {navItems.map(item => (
              <li key={item}>
                <a href="#" className="text-[13px] tracking-[0.26em] font-bold  uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="hidden lg:block text-[10.5px] tracking-[0.28em] uppercase text-stone-100 border border-stone-600 hover:border-amber-700 hover:bg-amber-700/10 px-5 py-2.5 transition-all duration-300">
            Enquire
          </button>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-stone-100 flex flex-col gap-1.5">
            <span className={`block w-6 h-px bg-stone-100 transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-6 h-px bg-stone-100 transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-stone-100 transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-9 transition-transform duration-500
        ${open ? "translate-y-0" : "-translate-y-full"}`}>
        {navItems.map(item => (
          <a key={item} href="#" onClick={() => setOpen(false)}
            className="font-serif text-4xl font-light tracking-wide text-stone-300 hover:text-stone-100 transition-colors">
            {item}
          </a>
        ))}
        <a href="#" className="mt-4 text-[11px] tracking-[0.3em] uppercase text-amber-700 border border-amber-900/50 px-8 py-3 hover:bg-amber-700/10 transition-all">
          Enquire
        </a>
      </div>
    </>
  );
}