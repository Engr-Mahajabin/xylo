"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4 sm:p-6 lg:p-10 selection:bg-yellow-500 selection:text-black">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-[#09090b] border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[620px]">
        {/* LEFT SIDE: Hero Graphic & Branding Banner */}
        <div className="relative md:w-5/12 bg-gradient-to-br from-yellow-500/20 via-zinc-900 to-black p-8 sm:p-10 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800/80">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Top Logo Image */}
          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <Image
                src="/xylo logo.svg"
                alt="Xylo Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center Title & Details */}
          <div className="relative z-10 my-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-[family-name:var(--font-black-ops)] text-white leading-snug uppercase">
              Welcome <br />
              <span className="text-yellow-500">Back again</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Access your workspace to control and monitor high-performance
              systems.
            </p>
          </div>

          {/* Bottom Badge */}
          <div className="relative z-10 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Secure Authentication
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Sign In Form */}
        <div className="md:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-[#09090b]">
          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Header */}
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-wide uppercase font-[family-name:var(--font-black-ops)] text-white">
                Admin <span className="text-yellow-500">Login</span>
              </h3>
              <p className="text-zinc-400 text-sm">
                Enter your registered credentials to enter dashboard
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1.5 tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@xylo.com"
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-400 mb-1.5 tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition text-sm"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 mt-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl uppercase tracking-wider text-sm transition duration-200 transform active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-yellow-500/10"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <div className="pt-2 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-yellow-500 hover:underline font-medium transition"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
