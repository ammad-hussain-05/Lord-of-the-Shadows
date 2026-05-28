"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, Environment, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

/* ─── SWAP YOUR 4 IMAGES HERE ─────────────────────────────────────────────── */
const BOOK_IMAGES = [
  { src: "/images/cassie-book.jpg",       alt: "Book One"   },
  { src: "/images/eBook-2.jpg",       alt: "Book Two"   },
  { src: "/images/lord-shadow.jpg",   alt: "Book Three" },
  { src: "/images/front.jpg",        alt: "Book Four"  },
]
/* ─────────────────────────────────────────────────────────────────────────── */

/* ── 3-D scene pieces (unchanged) ── */
const BOOK_DATA = [
  { color:"#1a0e00", spine:"#d47828", w:2.2, h:3.2, d:0.28 },
  { color:"#0d0d1a", spine:"#d47828", w:2.0, h:3.0, d:0.22 },
  { color:"#100a00", spine:"#d47828", w:2.3, h:3.3, d:0.30 },
  { color:"#0a100d", spine:"#d47828", w:2.1, h:3.1, d:0.25 },
  { color:"#150808", spine:"#d47828", w:2.0, h:3.2, d:0.20 },
  { color:"#080d15", spine:"#d47828", w:2.2, h:3.0, d:0.26 },
]

function Book3D({ position, rotation, bookData, index }: {
  position:[number,number,number]; rotation:[number,number,number]
  bookData:typeof BOOK_DATA[0]; index:number
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const glowRef  = useRef<THREE.Mesh>(null!)
  const { w,h,d,color,spine } = bookData
  useFrame((s) => {
    if (!groupRef.current) return
    const t = s.clock.elapsedTime
    groupRef.current.position.y = position[1] + Math.sin(t*0.55+index*1.1)*0.28
    groupRef.current.rotation.y = rotation[1]  + Math.sin(t*0.35+index*0.9)*0.14
    if (glowRef.current)
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.7 + Math.sin(t*1.4+index)*0.3
  })
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef} position={position} rotation={rotation}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w,h,d]}/>
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.65} envMapIntensity={1.2}/>
        </mesh>
        <mesh ref={glowRef} position={[-w/2+0.02,0,0]}>
          <boxGeometry args={[0.05,h*0.88,d*0.82]}/>
          <meshStandardMaterial color={spine} emissive={spine} emissiveIntensity={0.8} metalness={0.95} roughness={0.05}/>
        </mesh>
        <mesh position={[0,h/2-0.02,0]}>
          <boxGeometry args={[w*0.94,0.04,d*0.88]}/>
          <meshStandardMaterial color="#d47828" emissive="#d47828" emissiveIntensity={0.5} metalness={1} roughness={0.08}/>
        </mesh>
        <mesh position={[w/2-0.03,0,0]}>
          <boxGeometry args={[0.07,h*0.92,d*0.86]}/>
          <meshStandardMaterial color="#f0e2c0" metalness={0} roughness={0.95}/>
        </mesh>
        <pointLight color="#d47828" intensity={0.5} distance={5}/>
      </group>
    </Float>
  )
}

function BookCarousel() {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame((s) => { if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime*0.09 })
  const books = useMemo(() => BOOK_DATA.map((b,i) => {
    const angle=i/BOOK_DATA.length*Math.PI*2, r=7.5
    return { data:b,
      pos:[Math.cos(angle)*r,(i%2===0?0.9:-0.9),Math.sin(angle)*r] as [number,number,number],
      rot:[-0.07,-angle+Math.PI/2,0.05*(i%2===0?1:-1)] as [number,number,number] }
  }),[])
  return <group ref={groupRef}>{books.map((b,i)=><Book3D key={i} index={i} position={b.pos} rotation={b.rot} bookData={b.data}/>)}</group>
}

function GoldDust() {
  const ref=useRef<THREE.Points>(null!); const count=900
  const {positions,speeds}=useMemo(()=>{
    const p=new Float32Array(count*3),s=new Float32Array(count)
    for(let i=0;i<count;i++){p[i*3]=(Math.random()-.5)*32;p[i*3+1]=(Math.random()-.5)*20;p[i*3+2]=(Math.random()-.5)*22;s[i]=.2+Math.random()*.6}
    return{positions:p,speeds:s}
  },[])
  useFrame((s)=>{
    if(!ref.current)return
    const pos=ref.current.geometry.attributes.position as THREE.BufferAttribute,arr=pos.array as Float32Array,t=s.clock.elapsedTime
    for(let i=0;i<count;i++){arr[i*3+1]+=Math.sin(t*speeds[i]+i)*.004;arr[i*3]+=Math.cos(t*speeds[i]*.5+i)*.002}
    pos.needsUpdate=true
  })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3}/></bufferGeometry><pointsMaterial size={0.065} color="#d47828" transparent opacity={0.5} sizeAttenuation/></points>
}

