"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Tool = { id: string; label: string; icon: string; route?: string; iconScale?: number };

const DEFAULT_TOOLS: Tool[] = [
  { id: "inbox", label: "Inbox", icon: "/images/tool-inbox.png", route: "/inbox" },
  { id: "drive", label: "Drive", icon: "/images/tool-drive.png" },
  { id: "teams", label: "Teams", icon: "/images/teams-icon.png" },
  { id: "tasks", label: "Tasks", icon: "/images/tasks-icon.png" },
  { id: "analytics", label: "Analytics", icon: "/images/analytics-icon.png" },
  { id: "docs", label: "Docs", icon: "/images/docs-icon.png", iconScale: 1.35 },
  { id: "sheets", label: "Sheets", icon: "/images/sheets-icon.png", iconScale: 1.35 },
  { id: "slides", label: "Slides", icon: "/images/slides-icon.png" },
  { id: "forms", label: "Forms", icon: "/images/forms-icon.png" },
  { id: "meet", label: "Meet", icon: "/images/meet-icon.png" },
  { id: "crm", label: "CRM", icon: "/images/crm-icon.png" },
];

function loadToolOrder(): Tool[] {
  if (typeof window === "undefined") return DEFAULT_TOOLS;
  try {
    const saved = localStorage.getItem("cloudspace_tool_order");
    if (!saved) return DEFAULT_TOOLS;
    const ids: string[] = JSON.parse(saved);
    const mapped = ids.map((id) => DEFAULT_TOOLS.find((t) => t.id === id)).filter(Boolean) as Tool[];
    // append any new tools not in saved order
    for (const t of DEFAULT_TOOLS) { if (!mapped.find((m) => m.id === t.id)) mapped.push(t); }
    return mapped;
  } catch { return DEFAULT_TOOLS; }
}

