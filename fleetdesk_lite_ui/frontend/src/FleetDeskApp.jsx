import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";
import { cn } from "./lib/utils";
import {
  Activity, ArrowDownRight, ArrowRight, AudioLines, Bell, Bus, CalendarDays, Copy,
  Check, CheckCheck, ChevronDown, CircleAlert, CircleCheck, Clock3, Download,
  FileAudio, FileImage, FileText, Filter, Gauge, Headphones, Languages,
  LayoutDashboard, Link2, ListChecks, LoaderCircle, LogOut, Menu, Mic, MoreHorizontal,
  Paperclip, Pause, Play, Plus, Radio, RefreshCw, Search, Send, ShieldAlert,
  ShieldCheck, Sparkles, Square, TrendingDown, TrendingUp, TriangleAlert,
  Upload, UserRound, Users, Volume2, X, Zap,
} from "lucide-react";

const NAV = [
  { id: "report", label: "Report an issue", icon: Plus },
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "exceptions", label: "Exceptions", icon: ShieldAlert },
  { id: "tracker", label: "Action tracker", icon: ListChecks },
  { id: "insights", label: "Regional insights", icon: Activity },
  { id: "brief", label: "Daily brief", icon: FileText },
];
const REGIONS = ["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Ahmedabad"];
const OWNERS = ["Fleet Coordinator", "Regional Operations Manager", "Ground Operations", "Safety Team"];

let sendTrigger = () => {};
function emit(type, data = {}) {
  const eventId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  sendTrigger({ type, event_id: eventId, ...data });
}
function initials(name = "Operations") { return name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase(); }
function dateLabel(value) {
  if (!value) return "—";
  const date = new Date(String(value).length <= 10 ? `${value}T00:00:00` : value);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
function dayDelta(value) {
  if (!value) return 0;
  const parsed = new Date(String(value).length <= 10 ? `${value}T00:00:00` : value);
  const start = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()).getTime();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - start) / 86400000);
}
function SectionTitle({ title, subtitle, action }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

function FleetDeskApp({ payload: incomingPayload, setTriggerValue }) {
  sendTrigger = (event) => setTriggerValue("event", event);
  const [payload, setPayload] = useState(incomingPayload || {});
  const [localPage, setLocalPage] = useState("report");
  const [overviewRegion, setOverviewRegion] = useState("All regions");
  const [filter, setFilter] = useState({ q: "", region: "All regions", status: "All statuses", category: "All types" });
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [draft, setDraft] = useState({ text: "", type: "Other", region: "Mumbai", language: "Auto-detect", reporter: "Field reporter" });
  const [reportUiLanguage, setReportUiLanguage] = useState("en");
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [busy, setBusy] = useState(false);
  const [briefCopied, setBriefCopied] = useState(false);
  const recorder = useRef(null);
  const stream = useRef(null);
  const photoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const next = incomingPayload || {};
    setPayload(next);
    setLocalPage(next.page || "report");
    if (next.toast) setToast(next.toast);
  }, [incomingPayload]);

  useEffect(() => {
    if (!recording) return undefined;
    const timer = window.setInterval(() => setRecordSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 4800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const reports = payload.reports || [];
  const actions = payload.actions || [];
  const metrics = payload.metrics || {};
  const integration = payload.integration || {};
  const page = localPage || payload.page || "report";
  const pending = payload.pending_report;
  const filteredActions = useMemo(() => actions.filter((row) => {
    const query = filter.q.toLowerCase();
    const matchesQuery = !query || [row.summary, row.bus_id, row.region, row.owner, row.action_id].some((value) => String(value || "").toLowerCase().includes(query));
    const matchesRegion = filter.region === "All regions" || row.region === filter.region;
    const matchesStatus = filter.status === "All statuses" || row.status === filter.status;
    const matchesType = filter.category === "All types" || row.category === filter.category;
    return matchesQuery && matchesRegion && matchesStatus && matchesType;
  }), [actions, filter]);

  function navigate(id) { setLocalPage(id); setMobileMenu(false); emit("navigate", { page: id }); }
  function stopTracks() { stream.current?.getTracks().forEach((track) => track.stop()); stream.current = null; }
  async function startRecording() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = mediaStream;
      const mediaRecorder = new MediaRecorder(mediaStream);
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
        setAudioBlob(blob); setAudioUrl(URL.createObjectURL(blob)); setRecording(false); stopTracks();
      };
      mediaRecorder.start(); recorder.current = mediaRecorder; setRecordSeconds(0); setRecording(true);
    } catch { setToast("Microphone access was unavailable. You can upload an audio file instead."); }
  }
  function stopRecording() { if (recorder.current?.state !== "inactive") recorder.current?.stop(); }
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = reject; reader.readAsDataURL(file);
    });
  }
  async function submitReport() {
    if (!draft.text.trim() && !audioBlob && !audioRef.current?.files?.[0]) { setToast(reportUiLanguage === "hi" ? "आगे बढ़ने के लिए आवाज़ रिकॉर्ड करें या छोटा विवरण लिखें।" : "Add a voice note or a short description to continue."); return; }
    setBusy(true);
    try {
      const photo = photoRef.current?.files?.[0];
      const uploadedAudio = audioRef.current?.files?.[0];
      emit("analyze_report", {
        text: draft.text,
        selected_type: draft.type,
        region: draft.region,
        language: draft.language,
        reporter: draft.reporter,
        audio_base64: audioBlob ? await fileToBase64(audioBlob) : uploadedAudio ? await fileToBase64(uploadedAudio) : "",
        attachment_base64: photo ? await fileToBase64(photo) : "",
        attachment_name: photo?.name || "",
      });
      setToast(reportUiLanguage === "hi" ? "रिपोर्ट मिली। दर्ज करने से पहले निकाली गई जानकारी जाँचें।" : "Report received. Review the detected details before it is logged.");
    } catch { setToast(reportUiLanguage === "hi" ? "फ़ाइल पढ़ी नहीं जा सकी। दूसरी रिकॉर्डिंग या तस्वीर आज़माएँ।" : "We couldn't read that file. Try another recording or image."); }
    setBusy(false);
  }

  function saveAction(row, edits) { emit("update_action", { action: { ...row, ...edits } }); }
  function navClick(id) { navigate(id); }

  return <div className="shell">
    <aside className={cn("sidebar", mobileMenu && "sidebar-open")}>
      <div className="brand"><div className="flixbus-logo-wrap"><img src="https://cdn.brandfetch.io/flixbus.no/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed" alt="FlixBus" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement.classList.add("logo-fallback"); }} /></div><button className="mobile-close icon-button" onClick={() => setMobileMenu(false)}><X size={17} /></button></div>
      <div className="workspace-pill"><div className="workspace-pulse" /><div><strong>India Operations</strong><span>Showcase workspace</span></div><ChevronDown size={14} /></div>
      <div className="nav-label">WORKSPACE</div>
      <nav className="nav-list">{NAV.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => navClick(id)} className={cn("nav-link", page === id && "nav-active")}><Icon size={18} /><span>{label}</span>{id === "exceptions" && metrics.overdue_actions > 0 && <em>{Math.min(metrics.overdue_actions, 99)}</em>}</button>)}</nav>
      <div className="sidebar-spacer" />
      <Card className="sidebar-help"><div className="help-icon"><Sparkles size={17} /></div><strong>Built for the field</strong><p>Turn unstructured reports into clear, owned actions.</p><button onClick={() => navClick("report")}>Create a report <ArrowRight size={14} /></button></Card>
      <div className="sidebar-profile"><div className="avatar">OP</div><div className="profile-info"><strong>Operations team</strong><span>Demo workspace</span></div><MoreHorizontal size={18} /></div>
      <div className="sidebar-brand-note">Independent portfolio concept · Not an official Flix product</div>
    </aside>
    {mobileMenu && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileMenu(false)} />}
    <main className="main">
      <div className="page-wrap">
        <button className="mobile-menu-trigger icon-button" onClick={() => setMobileMenu(true)} aria-label="Open navigation"><Menu size={20} /></button>
        {page === "overview" && <Overview payload={payload} actions={actions} reports={reports} navigate={navigate} selectedRegion={overviewRegion} setSelectedRegion={setOverviewRegion} />}
        {page === "exceptions" && <Exceptions actions={actions} reports={reports} navigate={navigate} />}
        {page === "tracker" && <Tracker rows={filteredActions} filter={filter} setFilter={setFilter} onSave={saveAction} navigate={navigate} />}
        {page === "report" && <ReportForm draft={draft} setDraft={setDraft} uiLanguage={reportUiLanguage} setUiLanguage={setReportUiLanguage} recording={recording} recordSeconds={recordSeconds} startRecording={startRecording} stopRecording={stopRecording} audioUrl={audioUrl} audioRef={audioRef} photoRef={photoRef} preview={preview} setPreview={setPreview} onSubmit={submitReport} busy={busy} />}
        {page === "confirm" && <ConfirmReport pending={pending} navigate={navigate} uiLanguage={reportUiLanguage} onConfirm={(fields) => emit("confirm_report", { fields })} />}
        {page === "insights" && <Insights payload={payload} actions={actions} reports={reports} />}
        {page === "brief" && <DailyBrief payload={payload} actions={actions} reports={reports} onRefresh={() => emit("generate_brief")} copied={briefCopied} onCopy={() => { navigator.clipboard?.writeText(briefText(payload, actions)); setBriefCopied(true); window.setTimeout(() => setBriefCopied(false), 1600); }} />}
        <footer className="page-footer"><span>{reportUiLanguage === "hi" && ["report", "confirm"].includes(page) ? "FleetDesk Lite · संचालन कार्यस्थल" : "FleetDesk Lite · Operations workspace"}</span><span><ShieldCheck size={13} /> {reportUiLanguage === "hi" && ["report", "confirm"].includes(page) ? "AI के सुझावों की जाँच व्यक्ति द्वारा की जाती है" : "AI suggestions are always reviewed by a person"}</span></footer>
      </div>
    </main>
    {toast && <div className="toast"><CircleCheck size={17} /><span>{toast}</span><button className="icon-button" onClick={() => setToast("")}><X size={15} /></button></div>}
  </div>;
}

