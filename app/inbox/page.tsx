"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Email = {
  id: string;
  sender: string;
  initials: string;
  color: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  date: string;
  read: boolean;
  starred: boolean;
  tab: "primary" | "social" | "promotions" | "updates";
};

const EMAILS: Email[] = [
  { id: "1", sender: "Apple", initials: "A", color: "#999", subject: "Your receipt from Apple.", preview: "Receipt March 16, 2026 Order ID: MLF29MJ1LW Document: 850106928148 Apple Account: rz@gmail.com Save 3% on all your Apple purchases with Apple Card. 1 Apply and use in minutes.", body: "Your receipt from Apple.\n\nReceipt March 16, 2026\nOrder ID: MLF29MJ1LW\nDocument: 850106928148\n\nApple Account: rz@gmail.com\n\nSave 3% on all your Apple purchases with Apple Card.\n1 Apply and use in minutes. 2 X X\n\nThank you for your purchase.", time: "3:08 PM", date: "Mar 16, 2026", read: false, starred: false, tab: "primary" },
  { id: "2", sender: "Roof Support", initials: "RS", color: "#4caf50", subject: "Tell us about your experience", preview: "We want to hear from you! How satisfied were you with your overall experience? 1/5 2/5 3/5 4/5 5/5 I'm Unsatisfied I'm Satisfied", body: "Tell us about your experience\n\nWe want to hear from you! How satisfied were you with your overall experience?\n\n1/5 2/5 3/5 4/5 5/5\nI'm Unsatisfied ←→ I'm Satisfied\n\nYour feedback helps us improve our services.", time: "1:07 PM", date: "Mar 16, 2026", read: false, starred: false, tab: "primary" },
  { id: "3", sender: "Matt Levine", initials: "ML", color: "#ff9800", subject: "Money Stuff: Make the Predictions Come True", preview: "SPVs, nuns, tariffs, OBDC II, watches. View in browser Bloomberg New prediction market manipulation In theory, a thing that you could do is: Buy some short-dated out-of-the-money call options on a", body: "Money Stuff: Make the Predictions Come True\n\nSPVs, nuns, tariffs, OBDC II, watches.\n\nView in browser Bloomberg\n\nNew prediction market manipulation\n\nIn theory, a thing that you could do is: Buy some short-dated out-of-the-money call options on a stock. Then go to a prediction market and bet a lot of money that the stock will go up.", time: "11:30 AM", date: "Mar 16, 2026", read: false, starred: false, tab: "primary" },
  { id: "4", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Vote in the Pfizer Inc. Annual Meeting", preview: "Vote on key company decisions by April 22, 2026 and view the meeting materials through the link below. PFE Pfizer Inc. Vote in the Pfizer Inc. 2026 Annual Meeting Hi Ricardo, Pfizer Inc. is holding", body: "Vote in the Pfizer Inc. Annual Meeting\n\nVote on key company decisions by April 22, 2026 and view the meeting materials through the link below.\n\nPFE Pfizer Inc.\n\nVote in the Pfizer Inc. 2026 Annual Meeting\n\nHi Ricardo, Pfizer Inc. is holding its annual meeting.", time: "11:05 AM", date: "Mar 16, 2026", read: false, starred: false, tab: "primary" },
  { id: "5", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Hello Ricardo!", preview: "We're just checking in to see how you like Robinhood Crypto How's it going? We love having you as a Robinhood Crypto customer... but we're not really sure how you feel about it. We", body: "👋 Hello Ricardo!\n\nWe're just checking in to see how you like Robinhood Crypto\n\nHow's it going? We love having you as a Robinhood Crypto customer... but we're not really sure how you feel about it. We'd love to hear from you!", time: "10:47 AM", date: "Mar 16, 2026", read: false, starred: false, tab: "promotions" },
  { id: "6", sender: "Calendly", initials: "C", color: "#0066ff", subject: "Need a little help?", preview: "Choose the option that works for you!", body: "Need a little help?\n\nChoose the option that works for you!\n\nWe noticed you recently signed up for Calendly. Here are some resources to get you started.", time: "10:43 AM", date: "Mar 16, 2026", read: false, starred: false, tab: "promotions" },
  { id: "7", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Changes to our Financial Privacy Notice and US User Privacy Statement", preview: "Financial Privacy Notice and US User Privacy Statement UpdatesHi Ricardo, we're writing to let you know that we've updated our Financial Privacy Notice as well", body: "Changes to our Financial Privacy Notice and US User Privacy Statement\n\nHi Ricardo,\n\nWe're writing to let you know that we've updated our Financial Privacy Notice as well as our US User Privacy Statement.", time: "10:38 AM", date: "Mar 16, 2026", read: false, starred: false, tab: "updates" },
  { id: "8", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Create your trading setup in seconds", preview: "Get started fast on Legend with ready-made layouts you can tweak anytime.", body: "Create your trading setup in seconds\n\nGet started fast on Legend with ready-made layouts you can tweak anytime.\n\nChoose from pre-built templates and customize your trading dashboard.", time: "5:47 AM", date: "Mar 16, 2026", read: true, starred: false, tab: "promotions" },
  { id: "9", sender: "Snacks", initials: "S", color: "#ff5722", subject: "A different EVironment", preview: "EVs are once again turning car shoppers' heads. (Justin Sullivan/Getty Images) Hey Snackers, It seems like only yesterday McDonald's debuted its pricey Big Arch", body: "A different EVironment\n\nEVs are once again turning car shoppers' heads.\n\n(Justin Sullivan/Getty Images)\n\nHey Snackers,\n\nIt seems like only yesterday McDonald's debuted its pricey Big Arch burger.", time: "4:15 AM", date: "Mar 16, 2026", read: true, starred: false, tab: "primary" },
  { id: "10", sender: "Apple", initials: "A", color: "#999", subject: "Your receipt from Apple.", preview: "Receipt March 15, 2026 Order ID: MLF29KNO66 Document: 722106485878 Apple Account: rz@gmail.com Save 3% on all your Apple purchases with Apple Card.", body: "Your receipt from Apple.\n\nReceipt March 15, 2026\nOrder ID: MLF29KNO66\n\nSave 3% on all your Apple purchases with Apple Card.", time: "2:04 AM", date: "Mar 15, 2026", read: true, starred: false, tab: "primary" },
  { id: "11", sender: "Duolingo", initials: "D", color: "#78c800", subject: "Obligatory Russian reminder", preview: "Sorry about this 💜", body: "Obligatory Russian reminder\n\nSorry about this 💜\n\nDon't forget your daily lesson!", time: "Mar 15", date: "Mar 15, 2026", read: true, starred: false, tab: "primary" },
  { id: "12", sender: "Calendly", initials: "C", color: "#0066ff", subject: "3 steps to your first meeting", preview: "Follow this checklist before booking", body: "3 steps to your first meeting\n\nFollow this checklist before booking:\n\n1. Set your availability\n2. Share your link\n3. Get booked!", time: "Mar 15", date: "Mar 15, 2026", read: true, starred: false, tab: "promotions" },
  { id: "13", sender: "Indeed", initials: "I", color: "#2164f3", subject: "Ricardo, your profile needs attention!", preview: "Take a moment to update your profile.", body: "Ricardo, your profile needs attention!\n\nTake a moment to update your profile.\n\nComplete your Indeed profile to get noticed by top employers.", time: "Mar 15", date: "Mar 15, 2026", read: true, starred: false, tab: "primary" },
  { id: "14", sender: "Duolingo", initials: "D", color: "#78c800", subject: "No Chinese yet?", preview: "Fascinating 🤔", body: "No Chinese yet?\n\nFascinating 🤔\n\nStart learning Chinese today with Duolingo!", time: "Mar 14", date: "Mar 14, 2026", read: true, starred: false, tab: "primary" },
  { id: "15", sender: "Apple", initials: "A", color: "#999", subject: "Your receipt from Apple.", preview: "Receipt March 7, 2026 Order ID: MLF285XM9B Document: 834105673807 Apple Account: rz@gmail.com Save 3% on all your Apple purchases with Apple Card. 1 Apply and use in minutes. 2 Grok", body: "Your receipt from Apple.\n\nReceipt March 7, 2026\nOrder ID: MLF285XM9B", time: "Mar 14", date: "Mar 14, 2026", read: true, starred: false, tab: "primary" },
  { id: "16", sender: "Marriott Bonvoy", initials: "MB", color: "#8c1d40", subject: "Your Home Base for Every Gameday", preview: "Top players: free hot breakfast, pools, and spacious rooms", body: "Your Home Base for Every Gameday\n\nTop players: free hot breakfast, pools, and spacious rooms\n\nBook your gameday stay with Marriott Bonvoy.", time: "Mar 14", date: "Mar 14, 2026", read: true, starred: false, tab: "promotions" },
  { id: "17", sender: "Duolingo", initials: "D", color: "#78c800", subject: "Do your Duolingo today, okay?", preview: "For me?", body: "Do your Duolingo today, okay?\n\nFor me? 🥺\n\nYour daily streak is waiting!", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "primary" },
  { id: "18", sender: "1-800Accountant", initials: "18", color: "#1a237e", subject: "Unable to Reach You - Need Correct Contact Number", preview: "Hi Ricardo, I tried reaching you on behalf of LegalZoom. Unfortunately, it looks like the phone number I have for you may be incorrect. Please reply with the best phone number to reach you at. Once you", body: "Unable to Reach You - Need Correct Contact Number\n\nHi Ricardo, I tried reaching you on behalf of LegalZoom.\n\nUnfortunately, it looks like the phone number I have for you may be incorrect.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "primary" },
  { id: "19", sender: "Microsoft account t.", initials: "M", color: "#0078d4", subject: "Your single-use code", preview: "Hi rz@gmail.com, We received your request for a single-use code to use with your Microsoft account. Your single-use code is: 206148 Only enter this code on an official website or app. Don", body: "Your single-use code\n\nHi rz@gmail.com,\n\nWe received your request for a single-use code.\nYour single-use code is: 206148\n\nOnly enter this code on an official website or app.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "primary" },
  { id: "20", sender: "Calendly", initials: "C", color: "#0066ff", subject: "Welcome to Calendly", preview: "Ricardo, let's get started!", body: "Welcome to Calendly\n\nRicardo, let's get started!\n\nSchedule your first meeting in minutes.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "promotions" },
  { id: "21", sender: "Google", initials: "G", color: "#4285f4", subject: "Security alert", preview: "You allowed Calendly access to some of your Google Account data rz@gmail.com if you didn't allow Calendly access to some of your Google Account data, someone else may be trying to", body: "Security alert\n\nYou allowed Calendly access to some of your Google Account data.\n\nIf you didn't allow Calendly access, someone else may be trying to access your account.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "primary" },
  { id: "22", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Earn a boost on retirement transfers and contributions", preview: "You could earn extra in a self-directed IRA with Robinhood Gold.", body: "Earn a boost on retirement transfers and contributions\n\nYou could earn extra in a self-directed IRA with Robinhood Gold.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "promotions" },
  { id: "23", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Important information regarding our Customer Agreement", preview: "Upcoming Update to Our Customer Agreement – Early Dividends. Changes to our Customer Agreement Hi Ricardo, we've updated the Robinhood Financial LLC & Robinhood Securities, LLC Customer", body: "Important information regarding our Customer Agreement\n\nUpcoming Update to Our Customer Agreement – Early Dividends.\n\nHi Ricardo, we've updated our Customer Agreement.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "updates" },
  { id: "24", sender: "Robinhood", initials: "R", color: "#4caf50", subject: "Begin trading in minutes", preview: "Get started fast on Legend desktop, and place trades directly from a single chart.", body: "Begin trading in minutes\n\nGet started fast on Legend desktop, and place trades directly from a single chart.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "promotions" },
  { id: "25", sender: "Marriott Bonvoy", initials: "MB", color: "#8c1d40", subject: "Don't Miss 2,500 Bonus Points + More", preview: "Register by April 26 to start earning more.", body: "Don't Miss 2,500 Bonus Points + More\n\nRegister by April 26 to start earning more.\n\nExclusive offer for Marriott Bonvoy members.", time: "Mar 13", date: "Mar 13, 2026", read: true, starred: false, tab: "promotions" },
  { id: "26", sender: "LinkedIn", initials: "LI", color: "#0077b5", subject: "Jaden Bautista and others share their thoughts on LinkedIn", preview: "I'm honored and blessed to share that I'll be working and learning at...", body: "Jaden Bautista and others share their thoughts on LinkedIn\n\nI'm honored and blessed to share that I'll be working and learning at...", time: "Mar 12", date: "Mar 12, 2026", read: true, starred: false, tab: "social" },
  { id: "27", sender: "Indeed", initials: "I", color: "#2164f3", subject: "STDT 4 @ UC Davis Health", preview: "Hi Ricardo, It looks like your background could be a match for this STDT 4 role. Please submit a quick application if you have any interest.", body: "STDT 4 @ UC Davis Health\n\nHi Ricardo, It looks like your background could be a match for this STDT 4 role.\n\nPlease submit a quick application if you have any interest.", time: "Mar 12", date: "Mar 12, 2026", read: true, starred: false, tab: "primary" },
  { id: "28", sender: "Formspree", initials: "F", color: "#cc4444", subject: "Action Required: Verify email linked to Formspree", preview: "Please verify that you'd like to add the following email address. — Formspree logo Verify new email address Please verify that you'd like to add the following email address to the Formspree", body: "Action Required: Verify email linked to Formspree\n\nPlease verify that you'd like to add the following email address.\n\nVerify new email address.", time: "Mar 12", date: "Mar 12, 2026", read: true, starred: false, tab: "primary" },
];

const FOLDERS = [
  { name: "Inbox", count: "10,063" },
  { name: "Starred", count: "" },
  { name: "Snoozed", count: "" },
  { name: "Sent", count: "" },
  { name: "Drafts", count: "3" },
  { name: "Purchases", count: "" },
];

const MORE_FOLDERS = [
  { name: "Important", count: "" },
  { name: "Scheduled", count: "" },
  { name: "All Mail", count: "" },
  { name: "Spam", count: "866" },
  { name: "Trash", count: "" },
];

function SidebarIcon({ name }: { name: string }) {
  const s = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  switch (name) {
    case "Inbox": return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 14h5l2 3h4l2-3h5"/></svg>;
    case "Starred": return <svg {...s}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01z"/></svg>;
    case "Snoozed": return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    case "Sent": return <svg {...s}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case "Drafts": return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8M8 12h5"/></svg>;
    case "Purchases": return <svg {...s}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>;
    case "Important": return <svg {...s}><path d="M12 2v8l4-2M12 10l-4-2M12 10v12"/></svg>;
    case "Scheduled": return <svg {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case "All Mail": return <svg {...s}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>;
    case "Spam": return <svg {...s}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>;
    case "Trash": return <svg {...s}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>;
    case "Less": return <svg {...s}><path d="M18 15l-6-6-6 6"/></svg>;
    case "More": return <svg {...s}><path d="M6 9l6 6 6-6"/></svg>;
    default: return <svg {...s}><circle cx="12" cy="12" r="3"/></svg>;
  }
}

export default function InboxPage() {
  const router = useRouter();
  const [emails, setEmails] = useState(EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [activeTab, setActiveTab] = useState<Email["tab"]>("primary");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const filtered = emails.filter((e) => {
    if (activeFolder === "Starred") return e.starred;
    if (activeFolder === "Inbox") return e.tab === activeTab;
    return true;
  }).filter((e) =>
    !searchQuery || e.sender.toLowerCase().includes(searchQuery.toLowerCase()) || e.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStar = (id: string) => setEmails((p) => p.map((e) => e.id === id ? { ...e, starred: !e.starred } : e));
  const toggleSelect = (id: string) => {
    setSelectedIds((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const openEmail = (em: Email) => {
    setSelectedEmail(em);
    if (!em.read) setEmails((p) => p.map((e) => e.id === em.id ? { ...e, read: true } : e));
  };
  const deleteSelected = () => { setEmails((p) => p.filter((e) => !selectedIds.has(e.id))); setSelectedIds(new Set()); if (selectedEmail && selectedIds.has(selectedEmail.id)) setSelectedEmail(null); };
  const markSelectedRead = () => { setEmails((p) => p.map((e) => selectedIds.has(e.id) ? { ...e, read: true } : e)); setSelectedIds(new Set()); };
  const archiveSelected = () => { setEmails((p) => p.filter((e) => !selectedIds.has(e.id))); setSelectedIds(new Set()); };

  const tabs: { key: Email["tab"]; label: string; badge?: string; badgeColor?: string }[] = [
    { key: "primary", label: "Primary" },
    { key: "promotions", label: "Promotions", badge: "20 new", badgeColor: "#0d904f" },
    { key: "social", label: "Social" },
    { key: "updates", label: "Updates", badge: "5 new", badgeColor: "#1a73e8" },
  ];

  const tabIcons: Record<string, JSX.Element> = {
    primary: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 14h5l2 3h4l2-3h5"/></svg>,
    promotions: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 002 2h14v-4"/><circle cx="18" cy="16" r="2"/></svg>,
    social: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    updates: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f6f8fc] flex flex-col">
      {/* TOP BAR */}
      <div className="shrink-0 h-[56px] flex items-center px-2 bg-[#f6f8fc]">
        {/* Left: hamburger + logo */}
        <button onClick={() => router.push("/")} className="flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-black/[0.06]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="flex items-center ml-1 mr-4">
          <Image src="/images/cloudspace-logo.png" alt="Cloudspace" width={68} height={68} className="object-contain" />
          <span className="text-[18px] font-medium text-[#5f6368] ml-[-12px]">Mail</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[720px]">
          <div className="flex items-center gap-3 rounded-full bg-[#eaf1fb] px-4 py-2 transition-all focus-within:bg-white focus-within:shadow-md">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#666" strokeWidth="1.6"/><line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#666" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search mail" className="flex-1 bg-transparent text-[14px] text-[#1a1a2e] placeholder-[#5f6368] outline-none" />
            <button className="flex h-[24px] w-[24px] items-center justify-center rounded hover:bg-black/[0.06]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2" fill="#666"/><circle cx="16" cy="12" r="2" fill="#666"/><circle cx="10" cy="18" r="2" fill="#666"/></svg>
            </button>
          </div>
        </div>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-1">
          <button className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-black/[0.06]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.6"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#c44dff] text-white text-[13px] font-bold cursor-pointer ml-1">Z</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-[220px] shrink-0 overflow-y-auto py-1 pl-2 pr-1">
          {/* Compose */}
          <button onClick={() => setComposeOpen(true)} className="flex items-center gap-3 rounded-2xl px-5 py-3.5 mb-3 shadow-sm hover:shadow-md transition-shadow bg-[#c2e7ff]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span className="text-[14px] font-medium text-[#1a1a2e]">Compose</span>
          </button>

          {/* Folders */}
          {FOLDERS.map((f) => (
            <button key={f.name} onClick={() => { setActiveFolder(f.name); setSelectedEmail(null); }}
              className={`w-full flex items-center gap-3 pl-3 pr-2 py-[6px] rounded-r-full text-[13px] transition-colors ${activeFolder === f.name ? "bg-[#d3e3fd] font-bold text-[#001d35]" : "text-[#1a1a2e] hover:bg-black/[0.04]"}`}>
              <span className="w-[18px] shrink-0 text-[#444]"><SidebarIcon name={f.name} /></span>
              <span className="flex-1 text-left truncate">{f.name}</span>
              {f.count && <span className="text-[12px] text-[#444] font-normal">{f.count}</span>}
            </button>
          ))}

          {/* Less/More toggle */}
          <button onClick={() => setShowMore(!showMore)} className="w-full flex items-center gap-3 pl-3 pr-2 py-[6px] rounded-r-full text-[13px] text-[#1a1a2e] hover:bg-black/[0.04]">
            <span className="w-[18px] shrink-0 text-[#444]"><SidebarIcon name={showMore ? "Less" : "More"} /></span>
            <span className="flex-1 text-left">{showMore ? "Less" : "More"}</span>
          </button>

          {showMore && MORE_FOLDERS.map((f) => (
            <button key={f.name} onClick={() => { setActiveFolder(f.name); setSelectedEmail(null); }}
              className={`w-full flex items-center gap-3 pl-3 pr-2 py-[6px] rounded-r-full text-[13px] transition-colors ${activeFolder === f.name ? "bg-[#d3e3fd] font-bold text-[#001d35]" : "text-[#1a1a2e] hover:bg-black/[0.04]"}`}>
              <span className="w-[18px] shrink-0 text-[#444]"><SidebarIcon name={f.name} /></span>
              <span className="flex-1 text-left truncate">{f.name}</span>
              {f.count && <span className="text-[12px] text-[#444] font-normal">{f.count}</span>}
            </button>
          ))}

          {showMore && (
            <>
              <button className="w-full flex items-center gap-3 pl-3 pr-2 py-[6px] rounded-r-full text-[13px] text-[#1a1a2e] hover:bg-black/[0.04]">
                <span className="w-[18px] shrink-0 text-[#444]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></span>
                <span className="flex-1 text-left">Manage labels</span>
              </button>
              <button className="w-full flex items-center gap-3 pl-3 pr-2 py-[6px] rounded-r-full text-[13px] text-[#1a1a2e] hover:bg-black/[0.04]">
                <span className="w-[18px] shrink-0 text-[#444]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                <span className="flex-1 text-left">Create new label</span>
              </button>
            </>
          )}

          {/* Labels */}
          <div className="mt-4 mb-2 flex items-center justify-between pl-3 pr-2">
            <span className="text-[12px] font-medium text-[#444]">Labels</span>
            <button className="flex h-[20px] w-[20px] items-center justify-center rounded-full hover:bg-black/[0.06]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          {[{ n: "Work", c: "#4fc3f7" }, { n: "Personal", c: "#7c4dff" }, { n: "Finance", c: "#ff9800" }, { n: "Urgent", c: "#e53935" }].map((l) => (
            <div key={l.n} className="flex items-center gap-3 pl-3 pr-2 py-[5px] rounded-r-full cursor-pointer hover:bg-black/[0.04]">
              <span className="w-[10px] h-[10px] rounded-sm" style={{ background: l.c }} />
              <span className="text-[13px] text-[#1a1a2e]">{l.n}</span>
            </div>
          ))}
        </div>

        {/* EMAIL LIST */}
        <div className={`flex-1 flex flex-col bg-white rounded-tl-2xl rounded-bl-2xl overflow-hidden ${selectedEmail ? "" : "rounded-tr-2xl rounded-br-2xl"}`} style={{ minWidth: 0 }}>
          {/* Toolbar */}
          <div className="shrink-0 flex items-center h-[40px] px-2 border-b border-black/[0.06]">
            {selectedIds.size > 0 ? (
              <div className="flex items-center gap-1">
                <button onClick={archiveSelected} className="flex items-center justify-center h-[32px] w-[32px] rounded-full hover:bg-black/[0.06]" title="Archive">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M10 12h4"/></svg>
                </button>
                <button onClick={deleteSelected} className="flex items-center justify-center h-[32px] w-[32px] rounded-full hover:bg-black/[0.06]" title="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>
                </button>
                <button onClick={markSelectedRead} className="flex items-center justify-center h-[32px] w-[32px] rounded-full hover:bg-black/[0.06]" title="Mark as read">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                </button>
                <span className="text-[12px] text-[#5f6368] ml-2">{selectedIds.size} selected</span>
              </div>
            ) : (
              <>
                <button className="flex items-center justify-center h-[32px] w-[20px] rounded hover:bg-black/[0.06] ml-1">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="#5f6368" strokeWidth="1.6"/></svg>
                </button>
                <button className="flex items-center justify-center h-[32px] w-[14px] rounded hover:bg-black/[0.06]">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 3l3 3 3-3" stroke="#5f6368" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
                <div className="w-px h-[20px] bg-black/[0.08] mx-2" />
                <button className="flex items-center justify-center h-[32px] w-[32px] rounded-full hover:bg-black/[0.06]" title="Refresh">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                </button>
                <button className="flex items-center justify-center h-[32px] w-[32px] rounded-full hover:bg-black/[0.06]" title="More">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#5f6368"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
                </button>
              </>
            )}
            <div className="ml-auto flex items-center gap-1 text-[12px] text-[#5f6368]">
              <span>1–{filtered.length} of {emails.length.toLocaleString()}</span>
              <button className="flex h-[28px] w-[28px] items-center justify-center rounded-full hover:bg-black/[0.06]">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button className="flex h-[28px] w-[28px] items-center justify-center rounded-full hover:bg-black/[0.06]">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          {activeFolder === "Inbox" && (
            <div className="shrink-0 flex border-b border-black/[0.06]">
              {tabs.map((t) => (
                <button key={t.key} onClick={() => { setActiveTab(t.key); setSelectedEmail(null); }}
                  className={`flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium transition-colors relative ${activeTab === t.key ? "text-[#0b57d0]" : "text-[#5f6368] hover:text-[#1a1a2e] hover:bg-black/[0.02]"}`}>
                  <span className={activeTab === t.key ? "text-[#0b57d0]" : "text-[#5f6368]"}>{tabIcons[t.key]}</span>
                  {t.label}
                  {t.badge && <span className="text-[11px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: t.badgeColor }}>{t.badge}</span>}
                  {activeTab === t.key && <div className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-[#0b57d0]" />}
                </button>
              ))}
            </div>
          )}

          {/* Email rows */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((em) => (
              <div key={em.id} onClick={() => openEmail(em)}
                className={`group flex items-center h-[32px] px-2 cursor-pointer border-b border-black/[0.03] text-[13px] transition-colors ${selectedEmail?.id === em.id ? "bg-[#c2dbff]" : em.read ? "bg-white hover:shadow-[inset_0_-1px_0_#dadce0,inset_0_1px_0_#dadce0] hover:z-10" : "bg-[#f2f6fc] font-semibold hover:shadow-[inset_0_-1px_0_#dadce0,inset_0_1px_0_#dadce0] hover:z-10"}`}>
                {/* Checkbox */}
                <button onClick={(e) => { e.stopPropagation(); toggleSelect(em.id); }}
                  className="shrink-0 w-[20px] h-[20px] flex items-center justify-center mx-1">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    {selectedIds.has(em.id)
                      ? <><rect x="2" y="2" width="14" height="14" rx="2" fill="#0b57d0" stroke="#0b57d0" strokeWidth="1.4"/><path d="M5 9l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
                      : <rect x="2" y="2" width="14" height="14" rx="2" stroke="#5f6368" strokeWidth="1.4"/>
                    }
                  </svg>
                </button>
                {/* Star */}
                <button onClick={(e) => { e.stopPropagation(); toggleStar(em.id); }} className="shrink-0 w-[20px] h-[16px] flex items-center justify-center mx-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={em.starred ? "#f4b400" : "none"} stroke={em.starred ? "#f4b400" : "#ccc"} strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01z"/></svg>
                </button>
                {/* Sender */}
                <span className={`shrink-0 w-[160px] truncate pl-1 ${!em.read ? "font-bold text-[#1a1a2e]" : "text-[#5f6368]"}`}>{em.sender}</span>
                {/* Subject + preview */}
                <span className="flex-1 truncate min-w-0 mx-1">
                  <span className={!em.read ? "font-bold text-[#1a1a2e]" : "text-[#1a1a2e]"}>{em.subject}</span>
                  <span className="text-[#5f6368]"> - {em.preview}</span>
                </span>
                {/* Time */}
                <span className={`shrink-0 text-[12px] pr-2 ${!em.read ? "font-bold text-[#1a1a2e]" : "text-[#5f6368]"}`}>{em.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* READING PANE */}
        {selectedEmail && (
          <div className="w-[440px] shrink-0 bg-white border-l border-black/[0.06] overflow-y-auto flex flex-col rounded-tr-2xl rounded-br-2xl">
            <div className="px-5 pt-5 pb-3 border-b border-black/[0.06]">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-[20px] font-normal text-[#1a1a2e] leading-tight pr-4">{selectedEmail.subject}</h2>
                <button onClick={() => setSelectedEmail(null)} className="shrink-0 flex h-[28px] w-[28px] items-center justify-center rounded-full hover:bg-black/[0.06]">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><line x1="4" y1="4" x2="14" y2="14" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="4" x2="4" y2="14" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0" style={{ background: selectedEmail.color }}>{selectedEmail.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-[#1a1a2e]">{selectedEmail.sender}</span>
                    <span className="text-[12px] text-[#5f6368]">&lt;{selectedEmail.sender.toLowerCase().replace(/\s/g, ".").replace(/[^a-z.]/g, "")}@mail.com&gt;</span>
                  </div>
                  <span className="text-[11px] text-[#5f6368]">to me</span>
                </div>
                <span className="shrink-0 text-[11px] text-[#5f6368]">{selectedEmail.date}</span>
              </div>
            </div>
            <div className="flex-1 px-5 py-4">
              <div className="text-[13px] text-[#1a1a2e] leading-relaxed whitespace-pre-wrap">{selectedEmail.body}</div>
            </div>
            <div className="shrink-0 px-5 py-3 border-t border-black/[0.06] flex items-center gap-2">
              <button onClick={() => { setComposeOpen(true); setComposeTo(selectedEmail.sender.toLowerCase().replace(/\s/g, ".") + "@mail.com"); setComposeSubject("Re: " + selectedEmail.subject); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/[0.12] text-[12px] font-medium text-[#444] hover:bg-black/[0.03]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 17l-5-5 5-5"/><path d="M4 12h12a4 4 0 014 4v1"/></svg>Reply
              </button>
              <button onClick={() => { setComposeOpen(true); setComposeTo(""); setComposeSubject("Re: " + selectedEmail.subject); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/[0.12] text-[12px] font-medium text-[#444] hover:bg-black/[0.03]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 17l-5-5 5-5"/><path d="M15 17l-5-5 5-5"/></svg>Reply All
              </button>
              <button onClick={() => { setComposeOpen(true); setComposeTo(""); setComposeSubject("Fwd: " + selectedEmail.subject); setComposeBody("\n\n---------- Forwarded ----------\nFrom: " + selectedEmail.sender + "\n\n" + selectedEmail.body); }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/[0.12] text-[12px] font-medium text-[#444] hover:bg-black/[0.03]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 17l5-5-5-5"/><path d="M20 12H8a4 4 0 00-4 4v1"/></svg>Forward
              </button>
            </div>
          </div>
        )}
      </div>

      {/* COMPOSE */}
      {composeOpen && (
        <div className="fixed bottom-0 right-6 z-50 w-[480px] shadow-2xl rounded-t-lg overflow-hidden border border-black/[0.1] flex flex-col bg-white" style={{ height: "460px" }}>
          <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a2e]">
            <span className="text-[13px] font-medium text-white">New Message</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setComposeOpen(false)} className="flex h-[26px] w-[26px] items-center justify-center rounded hover:bg-white/10">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><line x1="2" y1="12" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button onClick={() => { setComposeOpen(false); setComposeTo(""); setComposeSubject(""); setComposeBody(""); }} className="flex h-[26px] w-[26px] items-center justify-center rounded hover:bg-white/10">
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><line x1="4" y1="4" x2="14" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="4" x2="4" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
          <div className="flex items-center border-b border-black/[0.06] px-3">
            <span className="text-[12px] text-[#5f6368] mr-2">To</span>
            <input value={composeTo} onChange={(e) => setComposeTo(e.target.value)} className="flex-1 py-2 text-[13px] text-[#1a1a2e] outline-none" />
          </div>
          <div className="flex items-center border-b border-black/[0.06] px-3">
            <span className="text-[12px] text-[#5f6368] mr-2">Subject</span>
            <input value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} className="flex-1 py-2 text-[13px] text-[#1a1a2e] outline-none" />
          </div>
          <textarea value={composeBody} onChange={(e) => setComposeBody(e.target.value)} placeholder="Write your message..." className="flex-1 px-3 py-2 text-[13px] text-[#1a1a2e] placeholder-black/25 outline-none resize-none" />
          <div className="flex items-center gap-2 px-3 py-2 border-t border-black/[0.06]">
            <button onClick={() => { setComposeOpen(false); setComposeTo(""); setComposeSubject(""); setComposeBody(""); }} className="px-5 py-2 rounded-full text-[13px] font-semibold text-white bg-[#0b57d0] hover:bg-[#0842a0]">Send</button>
            <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full hover:bg-black/[0.04]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <div className="flex-1" />
            <button onClick={() => { setComposeOpen(false); setComposeTo(""); setComposeSubject(""); setComposeBody(""); }} className="flex h-[32px] w-[32px] items-center justify-center rounded-full hover:bg-black/[0.04]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