function PortalOrb() {
  const ref=useRef<THREE.Mesh>(null!)
  useFrame((s)=>{if(!ref.current)return;ref.current.rotation.y=s.clock.elapsedTime*.22;ref.current.rotation.z=s.clock.elapsedTime*.09;(ref.current.material as any).distort=.3+Math.sin(s.clock.elapsedTime*.7)*.1})
  return <mesh ref={ref} position={[0,0,0]}><sphereGeometry args={[1.8,64,64]}/><MeshDistortMaterial color="#080400" emissive="#d47828" emissiveIntensity={0.12} distort={0.3} speed={1.4} transparent opacity={0.22} roughness={0} metalness={0.6}/></mesh>
}

function FloatingRune({position,delay}:{position:[number,number,number];delay:number}) {
  const ref=useRef<THREE.Mesh>(null!)
  useFrame((s)=>{if(!ref.current)return;ref.current.rotation.x=s.clock.elapsedTime*.5+delay;ref.current.rotation.z=s.clock.elapsedTime*.3+delay;ref.current.position.y=position[1]+Math.sin(s.clock.elapsedTime*.65+delay)*.32})
  return <mesh ref={ref} position={position}><torusGeometry args={[0.32,.055,12,48]}/><meshStandardMaterial color="#d47828" emissive="#d47828" emissiveIntensity={1} metalness={1} roughness={0.04}/></mesh>
}

function Scene() {
  return <>
    <ambientLight intensity={0.07}/>
    <pointLight position={[0,7,0]} color="#d47828" intensity={2.8}/>
    <pointLight position={[-9,-4,4]} color="#d4841a" intensity={1.1}/>
    <pointLight position={[9,-4,4]}  color="#8b5a00" intensity={0.9}/>
    <GoldDust/><BookCarousel/><PortalOrb/>
    <Sparkles count={280} size={4}   speed={1.4} color="#d47828" position={[0,2,0]}/>
    <Sparkles count={120} size={1.4} speed={0.7} color="#f5e0a0" position={[0,-3,0]}/>
    {([ [-4,1,-2],[4,-1,-3],[-3,-2,2],[5,2,1],[-5,0,3] ] as [number,number,number][]).map((p,i)=><FloatingRune key={i} position={p} delay={i*1.3}/>)}
    <Environment preset="night"/>
  </>
}

