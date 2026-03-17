"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PRESET_COLORS = [
  "#0288d1", "#7c4dff", "#e53935", "#ff9800", "#00897b",
  "#c44dff", "#2196f3", "#4caf50", "#ff5722", "#607d8b",
];

type Cloudspace = {
  id: string;
  name: string;
  color: string;
  logoUrl: string | null;
  isDefault?: boolean;
};

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export default function CloudspacesPage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<Cloudspace[]>([
    { id: "default", name: "Cloudspace", color: "#0288d1", logoUrl: null, isDefault: true },
  ]);
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0288d1");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [spaceType, setSpaceType] = useState<"personal" | "business" | "team">("personal");
  const [members, setMembers] = useState("");
  const [closing, setClosing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => { if (e.ctrlKey) e.preventDefault(); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=")) e.preventDefault();
      if (e.key === "Escape" && createOpen) animateClose();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("wheel", handleWheel); window.removeEventListener("keydown", handleKeyDown); };
  });

  const enter = (id: string) => {
    sessionStorage.setItem("cloudspace_selected", id);
    router.push("/");
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogoUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const resetForm = () => {
    setName("");
    setColor("#0288d1");
    setLogoUrl(null);
    setSpaceType("personal");
    setMembers("");
  };

  const animateClose = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); setCreateOpen(false); resetForm(); }, 200);
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    const newSpace: Cloudspace = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      logoUrl,
    };
    setSpaces((prev) => [...prev, newSpace]);
    setClosing(true);
    setTimeout(() => { setClosing(false); setCreateOpen(false); resetForm(); }, 200);
  };

  const initial = name.trim() ? name.trim().charAt(0).toUpperCase() : "C";
  const displayName = name.trim() || "Cloudspace";

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <Image src="/images/space-bg.png" alt="" fill unoptimized priority className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: "-webkit-optimize-contrast" }} />

      {/* Centered content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
        {/* Cloudspace pills */}
        {spaces.map((s) => (
          <div key={s.id} className="relative">
            <div className="absolute -inset-3 rounded-[60px] blur-[12px]" style={{ background: `${s.color}40` }} />
            <button
              onClick={() => enter(s.id)}
              className="relative overflow-hidden rounded-full border-2 w-[300px] h-[82px] transition-transform hover:scale-105"
              style={s.isDefault ? {
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.4)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              } : {
                background: s.color,
                borderColor: 'rgba(255,255,255,0.25)',
                boxShadow: `0 8px 32px ${s.color}40`,
              }}
            >
              {/* Logo — absolute left */}
              {s.isDefault ? (
                <div className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full overflow-hidden">
                  <Image src="/images/cloudspace-logo.png" alt="Cloudspace" width={56} height={56} className="w-full h-full" style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'transparent' }} />
                </div>
              ) : s.logoUrl ? (
                <div className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full overflow-hidden border border-white/20">
                  <img src={s.logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div
                  className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full flex items-center justify-center text-[19px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.2)', color: isLightColor(s.color) ? '#1a1a2e' : 'white' }}
                >
                  {s.name.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Name — absolute centered */}
              <span
                className="absolute left-0 right-0 text-center text-[19px] font-semibold truncate px-[76px]"
                style={{ color: s.isDefault ? '#1a1a2e' : isLightColor(s.color) ? '#1a1a2e' : 'white', top: '50%', transform: 'translateY(-50%)' }}
              >
                {s.isDefault ? "Cloudspace" : s.name}
              </span>
            </button>
          </div>
        ))}

        {/* Plus button */}
        <button
          onClick={() => setCreateOpen(true)}
          className="w-[72px] h-[72px] shrink-0 rounded-full border-2 border-white/60 flex items-center justify-center transition-transform hover:scale-105"
          style={{ background: "radial-gradient(circle at 40% 35%, rgba(122,174,224,0.55), rgba(42,90,153,0.55))" }}
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <line x1="12.5" y1="4" x2="12.5" y2="21" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.95" />
            <line x1="4" y1="12.5" x2="21" y2="12.5" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.95" />
          </svg>
        </button>
      </div>

      {/* Create Cloudspace Modal */}
      {createOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 transition-all duration-200 ${closing ? "opacity-0" : "opacity-100"}`}
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
            onClick={animateClose}
          />

          {/* Modal */}
          <div
            className={`fixed z-50 w-[520px] max-h-[90vh] flex flex-col overflow-hidden transition-all duration-200 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            style={{
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              borderRadius: '20px',
              background: 'white',
              boxShadow: '0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.04)',
            }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-8 pt-7 pb-1 shrink-0">
              <div>
                <h2 className="text-[20px] font-bold text-[#1a1a2e] tracking-[-0.01em]">Create Cloudspace</h2>
                <p className="text-[13px] text-black/35 mt-0.5">Set up your new workspace</p>
              </div>
              <button onClick={animateClose} className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-black/30 transition-all hover:bg-black/[0.05] hover:text-black/60 hover:rotate-90">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-8 mt-4 mb-5 h-px bg-black/[0.06] shrink-0" />

            <div className="px-8 pb-8 flex flex-col gap-6 overflow-y-auto">
              {/* Row: Logo + Name side by side */}
              <div className="flex gap-5 items-start">
                {/* Logo upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-black/40 uppercase tracking-[0.05em]">Logo</label>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`relative flex items-center justify-center w-[88px] h-[88px] rounded-2xl border-2 border-dashed cursor-pointer transition-all ${dragging ? "border-[#0288d1] bg-[#e3f2fd] scale-105" : "border-black/[0.08] bg-[#f6f7f9] hover:border-black/15 hover:bg-[#eef0f3]"}`}
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black/20">
                          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span className="text-[9px] font-medium text-black/20 uppercase tracking-wide">Upload</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name input */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-black/40 uppercase tracking-[0.05em]">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    placeholder="Cloudspace name..."
                    autoFocus
                    className="h-[48px] w-full rounded-xl border border-black/[0.08] bg-[#f6f7f9] px-4 text-[15px] text-[#1a1a2e] placeholder-black/20 outline-none transition-all focus:border-[#0288d1]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(2,136,209,0.08)]"
                  />
                  <p className="text-[11px] text-black/25 mt-0.5">This will appear on your workspace pill</p>
                </div>
              </div>

              {/* Color picker */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[12px] font-semibold text-black/40 uppercase tracking-[0.05em]">Accent Color</label>
                <div className="flex items-center gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className="relative w-[30px] h-[30px] rounded-full transition-all hover:scale-110"
                      style={{
                        background: c,
                        boxShadow: color === c ? `0 0 0 2px white, 0 0 0 4px ${c}` : '0 1px 3px rgba(0,0,0,0.12)',
                      }}
                    />
                  ))}
                  {/* Custom color */}
                  <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-dashed border-black/10 cursor-pointer hover:border-black/20 transition-colors ml-1" title="Custom color">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="absolute inset-0 w-[50px] h-[50px] cursor-pointer border-none"
                      style={{ transform: 'translate(-25%, -20%) scale(2.5)', opacity: PRESET_COLORS.includes(color) ? 0.3 : 1 }}
                    />
                    {PRESET_COLORS.includes(color) && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <circle cx="12" cy="12" r="3" /><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Type selector */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-black/40 uppercase tracking-[0.05em]">Type</label>
                <div className="flex gap-2">
                  {([
                    { key: "personal" as const, label: "Personal", icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" },
                    { key: "business" as const, label: "Business", icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" },
                    { key: "team" as const, label: "Team", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
                  ]).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setSpaceType(t.key)}
                      className="flex-1 flex items-center justify-center gap-2 h-[42px] rounded-xl text-[13px] font-medium transition-all"
                      style={spaceType === t.key ? {
                        background: `${color}10`, border: `1.5px solid ${color}40`, color: color,
                      } : {
                        background: '#f6f7f9', border: '1.5px solid transparent', color: '#888',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={t.icon} /></svg>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Members */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-black/40 uppercase tracking-[0.05em]">Invite Members</label>
                <div className="relative">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  <input
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    placeholder="name@email.com, name@email.com..."
                    className="h-[44px] w-full rounded-xl border border-black/[0.08] bg-[#f6f7f9] pl-10 pr-4 text-[14px] text-[#1a1a2e] placeholder-black/20 outline-none transition-all focus:border-[#0288d1]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(2,136,209,0.08)]"
                  />
                </div>
                <p className="text-[11px] text-black/25">Separate multiple emails with commas</p>
              </div>

              {/* Live preview */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold text-black/40 uppercase tracking-[0.05em]">Preview</label>
                <div
                  className="relative flex items-center justify-center overflow-hidden rounded-2xl py-7"
                  style={{ background: `linear-gradient(135deg, ${color}12, ${color}08)`, border: `1px solid ${color}18` }}
                >
                  {/* Soft glow */}
                  <div className="absolute rounded-full blur-[40px] w-[180px] h-[50px] opacity-40" style={{ background: color }} />

                  {/* Preview pill — frosted white, same as selector screen */}
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-[40px] blur-[8px] opacity-50" style={{ background: `${color}30` }} />
                    <div
                      className="relative flex items-center gap-2 rounded-full px-4 h-[52px] transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.75)',
                        backdropFilter: 'blur(12px)',
                        border: '1.5px solid rgba(255,255,255,0.5)',
                        boxShadow: `0 4px 20px ${color}20`,
                      }}
                    >
                      {logoUrl ? (
                        <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0 shadow-sm">
                          <img src={logoUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[14px] font-bold text-white shrink-0 transition-colors duration-300 shadow-sm"
                          style={{ background: color }}
                        >
                          {initial}
                        </div>
                      )}
                      <span className="text-[15px] font-semibold text-[#1a1a2e] pr-1 transition-all duration-300">
                        {displayName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create button */}
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className="relative h-[50px] rounded-xl text-[15px] font-semibold text-white transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden group"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Create Cloudspace</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
