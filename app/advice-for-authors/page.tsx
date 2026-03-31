"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, Environment, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState } from 'react'

const advicePosts = [
  { title: "How to Create Compelling Story Hooks", excerpt: "Today, we're going to talk about writing story hooks. So, what is a story hook?…", slug: "#", tag: "Craft" },
  { title: "3 Ways To Spark Your Inspiration!", excerpt: "Today, I want to discuss the topic of finding inspiration. It's a subject I revisit…", slug: "#", tag: "Mindset" },
  { title: "Imposter Syndrome Is Actually Helpful!", excerpt: "Imposter syndrome is one of the weirdest things about being a full-time author...", slug: "#", tag: "Psychology" },
  { title: "Why You Need The Writing Community", excerpt: "Well, hello everybody. I am back from the Origins Game Fair in Columbus, Ohio...", slug: "#", tag: "Community" },
  { title: "New Board Game: Shuffle Dungeons, Coming Soon!", excerpt: "Well, hello everybody. I am back from the Origins Game Fair...", slug: "#", tag: "Projects" },
  { title: "Why You Need Animal Companions In Your Book", excerpt: "Not too long ago, I spent a week near where my parents live...", slug: "#", tag: "Storytelling" },
  { title: "Authors Who Influenced My Writing", excerpt: "Not too long ago, I spent a week near where my parents live...", slug: "#", tag: "Inspiration" },
  { title: "Better Than Zero – A Reminder", excerpt: "In his book, Atomic Habits, James Clear posits that every action we take is a…", slug: "#", tag: "Habits" },
  { title: "Books Sell Books – Reanalyzing The Theory", excerpt: "Some time ago, I made a video on a concept called 'Books Sell Books'...", slug: "#", tag: "Marketing" },
]

const bookCovers = [
  "/images/eBook-2.jpg",
  "/images/cassie-book.jpg",
  "/images/front.jpg",
  "/images/lord-shadow.jpg",
]

/* ── Floating glowing orb ── */
function GlowOrb({ position, color, scale = 1 }: { position: [number,number,number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = (position[1]) + Math.sin(state.clock.elapsedTime * 0.7) * 0.6
    }
  })
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.18}
        roughness={0}
        metalness={0.2}
      />
    </mesh>
  )
}

/* ── Rotating torus ring ── */
function TorusRing({ position, color }: { position: [number,number,number], color: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.z = state.clock.elapsedTime * 0.15
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[3.5, 0.08, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.35} />
    </mesh>
  )
}

/* ── Floating Book ── */
function FloatingBook({ position, coverSrc, delay }: { position: [number,number,number], coverSrc: string, delay: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const texture = useMemo(() => new THREE.TextureLoader().load(coverSrc), [coverSrc])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.35
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.0 + delay) * 0.06
      groupRef.current.scale.setScalar(s)
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
      <group ref={groupRef} position={position}>
        {/* Cover */}
        <mesh castShadow>
          <planeGeometry args={[2.8, 3.8]} />
          <meshStandardMaterial map={texture} metalness={0.15} roughness={0.4} />
        </mesh>
        {/* Spine */}
        <mesh position={[1.45, 0, -0.05]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.18, 3.8]} />
          <meshStandardMaterial color="#0f0a00" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Orange glow underneath */}
        <pointLight color="#f97316" intensity={0.8} distance={6} />
      </group>
    </Float>
  )
}

/* ── Orange flowing particles ── */
function OrangeParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 1000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 50
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < count; i++) {
        const iy = i * 3 + 1
        ;(pos.array as Float32Array)[iy] += Math.sin(state.clock.elapsedTime * 0.8 + i * 0.5) * 0.015
      }
      pos.needsUpdate = true
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.14} color="#fb923c" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

/* ── Main scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 10, 5]}  color="#f97316" intensity={2.5} />
      <pointLight position={[-12, -6, 8]} color="#fbbf24" intensity={1.2} />
      <pointLight position={[14, 4, -6]}  color="#ea580c" intensity={1.0} />

      <OrangeParticles />

      {/* Soft orange sparkles */}
      <Sparkles count={350} size={6} speed={2.5} color="#fb923c" position={[2, 3, 5]} />
      <Sparkles count={200} size={2} speed={1.8} color="#fde68a" position={[-4, -2, 0]} />

      {/* Glowing orbs */}
      <GlowOrb position={[-8, 3, -5]}  color="#f97316" scale={1.4} />
      <GlowOrb position={[9, -2, -8]}  color="#ea580c" scale={1.1} />
      <GlowOrb position={[0, -5, -12]} color="#fbbf24" scale={2.0} />

      {/* Torus rings */}
      <TorusRing position={[-10, 4, -10]} color="#f97316" />
      <TorusRing position={[11, -3, -8]}  color="#fbbf24" />

      {/* Floating books in orbit */}
      {bookCovers.map((cover, i) => {
        const angle  = (i * 72) * (Math.PI / 180)
        const radius = 12
        return (
          <FloatingBook
            key={i}
            coverSrc={cover}
            position={[
              Math.cos(angle) * radius,
              (i % 2 === 0 ? 2 : -2) + i * 0.3,
              Math.sin(angle) * radius - 2,
            ]}
            delay={i * 1.8}
          />
        )
      })}

      <Environment preset="sunset" />
    </>
  )
}

