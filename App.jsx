import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "كيف يعمل", href: "#how" },
  { label: "المميزات", href: "#features" },
  { label: "الباقات", href: "#pricing" },
  { label: "انضم إلينا", href: "#cta" },
];

const STATS = [
  { value: "٢٠٠+", label: "محل موثق" },
  { value: "٩٨٪", label: "دقة التقييم" },
  { value: "٥٠ ألف+", label: "مستخدم نشط" },
  { value: "١٢ مدينة", label: "مغطاة" },
];

const HOW_STEPS = [
  {
    num: "١",
    title: "دور على المحل",
    body: "ابحث بالاسم أو المنطقة أو الفئة وشوف النتايج الموثوقة بالقربك.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="18" cy="18" r="10" />
        <line x1="26" y1="26" x2="36" y2="36" />
      </svg>
    ),
  },
  {
    num: "٢",
    title: "اقرأ السمعة الحقيقية",
    body: "مؤشر سمعة متكامل مش مجرد نجوم. بيحسب التوثيق والردود ونسبة حل المشاكل.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 30 L16 20 L22 26 L30 14 L36 18" />
        <circle cx="8" cy="30" r="2" fill="currentColor" stroke="none" />
        <circle cx="36" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "٣",
    title: "قيّم وأثر",
    body: "رأيك بيغير حاجة. كل تقييم حقيقي بيتحقق بزيارة فعلية وبيبني ثقة حقيقية.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="20,4 24,14 36,14 26,22 30,34 20,26 10,34 14,22 4,14 16,14" />
      </svg>
    ),
  },
  {
    num: "٤",
    title: "اكسب مكافآت",
    body: "كل تقييم بيكسبك نقاط وكوبونات من المحلات. صوتك ليه ثمن.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="10" y="16" width="20" height="16" rx="2" />
        <path d="M14 16 C14 10 26 10 26 16" />
        <line x1="20" y1="20" x2="20" y2="28" />
        <line x1="16" y1="24" x2="24" y2="24" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    tag: "ذكاء",
    title: "مؤشر السمعة الذكي",
    body: "مش متوسط حسابي. خوارزمية بتحسب مصداقية المراجع، حداثة التقييم، ردود المحل، ونسبة حل الشكاوى. ٥ نجوم من ٣ ناس ≠ ٤.٣ من ١٢٠٠ شخص.",
    accent: "#00F5A0",
  },
  {
    tag: "توثيق",
    title: "تقييم بعد زيارة فعلية",
    body: "Geo-verification بيتأكد إنك كنت في المحل فعلاً. مفيش تقييمات وهمية. مفيش أصحاب بيقيموا بعض.",
    accent: "#00C9FF",
  },
  {
    tag: "تحكم",
    title: "لوحة تحكم لأصحاب المحلات",
    body: "تنبيه فوري لأي تقييم جديد. مقارنة بالمنافسين. اقتراحات تحسين. مؤشر خطر يحذرك قبل ما السمعة تنزل.",
    accent: "#A8FF78",
  },
  {
    tag: "ضمان",
    title: "ضمان سُمعة الرقمي",
    body: "بدل الفاتورة الورقية اللي بتتضيع. شهادة ضمان رقمية بـ QR. للموبايلات المستعملة، لتركيبات التكييف، لأي خدمة.",
    accent: "#FFD700",
  },
  {
    tag: "وجاهة",
    title: "نظام الباشا الموثق",
    body: "اليوزر اللي بيقيم كتير وبمصداقية بيبقى 'موثق'. لما يدخل محل، صاحب المحل بيعرف وبيتعامل معاه كـ VIP حقيقي.",
    accent: "#FF6B6B",
  },
  {
    tag: "نمو",
    title: "QR Code على الطاولة",
    body: "صاحب المحل ذو التقييم العالي بيطبع بنفسه QR مكتوب عليه 'سمعتنا ٩/١٠' — نمو عضوي من غير فريق مبيعات.",
    accent: "#C77DFF",
  },
];

