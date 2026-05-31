import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Testimonials", "Gallery", "FAQ", "Contact"];

const SERVICES = [
  { icon: "🩺", title: "General Checkup", desc: "Comprehensive health evaluations for adults and elderly with personalised care plans." },
  { icon: "👶", title: "Child Care", desc: "Dedicated paediatric consultations to keep your little ones healthy and thriving." },
  { icon: "💉", title: "Vaccination", desc: "Complete immunisation schedules for children and adults following national guidelines." },
  { icon: "🩸", title: "Diabetes Care", desc: "Ongoing monitoring, lifestyle guidance and medication management for diabetic patients." },
  { icon: "🚨", title: "Emergency Care", desc: "Prompt attention for acute illnesses and urgent medical needs – walk-ins welcome." },
  { icon: "❤️", title: "Chronic Disease Mgmt", desc: "Long-term management of hypertension, thyroid disorders and other chronic conditions." },
];

const TESTIMONIALS = [
  {
    name: "Saxena",
    rating: 5,
    text: "Always Help With Smile. The doctor is very kind and listens patiently to every concern. Highly recommend this clinic to everyone in Bathinda.",
    date: "2 years ago",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Excellent care for my children. Vaccination schedule is always on time and the staff is very cooperative.",
    date: "1 year ago",
  },
  {
    name: "Harjinder Singh",
    rating: 5,
    text: "The best local clinic near Bibi Wala. Affordable, professional and always available when needed.",
    date: "8 months ago",
  },
];

const FAQS = [
  { q: "What are the clinic timings?", a: "The clinic is open Monday to Saturday from 8:00 AM to 1:00 PM and 5:00 PM to 9:00 PM. Sunday timings may vary — please call ahead." },
  { q: "Do I need an appointment?", a: "Walk-ins are welcome. For routine checkups or specialist consultations, calling ahead helps reduce wait time." },
  { q: "Is emergency care available?", a: "Yes, urgent cases are attended to immediately. You can also WhatsApp us for quick guidance before visiting." },
  { q: "Do you provide home visits?", a: "Home visits may be arranged for elderly or immobile patients. Please call 094640 94141 to discuss availability." },
  { q: "What payment methods are accepted?", a: "We accept cash. Please carry exact change when possible." },
];

