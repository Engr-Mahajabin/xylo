"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/dashboard" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Blogs", href: "/dashboard/blogs" },
    { name: "Testimonials", href: "/dashboard/testimonials" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row selection:bg-yellow-500 selection:text-black">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#09090b] border-r border-zinc-800/80 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <Link href="/" className="inline-block">
            <Image
              src="/xylo logo.svg"
              alt="Xylo Logo"
              width={100}
              height={35}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 mb-3">
              Management
            </p>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-yellow-500 text-black font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-800/80 mt-6 md:mt-0 space-y-3">
          <Link
            href="/"
            className="block text-xs text-zinc-400 hover:text-yellow-500 transition"
          >
            &larr; Back to Main Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full py-2.5 px-4 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#050505] p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