const PLANS = [
  {
    tier: "مجاني",
    price: "٠",
    period: "للأبد",
    color: "rgba(0,201,255,0.1)",
    border: "rgba(0,201,255,0.3)",
    highlight: false,
    perks: [
      "عرض صفحة المحل",
      "استقبال التقييمات",
      "مؤشر السمعة العام",
      "الرد على التقييمات",
    ],
    missing: ["تنبيه فوري", "تقارير المنافسين", "Boost في البحث", "ضمان رقمي"],
  },
  {
    tier: "أساسي",
    price: "٢٩٩",
    period: "جنيه / شهر",
    color: "rgba(0,245,160,0.12)",
    border: "#00F5A0",
    highlight: true,
    perks: [
      "كل المجاني",
      "تنبيه فوري Real-time",
      "الرد على التقييمات",
      "٥٠ شهادة ضمان/شهر",
      "تقرير شهري",
    ],
    missing: ["تقارير المنافسين", "Boost في البحث"],
  },
  {
    tier: "احترافي",
    price: "٦٩٩",
    period: "جنيه / شهر",
    color: "rgba(0,201,255,0.08)",
    border: "rgba(0,201,255,0.5)",
    highlight: false,
    perks: [
      "كل الأساسي",
      "تقارير المنافسين",
      "Boost في نتايج البحث",
      "شهادات ضمان غير محدودة",
      "تقارير شهرية تفصيلية",
      "API للتكامل",
    ],
    missing: [],
  },
];

// Removed BADGES_SHOWCASE as per user request