function Overview({ payload, actions, reports, navigate, selectedRegion, setSelectedRegion }) {
  const visibleActions = selectedRegion === "All regions" ? actions : actions.filter((a) => a.region === selectedRegion);
  const visibleReports = selectedRegion === "All regions" ? reports : reports.filter((r) => r.region === selectedRegion);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const openActions = visibleActions.filter((a) => a.status !== "Closed");
  const closedActions = visibleActions.filter((a) => a.status === "Closed");
  const overdue = openActions.filter((a) => a.due_date && String(a.due_date).slice(0, 10) < today);
  const critical = openActions.filter((a) => a.severity === "Critical");
  const metrics = {
    reports_today: visibleReports.filter((r) => String(r.created_at || "").startsWith(today)).length,
    pending_review: visibleReports.filter((r) => String(r.review_status || "").toLowerCase().includes("pending")).length,
    open_actions: openActions.length,
    closed_actions: closedActions.length,
    overdue_actions: overdue.length,
    critical_actions: critical.length,
    closure_rate: visibleActions.length ? Math.round((closedActions.length / visibleActions.length) * 100) : 0,
  };
  const regionOptions = ["All regions", ...new Set([...actions, ...reports].map((row) => row.region).filter(Boolean))];
  const overviewRegions = selectedRegion === "All regions" ? payload.regions || [] : (payload.regions || []).filter((row) => row.region === selectedRegion);
  const overdueRows = overdue.slice(0, 4);
  const criticalRows = critical.slice(0, 3);
  return <>
    <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).toUpperCase()} <span className="eyebrow-sep">·</span> SHIFT OVERVIEW</div><h1>Good morning, team <span>☀️</span></h1><p>Here’s what needs your attention across the network today.</p></div><Button variant="outline" onClick={() => emit("refresh")}><RefreshCw size={15} /> Refresh data</Button></div>
    {payload.integration?.google_error ? <div className="sync-banner"><CircleAlert size={16} /><div><strong>Google sync needs attention</strong><span>{payload.integration.google_error} New actions remain available in local storage.</span></div></div> : !payload.integration?.google_connected && <div className="demo-banner"><div className="demo-banner-icon"><Sparkles size={17} /></div><div><strong>Showcase workspace</strong><span>You're viewing synthetic sample data. Connect Google Sheets to sync live submissions.</span></div><Badge tone="blue">DEMO DATA</Badge></div>}
    <div className="overview-region-filter"><div><strong>Network view</strong><span>{selectedRegion === "All regions" ? "All regions and operating teams" : `Showing reports and actions for ${selectedRegion}`}</span></div><label><span>Region</span><select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>{regionOptions.map((region) => <option key={region}>{region}</option>)}</select></label></div>
    <div className="metric-grid">
      <MetricCard title="Reports today" value={metrics.reports_today} icon={FileText} note={`${metrics.pending_review} waiting for review`} accent="green" trend={selectedRegion === "All regions" ? "+12%" : selectedRegion} />
      <MetricCard title="Open actions" value={metrics.open_actions} icon={ListChecks} note={`${metrics.closed_actions} closed this period`} accent="blue" trend={`${metrics.closure_rate}% close rate`} />
      <MetricCard title="Overdue" value={metrics.overdue_actions || 0} icon={Clock3} note="Needs owner follow-up" accent="amber" trend="Requires attention" />
      <MetricCard title="Critical" value={metrics.critical_actions || 0} icon={ShieldAlert} note="High-priority open issues" accent="red" trend="Act promptly" />
    </div>
    <div className="overview-grid">
      <Card className="needs-card"><div className="card-head"><div><h3>Needs attention</h3><p>Exceptions that may need action today</p></div><Button variant="ghost" size="sm" onClick={() => navigate("exceptions")}>View all <ArrowRight size={14} /></Button></div>
        <div className="attention-list">{criticalRows.length ? criticalRows.map((row) => <AttentionRow key={row.action_id} row={row} critical />) : <div className="empty-line"><CircleCheck size={17} /> No open critical issues. Nice work.</div>}
          {overdueRows.map((row) => <AttentionRow key={row.action_id} row={row} overdue />)}
          {!criticalRows.length && !overdueRows.length && <div className="empty-line"><CheckCheck size={17} /> No overdue actions right now.</div>}
        </div><button className="card-bottom-link" onClick={() => navigate("exceptions")}>Open exception centre <ArrowRight size={14} /></button>
      </Card>
      <Card className="regional-card"><div className="card-head"><div><h3>{selectedRegion === "All regions" ? "Regional pulse" : `${selectedRegion} pulse`}</h3><p>{selectedRegion === "All regions" ? "Open work and overdue actions by region" : "Open work and overdue actions in this region"}</p></div><Button variant="ghost" size="sm" onClick={() => navigate("insights")}>Insights <ArrowRight size={14} /></Button></div>{overviewRegions.length ? <RegionBars rows={overviewRegions} /> : <div className="empty-line">No regional actions yet.</div>}</Card>
    </div>
    <div className="bottom-grid">
      <Card className="activity-card"><div className="card-head"><div><h3>Latest field reports</h3><p>{selectedRegion === "All regions" ? "New information coming in from the network" : `Recent reports from ${selectedRegion}`}</p></div><Button variant="ghost" size="sm" onClick={() => navigate("tracker")}>View tracker <ArrowRight size={14} /></Button></div><ReportList rows={visibleReports.slice(0, 5)} compact /></Card>
      <Card className="brief-teaser"><div className="brief-teaser-top"><div className="brief-icon"><AudioLines size={18} /></div><Badge tone="green">READY</Badge></div><div className="eyebrow">{selectedRegion === "All regions" ? "OPERATIONS BRIEF" : `${selectedRegion.toUpperCase()} BRIEF`}</div><h3>{selectedRegion === "All regions" ? "Your daily brief is ready" : `${selectedRegion} operations brief`}</h3><p>{metrics.open_actions} open · {metrics.overdue_actions} overdue · {metrics.critical_actions} critical actions in the selected view.</p><Button variant="dark" onClick={() => navigate("brief")}>Open daily brief <ArrowRight size={15} /></Button></Card>
    </div>
  </>;
}
function MetricCard({ title, value, icon: Icon, note, accent, trend }) {
  return <Card className={`metric-card metric-${accent}`}><div className="metric-top"><span>{title}</span><div className="metric-icon"><Icon size={17} /></div></div><div className="metric-value">{value}</div><div className="metric-footer"><span>{note}</span><span className="metric-trend">{trend}</span></div></Card>;
}
function AttentionRow({ row, critical, overdue }) {
  const days = dayDelta(row.due_date);
  return <div className="attention-row"><div className={cn("attention-symbol", critical ? "symbol-red" : "symbol-amber")}>{critical ? <TriangleAlert size={17} /> : <Clock3 size={17} />}</div><div className="attention-copy"><div className="attention-title">{row.summary}</div><div>{row.region} <span>·</span> {row.bus_id || "Bus not identified"} <span>·</span> {row.owner}</div></div><Badge tone={critical ? "red" : "amber"}>{critical ? "Critical" : `${days}d overdue`}</Badge></div>;
}
function RegionBars({ rows }) {
  const max = Math.max(1, ...rows.map((r) => r.open || 0));
  return <div className="region-bars">{rows.slice(0, 5).map((row) => <div className="region-line" key={row.region}><div className="region-name">{row.region}</div><div className="region-track"><i style={{ width: `${Math.max(4, (row.open / max) * 100)}%` }} /></div><div className="region-count">{row.open}<small> open</small></div><div className={cn("region-overdue", row.overdue > 0 && "has-overdue")}>{row.overdue ? `${row.overdue} late` : "On track"}</div></div>)}</div>;
}
function ReportList({ rows, compact = false }) {
  if (!rows.length) return <div className="empty-state"><FileText size={24} /><strong>No reports to show</strong><span>New field reports will appear here.</span></div>;
  return <div className={cn("report-list", compact && "report-list-compact")}>{rows.map((row) => <div className="report-row" key={row.report_id}><div className={`report-avatar ${row.severity === "Critical" ? "report-avatar-red" : row.severity === "High" ? "report-avatar-amber" : ""}`}><FileText size={16} /></div><div className="report-summary"><div className="report-title">{row.summary}</div><div className="report-meta">{row.region} <span>·</span> {row.bus_id || "Bus pending"} <span>·</span> {row.detected_language || "English"}</div></div><div className="report-right"><Badge tone={severityTone(row.severity)}>{row.severity}</Badge><span>{timeLabel(row.created_at)}</span></div></div>)}</div>;
}
function timeLabel(value) {
  if (!value) return "";
  const d = new Date(value); if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
function severityTone(value) { return value === "Critical" ? "red" : value === "High" ? "amber" : value === "Medium" ? "blue" : "neutral"; }

function Exceptions({ actions, reports, navigate }) {
  const open = actions.filter((a) => a.status !== "Closed");
  const critical = open.filter((a) => a.severity === "Critical");
  const overdue = open.filter((a) => dayDelta(a.due_date) > 0);
  const pending = reports.filter((r) => String(r.review_status || "").toLowerCase().includes("pending"));
  const soon = open.filter((a) => dayDelta(a.due_date) >= -2 && dayDelta(a.due_date) <= 0);
  return <><PageHeader eyebrow="EXCEPTION CENTRE" title="Focus on what needs attention" subtitle="A prioritized queue of issues that need a human decision or follow-up." action={<Button onClick={() => navigate("tracker")}><ListChecks size={15} /> Go to tracker</Button>} />
    <div className="exception-stats"><ExceptionStat icon={ShieldAlert} title="Critical issues" value={critical.length} tone="red" detail="Immediate review" /><ExceptionStat icon={Clock3} title="Overdue actions" value={overdue.length} tone="amber" detail="Past their due date" /><ExceptionStat icon={FileImage} title="Awaiting review" value={pending.length} tone="blue" detail="Evidence or report review" /><ExceptionStat icon={CalendarDays} title="Due soon" value={soon.length} tone="green" detail="Due in the next 48 hours" /></div>
    <Card className="exception-list-card"><div className="card-head"><div><h3>Priority queue</h3><p>Sorted by urgency and age</p></div><Badge tone="red" dot>{critical.length + overdue.length} need attention</Badge></div>
      <div className="exception-items">{[...critical, ...overdue.filter((x) => !critical.includes(x))].sort((a, b) => (severityRank(b.severity) - severityRank(a.severity)) || dayDelta(b.due_date) - dayDelta(a.due_date)).map((row) => <div className="exception-item" key={row.action_id}><div className={`exception-severity exception-${severityTone(row.severity)}`}><ShieldAlert size={18} /></div><div className="exception-main"><div className="exception-title-line"><strong>{row.summary}</strong><Badge tone={severityTone(row.severity)}>{row.severity}</Badge></div><div className="exception-meta">{row.region} <span>·</span> {row.bus_id || "Unidentified bus"} <span>·</span> {row.category}</div><div className="exception-progress"><span>Owner <b>{row.owner}</b></span><span>Due <b>{dateLabel(row.due_date)}</b></span><span>{Math.max(0, dayDelta(row.due_date))} days overdue</span></div></div><button className="button button-outline button-sm" onClick={() => navigate("tracker")}>Review <ArrowRight size={14} /></button></div>)}
        {pending.map((row) => <div className="exception-item" key={row.report_id}><div className="exception-severity exception-blue"><FileImage size={18} /></div><div className="exception-main"><div className="exception-title-line"><strong>Evidence review pending · {row.category}</strong><Badge tone="blue">Human review</Badge></div><div className="exception-meta">{row.region} <span>·</span> {row.bus_id || "Bus not identified"} <span>·</span> {row.report_id}</div><div className="exception-progress"><span>Received <b>{timeLabel(row.created_at)}</b></span><span>Reporter <b>{row.reporter || "Field team"}</b></span></div></div><button className="button button-outline button-sm" onClick={() => navigate("tracker")}>Review <ArrowRight size={14} /></button></div>)}
        {!critical.length && !overdue.length && !pending.length && <div className="empty-state"><CircleCheck size={25} /><strong>All clear for now</strong><span>Critical issues and overdue actions will appear here.</span></div>}
      </div></Card>
    <div className="safety-note"><ShieldCheck size={18} /><div><strong>Evidence is for human review</strong><span>Photos or documents can be linked to a report, but FleetDesk does not automatically approve safety evidence.</span></div></div>
  </>;
}
function severityRank(value) { return ({ Critical: 4, High: 3, Medium: 2, Low: 1 })[value] || 0; }
function ExceptionStat({ icon: Icon, title, value, tone, detail }) { return <Card className={`exception-stat stat-${tone}`}><div className="stat-icon"><Icon size={17} /></div><span>{title}</span><strong>{value}</strong><small>{detail}</small></Card>; }

function Tracker({ rows, filter, setFilter, onSave, navigate }) {
  const [editing, setEditing] = useState("");
  const [editData, setEditData] = useState({});
  const [draftMessage, setDraftMessage] = useState("");
  const [quickView, setQuickView] = useState("all");
  const quickRows = rows.filter((row) => quickView === "all" || (quickView === "overdue" && row.status !== "Closed" && dayDelta(row.due_date) > 0) || (quickView === "critical" && row.status !== "Closed" && row.severity === "Critical") || (quickView === "unassigned" && (!row.owner || row.owner === "Unassigned")));
  const startEdit = (row) => { setEditing(row.action_id); setEditData({ owner: row.owner, status: row.status, due_date: row.due_date, resolution_notes: row.resolution_notes || "" }); };
  const closeEdit = () => { setEditing(""); setEditData({}); };
  return <><PageHeader eyebrow="ACTION MANAGEMENT" title="Action tracker" subtitle="Every report deserves a clear owner, due date, and closure." action={<Button onClick={() => navigate("report")}><Plus size={16} /> New report</Button>} />
    <Card className="tracker-card"><div className="tracker-toolbar"><div className="search-box"><Search size={16} /><input value={filter.q} onChange={(e) => setFilter({ ...filter, q: e.target.value })} placeholder="Search issue, bus, owner…" /></div><div className="filter-group"><label><Filter size={14} /> Filters</label><select value={filter.region} onChange={(e) => setFilter({ ...filter, region: e.target.value })}><option>All regions</option>{REGIONS.map((r) => <option key={r}>{r}</option>)}</select><select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}><option>All statuses</option>{["Open", "In progress", "Closed"].map((s) => <option key={s}>{s}</option>)}</select><select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}><option>All types</option>{[...new Set(rows.map((r) => r.category))].filter(Boolean).map((s) => <option key={s}>{s}</option>)}</select></div></div>
      <div className="tracker-quick-filters" aria-label="Quick action views">{[["all", "All actions", rows.length], ["overdue", "Overdue", rows.filter((r) => r.status !== "Closed" && dayDelta(r.due_date) > 0).length], ["critical", "Critical", rows.filter((r) => r.status !== "Closed" && r.severity === "Critical").length], ["unassigned", "Unassigned", rows.filter((r) => !r.owner || r.owner === "Unassigned").length]].map(([id, label, count]) => <button type="button" key={id} className={quickView === id ? "active" : ""} onClick={() => setQuickView(id)}>{label}<span>{count}</span></button>)}</div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>ISSUE</th><th>REGION / BUS</th><th>OWNER</th><th>DUE DATE</th><th>STATUS</th><th>ESCALATION</th><th /></tr></thead><tbody>{quickRows.map((row) => <React.Fragment key={row.action_id}><tr className={editing === row.action_id ? "row-editing" : ""}><td><div className="issue-cell"><div className={`issue-icon issue-${severityTone(row.severity)}`}><FileText size={15} /></div><div><strong>{row.summary}</strong><span>{row.category} <i>·</i> {row.action_id}</span><div className="evidence-links">{row.attachment_url?.startsWith("http") && <a href={row.attachment_url} target="_blank" rel="noreferrer"><FileImage size={11} /> Photo / file</a>}{row.audio_url?.startsWith("http") && <a href={row.audio_url} target="_blank" rel="noreferrer"><FileAudio size={11} /> Audio</a>}</div></div></div></td><td><strong>{row.region}</strong><span className="cell-secondary">{row.bus_id || "—"}</span></td><td><span className="owner-chip"><span className="owner-avatar">{initials(row.owner)}</span>{row.owner}</span></td><td><span className={cn("due-date", row.status !== "Closed" && dayDelta(row.due_date) > 0 && "due-over")}>{dateLabel(row.due_date)}</span>{row.status !== "Closed" && dayDelta(row.due_date) > 0 && <span className="due-sub">{dayDelta(row.due_date)}d overdue</span>}</td><td><Badge tone={row.status === "Closed" ? "green" : row.status === "In progress" ? "blue" : "neutral"} dot>{row.status}</Badge></td><td>{row.escalation && row.escalation !== "None" ? <Badge tone={row.escalation === "Immediate" ? "red" : "amber"}>{row.escalation}</Badge> : <span className="muted">—</span>}</td><td><button className="icon-button row-edit" title="Update action" onClick={() => editing === row.action_id ? closeEdit() : startEdit(row)}><MoreHorizontal size={18} /></button></td></tr>
        {editing === row.action_id && <tr className="edit-row"><td colSpan="7"><div className="edit-panel"><label>Owner<select value={editData.owner || ""} onChange={(e) => setEditData({ ...editData, owner: e.target.value })}>{OWNERS.map((owner) => <option key={owner}>{owner}</option>)}</select></label><label>Due date<input type="date" value={editData.due_date || ""} onChange={(e) => setEditData({ ...editData, due_date: e.target.value })} /></label><label>Status<select value={editData.status || "Open"} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>{["Open", "In progress", "Closed"].map((s) => <option key={s}>{s}</option>)}</select></label><label className="edit-notes">Closure notes<input value={editData.resolution_notes || ""} onChange={(e) => setEditData({ ...editData, resolution_notes: e.target.value })} placeholder="Add closure detail or evidence reference" /></label><Button size="sm" onClick={() => { onSave(row, editData); closeEdit(); }}>Save update</Button><Button size="sm" variant="outline" onClick={() => setDraftMessage(`Hi ${editData.owner || row.owner},\n\nFollowing up on ${row.category.toLowerCase()} for ${row.bus_id || "the assigned bus"} in ${row.region}. ${row.summary}\n\nCurrent due date: ${dateLabel(editData.due_date || row.due_date)}. Please share an update and expected closure time.\n\nThanks!`)}><Copy size={13} /> Draft follow-up</Button><Button size="sm" variant="ghost" onClick={closeEdit}>Cancel</Button></div></td></tr>}</React.Fragment>)}
        {!quickRows.length && <tr><td colSpan="7"><div className="empty-state"><Search size={23} /><strong>No actions match these filters</strong><span>Try changing or clearing your filters.</span></div></td></tr>}
      </tbody></table></div><div className="table-footer"><span>Showing <strong>{quickRows.length}</strong> actions</span><span><ShieldCheck size={13} /> Updates are recorded in the configured workspace</span></div>
    </Card>{draftMessage && <div className="modal-backdrop" onClick={() => setDraftMessage("")}><Card className="draft-modal" onClick={(e) => e.stopPropagation()}><div className="draft-modal-head"><div><div className="eyebrow">FOLLOW-UP DRAFT</div><h3>Ready to review and send</h3></div><button className="icon-button" onClick={() => setDraftMessage("")}><X size={17} /></button></div><p>This is a draft only. Review it and send using your approved channel.</p><textarea readOnly rows="7" value={draftMessage} /><div className="draft-modal-actions"><Button variant="outline" onClick={() => setDraftMessage("")}>Close</Button><Button onClick={() => navigator.clipboard?.writeText(draftMessage)}><Copy size={14} /> Copy message</Button></div></Card></div>}
  </>;
}

