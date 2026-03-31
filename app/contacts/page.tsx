"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [form, setForm]             = useState({ name: "", email: "", subject: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [visible, setVisible]       = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <>
      <Navigation />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        /* ── page shell — sits between Nav and Footer, no interference ── */
        .cp-page {
          position: relative;
          width: 100%;
          background: #000000;
          overflow: hidden;
        }

        /* ── background atmosphere ── */
        .cp-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%,   rgba(212,120,40,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 0% 80%,   rgba(212,120,40,0.04) 0%, transparent 50%),
            radial-gradient(ellipse 55% 45% at 100% 80%, rgba(212,120,40,0.03) 0%, transparent 50%);
        }
        .cp-bg-noise {
          position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .cp-bg-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.015;
          background-image:
            repeating-linear-gradient(45deg,  #d47828 0, #d47828 1px, transparent 0, transparent 50%),
            repeating-linear-gradient(-45deg, #d47828 0, #d47828 1px, transparent 0, transparent 50%);
          background-size: 60px 60px;
        }

        /* ── corner sigils ── */
        .cp-sigil {
          position: absolute; pointer-events: none; z-index: 1;
          font-family: 'Cinzel', serif; font-weight: 700;
          font-size: clamp(46px, 7vw, 88px); line-height: 1;
          color: #d47828; opacity: 0.06; user-select: none;
        }
        .cp-sigil.tl { top: 32px;  left: 18px; }
        .cp-sigil.tr { top: 32px;  right: 18px; transform: scaleX(-1); }
        .cp-sigil.bl { bottom: 32px; left: 18px; transform: scaleY(-1); }
        .cp-sigil.br { bottom: 32px; right: 18px; transform: scale(-1); }

        /* ── floating deco ── */
        .cp-deco {
          position: absolute; pointer-events: none; z-index: 1;
          color: #d47828; opacity: 0.065; font-size: 19px;
          animation: cpFloat 6s ease-in-out infinite;
        }
        .cp-deco.d1 { top: 12%;   left: 5%;   animation-delay: 0s;   }
        .cp-deco.d2 { top: 32%;   right: 4%;  animation-delay: 1.8s; }
        .cp-deco.d3 { bottom: 28%; left: 6%;  animation-delay: 3.2s; }
        .cp-deco.d4 { bottom: 14%; right: 6%; animation-delay: 4.6s; }
        @keyframes cpFloat {
          0%,100% { transform: translateY(0)    rotate(0deg); }
          50%      { transform: translateY(-11px) rotate(6deg); }
        }

        /* ── main layout ── */
        .cp-main {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          padding: 120px 24px 96px;
        }

        /* ── staggered reveal ── */
        .cp-reveal { transition: opacity 0.85s ease, transform 0.85s ease; }
        .cp-reveal.off { opacity: 0; transform: translateY(24px); }
        .cp-reveal.on  { opacity: 1; transform: translateY(0); }

        /* ── eyebrow ── */
        .cp-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.42em; text-transform: uppercase;
          color: #d47828; margin-bottom: 18px;
          display: flex; align-items: center; gap: 14px;
        }
        .cp-eyebrow::before { content:''; display:block; width:36px; height:1px; background:linear-gradient(90deg, transparent, #d47828); }
        .cp-eyebrow::after  { content:''; display:block; width:36px; height:1px; background:linear-gradient(270deg, transparent, #d47828); }

        /* ── heading ── */
        .cp-heading {
          font-family: 'Cinzel Decorative', serif; font-weight: 900;
          font-size: clamp(1.75rem, 5.5vw, 3.7rem);
          line-height: 1.1; letter-spacing: 0.03em; text-align: center;
          background: linear-gradient(155deg, #ffffff 0%, #f5e0b0 28%, #d47828 60%, #7a4010 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 26px rgba(212,120,40,0.26));
        }

        /* ── subhead ── */
        .cp-subhead {
          font-family: 'EB Garamond', serif;
          font-size: clamp(0.92rem, 1.8vw, 1.12rem);
          font-style: italic; line-height: 1.75;
          color: #7a6040; text-align: center;
          max-width: 480px; margin-bottom: 44px;
        }

        /* ── divider ── */
        .cp-divider {
          display: flex; align-items: center; gap: 14px;
          width: 100%; max-width: 620px; margin-bottom: 40px;
        }
        .cp-divider-line { flex:1; height:1px; background:linear-gradient(90deg, transparent, rgba(212,120,40,0.42), transparent); }
        .cp-divider-gem  {
          width:7px; height:7px; border-radius:50%; background:#d47828;
          box-shadow:0 0 10px #d47828, 0 0 20px rgba(212,120,40,0.38);
        }

        /* ── card ── */
        .cp-card {
          width: 100%; max-width: 620px;
          background: linear-gradient(145deg, #0c0800, #070400);
          border: 1px solid #1c1000; border-radius: 12px;
          padding: 50px 46px; position: relative;
          box-shadow:
            0 0 0 1px rgba(212,120,40,0.05),
            0 40px 80px rgba(0,0,0,0.82),
            inset 0 1px 0 rgba(212,120,40,0.07);
        }
        .cp-card::before {
          content:''; position:absolute; top:0; left:40px; right:40px; height:1px;
          background:linear-gradient(90deg, transparent, rgba(212,120,40,0.48), transparent);
        }
        .cp-cc { position:absolute; width:14px; height:14px; border-color:rgba(212,120,40,0.3); border-style:solid; }
        .cp-cc.tl { top:-1px;    left:-1px;  border-width:2px 0 0 2px; border-radius:2px 0 0 0; }
        .cp-cc.tr { top:-1px;    right:-1px; border-width:2px 2px 0 0; border-radius:0 2px 0 0; }
        .cp-cc.bl { bottom:-1px; left:-1px;  border-width:0 0 2px 2px; border-radius:0 0 0 2px; }
        .cp-cc.br { bottom:-1px; right:-1px; border-width:0 2px 2px 0; border-radius:0 0 2px 0; }

        /* ── fields ── */
        .cp-fields { display:flex; flex-direction:column; gap:20px; }
        .cp-row    { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .cp-field  { display:flex; flex-direction:column; gap:7px; }

        .cp-label {
          font-family:'Cinzel',serif; font-size:9px; font-weight:600;
          letter-spacing:0.3em; text-transform:uppercase;
          color:rgba(212,120,40,0.52); transition:color 0.3s;
        }
        .cp-field:focus-within .cp-label { color:#d47828; }

        .cp-input, .cp-textarea {
          width:100%; background:rgba(0,0,0,0.65);
          border:1px solid #1e1200; border-radius:6px;
          padding:13px 16px; color:#e8d5b0;
          font-family:'EB Garamond',serif; font-size:1rem; font-style:italic;
          outline:none; transition:all 0.35s ease; letter-spacing:0.02em;
        }
        .cp-input::placeholder, .cp-textarea::placeholder {
          color:rgba(212,120,40,0.3); font-style:italic;
        }
        .cp-input:focus, .cp-textarea:focus {
          border-color:rgba(212,120,40,0.52);
          background:rgba(12,7,0,0.88);
          box-shadow:
            0 0 0 1px rgba(212,120,40,0.11),
            0 0 16px rgba(212,120,40,0.07),
            inset 0 1px 0 rgba(212,120,40,0.05);
        }
        .cp-textarea { resize:none; height:126px; line-height:1.7; }

        /* ── button ── */
        .cp-btn {
          margin-top:8px; width:100%; padding:17px 32px;
          border:none; border-radius:6px; cursor:pointer;
          overflow:hidden; position:relative;
          font-family:'Cinzel',serif; font-size:11px; font-weight:700;
          letter-spacing:0.32em; text-transform:uppercase; color:#080300;
          background:linear-gradient(135deg, #7a4010 0%, #d47828 30%, #f0a040 60%, #d47828 80%, #7a4010 100%);
          background-size:200% 100%; background-position:100% 0;
          transition:all 0.5s ease;
          box-shadow:0 2px 22px rgba(212,120,40,0.2), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .cp-btn:hover:not(:disabled) {
          background-position:0% 0;
          box-shadow:0 4px 44px rgba(212,120,40,0.46), 0 0 70px rgba(212,120,40,0.13), inset 0 1px 0 rgba(255,255,255,0.3);
          transform:translateY(-2px);
        }
        .cp-btn:active:not(:disabled) { transform:translateY(0); }
        .cp-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .cp-btn::after {
          content:''; position:absolute; top:0; left:-100%; width:65%; height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent);
          transform:skewX(-18deg); transition:left 0.55s ease;
        }
        .cp-btn:hover::after { left:130%; }

        /* ── success state ── */
        .cp-success { display:flex; flex-direction:column; align-items:center; gap:16px; padding:16px 0; text-align:center; }
        .cp-success-ring {
          width:70px; height:70px; border-radius:50%;
          border:1px solid rgba(212,120,40,0.38);
          background:radial-gradient(circle, rgba(212,120,40,0.09), transparent 70%);
          display:flex; align-items:center; justify-content:center;
          animation:cpPulse 2.5s ease-in-out infinite;
        }
        @keyframes cpPulse {
          0%,100% { box-shadow:0 0 34px rgba(212,120,40,0.16); }
          50%      { box-shadow:0 0 52px rgba(212,120,40,0.32); }
        }
        .cp-success-title { font-family:'Cinzel Decorative',serif; font-size:1.45rem; font-weight:700; color:#e8d5b0; }
        .cp-success-body  { font-family:'EB Garamond',serif; font-size:1.05rem; font-style:italic; color:#7a5a30; max-width:360px; line-height:1.8; }

        /* ── info row ── */
        .cp-info { margin-top:46px; display:flex; gap:32px; justify-content:center; flex-wrap:wrap; }
        .cp-info-item { display:flex; flex-direction:column; align-items:center; gap:6px; text-align:center; }
        .cp-info-icon {
          width:36px; height:36px; border-radius:50%;
          border:1px solid rgba(212,120,40,0.2);
          display:flex; align-items:center; justify-content:center;
          color:#d47828; font-size:14px;
          background:rgba(212,120,40,0.04); transition:all 0.3s;
        }
        .cp-info-item:hover .cp-info-icon { border-color:rgba(212,120,40,0.52); box-shadow:0 0 14px rgba(212,120,40,0.16); }
        .cp-info-label { font-family:'Cinzel',serif; font-size:8px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(212,120,40,0.42); }
        .cp-info-val   { font-family:'EB Garamond',serif; font-size:0.88rem; font-style:italic; color:#5a4020; }

        /* ── social row ── */
        .cp-social { margin-top:48px; display:flex; gap:14px; justify-content:center; align-items:center; flex-wrap:wrap; }
        .cp-social-label { font-family:'Cinzel',serif; font-size:8px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(212,120,40,0.22); }
        .cp-social-sep   { width:1px; height:18px; background:rgba(212,120,40,0.14); }
        .cp-social-link {
          width:38px; height:38px; border-radius:50%;
          border:1px solid rgba(212,120,40,0.16);
          display:flex; align-items:center; justify-content:center;
          color:rgba(212,120,40,0.42); text-decoration:none; font-size:13px;
          transition:all 0.35s ease; background:rgba(212,120,40,0.03);
        }
        .cp-social-link:hover {
          border-color:#d47828; color:#d47828;
          box-shadow:0 0 18px rgba(212,120,40,0.26); transform:translateY(-3px);
          background:rgba(212,120,40,0.07);
        }

        /* ── spinner ── */
        @keyframes cpSpin { to { transform:rotate(360deg); } }
        .cp-spin { animation:cpSpin 0.9s linear infinite; display:inline-block; }

        /* ── responsive ── */
        @media (max-width: 660px) {
          .cp-card  { padding:28px 18px; }
          .cp-row   { grid-template-columns:1fr; }
          .cp-main  { padding:60px 14px 72px; }
          .cp-sigil { display:none; }
          .cp-info  { gap:20px; }
        }
        @media (max-width: 400px) {
          .cp-heading { font-size:1.55rem; }
          .cp-social  { gap:8px; }
          .cp-deco    { display:none; }
        }
      `}</style>

      <div className="cp-page">

        {/* bg */}
        <div className="cp-bg"/>
        <div className="cp-bg-noise"/>
        <div className="cp-bg-grid"/>

        {/* sigils */}
        <div className="cp-sigil tl">✦</div>
        <div className="cp-sigil tr">✦</div>
        <div className="cp-sigil bl">⟡</div>
        <div className="cp-sigil br">⟡</div>

        {/* deco */}
        <div className="cp-deco d1">🪶</div>
        <div className="cp-deco d2">📜</div>
        <div className="cp-deco d3">✦</div>
        <div className="cp-deco d4">⚜</div>

        <div className="cp-main">

          <div className={`cp-reveal ${visible?"on":"off"}`} style={{transitionDelay:"0ms"}}>
            <p className="cp-eyebrow">Lord of the Shadows</p>
          </div>

          <div className={`cp-reveal ${visible?"on":"off"}`} style={{transitionDelay:"120ms"}}>
            <h1 className="cp-heading">Reach the Shadow Realm</h1>
          </div>

          <div className={`cp-reveal ${visible?"on":"off"}`} style={{transitionDelay:"220ms"}}>
            <p className="cp-subhead">
              We are here to answer your questions, hear your thoughts,
              and share secrets reserved for the initiated.
            </p>
          </div>

          <div className={`cp-reveal ${visible?"on":"off"}`}
            style={{transitionDelay:"300ms", width:"100%", maxWidth:"620px"}}>
            <div className="cp-divider">
              <div className="cp-divider-line"/>
              <div className="cp-divider-gem"/>
              <div className="cp-divider-line"/>
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div className={`cp-reveal ${visible?"on":"off"}`}
            style={{transitionDelay:"400ms", width:"100%", maxWidth:"620px"}}>
            <div className="cp-card">
              <div className="cp-cc tl"/><div className="cp-cc tr"/>
              <div className="cp-cc bl"/><div className="cp-cc br"/>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="cp-fields">

                    <div className="cp-row">
                      <div className="cp-field">
                        <label className="cp-label">Your Name</label>
                        <input type="text" className="cp-input"
                          placeholder="Enter your name…"
                          value={form.name}
                          onChange={e => setForm(p => ({...p, name: e.target.value}))}
                          required/>
                      </div>
                      <div className="cp-field">
                        <label className="cp-label">Email Address</label>
                        <input type="email" className="cp-input"
                          placeholder="your@email.com…"
                          value={form.email}
                          onChange={e => setForm(p => ({...p, email: e.target.value}))}
                          required/>
                      </div>
                    </div>

                    <div className="cp-field">
                      <label className="cp-label">Subject</label>
                      <input type="text" className="cp-input"
                        placeholder="What seeks your words…"
                        value={form.subject}
                        onChange={e => setForm(p => ({...p, subject: e.target.value}))}
                        required/>
                    </div>

                    <div className="cp-field">
                      <label className="cp-label">Your Message</label>
                      <textarea className="cp-textarea"
                        placeholder="Speak your words into the darkness…"
                        value={form.message}
                        onChange={e => setForm(p => ({...p, message: e.target.value}))}
                        required/>
                    </div>

                    <button type="submit" disabled={submitting} className="cp-btn">
                      {submitting ? (
                        <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                          <svg className="cp-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="rgba(8,4,0,0.3)" strokeWidth="3"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#080300" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Sending through the Void…
                        </span>
                      ) : "✦  Send Message  ✦"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="cp-success">
                  <div className="cp-success-ring">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="#d47828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3 className="cp-success-title">Message Received</h3>
                  <p className="cp-success-body">
                    Your words have crossed the threshold into the Shadow Realm.
                    A response shall find you — watch the darkness.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* info */}
          <div className={`cp-reveal ${visible?"on":"off"}`} style={{transitionDelay:"520ms"}}>
            <div className="cp-info">
              {[
                {icon:"✉", label:"Email",    val:"shadows@lordseries.com"},
                {icon:"📍", label:"Realm",    val:"The Shadow Archives"},
                {icon:"⏳", label:"Response", val:"Within 48 hours"},
              ].map(item => (
                <div key={item.label} className="cp-info-item">
                  <div className="cp-info-icon">{item.icon}</div>
                  <span className="cp-info-label">{item.label}</span>
                  <span className="cp-info-val">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* social */}
          <div className={`cp-reveal ${visible?"on":"off"}`} style={{transitionDelay:"620ms"}}>
            <div className="cp-social">
              <span className="cp-social-label">Follow the Shadows</span>
              <div className="cp-social-sep"/>
              {[
                {label:"𝕏",  href:"#"},
                {label:"f",  href:"#"},
                {label:"in", href:"#", style:{fontSize:"11px",fontFamily:"'Cinzel',serif"}},
                {label:"▶",  href:"#"},
              ].map((s,i) => (
                <a key={i} href={s.href} className="cp-social-link" style={s.style??{}}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}