// ── AnimatedCounter
function AnimatedCounter({ value, duration = 1800 }) {
  const [display, setDisplay] = useState("٠");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const nums = value.replace(/[^٠-٩0-9]/g, "");
          const suffix = value.replace(/[٠-٩0-9]/g, "").trim();
          const target = parseInt(
            nums.replace(/[٠]/g, "0").replace(/[١]/g, "1").replace(/[٢]/g, "2")
              .replace(/[٣]/g, "3").replace(/[٤]/g, "4").replace(/[٥]/g, "5")
              .replace(/[٦]/g, "6").replace(/[٧]/g, "7").replace(/[٨]/g, "8").replace(/[٩]/g, "9")
          );
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            const arabic = current.toLocaleString("ar-EG");
            setDisplay(arabic + (suffix ? " " + suffix : ""));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

// ── Floating orb background
function OrbBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,245,160,0.18) 0%, rgba(0,201,255,0.08) 50%, transparent 70%)",
        filter: "blur(40px)",
        animation: "orbFloat1 12s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-15%",
        width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,150,255,0.20) 0%, rgba(0,80,200,0.08) 50%, transparent 70%)",
        filter: "blur(50px)",
        animation: "orbFloat2 16s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "40%",
        width: "30vw", height: "30vw", maxWidth: 400, maxHeight: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,245,160,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "orbFloat3 20s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-3%,4%) scale(1.05)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(4%,-3%) scale(1.08)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(2%,3%)} 66%{transform:translate(-2%,-2%)} }
      `}</style>
    </div>
  );
}

// ── Logo SVG (matching brand: س م ع ة + arrow)
function Logo({ size = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" }}>
      <img
        src="/images/logo.png"
        alt="سُمعة"
        style={{
          height: size,
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}

// ── Reputation Score Widget
function ReputationWidget() {
  const score = 8.7;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 10) * circumference;
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(0,245,160,0.2)",
      borderRadius: 24, padding: "28px 32px",
      backdropFilter: "blur(20px)",
      display: "flex", flexDirection: "column", gap: 20,
      minWidth: 280,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl" }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'Cairo', sans-serif" }}>مؤشر السمعة</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, fontFamily: "'Cairo', sans-serif" }}>مطعم السوري — مدينة نصر</div>
        </div>
        <div style={{ position: "relative", width: 70, height: 70 }}>
          <svg width="70" height="70" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="url(#scoreGrad)" strokeWidth="10"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round" transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 1.5s ease" }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5A0" />
                <stop offset="100%" stopColor="#00C9FF" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#00F5A0", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>{score}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>/١٠</span>
          </div>
        </div>
      </div>
      {[
        { label: "معدل الرد", val: 94, color: "#00F5A0" },
        { label: "حل الشكاوى", val: 88, color: "#00C9FF" },
        { label: "تقييمات موثقة", val: 76, color: "#C77DFF" },
      ].map((b) => (
        <div key={b.label} style={{ direction: "rtl" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "'Cairo', sans-serif" }}>{b.label}</span>
            <span style={{ color: b.color, fontWeight: 700, fontSize: 13 }}>{b.val}٪</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
            <div style={{
              height: "100%", borderRadius: 3, width: `${b.val}%`,
              background: `linear-gradient(90deg, ${b.color}88, ${b.color})`,
              transition: "width 1.5s ease",
            }} />
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, direction: "rtl", flexWrap: "wrap" }}>
        {[
          { text: "٢٣٤ تقييم", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg> },
          { text: "موثق", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> },
          { text: "يرد خلال ساعة", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 Z" /></svg> }
        ].map(t => (
          <span key={t.text} style={{
            background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.2)",
            borderRadius: 20, padding: "4px 12px", fontSize: 12,
            color: "#00F5A0", fontFamily: "'Cairo', sans-serif",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {t.icon}
            {t.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SOM3ALanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePlan, setActivePlan] = useState(1);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const S = {
    root: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020e1f 0%, #041830 40%, #051a1a 100%)",
      color: "#fff",
      fontFamily: "'Cairo', 'Noto Kufi Arabic', sans-serif",
      direction: "rtl",
      overflowX: "hidden",
    },
    section: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  };

  return (
    <div style={S.root}>
      <OrbBackground />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020e1f; }
        ::-webkit-scrollbar-thumb { background: #00F5A0; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,245,160,0.4)} 50%{box-shadow:0 0 0 12px rgba(0,245,160,0)} }
        @keyframes slideRight { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .nav-link { color:rgba(255,255,255,0.7); text-decoration:none; font-size:15px; font-weight:600; transition:color 0.2s; cursor:pointer; }
        .nav-link:hover { color:#00F5A0; }
        .btn-primary { background: #00F5A0; color:#020e1f; border:none; border-radius:50px; padding:14px 36px; font-size:16px; font-weight:800; cursor:pointer; font-family:'Cairo',sans-serif; transition:transform 0.2s,box-shadow 0.2s; animation:pulse 3s infinite; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(0,245,160,0.35); }
        .btn-ghost { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.25); border-radius:50px; padding:13px 32px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Cairo',sans-serif; transition:all 0.2s; }
        .btn-ghost:hover { border-color:#00F5A0; color:#00F5A0; }
        .feature-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:32px; transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s; cursor:default; }
        .feature-card:hover { transform:translateY(-6px); border-color:rgba(0,245,160,0.3); box-shadow:0 20px 60px rgba(0,0,0,0.3); }
        .step-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:36px 28px; transition:all 0.3s; }
        .step-card:hover { background:rgba(0,245,160,0.05); border-color:rgba(0,245,160,0.25); transform:translateY(-4px); }
        .plan-card { border-radius:24px; padding:36px 32px; transition:transform 0.3s,box-shadow 0.3s; cursor:pointer; }
        .plan-card:hover { transform:translateY(-6px); }
        .badge-pill { border-radius:50px; padding:14px 24px; display:flex; align-items:center; gap:12px; cursor:default; transition:transform 0.3s,box-shadow 0.3s; }
        .badge-pill:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
        .check { color:#00F5A0; font-size:14px; }
        .cross { color:rgba(255,255,255,0.25); font-size:14px; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding-top: 100px !important; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; text-align: center; }
          .hero-title { font-size: 36px !important; }
          .hero-stats { justify-content: center; gap: 20px !important; }
          .warranty-grid { grid-template-columns: 1fr !important; padding: 40px 24px !important; gap: 40px !important; }
          .cta-banner { padding: 40px 24px !important; }
          .cta-title { font-size: 24px !important; }
          .section-padding { padding-top: 60px !important; padding-bottom: 60px !important; }
          .mobile-logo img { height: 32px !important; }
          .mobile-btns button { padding: 6px 12px !important; font-size: 12px !important; }
          .cta-logo img { height: 60px !important; }
        }
      `}</style>

      {/* ── NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.3s",
        background: scrolled ? "rgba(2,14,31,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,160,0.1)" : "none",
      }}>
        <div style={{ ...S.section, display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div className="mobile-logo">
            <Logo size={38} />
          </div>
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
          <div className="mobile-btns" style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>دخول</button>
            <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>ابدأ</button>
          </div>
        </div>
      </nav>

      {/* ── HERO */}
      <section style={{ ...S.section, paddingTop: 140, paddingBottom: 100, position: "relative", zIndex: 1 }} className="section-padding">
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="hero-content" style={{ animation: "fadeUp 0.8s ease both" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.25)",
              borderRadius: 50, padding: "6px 18px", marginBottom: 28,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00F5A0", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#00F5A0", fontSize: 13, fontWeight: 700 }}>المنصة الأولى للسمعة الرقمية في مصر</span>
            </div>

            <h1 className="hero-title" style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.15,
              marginBottom: 24, letterSpacing: "-1px",
            }}>
              <span style={{ display: "block", color: "#fff" }}>السمعة الحقيقية</span>
              <span style={{
                display: "block",
                color: "#00F5A0",
              }}>مش مجرد نجوم</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1.8,
              marginBottom: 40, maxWidth: 480,
            }}>
              صمتك على خدمة وحشة في محل، سبب إن الخدمة دي تفضل موجودة.<br />
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>سُمعة</strong> بتحوّل رأيك لأصل رقمي بيغير السوق.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary">ابدأ مجاناً الآن</button>
              <button className="btn-ghost">أنا صاحب محل</button>
            </div>

            <div style={{ marginTop: 40, animation: "fadeIn 1s ease 0.6s both" }}>
              <img src="/images/star.png" alt="Ratings" style={{ height: 40, width: "auto" }} />
            </div>

            <div className="hero-stats" style={{ display: "flex", gap: 32, marginTop: 24, flexWrap: "wrap" }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#00F5A0", lineHeight: 1 }}>
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ animation: "fadeIn 1s ease 0.3s both", display: "flex", justifyContent: "center" }}>
            <img
              src="/images/zeed.png"
              alt="سمعة"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 24,
                boxShadow: "0 20px 60px rgba(0,245,160,0.15)"
              }}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS */}
      <section id="how" style={{ ...S.section, paddingTop: 100, paddingBottom: 100, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Logo size={80} />
          <span style={{
            color: "#00F5A0", fontSize: 13, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", display: "block", marginBottom: 16, marginTop: 24
          }}>كيف يشتغل سُمعة</span>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#fff" }}>أربع خطوات بس</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {HOW_STEPS.map((step, i) => (
            <div key={i} className="step-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(0,245,160,0.15), rgba(0,201,255,0.1))",
                border: "1px solid rgba(0,245,160,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, color: "#00F5A0",
              }}>
                {step.icon}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "rgba(0,245,160,0.6)",
                marginBottom: 10,
              }}>الخطوة {step.num}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES */}
      <section id="features" style={{ ...S.section, paddingTop: 100, paddingBottom: 100, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Logo size={100} />
          <span style={{ color: "#00F5A0", fontSize: 13, fontWeight: 700, letterSpacing: 2, display: "block", marginBottom: 16, marginTop: 24 }}>
            ليه سُمعة مختلفة
          </span>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900 }}>مميزات بتفرق فعلاً</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 120, height: 120,
                background: `radial-gradient(circle, ${f.accent}18 0%, transparent 70%)`,
                borderRadius: "0 20px 0 120px",
              }} />
              <span style={{
                background: `${f.accent}20`, color: f.accent,
                border: `1px solid ${f.accent}40`,
                borderRadius: 20, padding: "3px 14px", fontSize: 12, fontWeight: 700,
                display: "inline-block", marginBottom: 20,
              }}>{f.tag}</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 14 }}>{f.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.75 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ── WARRANTY HIGHLIGHT */}
      <section style={{ ...S.section, paddingTop: 80, paddingBottom: 80, position: "relative", zIndex: 1 }} className="section-padding">
        <div className="warranty-grid" style={{
          background: "rgba(0,245,160,0.05)",
          border: "1px solid rgba(0,245,160,0.2)",
          borderRadius: 32, padding: "60px 64px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
        }}>
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Logo size={100} />
            </div>
            <div style={{
              display: "inline-flex", gap: 8, alignItems: "center",
              background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)",
              borderRadius: 50, padding: "5px 16px", marginBottom: 24,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span style={{ color: "#FFD700", fontSize: 13, fontWeight: 700 }}>ضمان سُمعة الرقمي</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 900, marginBottom: 20, lineHeight: 1.3 }}>
              بدّل الفاتورة الورقية<br />
              <span style={{ color: "#FFD700" }}>اللي بتتضيع</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              شهادة ضمان رقمية موثوقة للموبايلات الجديدة والمستعملة، خدمات التركيب، وأي منتج.
              العميل بيستلم رسالة واتساب فيها الضمان كامل — ومش هيقدر يفتحه غير بعد ما يقيمك.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "SMS/WhatsApp فوري للعميل بعد البيع مباشرة",
                "تتبع الجهاز بالـ Serial Number والـ IMEI",
                "شكوى بنقرة لو المحل مالتزمش",
                "بيزيد ثقة الزبون ٢٠٠٪",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{
              position: "absolute", inset: -40,
              background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
              filter: "blur(30px)", zIndex: 0
            }} />
            <img src="/images/mann.png" alt="Trust" style={{ width: "100%", maxWidth: 380, height: "auto", position: "relative", zIndex: 1 }} />
          </div>
        </div>
      </section>

      {/* ── PRICING */}
      <section id="pricing" style={{ ...S.section, paddingTop: 100, paddingBottom: 100, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Logo size={100} />
          <span style={{ color: "#00F5A0", fontSize: 13, fontWeight: 700, letterSpacing: 2, display: "block", marginBottom: 16, marginTop: 24 }}>الباقات</span>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900 }}>اختار الباقة المناسبة</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 16, fontSize: 16 }}>بدون عقود. إلغاء في أي وقت.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PLANS.map((plan, i) => (
            <div key={i} className="plan-card" onClick={() => setActivePlan(i)}
              style={{
                background: plan.highlight
                  ? "rgba(0,245,160,0.1)"
                  : plan.color,
                border: `2px solid ${activePlan === i ? "#00F5A0" : plan.border}`,
                position: "relative", overflow: "hidden",
                transform: plan.highlight ? "scale(1.03)" : undefined,
                boxShadow: plan.highlight ? "0 30px 80px rgba(0,245,160,0.15)" : undefined,
              }}>
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)",
                  background: "#00F5A0",
                  color: "#020e1f", borderRadius: 50, padding: "4px 16px",
                  fontSize: 12, fontWeight: 800, whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  الأكثر طلباً
                </div>
              )}
              <div style={{ paddingTop: plan.highlight ? 40 : 0 }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 8 }}>{plan.tier}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 900, color: "#fff" }}>{plan.price}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>{plan.price === "٠" ? "" : "جنيه"}</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 28 }}>{plan.period}</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                  {plan.perks.map(p => (
                    <div key={p} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00F5A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{p}</span>
                    </div>
                  ))}
                  {plan.missing.map(p => (
                    <div key={p} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, textDecoration: "line-through" }}>{p}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={plan.highlight ? "btn-primary" : "btn-ghost"}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {plan.price === "٠" ? "ابدأ مجاناً" : "اشترك الآن"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER */}
      <section id="cta" style={{ ...S.section, paddingTop: 80, paddingBottom: 120, position: "relative", zIndex: 1 }} className="section-padding">
        <div className="cta-banner" style={{
          background: "#003366",
          borderRadius: 32, padding: "80px 64px", textAlign: "center",
          border: "1px solid rgba(0,245,160,0.2)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
            width: "80%", height: "200%",
            background: "rgba(0,245,160,0.05)",
            pointerEvents: "none",
          }} />
          <div className="cta-content" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="cta-logo">
              <Logo size={120} />
            </div>
            <h2 className="cta-title" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, marginBottom: 20, marginTop: 32 }}>
              جاهز تبني سمعتك الرقمية؟
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.8 }}>
              انضم لآلاف المحلات والمستخدمين اللي بيبنوا ثقة حقيقية في السوق المصري.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ fontSize: 17, padding: "16px 48px" }}>ابدأ مجاناً الآن</button>
              <button className="btn-ghost" style={{ fontSize: 17 }}>تكلم مع الفريق</button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 24 }}>
              مش محتاج كارت بنك. مش فيه عقود. لغاية ما تقتنع.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 24px", textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <Logo size={32} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>
          © ٢٠٢٥ سُمعة — السمعة الحقيقية للسوق المصري
        </p>
      </footer>
    </div>
  );
}