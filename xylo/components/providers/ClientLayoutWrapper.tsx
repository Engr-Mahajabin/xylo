"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // যে পেজগুলোতে Navbar এবং Footer দেখাবেন না
  const isAuthOrDashboard =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/dashboard");

  return (
    <>
      {!isAuthOrDashboard && <Navbar />}
      {children}
      {!isAuthOrDashboard && <Footer />}
    </>
  );
}