const GALLERY = [
  { emoji: "🏥", label: "Reception Area" },
  { emoji: "🩺", label: "Consultation Room" },
  { emoji: "💊", label: "Pharmacy Counter" },
  { emoji: "🧪", label: "Sample Collection" },
  { emoji: "👨‍⚕️", label: "Doctor's Desk" },
  { emoji: "🌿", label: "Waiting Lounge" },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#f59e0b" : "#d1d5db", fontSize: "1rem" }}>★</span>
      ))}
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const primaryBlue = "#1a56a7";
  const lightBlue = "#e8f0fb";
  const accentTeal = "#0e9f8a";

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#1a202c", overflowX: "hidden" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+3:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Source Sans 3', sans-serif; }
        h1,h2,h3,.display { font-family: 'Playfair Display', serif; }
        html { scroll-behavior: smooth; }
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:${primaryBlue}; transition:width .3s; }
        .nav-link:hover::after { width:100%; }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(26,86,167,0.15); }
        .service-card { transition: transform .3s, box-shadow .3s; }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-item:hover { transform: scale(1.03); }
        .gallery-item { transition: transform .3s; }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,159,138,0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(14,159,138,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14,159,138,0); }
        }
        .whatsapp-btn { animation: pulse-ring 2s infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .hero-badge { animation: float 4s ease-in-out infinite; }
        input, textarea { font-family: 'Source Sans 3', sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${lightBlue}` : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🏥</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: scrolled ? primaryBlue : "#fff", lineHeight: 1.1 }}>Dhukhbhanjan</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: scrolled ? accentTeal : "#b2dfdb", textTransform: "uppercase" }}>Clinic · Bathinda</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} className="nav-link"
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.88rem", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, color: scrolled ? "#374151" : "#e8f4fd", letterSpacing: "0.04em" }}>
                {link}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} style={{
              background: primaryBlue, color: "#fff", border: "none", borderRadius: 6, padding: "9px 22px",
              fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", letterSpacing: "0.04em"
            }}>Book Now</button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 26, color: scrolled ? primaryBlue : "#fff" }}
            className="hamburger">☰</button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#fff", padding: "16px 5% 24px", borderTop: `2px solid ${lightBlue}` }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
                cursor: "pointer", padding: "12px 0", fontSize: "1rem", color: "#374151", borderBottom: "1px solid #f3f4f6", fontFamily: "'Source Sans 3', sans-serif"
              }}>{link}</button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none !important;}
          .hamburger{display:block !important;}
        }
      `}</style>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${primaryBlue} 0%, #0d3d7a 50%, #062b5b 100%)`,
        display: "flex", alignItems: "center",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", top: -60, right: -60, width: 350, height: 350, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(14,159,138,0.08)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 5% 60px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(14,159,138,0.2)", border: "1px solid rgba(14,159,138,0.4)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ color: "#5eead4", fontSize: "0.8rem", fontFamily: "'Source Sans 3',sans-serif", letterSpacing: "0.1em" }}>⭐ 5.0 RATED · BATHINDA'S TRUSTED CLINIC</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
              Healing With<br />
              <span style={{ color: "#5eead4" }}>Compassion</span><br />& Care
            </h1>
            <p style={{ color: "#93c5fd", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 460, fontFamily: "'Source Sans 3',sans-serif" }}>
              Dhukhbhanjan Clinic — where every patient is welcomed with a smile. Trusted healthcare for families in Bathinda since years.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contact")} style={{
                background: accentTeal, color: "#fff", border: "none", borderRadius: 8, padding: "14px 32px",
                fontFamily: "'Source Sans 3',sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer",
                boxShadow: "0 8px 24px rgba(14,159,138,0.4)", transition: "transform .2s"
              }} onMouseOver={e => e.target.style.transform="scale(1.04)"} onMouseOut={e => e.target.style.transform="scale(1)"}>
                Book Appointment
              </button>
              <a href="https://wa.me/919464094141" target="_blank" rel="noreferrer" style={{
                background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 28px",
                fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{ fontSize: "1.1rem" }}>📞</span> Call Now
              </a>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 44 }}>
              {[["500+", "Patients Served"], ["5.0", "Google Rating"], ["10+", "Years Experience"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{num}</div>
                  <div style={{ color: "#93c5fd", fontSize: "0.78rem", fontFamily: "'Source Sans 3',sans-serif", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 300, height: 380, borderRadius: 24,
                background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 16, padding: 32,
                boxShadow: "0 32px 80px rgba(0,0,0,0.3)"
              }}>
                <div style={{ fontSize: 80 }}>👨‍⚕️</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}>Dr. at Dhukhbhanjan</div>
                  <div style={{ color: "#93c5fd", fontSize: "0.8rem", fontFamily: "'Source Sans 3',sans-serif", marginTop: 4 }}>General Physician & Family Doctor</div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>{[1,2,3,4,5].map(i=><span key={i} style={{color:"#f59e0b",fontSize:"1.1rem"}}>★</span>)}</div>
                <div style={{ background: accentTeal, color: "#fff", borderRadius: 20, padding: "6px 18px", fontSize: "0.8rem", fontFamily: "'Source Sans 3',sans-serif" }}>● Currently Open</div>
              </div>
              <div className="hero-badge" style={{
                position: "absolute", top: -20, right: -20, background: "#fff", borderRadius: 16, padding: "12px 16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)", fontSize: "0.75rem", fontFamily: "'Source Sans 3',sans-serif", color: primaryBlue, fontWeight: 600
              }}>
                📍 Near Silver Oaks Colony<br /><span style={{ color: "#6b7280", fontWeight: 400 }}>Bibi Wala, Bathinda</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:768px){#home > div{grid-template-columns:1fr !important;} #home > div > div:last-child{display:none;}}`}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div style={{ background: lightBlue, borderRadius: 20, padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 100 }}>🏥</div>
                <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["🕗", "Mon–Sat 8AM–9PM"], ["📍", "Bibi Wala, BTI"], ["☎️", "094640 94141"], ["⭐", "5.0 Rated"]].map(([ic, text]) => (
                    <div key={text} style={{ background: "#fff", borderRadius: 10, padding: "12px 8px", fontSize: "0.8rem", fontFamily: "'Source Sans 3',sans-serif", color: "#374151" }}>
                      {ic} {text}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", top: -16, left: -16, width: 64, height: 64, background: accentTeal, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✚</div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <div style={{ color: accentTeal, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: 12 }}>ABOUT US</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#1a202c", lineHeight: 1.25, marginBottom: 20 }}>
                Compassionate Healthcare<br />for Every Family
              </h2>
              <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 16, fontFamily: "'Source Sans 3',sans-serif" }}>
                Dhukhbhanjan Clinic, located near Silver Oaks Colony, Bibi Wala, Bathinda, has been a pillar of primary healthcare for the local community. Our name — meaning "remover of pain" — reflects our deepest commitment to every patient.
              </p>
              <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 28, fontFamily: "'Source Sans 3',sans-serif" }}>
                We offer compassionate general medicine, child care, vaccinations, diabetes management and emergency consultations — all under one roof at affordable rates, always with a warm smile.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[["Caring Staff", "🤝"], ["Affordable", "💰"], ["Walk-ins OK", "🚶"]].map(([label, icon]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, color: primaryBlue }}>
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
        <style>{`@media(max-width:768px){#about > div{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "90px 5%", background: "#f8faff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ color: accentTeal, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: 10 }}>OUR SERVICES</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#1a202c" }}>Comprehensive Care Under One Roof</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="service-card" style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", border: `1px solid ${lightBlue}`, cursor: "default" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a202c", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.9rem", fontFamily: "'Source Sans 3',sans-serif" }}>{s.desc}</p>
                  <div style={{ marginTop: 20, color: primaryBlue, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, fontSize: "0.85rem" }}>Learn more →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "90px 5%", background: primaryBlue }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ color: "#5eead4", fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: 10 }}>PATIENT REVIEWS</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#fff" }}>What Our Patients Say</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: 32 }}>
                  <StarRating rating={t.rating} />
                  <p style={{ color: "#e2e8f0", lineHeight: 1.75, margin: "16px 0", fontFamily: "'Source Sans 3',sans-serif", fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontWeight: 600 }}>{t.name}</div>
                      <div style={{ color: "#93c5fd", fontSize: "0.78rem", fontFamily: "'Source Sans 3',sans-serif" }}>Google Review</div>
                    </div>
                    <span style={{ color: "#6b7280", fontSize: "0.75rem", fontFamily: "'Source Sans 3',sans-serif" }}>{t.date}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: primaryBlue,
                padding: "12px 28px", borderRadius: 8, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem"
              }}>⭐ 5.0 on Google Maps — Leave a Review</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ color: accentTeal, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: 10 }}>CLINIC GALLERY</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#1a202c" }}>Our Clinic Spaces</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {GALLERY.map((g, i) => (
              <FadeIn key={g.label} delay={i * 0.07}>
                <div className="gallery-item" style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", background: lightBlue, aspectRatio: "1/1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ fontSize: 56 }}>{g.emoji}</div>
                  <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, color: primaryBlue, fontSize: "0.9rem" }}>{g.label}</div>
                  <div className="gallery-overlay" style={{ position: "absolute", inset: 0, background: `${primaryBlue}cc`, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity .3s", borderRadius: 16 }}>
                    <span style={{ color: "#fff", fontSize: "1.5rem" }}>🔍</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "90px 5%", background: "#f8faff" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ color: accentTeal, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: 10 }}>FAQ</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#1a202c" }}>Common Questions</h2>
            </div>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${openFaq === i ? primaryBlue : "#e5e7eb"}`, overflow: "hidden", transition: "border .3s" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                    padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 600, color: openFaq === i ? primaryBlue : "#1a202c"
                  }}>
                    {faq.q}
                    <span style={{ fontSize: "1.2rem", transition: "transform .3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", color: primaryBlue }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 24px 20px", color: "#4b5563", lineHeight: 1.75, fontFamily: "'Source Sans 3',sans-serif" }}>{faq.a}</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + MAP */}
      <section id="contact" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ color: accentTeal, fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: 10 }}>REACH US</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "#1a202c" }}>Book an Appointment</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            {/* Form */}
            <FadeIn>
              <div>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: 48, background: "#f0fdf4", borderRadius: 16, border: "1px solid #bbf7d0" }}>
                    <div style={{ fontSize: 56 }}>✅</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", color: accentTeal, margin: "16px 0 8px" }}>Thank You!</h3>
                    <p style={{ color: "#4b5563", fontFamily: "'Source Sans 3',sans-serif" }}>We'll contact you shortly to confirm your appointment. You can also reach us directly on WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {[["Full Name", "name", "text", "👤"], ["Phone Number", "phone", "tel", "📞"]].map(([label, field, type, icon]) => (
                      <div key={field}>
                        <label style={{ display: "block", fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>{icon} {label}</label>
                        <input type={type} required value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})}
                          style={{ width: "100%", padding: "13px 16px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: "0.95rem", outline: "none", transition: "border .2s" }}
                          onFocus={e => e.target.style.borderColor = primaryBlue}
                          onBlur={e => e.target.style.borderColor = "#d1d5db"} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", fontFamily: "'Source Sans 3',sans-serif", fontWeight: 600, marginBottom: 6, color: "#374151", fontSize: "0.9rem" }}>💬 Message / Reason for Visit</label>
                      <textarea rows={4} required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        style={{ width: "100%", padding: "13px 16px", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: "0.95rem", outline: "none", resize: "vertical", transition: "border .2s" }}
                        onFocus={e => e.target.style.borderColor = primaryBlue}
                        onBlur={e => e.target.style.borderColor = "#d1d5db"} />
                    </div>
                    <button type="submit" style={{
                      background: primaryBlue, color: "#fff", border: "none", borderRadius: 8, padding: "15px",
                      fontFamily: "'Source Sans 3',sans-serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "background .2s"
                    }} onMouseOver={e => e.target.style.background = accentTeal} onMouseOut={e => e.target.style.background = primaryBlue}>
                      Send Appointment Request →
                    </button>
                  </form>
                )}

                {/* Contact info */}
                <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                  {[["📍", "Near Silver Oaks Colony, Road, Bibi Wala, Bathinda, Punjab 151005"], ["📞", "094640 94141"], ["🕗", "Mon–Sat: 8AM–1PM & 5PM–9PM"]].map(([icon, text]) => (
                    <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "'Source Sans 3',sans-serif", color: "#4b5563", fontSize: "0.9rem" }}>
                      <span style={{ fontSize: "1.1rem", marginTop: 2 }}>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Map */}
            <FadeIn delay={0.2}>
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(26,86,167,0.12)", height: "100%", minHeight: 420 }}>
                <iframe
                  title="Dhukhbhanjan Clinic Location"
                  width="100%" height="100%"
                  style={{ border: 0, minHeight: 420 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.1234567890123!2d74.9456!3d30.2061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDhukhbhanjan+Clinic+Bathinda!5e0!3m2!1sen!2sin!4v1234567890"
                />
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:768px){#contact > div > div:last-child{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0d2347", color: "#cbd5e1", padding: "56px 5% 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🏥</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff" }}>Dhukhbhanjan Clinic</div>
                  <div style={{ fontSize: "0.7rem", color: "#5eead4", letterSpacing: "0.1em" }}>BATHINDA · PUNJAB</div>
                </div>
              </div>
              <p style={{ lineHeight: 1.75, fontSize: "0.88rem", maxWidth: 300, fontFamily: "'Source Sans 3',sans-serif" }}>
                Providing compassionate and affordable healthcare to families near Bibi Wala, Bathinda since years. Your health is our priority.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["📘", "📸", "🐦"].map(icon => (
                  <div key={icon} style={{ width: 38, height: 38, background: "rgba(255,255,255,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", cursor: "pointer" }}>{icon}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: "1rem" }}>Quick Links</div>
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link)} style={{
                  display: "block", background: "none", border: "none", color: "#94a3b8", cursor: "pointer",
                  fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.88rem", marginBottom: 10, textAlign: "left", padding: 0
                }} onMouseOver={e => e.target.style.color="#fff"} onMouseOut={e => e.target.style.color="#94a3b8"}>{link}</button>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: "1rem" }}>Contact</div>
              {[["📞", "094640 94141"], ["📍", "Near Silver Oaks Colony, Bibi Wala, Bathinda 151005"], ["🕗", "Mon–Sat 8AM–9PM"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 8, marginBottom: 12, fontSize: "0.85rem", fontFamily: "'Source Sans 3',sans-serif", alignItems: "flex-start" }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, textAlign: "center", fontSize: "0.8rem", fontFamily: "'Source Sans 3',sans-serif" }}>
            © {new Date().getFullYear()} Dhukhbhanjan Clinic, Bathinda. All rights reserved. · Designed with ❤️ for the community.
          </div>
        </div>
        <style>{`@media(max-width:768px){footer > div > div:first-child{grid-template-columns:1fr !important;}}`}</style>
      </footer>

      {/* WHATSAPP FLOATING BUTTON */}
      <a href="https://wa.me/919464094141?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Dhukhbhanjan%20Clinic."
        target="_blank" rel="noreferrer" className="whatsapp-btn"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 9999,
          background: "#25d366", color: "#fff", borderRadius: "50%",
          width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.8rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.5)"
        }} title="Chat on WhatsApp">
        💬
      </a>
    </div>
  );
}