/* ── Main component ── */
export default function NewsletterSection() {
  const [email,setEmail]         = useState("")
  const [submitting,setSubmit]   = useState(false)
  const [submitted,setSubmitted] = useState(false)
  const [focused,setFocused]     = useState(false)
  const sectionRef               = useRef<HTMLDivElement>(null)
  const [visible,setVisible]     = useState(false)

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVisible(true)},{threshold:0.05})
    if(sectionRef.current)obs.observe(sectionRef.current)
    return()=>obs.disconnect()
  },[])

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();setSubmit(true)
    await new Promise(r=>setTimeout(r,1800))
    setSubmit(false);setSubmitted(true)
  }

  return (
    <>
      <Navigation />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── wrapper ── */
        .nl-wrap {
          position: relative;
          width: 100%;
          background: #020100;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* push content below fixed nav (~72px) */
          padding-top: 80px;
        }

        /* bg layers */
        .nl-noise {
          position:absolute;inset:0;z-index:1;opacity:.045;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:128px;
        }
        .nl-grad {
          position:absolute;inset:0;z-index:1;pointer-events:none;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  #1a0d0025 0%,transparent 60%),
            radial-gradient(ellipse 50% 55% at 0% 65%,  #0d060018 0%,transparent 55%),
            radial-gradient(ellipse 50% 55% at 100% 65%,#0d060012 0%,transparent 55%);
        }
        .nl-canvas { position:absolute;inset:0;z-index:2; }
        .nl-vignette {
          position:absolute;inset:0;z-index:3;pointer-events:none;
          background:radial-gradient(ellipse 75% 75% at 50% 50%,transparent 35%,#000000f0 100%);
        }
        .nl-dof {
          position:absolute;width:550px;height:550px;
          top:50%;left:50%;transform:translate(-50%,-50%);
          border-radius:50%;
          background:radial-gradient(circle,#d478280a 0%,transparent 70%);
          box-shadow:0 0 100px 50px #d4782808;
          z-index:3;pointer-events:none;
        }

        /* ── hero region (3d + form) ── */
        .nl-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── center form card ── */
        .nl-content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          padding: 60px 24px 56px;
          width: 100%; max-width: 560px;
          text-align: center;
        }

        /* reveal animation */
        .nl-reveal { transition: opacity 1s ease, transform 1s ease; }
        .nl-reveal.off { opacity:0; transform:translateY(26px); }
        .nl-reveal.on  { opacity:1; transform:translateY(0); }

        /* typography */
        .nl-eyebrow {
          font-family:'Cinzel',serif;font-size:10px;font-weight:600;
          letter-spacing:.35em;text-transform:uppercase;color:#d47828;margin-bottom:18px;
        }
        .nl-sep { display:flex;align-items:center;gap:12px;width:100%;margin-bottom:22px; }
        .nl-sep-line { flex:1;height:1px;background:linear-gradient(90deg,transparent,#d4782870,transparent); }
        .nl-sep-gem {
          width:6px;height:6px;border-radius:50%;background:#d47828;
          box-shadow:0 0 10px #d47828,0 0 20px #d4782850;
        }
        .nl-heading {
          font-family:'Cinzel',serif;font-weight:900;
          font-size:clamp(2.2rem,6vw,3.8rem);line-height:1.08;letter-spacing:.04em;
          background:linear-gradient(155deg,#fff 0%,#f5e8c8 35%,#d47828 65%,#8b6010 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          margin-bottom:10px;
        }
        .nl-subhead {
          font-family:'Cinzel',serif;font-size:clamp(.75rem,1.8vw,.95rem);
          letter-spacing:.22em;color:#6b4a10;margin-bottom:16px;text-transform:uppercase;
        }
        .nl-body {
          font-family:'Crimson Text',Georgia,serif;font-size:1.1rem;line-height:1.9;
          color:#6a4e28;margin-bottom:36px;font-style:italic;max-width:400px;
        }

        /* stats */
        .nl-stats {
          display:flex;width:100%;border:1px solid #1e1000;border-radius:4px;
          overflow:hidden;margin-bottom:36px;
          background:linear-gradient(135deg,#0a0600cc,#060300cc);
        }
        .nl-stat-item { flex:1;padding:14px 8px;text-align:center;border-right:1px solid #1e1000; }
        .nl-stat-item:last-child { border-right:none; }
        .nl-stat-num { font-family:'Cinzel',serif;font-size:1.25rem;font-weight:700;color:#d47828;display:block; }
        .nl-stat-lbl { font-family:'Crimson Text',serif;font-size:.7rem;color:#3e2808;letter-spacing:.12em;text-transform:uppercase; }

        /* input */
        .nl-scroll-wrap { position:relative;width:100%;margin-bottom:12px; }
        .nl-scroll-wrap::before,.nl-scroll-wrap::after {
          content:'';position:absolute;left:18px;right:18px;height:1px;
          background:linear-gradient(90deg,transparent,#d4782850,transparent);transition:background .4s;
        }
        .nl-scroll-wrap::before{top:0;}.nl-scroll-wrap::after{bottom:0;}
        .nl-scroll-wrap.focused::before,.nl-scroll-wrap.focused::after{background:linear-gradient(90deg,transparent,#d47828,transparent);}
        .nl-corner{position:absolute;width:11px;height:11px;border-color:#d47828;border-style:solid;transition:opacity .3s;opacity:.4;}
        .nl-corner.tl{top:-1px;left:-1px;border-width:2px 0 0 2px;}
        .nl-corner.tr{top:-1px;right:-1px;border-width:2px 2px 0 0;}
        .nl-corner.bl{bottom:-1px;left:-1px;border-width:0 0 2px 2px;}
        .nl-corner.br{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}
        .nl-scroll-wrap.focused .nl-corner{opacity:1;}
        .nl-input {
          width:100%;padding:20px 28px;box-sizing:border-box;
          background:linear-gradient(135deg,#0d0800f0,#080500f0);
          border:1px solid #251500;border-radius:4px;
          color:#f5e8c8;font-family:'Crimson Text',Georgia,serif;
          font-size:1rem;font-style:italic;outline:none;
          transition:all .4s ease;text-align:center;letter-spacing:.04em;
        }
        .nl-input::placeholder{color:#3e2808;font-style:italic;}
        .nl-input:focus{
          border-color:#d4782860;
          background:linear-gradient(135deg,#120a00f0,#0a0600f0);
          box-shadow:0 0 0 1px #d4782825,0 0 28px #d4782812,inset 0 1px 0 #d478280f;
        }

        /* button */
        .nl-sigil {
          position:relative;width:100%;padding:18px 32px;border:none;
          border-radius:4px;cursor:pointer;overflow:hidden;
          font-family:'Cinzel',serif;font-size:11px;font-weight:700;
          letter-spacing:.3em;text-transform:uppercase;color:#080400;
          background:linear-gradient(135deg,#8b6010 0%,#d47828 30%,#e8c87a 60%,#d47828 80%,#8b6010 100%);
          background-size:200% 100%;background-position:100% 0;
          transition:all .5s ease;
          box-shadow:0 2px 20px #d4782828,inset 0 1px 0 rgba(255,255,255,.28);
        }
        .nl-sigil:hover:not(:disabled){
          background-position:0% 0;
          box-shadow:0 4px 44px #d4782855,0 0 80px #d4782818,inset 0 1px 0 rgba(255,255,255,.38);
          transform:translateY(-2px);
        }
        .nl-sigil:active:not(:disabled){transform:translateY(0);}
        .nl-sigil:disabled{opacity:.5;cursor:not-allowed;}
        .nl-sigil::after{
          content:'';position:absolute;top:0;left:-100%;width:70%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);
          transform:skewX(-18deg);transition:left .55s ease;
        }
        .nl-sigil:hover::after{left:130%;}

        .nl-fine{margin-top:14px;font-family:'Crimson Text',serif;font-size:.76rem;color:#321a04;letter-spacing:.06em;}

        /* success */
        .nl-success{display:flex;flex-direction:column;align-items:center;gap:14px;}
        .nl-success-icon{
          width:70px;height:70px;border-radius:50%;
          background:radial-gradient(circle,#d478281a,transparent 70%);
          border:1px solid #d4782855;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 38px #d4782828;
        }

        /* ── BOOK IMAGE GRID ── */
        .nl-books-section {
          position: relative; z-index: 10;
          width: 100%; max-width: 1100px;
          padding: 0 24px 100px;
        }
        .nl-books-label {
          font-family:'Cinzel',serif;font-size:10px;font-weight:600;
          letter-spacing:.35em;text-transform:uppercase;color:#6b4a10;
          text-align:center;margin-bottom:40px;
        }
        .nl-books-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .nl-book-card {
          position: relative;
          aspect-ratio: 2/3;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #2a1500;
          cursor: pointer;
          transition: transform .4s ease, box-shadow .4s ease, border-color .4s ease;
        }
        .nl-book-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 20px 60px #d4782830, 0 0 0 1px #d4782850;
          border-color: #d4782880;
        }
        /* gold shimmer overlay on hover */
        .nl-book-card::after {
          content:'';
          position:absolute;inset:0;
          background:linear-gradient(135deg,transparent 40%,#d4782818 100%);
          opacity:0;transition:opacity .4s;
        }
        .nl-book-card:hover::after { opacity:1; }

        /* top gold line on card */
        .nl-book-card::before {
          content:'';
          position:absolute;top:0;left:0;right:0;height:2px;z-index:2;
          background:linear-gradient(90deg,transparent,#d47828,transparent);
          opacity:0;transition:opacity .4s;
        }
        .nl-book-card:hover::before { opacity:1; }

        /* number badge */
        .nl-book-num {
          position:absolute;bottom:10px;left:10px;z-index:3;
          font-family:'Cinzel',serif;font-size:9px;font-weight:700;
          letter-spacing:.2em;color:#d47828;
          background:#00000090;padding:3px 8px;border-radius:3px;
          border:1px solid #d4782840;
        }

        /* ── responsive ── */
        @media (max-width: 900px) {
          .nl-books-grid { grid-template-columns: repeat(2, 1fr); gap:16px; }
        }
        @media (max-width: 540px) {
          .nl-content { padding: 40px 16px 48px; }
          .nl-books-grid { grid-template-columns: repeat(2, 1fr); gap:12px; }
          .nl-books-section { padding: 0 16px 70px; }
        }
        @media (max-width: 340px) {
          .nl-books-grid { grid-template-columns: 1fr 1fr; gap:10px; }
        }
      `}</style>

      <div className="nl-wrap" ref={sectionRef}>

        {/* ── bg ── */}
        <div className="nl-noise"/>
        <div className="nl-grad"/>
        <div className="nl-dof"/>
        <div className="nl-canvas">
          <Canvas camera={{position:[0,1.5,16],fov:52}} shadows gl={{antialias:true,alpha:true}}>
            <Scene/>
          </Canvas>
        </div>
        <div className="nl-vignette"/>

        {/* ── HERO: 3D + form ── */}
        <div className="nl-hero">
          <div className="nl-content">

            {/* eyebrow */}
            <div className={`nl-reveal ${visible?"on":"off"}`} style={{transitionDelay:"0ms",width:"100%"}}>
              <p className="nl-eyebrow">✦ The Shadow Chronicles ✦</p>
            </div>

            {/* sep */}
            <div className={`nl-reveal nl-sep ${visible?"on":"off"}`} style={{transitionDelay:"80ms"}}>
              <div className="nl-sep-line"/><div className="nl-sep-gem"/><div className="nl-sep-line"/>
            </div>

            {/* heading */}
            <div className={`nl-reveal ${visible?"on":"off"}`} style={{transitionDelay:"160ms"}}>
              <h2 className="nl-heading">Enter the<br/>Shadow Realm</h2>
              <p className="nl-subhead">Lord of the Shadows</p>
            </div>

            {/* body */}
            <div className={`nl-reveal ${visible?"on":"off"}`} style={{transitionDelay:"280ms"}}>
              <p className="nl-body">
                Cross the threshold. Receive sacred knowledge — early chapters,
                signed relics, and whispered secrets reserved for the initiated few.
              </p>
            </div>

            {/* stats */}
            <div className={`nl-reveal ${visible?"on":"off"}`} style={{transitionDelay:"360ms",width:"100%"}}>
              <div className="nl-stats">
                {[["12K+","Initiates"],["25+","Tomes"],["Free","Entry"]].map(([n,l])=>(
                  <div key={l} className="nl-stat-item">
                    <span className="nl-stat-num">{n}</span>
                    <span className="nl-stat-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* form */}
            <div className={`nl-reveal ${visible?"on":"off"}`} style={{transitionDelay:"440ms",width:"100%"}}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{width:"100%"}}>
                  <div className={`nl-scroll-wrap ${focused?"focused":""}`}>
                    <div className="nl-corner tl"/><div className="nl-corner tr"/>
                    <div className="nl-corner bl"/><div className="nl-corner br"/>
                    <input
                      type="email" className="nl-input"
                      placeholder="Enter your email to unlock secrets…"
                      value={email} onChange={e=>setEmail(e.target.value)}
                      onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
                      required
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="nl-sigil" style={{marginTop:8}}>
                    {submitting?(
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="rgba(8,4,0,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="#080400" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Opening the Gate…
                      </span>
                    ):"✦  Unlock Secrets  ✦"}
                  </button>
                  <p className="nl-fine">No enchantments without consent. Unsubscribe anytime.</p>
                </form>
              ):(
                <div className="nl-success">
                  <div className="nl-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d47828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3 style={{fontFamily:"'Cinzel',serif",fontSize:"1.45rem",fontWeight:700,color:"#f5e8c8"}}>The Gate Opens</h3>
                  <p style={{fontFamily:"'Crimson Text',serif",fontSize:"1.05rem",fontStyle:"italic",color:"#7a5a30"}}>
                    You have crossed the threshold. Your first scroll arrives soon — watch the shadows.
                  </p>
                </div>
              )}
            </div>

            {/* bottom sep */}
            <div className={`nl-reveal nl-sep ${visible?"on":"off"}`} style={{transitionDelay:"560ms",marginTop:36,marginBottom:0}}>
              <div className="nl-sep-line"/><div className="nl-sep-gem"/><div className="nl-sep-line"/>
            </div>
          </div>
        </div>

        {/* ── BOOK IMAGE GRID ── */}
       

      </div>

      <Footer/>
    </>
  )
}