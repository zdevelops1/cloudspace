"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "="))
        e.preventDefault();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      {/* Full-screen background */}
      <Image
        src="/images/space-bg.png"
        alt=""
        fill
        unoptimized
        priority
        className="object-cover"
        style={{ imageRendering: "-webkit-optimize-contrast" }}
      />

      {/* Navbar — 72px */}
      <nav className="relative z-30 flex h-[72px] shrink-0 items-center bg-white">
        {/* Logo + Wordmark */}
        <div className="flex items-center">
          <Image
            src="/images/cloudspace-logo.png"
            alt="Cloudspace"
            width={56}
            height={56}
            className="ml-4 object-contain"
          />
          <Image
            src="/images/cloudspace-wordmark.png"
            alt="Cloudspace"
            width={140}
            height={32}
            className="ml-1 object-contain"
          />
        </div>

        {/* Vertical Divider */}
        <div className="mx-6 h-[40px] w-px bg-black/10" />

        {/* Nav Tabs — left-aligned after divider */}
        <div className="flex h-full items-center gap-7">
          <div className="relative flex h-full items-center">
            <span className="text-[14px] font-normal text-[#1a1a2e]">
              Dashboard
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#29b6f6]" />
          </div>
          <span className="cursor-pointer text-[14px] font-normal text-black/40 transition-colors hover:text-black/70">
            Tasks
          </span>
          <span className="cursor-pointer text-[14px] font-normal text-black/40 transition-colors hover:text-black/70">
            Settings
          </span>
        </div>

        {/* Right — Bell + Time + Avatar */}
        <div className="ml-auto flex items-center gap-4 pr-3">
          {/* Notification Bell */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.04]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5.33A4 4 0 004 5.33c0 4.67-2 6-2 6h12s-2-1.33-2-6"
                stroke="#666"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.15 13.33a1.33 1.33 0 01-2.3 0"
                stroke="#666"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute -right-[1px] -top-[2px] flex h-[14px] w-[14px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#e53935]">
              <span className="text-[7px] font-bold leading-none text-white">
                3
              </span>
            </span>
          </button>

          {/* Time Display */}
          <span className="text-[13px] font-normal text-black/40">
            10:45 AM
          </span>

          {/* User Avatar */}
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#c44dff]">
            <span className="text-[15px] font-bold text-white">Z</span>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.08]" />
      </nav>

      {/* Hamburger Menu */}
      <button className="absolute left-[8px] top-[94px] z-20 flex h-[63px] w-[51px] flex-col items-center justify-center gap-[10px]">
        <span className="block h-[2.5px] w-[34px] rounded-full bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
        <span className="block h-[2.5px] w-[34px] rounded-full bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
        <span className="block h-[2.5px] w-[34px] rounded-full bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
      </button>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center">
        {/* TOOLS Button */}
        <div className="relative mt-8">
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-[60px] bg-[#b4dcff]/50 blur-[12px]" />
          {/* Button */}
          <button className="relative flex h-[77px] w-[220px] items-center justify-center overflow-hidden rounded-[40px] border-2 border-white bg-gradient-to-b from-[#e8f4ff] to-[#b8d8f8] shadow-[0_8px_32px_rgba(144,202,249,0.35)]">
            {/* Inner highlight */}
            <div className="absolute left-1/2 top-[6px] h-[16px] w-[160px] -translate-x-1/2 rounded-full bg-white/70" />
            <span className="relative text-[20px] font-bold tracking-[0.05em] text-[#1a3a6e]">
              TOOLS
            </span>
          </button>
        </div>

        {/* Orb group — vertically centered in remaining space */}
        <div className="-mt-4 flex flex-1 flex-col items-center justify-center">
          {/* Orb + Plus row */}
          <div className="flex items-center gap-4">
            {/* GOLIATH Orb */}
            <div style={{ animation: "orbFloat 4s ease-in-out infinite" }}>
              <Image
                src="/images/agent-orb.png"
                alt="GOLIATH"
                width={260}
                height={260}
                className="h-[260px] w-[260px] object-contain drop-shadow-[0_0_50px_rgba(66,165,245,0.35)]"
              />
            </div>

            {/* Add Agent (+) Button — 67px circle */}
            <button
              className="flex h-[67px] w-[67px] shrink-0 items-center justify-center rounded-full border-2 border-white/60 transition-transform hover:scale-105"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, rgba(122,174,224,0.55), rgba(42,90,153,0.55))",
              }}
            >
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <line
                  x1="12.5"
                  y1="4"
                  x2="12.5"
                  y2="21"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                />
                <line
                  x1="4"
                  y1="12.5"
                  x2="21"
                  y2="12.5"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                />
              </svg>
            </button>
          </div>

          {/* GOLIATH Label */}
          <span className="mt-4 text-[20px] font-bold tracking-[0.25em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            GOLIATH
          </span>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="relative z-20 shrink-0">
        {/* Chat Bar — 58px */}
        <div
          className="relative flex h-[58px] items-center gap-3 px-5 backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,58,110,0.72), rgba(13,32,64,0.85))",
          }}
        >
          {/* Top edge */}
          <div className="absolute left-0 right-0 top-0 h-px bg-white/[0.15]" />

          {/* Agent Selector Pill */}
          <div className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-[7px] transition-colors hover:border-white/35">
            <span className="h-[10px] w-[10px] shrink-0 rounded-full bg-[#4fc3f7]" />
            <span className="whitespace-nowrap text-[13px] font-normal text-white/90">
              Agent Alpha
            </span>
            <span className="ml-0.5 text-[11px] text-white/40">&#9662;</span>
          </div>

          {/* Attach (+) Button */}
          <button className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] transition-colors hover:border-white/40 hover:bg-white/10">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="7"
                y1="1"
                x2="7"
                y2="13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
              <line
                x1="1"
                y1="7"
                x2="13"
                y2="7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex min-w-0 flex-1 items-center rounded-full border border-white/[0.15] bg-white/[0.08] px-5 py-[8px]">
            <input
              type="text"
              placeholder="Give a command or ask your agent anything..."
              className="w-full bg-transparent text-[13px] text-white placeholder-white/35 outline-none"
            />
          </div>

          {/* Send Button */}
          <button
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
            }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="white">
              <path d="M0 12L14 6L0 0V4.67L10 6L0 7.33V12Z" />
            </svg>
          </button>

          {/* Mic Button */}
          <button className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] transition-colors hover:border-white/40 hover:bg-white/10">
            <svg width="12" height="17" viewBox="0 0 12 17" fill="none">
              <rect
                x="3"
                y="0.5"
                width="6"
                height="10"
                rx="3"
                stroke="white"
                strokeWidth="1.8"
                strokeOpacity="0.85"
              />
              <path
                d="M0.5 8V9a5.5 5.5 0 0011 0V8"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
              <line
                x1="6"
                y1="14"
                x2="6"
                y2="16"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
              <line
                x1="3.5"
                y1="16"
                x2="8.5"
                y2="16"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
            </svg>
          </button>
        </div>

        {/* Bottom Toolbar — 54px */}
        <div
          className="relative flex h-[54px] items-center justify-center gap-16 backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,32,64,0.85), rgba(9,24,48,0.92))",
          }}
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-white/[0.12]" />

          <button className="flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white">
            <span className="text-[14px]">&#128193;</span>
            Projects
          </button>

          <button className="flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white">
            <span className="text-[14px]">&#128197;</span>
            Calendar
          </button>

          <button className="flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white">
            <span className="text-[14px]">&#128196;</span>
            Files
          </button>

          <button className="flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white">
            <span className="text-[14px]">&#129302;</span>
            AI Hub
          </button>
        </div>
      </div>
    </div>
  );
}
