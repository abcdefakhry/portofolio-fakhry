"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// --- 1. DATA ---
const projects = [
  { id: 1, title: "Portofolio", category: "WEB DEVELOPMENT", description: "Website portofolio pribadi interaktif dan responsif yang dibangun menggunakan Next.js, Framer Motion, dan Tailwind CSS.", image: "/portofolio2.jpg", link: "https://fakhry.my.id", github: "https://github.com/abcdefakhry/portofolio-fakhry" },
  { id: 5, title: "FitBot", category: "WEB DEVELOPMENT", description: "Chatbot kesehatan berbasis web untuk konsultasi kebugaran dan panduan latihan fisik.", image: "/fitbot.jpg", link: "https://abcdefakhry.github.io/FitBot/", github: "https://github.com/abcdefakhry/FitBot" },
  { id: 4, title: "Web Selempang UMKM", category: "WEB DEVELOPMENT", description: "Website katalog dan kustomisasi selempang wisuda premium untuk usaha mikro (UMKM) Dins Selempang.", image: "/web-selempang-umkm.jpg", link: "https://tinyurl.com/dinsselempang", github: "https://github.com/WEB-PORTOFOLIO-SELEMPANG/PORTO-SELEMPANG" },
];

const experiences = [
  { id: 1, role: "Staff EKRAF HMIF UPNVJ", company: "Himpunan Mahasiswa Informatika UPNVJ", period: "2025 - 2026", desc: "Riset pengguna dan perancangan antarmuka proyek organisasi." },
  { id: 2, role: "Software Engineer Student", company: "Universitas Pembangunan UPNVJ", period: "2024 - Present", desc: "Chatbot kesehatan berbasis web untuk konsultasi kebugaran." },
  { id: 3, role: "Anggota KSM Multimedia UPNVJ", company: "KSM Multimedia UPNVJ", period: "2026 - Present", desc: "Mengembangkan keterampilan di bidang multimedia kreatif seperti desain grafis, videografi, dan produksi media digital." },
  { id: 4, role: "Student Code Developer Generations and Optimization", company: "IBM SkillsBuild & Hacktiv8", period: "2025", desc: "Program pelatihan intensif pengembangan web dan pembelajaran konsep dasar optimasi aplikasi." },
];

const services = [
  {
    id: 1,
    title: "Design Grafis",
    description: "Menyediakan solusi visual kreatif untuk kebutuhan digital maupun cetak. Saya merancang desain yang berfokus pada keindahan estetika, keselarasan warna, dan tipografi modern guna menyampaikan pesan secara efektif kepada audiens.",
    skills: ["Figma", "Affinity", "Branding", "Poster Design", "Social Media Visuals"]
  },
  {
    id: 2,
    title: "Front-end Development",
    description: "Mentransformasikan desain kreatif menjadi antarmuka website yang interaktif, responsif, dan mudah digunakan. Saya fokus menulis kode yang bersih dan terstruktur, mengoptimalkan kecepatan akses, serta menambahkan animasi transisi yang mulus untuk pengalaman pengguna yang menyenangkan.",
    skills: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "JavaScript", "HTML5 & CSS3"]
  }
];

const faqs = [
  { id: 1, question: "Berapa lama pengerjaan proyek?", answer: "Biasanya berkisar antara 2-4 minggu tergantung kompleksitas desain." },
  { id: 2, question: "Teknologi apa yang kamu gunakan?", answer: "Saya spesialis di Next.js, Framer Motion, dan Tailwind CSS." },
];