export default function Home() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [tools, setTools] = useState<Tool[]>(DEFAULT_TOOLS);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => { setTools(loadToolOrder()); }, []);

  useEffect(() => {
    // Redirect to workspace selector if not coming from it
    const fromCloudspaces = sessionStorage.getItem("cloudspace_selected");
    if (!fromCloudspaces) {
      router.replace("/cloudspaces");
      return;
    }
  }, [router]);

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
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image — absolute inset-0 full cover */}
      <Image
        src="/images/space-bg.png"
        alt=""
        fill
        unoptimized
        priority
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: "-webkit-optimize-contrast" }}
      />

      {/* NAVBAR — absolute top-0 left-0 right-0 h-[72px] */}
      <nav className="absolute top-0 left-0 right-0 w-full h-[72px] z-30 flex items-center justify-between overflow-hidden bg-white">
        {/* Back + Logo + Wordmark — left */}
        <div className="flex items-center">
          <button
            onClick={() => { sessionStorage.removeItem("cloudspace_selected"); router.push("/cloudspaces"); }}
            className="flex items-center justify-center h-[42px] w-[42px] rounded-[8px] bg-[#f3f4f6] ml-3 shrink-0 transition-all hover:bg-[#e5e7eb] hover:shadow-sm active:bg-[#dcdfe3]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Image
            src="/images/cloudspace-logo.png"
            alt="Cloudspace"
            width={128}
            height={128}
            className="ml-1 object-contain"
          />
          <Image
            src="/images/cloudspace-wordmark.png"
            alt="Cloudspace"
            width={170}
            height={40}
            className="ml-1 object-contain"
            style={{ marginTop: '8px', marginLeft: '-38px' }}
          />
        </div>

        {/* Nav Tabs — true center via absolute positioning */}
        <div className="absolute left-1/2 -translate-x-1/2 flex h-full items-center gap-7">
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
        <div style={{position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '16px'}}>
          {/* Bell */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.04]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">3</span>
          </button>
          {/* Time */}
          <span className="text-[13px] font-normal text-black/40">10:45 AM</span>
          {/* Avatar */}
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#c44dff] text-white text-[14px] font-bold">Z</div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.08]" />
      </nav>

      {/* MENU ICON — absolute top-[84px] left-[8px] w-[51px] h-[63px] */}
      <button className="absolute top-[84px] left-[8px] z-20 w-[51px] h-[63px] flex flex-col items-center justify-center gap-[10px]">
        <span className="block h-[2.5px] w-[34px] rounded-full bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
        <span className="block h-[2.5px] w-[34px] rounded-full bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
        <span className="block h-[2.5px] w-[34px] rounded-full bg-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
      </button>

      {/* TOOLS Button — absolutely positioned */}
      <div className="z-20" style={{position: 'absolute', top: '104px', left: '50%', transform: 'translateX(-50%)'}}>
        {/* Outer glow */}
        <div className="absolute -inset-3 rounded-[60px] bg-[#b4dcff]/50 blur-[12px]" />
        <button onClick={() => setToolsOpen(!toolsOpen)} className="relative w-[260px] h-[90px] flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-b from-[#e8f4ff] to-[#b8d8f8] shadow-[0_8px_32px_rgba(144,202,249,0.35)] transition-all duration-150 ease-out hover:scale-[1.03] hover:brightness-105 hover:shadow-[0_10px_40px_rgba(144,202,249,0.5)] active:scale-[0.95] active:brightness-100 active:shadow-[0_4px_16px_rgba(144,202,249,0.25)]">
          {/* Inner highlight */}
          <div className="absolute left-1/2 top-[6px] h-[16px] w-[180px] -translate-x-1/2 rounded-full bg-white/70" />
          <span className="relative text-[22px] font-bold tracking-[0.05em] text-[#1a3a6e]">
            TOOLS
          </span>
        </button>
      </div>

      {/* CENTER CONTENT GROUP — absolute centered */}
      <div className="z-10 flex flex-col items-center gap-6" style={{position: 'absolute', top: '50%', left: 'calc(52% - 16px)', transform: 'translate(-50%, -50%)'}}>
        {/* Row: Orb column + Plus button */}
        <div className="flex items-center gap-6">
          {/* Orb + GOLIATH text stacked */}
          <div className="flex flex-col items-center gap-2">
            <div style={{ width: '200px', height: '200px', animation: "orbFloat 4s ease-in-out infinite" }}>
              <Image
                src="/images/agent-orb.png?v=2"
                alt="GOLIATH"
                width={200}
                height={200}
                unoptimized
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                className="object-cover drop-shadow-[0_0_50px_rgba(66,165,245,0.35)]"
              />
            </div>
            {/* GOLIATH Text — directly under orb */}
            <span style={{color: 'black', fontWeight: 'bold', fontSize: '20px', letterSpacing: 'normal', marginTop: '-39px', marginLeft: '1px'}}>
              GOLIATH
            </span>
          </div>

          {/* Plus Button — w-[72px] h-[72px] rounded-full */}
          <button
            className="w-[72px] h-[72px] shrink-0 rounded-full border-2 border-white/60 flex items-center justify-center transition-transform hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, rgba(122,174,224,0.55), rgba(42,90,153,0.55))",
              marginTop: '-20px',
              marginLeft: '-30px',
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
      </div>

      {/* BOTTOM BAR — floating centered input */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[880px]">
        {/* Floating input pill */}
        <div
          className="flex items-center h-[56px] rounded-full pl-8 pr-6 gap-3"
          style={{ background: "linear-gradient(to bottom, rgba(26,58,110,0.82), rgba(13,32,64,0.92))", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          {/* Agent Selector Pill */}
          <div className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-[7px] transition-colors hover:border-white/35">
            <span className="h-[10px] w-[10px] shrink-0 rounded-full bg-[#4fc3f7]" />
            <span className="whitespace-nowrap text-[13px] font-normal text-white/90">Agent Alpha</span>
            <span className="ml-0.5 text-[11px] text-white/40">&#9662;</span>
          </div>

          {/* Attach (+) */}
          <button className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] transition-colors hover:border-white/40 hover:bg-white/10">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
              <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
            </svg>
          </button>

          {/* Text input */}
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-[15px] text-white placeholder-white/40 outline-none px-2"
          />

          {/* Mic */}
          <button className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.08] transition-colors hover:border-white/40 hover:bg-white/10">
            <svg width="12" height="17" viewBox="0 0 12 17" fill="none">
              <rect x="3" y="0.5" width="6" height="10" rx="3" stroke="white" strokeWidth="1.8" strokeOpacity="0.85" />
              <path d="M0.5 8V9a5.5 5.5 0 0011 0V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85" />
              <line x1="6" y1="14" x2="6" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85" />
              <line x1="3.5" y1="16" x2="8.5" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85" />
            </svg>
          </button>

          {/* Send */}
          <button
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #4fc3f7, #0288d1)" }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="white">
              <path d="M0 12L14 6L0 0V4.67L10 6L0 7.33V12Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* TOOLS Modal */}
      {toolsOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setToolsOpen(false)} />
          <div className="fixed z-50 w-[720px] h-[680px] rounded-3xl bg-white shadow-2xl flex flex-col" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            {/* Header */}
            <div className="relative flex items-center justify-center px-10 pt-10 pb-8">
              <h2 className="text-[28px] font-bold text-[#1a1a2e]">Cloudspace Tools</h2>
              <button onClick={() => setToolsOpen(false)} className="absolute right-8 top-8 flex h-[36px] w-[36px] items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-black/70">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Search bar */}
            <div className="mx-16 mb-10">
              <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-[#f2f3f5] px-5 py-3.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="#aaa" strokeWidth="1.8" />
                  <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search Cloudspace tools..."
                  className="flex-1 bg-transparent text-[15px] text-[#1a1a2e] placeholder-black/25 outline-none"
                />
              </div>
            </div>

            {/* Tools Grid — draggable */}
            <div className="overflow-y-auto px-10 pb-8">
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '28px', justifyItems: 'center', alignItems: 'start'}}>
                {tools.map((t, i) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={(e) => { setDragIdx(i); e.dataTransfer.effectAllowed = "move"; }}
                    onDragOver={(e) => { e.preventDefault(); setOverIdx(i); }}
                    onDragLeave={() => setOverIdx(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragIdx !== null && dragIdx !== i) {
                        const next = [...tools];
                        const [moved] = next.splice(dragIdx, 1);
                        next.splice(i, 0, moved);
                        setTools(next);
                        localStorage.setItem("cloudspace_tool_order", JSON.stringify(next.map((x) => x.id)));
                      }
                      setDragIdx(null);
                      setOverIdx(null);
                    }}
                    onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
                    onClick={() => t.route && router.push(t.route)}
                    className="flex flex-col items-center cursor-grab active:cursor-grabbing"
                    style={{
                      transform: dragIdx === i ? 'scale(1.1)' : overIdx === i && dragIdx !== null ? 'scale(1.05)' : 'scale(1)',
                      opacity: dragIdx === i ? 0.8 : 1,
                      filter: dragIdx === i ? 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' : 'none',
                      zIndex: dragIdx === i ? 10 : overIdx === i ? 5 : 1,
                      transition: 'transform 0.15s ease, opacity 0.15s ease, filter 0.15s ease',
                    }}
                  >
                    <Image src={t.icon} alt={t.label} width={140} height={140} unoptimized style={{width: '140px', height: '140px', transform: t.iconScale ? `scale(${t.iconScale})` : undefined}} className="object-contain pointer-events-none" />
                    <span className="text-[13px] font-medium text-[#1a1a2e] text-center pointer-events-none -mt-2">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