/* ── Tag color mapping ── */
const tagColors: Record<string, string> = {
  Craft: "#f97316",
  Mindset: "#fb923c",
  Psychology: "#ea580c",
  Community: "#fbbf24",
  Projects: "#f59e0b",
  Storytelling: "#f97316",
  Inspiration: "#fb923c",
  Habits: "#ea580c",
  Marketing: "#fbbf24",
}

/* ── Card component ── */
function AdviceCard({ post, index }: { post: typeof advicePosts[0], index: number }) {
  const [hovered, setHovered] = useState(false)
  const accent = tagColors[post.tag] ?? "#f97316"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(20,10,0,0.97) 0%, rgba(30,15,0,0.95) 100%)"
          : "linear-gradient(135deg, rgba(12,6,0,0.95) 0%, rgba(18,10,0,0.93) 100%)",
        border: hovered ? `1px solid ${accent}55` : "1px solid rgba(251,146,60,0.12)",
        boxShadow: hovered ? `0 0 40px ${accent}22, 0 8px 32px rgba(0,0,0,0.6)` : "0 4px 24px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        backdropFilter: "blur(20px)",
        minHeight: "360px",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${accent}, transparent)`
            : `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
        }}
      />

      {/* Glow dot top-right */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-300"
        style={{ background: accent, boxShadow: hovered ? `0 0 12px ${accent}` : "none", opacity: hovered ? 1 : 0.4 }}
      />

      <div className="flex flex-col flex-1 p-8">
        {/* Tag */}
        <span
          className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 inline-block"
          style={{ color: accent }}
        >
          {post.tag}
        </span>

        {/* Title */}
        <h3
          className="font-serif text-2xl leading-snug mb-4 transition-colors duration-300"
          style={{
            color: hovered ? "#fff" : "#e5d5c0",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {post.title}
        </h3>

        {/* Divider */}
        <div
          className="h-px mb-5 transition-all duration-500"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${accent}80, transparent)`
              : "rgba(251,146,60,0.1)",
          }}
        />

        {/* Excerpt */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: "#a08060" }}>
          {post.excerpt}
        </p>

        {/* CTA */}
        <Link
          href={post.slug}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
          style={{ color: hovered ? accent : "#7a5535" }}
        >
          Read More
          <span
            className="transition-transform duration-300 text-lg"
            style={{ transform: hovered ? "translateX(6px)" : "translateX(0)" }}
          >
            →
          </span>
        </Link>
      </div>

      {/* Corner ornament */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at bottom right, ${accent}18, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  )
}

/* ── Page ── */
export default function AdviceForAuthors() {
  return (
    <>
      <Navigation />

      {/* Full-screen Three.js bg */}
      <div className="fixed inset-0 -z-10" style={{ background: "#07030a" }}>
        <Canvas camera={{ position: [0, 0, 22], fov: 50 }} shadows>
          <Scene />
        </Canvas>
      </div>

      <div className="min-h-screen text-white relative overflow-hidden">
        {/* Hero */}
        <div className="pt-32 pb-20 text-center px-6 relative z-10">
          {/* Eyebrow */}
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-6"
            style={{ color: "#f97316" }}
          >
            25+ Novels of Hard-Earned Wisdom
          </p>

          <h1
            className="text-6xl md:text-8xl font-serif tracking-tight text-white mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.05 }}
          >
            Advice For <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f97316, #fbbf24, #ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Authors
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base md:text-lg" style={{ color: "#a07850" }}>
            Real lessons, mindsets, and strategies that actually move the needle — from the trenches of full-time authorship.
          </p>

          {/* Decorative line */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #f97316)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #f97316, transparent)" }} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advicePosts.map((post, index) => (
              <AdviceCard key={index} post={post} index={index} />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div
          className="text-center py-14 text-xs tracking-widest uppercase border-t relative z-10"
          style={{ color: "#5a3820", borderColor: "rgba(249,115,22,0.1)" }}
        >
          More advice coming soon &nbsp;•&nbsp; The Craft Never Ends
        </div>
      </div>

      <Footer />
    </>
  )
}