// --- 3. VARIAN ANIMASI REVEAL ON SCROLL ---
const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  return (
    <nav
      className="absolute top-0 left-0 w-full flex justify-between items-center p-6 md:p-8 z-[100] mix-blend-difference pointer-events-none"
    >
      <div />
      <div className="flex items-center space-x-6 pointer-events-auto">
        {/*
        // <a
        //   href="/CV_Fakhry.pdf" download
        //   className="px-5 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase hover:bg-lime-400 transition-colors"
        // >
        //   Download CV
        // </a>
        */}

        {/* HAMBURGER BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col space-y-1.5 z-[101] group"
        >
          <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7.5 : 0 }} className="w-8 h-[2px] bg-white group-hover:bg-lime-400 transition-colors" />
          <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="w-8 h-[2px] bg-white group-hover:bg-lime-400 transition-colors" />
          <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7.5 : 0 }} className="w-8 h-[2px] bg-white group-hover:bg-lime-400 transition-colors" />
        </button>
      </div>
    </nav>
  );
}

// --- 4. KOMPONEN UTAMA ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mainRef = useRef<HTMLElement>(null);

  const selectedProject = projects.find(p => p.id === selectedId);

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "Experience", href: "#experience" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Project", href: "#work" },
  ];

  const marqueeText = "JavaScript • HTML • CSS • PHP • Laravel • MySQL • Supabase • Next.js • Node-RED • MQTT • Framer • Tailwind CSS • TypeScript • Figma • ";

  return (
    <main
      ref={mainRef}
      className={`h-dvh bg-[#0a0a0a] text-white font-sans relative ${
        isMenuOpen || selectedId !== null ? "overflow-hidden" : "overflow-y-scroll scroll-smooth"
      }`}
    >

      {/* NAVBAR */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[90] flex flex-col justify-center items-center p-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col space-y-6"
            >
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl md:text-7xl font-bold uppercase italic hover:text-lime-400 transition-colors tracking-tighter"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="mailto:fakhryzackyputra@gmail.com"
                className="text-2xl md:text-4xl font-mono text-gray-500 hover:text-white uppercase tracking-widest pt-10"
              >
                Let's Talk →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative h-dvh w-full flex flex-col">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex-grow flex flex-col justify-center pb-16 md:pb-32">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[12px] font-mono text-lime-400 uppercase tracking-[0.1em] mb-6">
            Hi, my name is
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }} className="text-4xl sm:text-7xl md:text-[7rem] font-bold leading-[0.9] md:leading-[0.85] tracking-tighter uppercase italic">
              Muhammad Fakhry <br /> <span className="text-gray-600">Zacky Putra</span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm md:text-lg text-gray-400 max-w-2xl leading-relaxed mt-1">
            I am an Informatics student at UPN Veteran Jakarta with a strong interest in digital innovation. Currently, I am developing my skills in designing, building, and maintaining user-focused websites and applications, specializing in front-end development and graphic design.
          </motion.p>
        </div>

        {/* MARQUEE MENTOK BAWAH */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-lime-400 py-4 md:py-6 select-none z-10 shadow-2xl">
          <div className="animate-marquee flex w-max whitespace-nowrap text-black font-black text-4xl md:text-7xl uppercase italic">
            <span className="pr-10">{marqueeText.repeat(2)}</span>
            <span className="pr-10">{marqueeText.repeat(2)}</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: HISTORY */}
      <motion.section
        id="experience"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="min-h-fit flex flex-col justify-center px-6 md:px-8 max-w-7xl mx-auto w-full py-24 md:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter italic uppercase text-white leading-none">Experience</h2>
            </div>
            <div className="md:col-span-8">
              {experiences.map((exp) => (
                  <div key={exp.id} className="group border-b border-gray-900 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
                    <div>
                        <h3 className="text-xl md:text-2xl font-medium">{exp.role}</h3>
                        <p className="text-lime-400 font-mono text-[10px] md:text-xs mt-1 uppercase">{exp.company}</p>
                    </div>
                    <div className="sm:text-right text-gray-500 text-xs md:text-sm"><p>{exp.period}</p></div>
                  </div>
              ))}
            </div>
        </div>
      </motion.section>

      {/* SECTION 3: CAPABILITIES */}
      <motion.section
        id="capabilities"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="min-h-fit flex flex-col justify-center px-6 md:px-8 max-w-7xl mx-auto w-full py-24 md:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter italic uppercase text-white leading-none">Capabilities</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-2">
            {services.map((s) => (
              <div key={s.id} className="border-b border-gray-900 py-10 flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-medium text-white uppercase">{s.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">{s.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {s.skills?.map((skill, index) => (
                    <span key={index} className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-lime-400 px-3 py-1 rounded-full uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: SELECTED WORKS */}
      <motion.section
        id="work"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="min-h-fit flex flex-col justify-center px-6 md:px-8 max-w-7xl mx-auto w-full py-24 md:py-32"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter italic uppercase text-white leading-none">Projects</h2>
          </div>
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={() => setSelectedId(p.id)} className="group cursor-pointer">
                <motion.div layoutId={`img-wrapper-${p.id}`} className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-[3/2] mb-3 md:mb-4 bg-gray-900">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={p.title}
                  />
                </motion.div>
                <motion.h3 layoutId={`title-${p.id}`} className="text-lg md:text-xl font-medium uppercase tracking-tight group-hover:text-lime-400 transition-colors duration-300">{p.title}</motion.h3>
                <p className="text-[9px] font-mono text-lime-400 mt-1 uppercase">{p.category}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* SECTION 6: CTA */}
      <motion.section
        id="contact"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="min-h-fit flex flex-col justify-center text-center px-6 md:px-8 max-w-7xl mx-auto w-full py-24 md:py-32"
      >
        <p className="text-[9px] md:text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-10 italic">Ready to start?</p>
        <div className="mb-24 select-none">
          <h2 className="text-4xl sm:text-6xl md:text-[10rem] font-bold tracking-tighter uppercase italic leading-none text-lime-400">
            Let's Work <br /> Together
          </h2>
        </div>

        <div className="flex justify-center gap-6">
            <a href="mailto:fakhryzackyputra@gmail.com" className="p-4 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="https://www.instagram.com/fakhryzp?igsh=MWN6NHdrbzZkbXBnag%3D%3D&utm_source=qr" target="_blank" className="p-4 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/in/fakhryzacky" target="_blank" className="p-4 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://github.com/abcdefakhry" target="_blank" className="p-4 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
        </div>

        <div className="mt-20 text-[9px] text-gray-600 uppercase font-mono tracking-widest leading-loose">
          <p>© 2026 Muhammad Fakhry Zacky Putra</p>
        </div>
      </motion.section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-20 bg-black/50 backdrop-blur-xl overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111] w-full max-w-2xl my-auto rounded-2xl md:rounded-3xl overflow-hidden flex flex-col relative text-left"
            >
              <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 z-10 bg-black/60 text-white hover:bg-white hover:text-black w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-sm transition-colors backdrop-blur-md">✕</button>
              <motion.div layoutId={`img-wrapper-${selectedId}`} className="w-full aspect-[3/2] overflow-hidden">
                <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
              </motion.div>
              <div className="w-full p-6 md:p-8 flex flex-col justify-center">
                <motion.h3 layoutId={`title-${selectedId}`} className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-3 italic">{selectedProject.title}</motion.h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-zinc-900 text-white font-black uppercase text-[10px] rounded-full hover:bg-lime-400 hover:text-black transition-colors duration-300 gap-2 border border-zinc-800 hover:border-lime-400"
                    >
                      GitHub
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  )}
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center self-start px-5 py-2.5 bg-white text-black font-black uppercase text-[10px] rounded-full hover:bg-lime-400 hover:text-black transition-colors duration-300 gap-2"
                    >
                      Visit Project
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