function ReportForm({ draft, setDraft, uiLanguage, setUiLanguage, recording, recordSeconds, startRecording, stopRecording, audioUrl, audioRef, photoRef, preview, setPreview, onSubmit, busy }) {
  const [dragOver, setDragOver] = useState(false);
  const hi = uiLanguage === "hi";
  const text = hi ? {
    eyebrow: "फील्ड रिपोर्ट", title: "समस्या दर्ज करें", subtitle: "अपनी भाषा में बोलें या छोटा नोट लिखें। किसी तय फ़ॉर्मेट की ज़रूरत नहीं।",
    step1: "क्या हुआ?", step1help: "आवाज़ रिकॉर्ड करें या अपने शब्दों में बताएँ।", listening: "सुन रहे हैं…", audioReady: "आवाज़ नोट तैयार है", speak: "अपनी भाषा में बोलें", finish: "रोकने के लिए टैप करें", audioAgain: "रिकॉर्ड जारी रखें या दूसरी फ़ाइल चुनें", languages: "हिंदी, हिंग्लिश, अंग्रेज़ी, मराठी, कन्नड़…", stop: "रोकें", record: "रिकॉर्ड करें", voice: "आवाज़ नोट", or: "या छोटा नोट लिखें", placeholder: "उदाहरण: बस 204 का ब्रेक जाँचें, ड्राइवर को ब्रेक धीमा लगा…", hint: "किसी भी भाषा में लिखें; हम जानकारी व्यवस्थित करने में मदद करेंगे।",
    step2: "जानकारी जोड़ें", step2help: "कुछ जानकारी सही टीम तक रिपोर्ट पहुँचाने में मदद करेगी।", type: "रिपोर्ट का प्रकार", region: "क्षेत्र", language: "रिपोर्ट की भाषा", reporter: "रिपोर्ट करने वाले", step3: "सबूत जोड़ें", optional: "वैकल्पिक", step3help: "जाँच के लिए तस्वीर या दस्तावेज़ जोड़ें।", attached: "सबूत जोड़ा गया", visible: "सिर्फ़ अधिकृत समीक्षकों को दिखेगा", remove: "हटाएँ", drop: "तस्वीर यहाँ छोड़ें या", browse: "फ़ाइल चुनें", size: "JPG, PNG, PDF · अधिकतम 25 MB", uploadPrompt: "क्या आपके पास पहले से आवाज़ नोट है?", upload: "आवाज़ अपलोड करें", review: "सेव करने से पहले AI की जानकारी जाँचें", continue: "जाँच के लिए आगे बढ़ें", busy: "रिपोर्ट व्यवस्थित हो रही है…", suggestionTitle: "जल्दी जोड़ें", suggestionHelp: "किसी सुझाव को टैप करें; फिर खाली जगहों में जानकारी भरें।",
    smart: "स्मार्ट रिपोर्ट", asideTitle: "आवाज़ से स्पष्ट कार्रवाई तक", aside: "FleetDesk आपकी रिपोर्ट को ऐसी जानकारी में बदलने में मदद करता है जिस पर संचालन टीम कार्रवाई कर सके।", transcribe: "लिखित रूप में बदलें", original: "मूल भाषा बनाए रखें", structure: "जानकारी व्यवस्थित करें", fields: "श्रेणी, बस, गंभीरता और सारांश", confirm: "आप पुष्टि करें", edit: "दर्ज करने से पहले बदलाव करें", human: "मानवीय जाँच ज़रूरी", safety: "सुरक्षा से जुड़े फ़ैसले और सबूत की जाँच व्यक्ति ही करेगा।", secure: "कनेक्ट होने पर फ़ाइलें प्रतिबंधित Drive फ़ोल्डर में रहेंगी।",
  } : {
    eyebrow: "FIELD REPORTING", title: "Report an issue", subtitle: "Speak naturally or write a quick note. No forms to memorize.",
    step1: "What happened?", step1help: "Record a voice note or tell us in your own words.", listening: "Listening…", audioReady: "Voice note ready", speak: "Speak in your language", finish: "Tap to finish", audioAgain: "You can keep recording or upload a different file", languages: "Hindi, Hinglish, English, Marathi, Kannada…", stop: "Stop", record: "Record", voice: "Voice note", or: "or type a quick note", placeholder: "e.g. Bus 204 ka brake check karna hai, driver ko response slow lag raha tha…", hint: "Write naturally in any language; we’ll help structure it.",
    step2: "Add context", step2help: "A few details help route this to the right team.", type: "Report type", region: "Region", language: "Report language", reporter: "Reported by", step3: "Attach evidence", optional: "OPTIONAL", step3help: "Add a photo or document for a person to review.", attached: "Evidence attached", visible: "Visible to authorized reviewers", remove: "Remove", drop: "Drop a photo here or", browse: "browse files", size: "JPG, PNG, PDF · up to 25 MB", uploadPrompt: "Have an existing voice note?", upload: "Upload audio", review: "You’ll review AI-detected details before saving", continue: "Continue to review", busy: "Structuring report…", suggestionTitle: "Quick add", suggestionHelp: "Tap a prompt to add it, then fill in the blanks.",
    smart: "SMART INTAKE", asideTitle: "From voice note to clear action", aside: "FleetDesk helps turn an unstructured report into information the operations team can act on.", transcribe: "We transcribe", original: "Keep the original language", structure: "We structure", fields: "Category, bus, severity and summary", confirm: "You confirm", edit: "Edit anything before it is logged", human: "People stay in the loop", safety: "Safety-critical decisions and evidence review always remain with a person.", secure: "Uploaded files are stored in a restricted Drive folder when connected.",
  };
  const types = [["Pre-trip check", hi ? "यात्रा-पूर्व जाँच" : "Pre-trip check"], ["Safety incident", hi ? "सुरक्षा घटना" : "Safety incident"], ["Vehicle defect", hi ? "वाहन में खराबी" : "Vehicle defect"], ["Passenger complaint", hi ? "यात्री की शिकायत" : "Passenger complaint"], ["Documentation", hi ? "दस्तावेज़" : "Documentation"], ["Other", hi ? "अन्य" : "Other"]];
  const languages = [["Auto-detect", hi ? "अपने आप पहचानें" : "Auto-detect"], ["Hindi", hi ? "हिंदी" : "Hindi"], ["English", hi ? "अंग्रेज़ी" : "English"], ["Marathi", hi ? "मराठी" : "Marathi"], ["Kannada", hi ? "कन्नड़" : "Kannada"], ["Tamil", hi ? "तमिल" : "Tamil"], ["Telugu", hi ? "तेलुगु" : "Telugu"], ["Bengali", hi ? "बंगाली" : "Bengali"], ["Gujarati", hi ? "गुजराती" : "Gujarati"], ["Other", hi ? "अन्य" : "Other"]];
  const roles = [["Field reporter", hi ? "फील्ड रिपोर्टर" : "Field reporter"], ["Driver", hi ? "ड्राइवर" : "Driver"], ["Fleet Coordinator", hi ? "फ़्लीट समन्वयक" : "Fleet Coordinator"], ["Ground Operations", hi ? "ग्राउंड ऑपरेशंस" : "Ground Operations"], ["Safety Team", hi ? "सुरक्षा टीम" : "Safety Team"]];
  const suggestions = hi ? [
    ["ब्रेक / वाहन", "वाहन में खराबी: बस नंबर ___ में ___ की समस्या है। स्थान ___, समय ___।"], ["टायर", "बस नंबर ___ के ___ टायर में ___ समस्या दिखी। स्थान ___, समय ___।"], ["एसी / सुविधा", "बस नंबर ___ में ___ काम नहीं कर रहा। यात्री/चालक पर असर: ___।"], ["यात्री शिकायत", "यात्री की शिकायत: ___. बस नंबर ___, रूट ___, समय ___।"], ["दस्तावेज़", "बस नंबर ___ का ___ दस्तावेज़ समाप्त/अस्पष्ट है। अगली समय-सीमा ___।"], ["यात्रा-पूर्व जाँच", "बस नंबर ___ की यात्रा-पूर्व जाँच ___ कारण से पूरी नहीं हुई। प्रस्थान समय ___।"], ["देरी", "रूट ___ पर बस नंबर ___ लगभग ___ मिनट देर से है। कारण/मदद: ___।"], ["सुरक्षा घटना", "सुरक्षा घटना: ___. बस नंबर ___, स्थान ___, समय ___. चोट/तत्काल जोखिम: ___।"], ["बैटरी / इलेक्ट्रिकल", "बस नंबर ___ में बैटरी/इलेक्ट्रिकल समस्या: ___। चेतावनी संकेत ___, स्थान ___, समय ___।"], ["GPS / ट्रैकिंग", "बस नंबर ___ का GPS/ट्रैकिंग अपडेट नहीं हो रहा। रूट ___, समस्या शुरू हुई ___।"], ["चालक दल की कमी", "रूट ___ / बस ___ के लिए ___ चालक दल सदस्य उपलब्ध नहीं है। प्रस्थान समय ___।"], ["रूट बाधा", "रूट ___ पर ___ के पास रास्ता बंद/अवरुद्ध है। बस ___ लगभग ___ मिनट देर से है।"], ["सफाई", "बस नंबर ___ में ___ जगह सफाई की ज़रूरत है। अगला प्रस्थान ___ बजे।"],
  ] : [
    ["Brake / vehicle", "Vehicle issue: Bus ___ has a ___ problem. Location ___, time ___."], ["Tyre", "Tyre issue: Bus ___, ___ tyre has ___. Location ___, time ___."], ["AC / amenity", "Bus ___: ___ is not working. Impact on passengers/driver: ___."], ["Passenger complaint", "Passenger complaint: ___. Bus ___, route ___, time ___."], ["Documents", "Bus ___: ___ document is expired/unclear. Required by ___."], ["Pre-trip check", "Pre-trip check for bus ___ was not completed because ___. Departure time ___."], ["Delay", "Bus ___ on route ___ is about ___ minutes late. Reason/help needed: ___."], ["Safety incident", "Safety incident: ___. Bus ___, location ___, time ___. Injury/immediate risk: ___."], ["Battery / electrical", "Battery/electrical issue on Bus ___: ___. Warning shown ___, location ___, time ___."], ["GPS / tracking", "GPS/tracking is not updating for Bus ___ on route ___. Issue began ___."], ["Crew availability", "Crew shortage for route ___ / Bus ___: ___ crew member unavailable. Departure ___."], ["Road / route blocked", "Route ___ is blocked near ___. Bus ___ delayed about ___ minutes; help needed ___."], ["Cleanliness", "Cleanliness issue on Bus ___: ___ area needs attention before departure at ___."],
  ];
  return <><div className="report-language-row"><span>{hi ? "रिपोर्ट फ़ॉर्म की भाषा" : "Report form language"}</span><div className="report-language-toggle" role="group" aria-label="Report form language"><button type="button" className={!hi ? "selected" : ""} aria-pressed={!hi} onClick={() => setUiLanguage("en")}>English</button><button type="button" className={hi ? "selected" : ""} aria-pressed={hi} onClick={() => setUiLanguage("hi")}>हिंदी</button></div></div><PageHeader eyebrow={text.eyebrow} title={text.title} subtitle={text.subtitle} />
    <div className="report-form-layout"><Card className="report-form-card"><div className="form-section-title"><div className="step-number">01</div><div><h3>{text.step1}</h3><p>{text.step1help}</p></div></div>
      <div className="voice-box"><div className="voice-orb"><AudioLines size={23} /></div><div className="voice-copy"><strong>{recording ? text.listening : audioUrl ? text.audioReady : text.speak}</strong><span>{recording ? `${Math.floor(recordSeconds / 60).toString().padStart(2, "0")}:${(recordSeconds % 60).toString().padStart(2, "0")} · ${text.finish}` : audioUrl ? text.audioAgain : text.languages}</span></div><Button variant={recording ? "recording" : "dark"} onClick={recording ? stopRecording : startRecording}>{recording ? <><Square size={14} fill="currentColor" /> {text.stop}</> : <><Mic size={15} /> {text.record}</>}</Button></div>
      {audioUrl && <div className="audio-player"><button className="play-audio" onClick={() => document.getElementById("recorded-audio")?.play()}><Play size={15} fill="currentColor" /></button><div className="audio-wave">{Array.from({ length: 40 }, (_, i) => <i key={i} style={{ height: `${8 + ((i * 13) % 18)}px` }} />)}</div><span>{text.voice}</span><audio id="recorded-audio" src={audioUrl} controls /></div>}
      <div className="or-divider"><span />{text.or}<span /></div><textarea className="description-input" value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} placeholder={text.placeholder} rows="4" /><div className="field-hint"><Languages size={14} /> {text.hint}</div><div className="report-suggestions"><div className="suggestion-heading"><strong>{text.suggestionTitle}</strong><span>{text.suggestionHelp}</span></div><div className="suggestion-chips">{suggestions.map(([label, template]) => <button type="button" key={label} onClick={() => setDraft({ ...draft, text: `${draft.text.trim()}${draft.text.trim() ? "\n" : ""}${template}` })}><Plus size={12} />{label}</button>)}</div></div>
      <div className="form-section-title form-next"><div className="step-number">02</div><div><h3>{text.step2}</h3><p>{text.step2help}</p></div></div>
      <div className="form-two-col"><label>{text.type}<select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>{types.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>{text.region}<select value={draft.region} onChange={(e) => setDraft({ ...draft, region: e.target.value })}>{REGIONS.map((region) => <option key={region}>{region}</option>)}</select></label><label>{text.language}<select value={draft.language} onChange={(e) => setDraft({ ...draft, language: e.target.value })}>{languages.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>{text.reporter}<select value={draft.reporter} onChange={(e) => setDraft({ ...draft, reporter: e.target.value })}>{roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
      <div className="form-section-title form-next"><div className="step-number">03</div><div><h3>{text.step3} <span className="optional">{text.optional}</span></h3><p>{text.step3help}</p></div></div>
      <div className={cn("upload-zone", dragOver && "upload-drag")} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files?.[0]; if (file) { const transfer = new DataTransfer(); transfer.items.add(file); photoRef.current.files = transfer.files; setPreview(URL.createObjectURL(file)); } }} onClick={() => !preview && photoRef.current?.click()}>
        {preview ? <div className="photo-preview"><img src={preview} alt={text.attached} /><div><strong>{text.attached}</strong><span>{text.visible}</span><button type="button" onClick={(e) => { e.stopPropagation(); setPreview(""); photoRef.current.value = ""; }}><X size={13} /> {text.remove}</button></div></div> : <><div className="upload-icon"><Upload size={18} /></div><div><strong>{text.drop} <button type="button" onClick={(e) => { e.stopPropagation(); photoRef.current?.click(); }}>{text.browse}</button></strong><span>{text.size}</span></div></>}
        <input ref={photoRef} type="file" accept="image/*,.pdf" hidden onChange={(e) => { const file = e.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} />
      </div><div className="audio-upload-link"><FileAudio size={15} /><span>{text.uploadPrompt}</span><button onClick={() => audioRef.current?.click()}>{text.upload}</button><input ref={audioRef} type="file" accept="audio/*" hidden /></div>
      <div className="form-actions"><span><ShieldCheck size={15} /> {text.review}</span><Button size="lg" onClick={onSubmit} disabled={busy}>{busy ? <><LoaderCircle size={16} className="spin" /> {text.busy}</> : <>{text.continue} <ArrowRight size={16} /></>}</Button></div>
    </Card>
      <div className="report-aside"><Card className="how-card"><div className="how-icon"><Sparkles size={18} /></div><div className="eyebrow">{text.smart}</div><h3>{text.asideTitle}</h3><p>{text.aside}</p><div className="how-step"><i>1</i><span><strong>{text.transcribe}</strong><small>{text.original}</small></span></div><div className="how-step"><i>2</i><span><strong>{text.structure}</strong><small>{text.fields}</small></span></div><div className="how-step"><i>3</i><span><strong>{text.confirm}</strong><small>{text.edit}</small></span></div></Card><Card className="drive-preview-card"><div className="drive-preview-head"><div className="drive-preview-icon"><FileImage size={17} /></div><span className="drive-preview-badge">SHOWCASE PREVIEW</span></div><div className="eyebrow">GOOGLE DRIVE EVIDENCE</div><h3>Evidence linked to every issue</h3><p>Photos and audio can be organized in Drive by report, with a private evidence link saved alongside the issue in Google Sheets.</p><div className="drive-preview-points"><span><FileImage size={13} /> Photos & voice notes</span><span><ShieldCheck size={13} /> Restricted access</span><span><Link2 size={13} /> Link stored with report</span></div><div className="media-note"><span>Drive connection is not enabled in this showcase yet. Attachments currently stay in the app's local storage.</span></div></Card><div className="privacy-callout"><ShieldCheck size={17} /><div><strong>{text.human}</strong><span>{text.safety}</span></div></div><div className="secure-note"><LockIcon /> {text.secure}</div></div>
    </div>
  </>;
}
function LockIcon() { return <ShieldCheck size={13} />; }

function ConfirmReport({ pending, navigate, uiLanguage, onConfirm }) {
  const [fields, setFields] = useState({});
  useEffect(() => { if (pending?.result) setFields({ ...pending.result }); }, [pending]);
  const hi = uiLanguage === "hi";
  const t = hi ? { eyebrow: "रिपोर्ट की जाँच", title: "रिपोर्ट की जानकारी की पुष्टि करें", subtitle: "AI के सुझाव बदले जा सकते हैं। सेव करने से पहले जानकारी जाँचें।", start: "रिपोर्ट दर्ज करें", back: "रिपोर्ट पर वापस जाएँ", draft: "रिपोर्ट का मसौदा तैयार", check: "क्या हमने आपकी बात सही समझी? दर्ज करने से पहले जानकारी जाँचें या बदलें।", human: "मानवीय जाँच", missing: "एक जानकारी अधूरी हो सकती है", busRoute: "बस नंबर या रूट की जानकारी जाँचें और भरें।", summary: "पूरी रिपोर्ट का सारांश", items: "अलग-अलग कार्रवाई योग्य समस्याएँ", multi: "एक आवाज़ नोट से कई समस्याएँ दर्ज हो सकती हैं।", issue: "समस्या", actionSummary: "कार्रवाई का सारांश", category: "श्रेणी", severity: "गंभीरता", bus: "बस नंबर", route: "रूट", busPlaceholder: "जैसे FLX-204", routePlaceholder: "यदि पता हो", english: "अंग्रेज़ी सारांश / अनुवाद", original: "मूल रिपोर्ट", willCreate: "कार्रवाई फ़्लीट समन्वयक को सौंपी जाएगी।", confirm: "पुष्टि करें और कार्रवाई दर्ज करें", next: "इसके बाद क्या होगा", captured: "रिपोर्ट मिली", review: "आप AI से निकाली गई जानकारी जाँच रहे हैं", created: "कार्रवाई बनाई गई", owner: "जिम्मेदार व्यक्ति और समय-सीमा तय होगी", detected: "पहचानी गई भाषा", confidence: "अनुमानित भरोसा", confidenceNote: "यह मॉडल का अनुमान है, सही होने की गारंटी नहीं।", step: "चरण" } : { eyebrow: "REPORT REVIEW", title: "Confirm the report details", subtitle: "AI suggestions are editable. Please verify these details before saving.", start: "Create a report", back: "Back to report", draft: "Draft structured", check: "Did we understand you correctly? Review or edit this before it is logged.", human: "HUMAN REVIEW", missing: "One detail may be missing", busRoute: "Please check and enter the bus or route details.", summary: "Overall report summary", items: "Separate action items", multi: "A voice note can create multiple trackable issues.", issue: "Issue", actionSummary: "Action summary", category: "Category", severity: "Severity", bus: "Bus ID", route: "Route", busPlaceholder: "e.g. FLX-204", routePlaceholder: "If known", english: "English summary / translation", original: "Original report", willCreate: "assigned to the Fleet Coordinator.", confirm: "Confirm and log action", next: "What happens next", captured: "Report captured", review: "You're checking AI-extracted details", created: "Action created", owner: "Owner and due date are assigned", detected: "DETECTED LANGUAGE", confidence: "Confidence estimate", confidenceNote: "Confidence is a model estimate, not a correctness guarantee.", step: "Step" };
  if (!pending?.result) return <><PageHeader eyebrow={t.eyebrow} title={hi ? "अभी जाँचने के लिए रिपोर्ट नहीं है" : "Nothing to review yet"} subtitle={hi ? "पहले फील्ड रिपोर्ट दर्ज करें।" : "Start by submitting a field report."} action={<Button onClick={() => navigate("report")}>{t.start}</Button>} /></>;
  const result = pending.result;
  return <><PageHeader eyebrow={`${t.eyebrow} · ${t.step} 2 ${hi ? "में से" : "of"} 2`} title={t.title} subtitle={t.subtitle} action={<Button variant="outline" onClick={() => navigate("report")}><ArrowRight size={14} /> {t.back}</Button>} />
    <div className="confirm-layout"><Card className="confirm-card"><div className="review-banner"><div className="review-spark"><Sparkles size={16} /></div><div><strong>{t.draft} · {result.ai_mode || (hi ? "डेमो निष्कर्ष" : "Demo extraction")}</strong><span>{t.check}</span></div><Badge tone="blue">{t.human}</Badge></div>
      {result.needs_follow_up && <div className="follow-up-banner"><CircleAlert size={17} /><div><strong>{t.missing}</strong><span>{hi ? t.busRoute : result.follow_up_question || t.busRoute}</span></div></div>}
      <div className="confirm-fields"><label>{t.summary}<textarea rows="2" value={fields.summary || ""} onChange={(e) => setFields({ ...fields, summary: e.target.value })} /></label><div className="issues-review"><div className="issues-review-head"><div><strong>{t.items}</strong><span>{t.multi}</span></div><Badge tone="blue">{(fields.issues || []).length} {hi ? "मदें" : "ITEMS"}</Badge></div>{(fields.issues || []).map((issue, index) => <div className="issue-review-card" key={index}><div className="issue-review-title"><span>{String(index + 1).padStart(2, "0")}</span><strong>{t.issue} {index + 1}</strong><Badge tone={severityTone(issue.severity)}>{hi ? ({ Low: "कम", Medium: "मध्यम", High: "ज़्यादा", Critical: "गंभीर" }[issue.severity] || issue.severity) : issue.severity}</Badge></div><label>{t.actionSummary}<textarea rows="2" value={issue.summary || ""} onChange={(e) => setFields({ ...fields, issues: fields.issues.map((x, i) => i === index ? { ...x, summary: e.target.value } : x) })} /></label><div className="form-two-col"><label>{t.category}<select value={issue.category || "Other"} onChange={(e) => setFields({ ...fields, issues: fields.issues.map((x, i) => i === index ? { ...x, category: e.target.value } : x) })}>{[["Safety incident", "सुरक्षा घटना"], ["Vehicle defect", "वाहन में खराबी"], ["Pre-trip check", "यात्रा-पूर्व जाँच"], ["Passenger complaint", "यात्री की शिकायत"], ["Documentation", "दस्तावेज़"], ["Operations", "संचालन"], ["Other", "अन्य"]].map(([value, label]) => <option key={value} value={value}>{hi ? label : value}</option>)}</select></label><label>{t.severity}<select value={issue.severity || "Medium"} onChange={(e) => setFields({ ...fields, issues: fields.issues.map((x, i) => i === index ? { ...x, severity: e.target.value } : x) })}>{[["Low", "कम"], ["Medium", "मध्यम"], ["High", "ज़्यादा"], ["Critical", "गंभीर"]].map(([value, label]) => <option key={value} value={value}>{hi ? label : value}</option>)}</select></label><label>{t.bus}<input value={issue.bus_id || ""} onChange={(e) => setFields({ ...fields, issues: fields.issues.map((x, i) => i === index ? { ...x, bus_id: e.target.value } : x) })} placeholder={t.busPlaceholder} /></label><label>{t.route}<input value={issue.route || ""} onChange={(e) => setFields({ ...fields, issues: fields.issues.map((x, i) => i === index ? { ...x, route: e.target.value } : x) })} placeholder={t.routePlaceholder} /></label></div></div>)}</div>
        <label>{t.english}<textarea rows="3" value={fields.english_text || ""} onChange={(e) => setFields({ ...fields, english_text: e.target.value })} /></label><label>{t.original}<textarea rows="3" value={fields.original_text || ""} onChange={(e) => setFields({ ...fields, original_text: e.target.value })} /></label>
      </div><div className="confirm-bottom"><span><ShieldCheck size={14} /> {(fields.issues || []).length || 1} {hi ? "कार्रवाई" : `action${(fields.issues || []).length === 1 ? "" : "s"}`} {t.willCreate}</span><Button size="lg" onClick={() => onConfirm(fields)}><Check size={16} /> {t.confirm}</Button></div>
    </Card><Card className="confirm-side"><h3>{t.next}</h3><div className="next-step"><span className="next-dot done"><Check size={12} /></span><div><strong>{t.captured}</strong><small>{pending.region} · {pending.reporter}</small></div></div><div className="next-step"><span className="next-dot current">2</span><div><strong>{hi ? "मानवीय जाँच" : "Human review"}</strong><small>{t.review}</small></div></div><div className="next-step"><span className="next-dot">3</span><div><strong>{t.created}</strong><small>{t.owner}</small></div></div><div className="confirm-original"><div className="eyebrow">{t.detected}</div><strong>{result.detected_language || (hi ? "अपने आप पहचानें" : "Auto-detect")}</strong><p>{t.confidence} <b>{Math.round((result.confidence || 0.7) * 100)}%</b></p><small>{t.confidenceNote}</small></div></Card></div>
  </>;
}

function Insights({ payload, actions, reports }) {
  const categories = payload.categories || [];
  const regions = payload.regions || [];
  const topRegion = [...regions].sort((a, b) => b.overdue - a.overdue)[0];
  const topCategory = categories[0];
  const recurring = Object.entries(reports.reduce((acc, r) => { const key = `${r.bus_id || "Unidentified"} · ${r.category}`; acc[key] = (acc[key] || 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxCat = Math.max(1, ...categories.map((x) => x.count));
  const maxReg = Math.max(1, ...regions.map((x) => x.total));
  return <><PageHeader eyebrow="OPERATIONS ANALYTICS" title="See where patterns are forming" subtitle="A lightweight read on issue mix, regional backlog, and recurring reports." />
    <div className="insight-callout"><div className="insight-callout-icon"><Sparkles size={17} /></div><div><div className="eyebrow">SIGNAL TO REVIEW</div><strong>{topRegion?.region || "Regional data"} has {topRegion?.overdue || 0} overdue action{topRegion?.overdue === 1 ? "" : "s"}{topCategory ? `; ${topCategory.category.toLowerCase()} is the most reported category` : ""}.</strong><p>This is a pattern to investigate, not a confirmed root cause. Check owner capacity, partner delays, and evidence quality with the regional team.</p></div><Badge tone="amber">OBSERVED DATA</Badge></div>
    <div className="insights-grid"><Card className="analytics-card"><div className="card-head"><div><h3>Actions by category</h3><p>All current and closed actions</p></div><Activity size={17} className="card-head-icon" /></div><div className="category-chart">{categories.map((item, index) => <div className="category-bar-row" key={item.category}><div className="category-label"><span>{item.category}</span><strong>{item.count}</strong></div><div className="category-track"><i className={`cat-color-${index % 5}`} style={{ width: `${Math.max(3, (item.count / maxCat) * 100)}%` }} /></div></div>)}</div></Card>
      <Card className="analytics-card"><div className="card-head"><div><h3>Regional workload</h3><p>Actions by region and late items</p></div><Gauge size={17} className="card-head-icon" /></div><div className="workload-list">{regions.map((region) => <div className="workload-row" key={region.region}><div className="region-avatar">{initials(region.region)}</div><div className="workload-main"><div><strong>{region.region}</strong><span>{region.total} total actions</span></div><div className="workload-track"><i style={{ width: `${Math.max(5, (region.total / maxReg) * 100)}%` }} /></div></div><div className="workload-late">{region.overdue}<small> late</small></div></div>)}</div></Card>
      <Card className="analytics-card recurring-card"><div className="card-head"><div><h3>Recurring bus and issue combinations</h3><p>Repeated reports worth a closer look</p></div><Bus size={17} className="card-head-icon" /></div><div className="recurring-list">{recurring.map(([key, count], index) => <div className="recurring-row" key={key}><span className={`recurring-rank ${index < 2 ? "rank-hot" : ""}`}>{String(index + 1).padStart(2, "0")}</span><strong>{key}</strong><span>{count} reports</span><button title="Review tracker"><ArrowRight size={14} /></button></div>)}</div></Card>
      <Card className="analytics-card process-card"><div className="card-head"><div><h3>Process adherence</h3><p>Pre-trip check reporting in sample data</p></div><CheckCheck size={17} className="card-head-icon" /></div><div className="adherence-number">{Math.max(0, Math.round(100 - ((reports.filter((r) => r.category === "Pre-trip check" && r.review_status === "Pending review").length / Math.max(1, reports.filter((r) => r.category === "Pre-trip check").length)) * 100)))}<small>%</small></div><p className="adherence-sub">Reviewed pre-trip checks in the current sample.</p><div className="adherence-note"><CircleAlert size={15} /> Demo data does not include expected check-ins by trip, so this is not a true compliance rate.</div></Card>
    </div><div className="method-note"><ShieldCheck size={15} /><span>These are descriptive patterns from the available sample. Validate operational causes with regional teams before taking action.</span></div>
  </>;
}

function briefText(payload, actions) {
  const metrics = payload.metrics || {};
  const critical = actions.filter((a) => a.status !== "Closed" && a.severity === "Critical").length;
  const overdue = actions.filter((a) => a.status !== "Closed" && dayDelta(a.due_date) > 0).length;
  return `FleetDesk Lite · Daily Operations Brief\n${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}\n\nOpen actions: ${metrics.open_actions || 0}\nOverdue actions: ${overdue}\nCritical issues: ${critical}\nReports today: ${metrics.reports_today || 0}\n\nReview critical safety issues first, then follow up on the oldest overdue actions.`;
}
function DailyBrief({ payload, actions, reports, onRefresh, copied, onCopy }) {
  const metrics = payload.metrics || {};
  const critical = actions.filter((a) => a.status !== "Closed" && a.severity === "Critical");
  const overdue = actions.filter((a) => a.status !== "Closed" && dayDelta(a.due_date) > 0);
  const pending = reports.filter((r) => String(r.review_status || "").toLowerCase().includes("pending"));
  const missing = Math.max(0, 12 - reports.filter((r) => r.category === "Pre-trip check").length);
  const mostAtRisk = [...(payload.regions || [])].sort((a, b) => b.overdue - a.overdue)[0];
  return <><PageHeader eyebrow="OPERATIONS BRIEF" title="The day, at a glance" subtitle="A concise handover built from reports and open actions in this workspace." action={<><Button variant="outline" onClick={onRefresh}><RefreshCw size={14} /> Refresh brief</Button><Button onClick={onCopy}>{copied ? <Check size={15} /> : <Download size={15} />}{copied ? "Copied" : "Copy brief"}</Button></>} />
    <div className="brief-layout"><Card className="daily-brief-card"><div className="brief-header"><div><div className="brand-mini"><div className="brand-mark small"><Bus size={14} /></div> FLEETDESK LITE <span>·</span> OPERATIONS</div><h2>Daily Operations Brief</h2><p>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} <span>·</span> {payload.generated_at || "Updated moments ago"}</p></div><div className="brief-status"><span className="status-mark"><CircleAlert size={19} /></span><span><strong>{critical.length || overdue.length ? "Attention required" : "On track"}</strong><small>Current workspace</small></span></div></div>
      <div className="brief-metrics"><div><span>Open actions</span><strong>{metrics.open_actions || 0}</strong></div><div><span>Overdue</span><strong className={overdue.length ? "text-amber" : ""}>{overdue.length}</strong></div><div><span>Critical</span><strong className={critical.length ? "text-red" : ""}>{critical.length}</strong></div><div><span>Reports today</span><strong>{metrics.reports_today || 0}</strong></div></div>
      <BriefSection icon={ShieldAlert} tone="red" title="Critical and pending review"><ul>{critical.slice(0, 4).map((x) => <li key={x.action_id}><b>{x.region}</b> · {x.summary} <small>({x.owner})</small></li>)}{pending.slice(0, 3).map((x) => <li key={x.report_id}><b>Awaiting verification</b> · {x.category} report from {x.region}</li>)}{!critical.length && !pending.length && <li>No critical reports or pending reviews in the current data.</li>}</ul></BriefSection>
      <BriefSection icon={Clock3} tone="amber" title="Overdue follow-ups"><ul>{overdue.slice(0, 5).map((x) => <li key={x.action_id}><b>{x.region}</b> · {x.summary} <small>— {Math.max(0, dayDelta(x.due_date))} days late, {x.owner}</small></li>)}{!overdue.length && <li>No overdue actions in the current data.</li>}</ul></BriefSection>
      <BriefSection icon={CalendarDays} tone="blue" title="Check-in visibility"><ul><li><b>{missing}</b> pre-trip check reports missing against a demo assumption of 12 expected checks.</li></ul><p className="assumption-note">This is a showcase assumption. A live process needs an expected trip/driver roster to calculate missing check-ins accurately.</p></BriefSection>
      <BriefSection icon={Sparkles} tone="green" title="AI-assisted summary"><p>{payload.daily_summary || (mostAtRisk ? <><b>{mostAtRisk.region}</b> currently has the largest overdue count ({mostAtRisk.overdue}). Review the action types and owners with the regional team to understand the cause.</> : "No regional action data available yet.")}</p><p className="assumption-note">Summary is grounded in recorded counts; any possible cause must be verified with the regional team.</p></BriefSection>
      <div className="brief-priority"><div className="priority-icon"><Zap size={16} /></div><div><span>RECOMMENDED FOCUS</span><strong>Review the {critical.length} open critical issue{critical.length === 1 ? "" : "s"}, then contact owners of the {overdue.length} overdue action{overdue.length === 1 ? "" : "s"}.</strong></div></div>
      <div className="brief-generated"><Sparkles size={13} /> Built from current workspace data · Verify before distributing</div>
    </Card><div className="brief-side"><Card className="brief-side-card"><div className="brief-side-icon"><CalendarDays size={18} /></div><h3>One brief, one shared picture</h3><p>Use this as a handover starting point. Confirm owner details and critical evidence before acting.</p><div className="side-rule" /><div className="side-row"><span>Source</span><strong>{payload.integration?.mode || "Showcase data"}</strong></div><div className="side-row"><span>Refresh</span><strong>On demand</strong></div><div className="side-row"><span>Generated</span><strong>{payload.generated_at || "Now"}</strong></div><Button variant="outline" className="full-button" onClick={onRefresh}><RefreshCw size={14} /> Update from current data</Button></Card><div className="brief-caveat"><ShieldCheck size={16} /><span>AI may help draft a summary, but human review is required before sharing or closing safety actions.</span></div></div></div>
  </>;
}
function BriefSection({ icon: Icon, tone, title, children }) { return <div className="brief-section"><div className={`brief-section-icon section-${tone}`}><Icon size={17} /></div><div className="brief-section-content"><h3>{title}</h3>{children}</div></div>; }
function PageHeader({ eyebrow, title, subtitle, action }) { return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action && <div className="page-header-action">{action}</div>}</div>; }

export default FleetDeskApp;
