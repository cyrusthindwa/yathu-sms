"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Apply", href: "/apply/personal-information" },
  { label: "My applications", href: "/applications" },
  { label: "Admission offers", href: "/offers" },
];

export function NavBar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/apply")) return pathname?.startsWith("/apply") ?? false;
    return pathname === href;
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between pl-4 sm:pl-6 pr-6 sm:pr-10 sticky top-0 z-50">
      {/* Logo — pinned close to the left edge */}
      <div className="flex items-center">
        <Link
          href="/"
          className="bg-brand-orange text-white font-bold text-xl px-3 py-1.5 rounded"
        >
          MC
        </Link>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={
              isLinkActive(link.href)
                ? "text-brand-orange font-semibold"
                : "text-gray-600 hover:text-brand-orange transition-colors"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Notifications + profile */}
      <div className="flex items-center space-x-4">
        <button
          aria-label="Notifications"
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Bell className="w-5 h-5" strokeWidth={2} />
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 font-semibold flex items-center justify-center text-sm border border-gray-300 select-none">
          JD
        </div>
      </div>
    </header>
  );
}