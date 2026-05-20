import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, CheckCircle2, ChevronRight } from 'lucide-react';

const TARGET_DATE = new Date('2026-06-01T00:00:00Z').getTime();

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('info@cscjordan.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0A0D14] overflow-hidden flex items-center justify-center font-sans selection:bg-cyan-500/30 text-slate-200"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glow meshes */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-950/25 rounded-full blur-[140px] mix-blend-screen animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-950/20 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] bg-cyan-950/15 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        
        {/* Tech Grid & Scanning bar */}
        <div className="absolute inset-0 cyber-grid" />
        <div className="absolute inset-0 grid-scanner" />
      </div>

      {/* Background Interactive Cyber Network SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <g stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1.2" fill="none">
          <line x1="100" y1="150" x2="1100" y2="150" />
          <line x1="100" y1="650" x2="1100" y2="650" />
          <line x1="250" y1="100" x2="250" y2="700" />
          <line x1="950" y1="100" x2="950" y2="700" />
          
          <line x1="250" y1="150" x2="450" y2="350" />
          <line x1="950" y1="150" x2="750" y2="350" />
          <line x1="250" y1="650" x2="450" y2="450" />
          <line x1="950" y1="650" x2="750" y2="450" />
          
          <polygon points="450,350 750,350 750,450 450,450" />
          
          <line x1="100" y1="150" x2="250" y2="300" />
          <line x1="1100" y1="150" x2="950" y2="300" />
          <line x1="100" y1="650" x2="250" y2="500" />
          <line x1="1100" y1="650" x2="950" y2="500" />
          
          <line x1="250" y1="300" x2="450" y2="350" />
          <line x1="950" y1="300" x2="750" y2="350" />
          <line x1="250" y1="500" x2="450" y2="450" />
          <line x1="950" y1="500" x2="750" y2="450" />
        </g>

        <g stroke="url(#cyan-gradient)" strokeWidth="1.5" fill="none">
          <path d="M 250,150 L 450,350 L 750,350 L 750,450" className="animate-dash" />
          <path d="M 950,650 L 750,450 L 450,450 L 250,500" className="animate-dash-reverse" />
          <path d="M 100,650 L 250,500 L 450,450 L 750,450 L 950,300" className="animate-dash" />
        </g>

        <g fill="#0A0D14" stroke="rgb(34, 211, 238)" strokeWidth="2">
          <circle cx="250" cy="150" r="5" className="pulse-node" />
          <circle cx="950" cy="150" r="5" className="pulse-node" />
          <circle cx="250" cy="650" r="5" className="pulse-node" />
          <circle cx="950" cy="650" r="5" className="pulse-node" />
          
          <circle cx="450" cy="350" r="6" className="pulse-node" />
          <circle cx="750" cy="350" r="6" className="pulse-node" />
          <circle cx="450" cy="450" r="6" className="pulse-node" />
          <circle cx="750" cy="450" r="6" className="pulse-node" />
          
          <circle cx="250" cy="300" r="4" />
          <circle cx="950" cy="300" r="4" />
          <circle cx="250" cy="500" r="4" />
          <circle cx="950" cy="500" r="4" />
        </g>
        
        <g fill="rgb(34, 211, 238)" opacity="0.7">
          <circle cx="450" cy="350" r="2" />
          <circle cx="750" cy="350" r="2" />
          <circle cx="450" cy="450" r="2" />
          <circle cx="750" cy="450" r="2" />
        </g>

        <defs>
          <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Service Representation Elements (behind main container card) */}
      
      {/* 1. Premium Credit Card Contour Pattern */}
      <div className="absolute top-[10%] right-[10%] w-[330px] h-[210px] opacity-[0.08] pointer-events-none hidden lg:block animate-float-card">
        <svg viewBox="0 0 350 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="2" y="2" width="346" height="216" rx="18" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2.5" />
          <rect x="6" y="6" width="338" height="208" rx="14" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" />
          {/* Microchip */}
          <g stroke="rgba(34, 211, 238, 0.75)" strokeWidth="1.5" fill="rgba(34, 211, 238, 0.05)">
            <rect x="40" y="65" width="55" height="42" rx="6" />
            <path d="M 40,86 L 95,86 M 67.5,65 L 67.5,107 M 40,75.5 L 67.5,75.5 M 40,96.5 L 67.5,96.5 M 67.5,75.5 L 95,75.5 M 67.5,96.5 L 95,96.5" />
            <circle cx="67.5" cy="86" r="4.5" fill="#0A0D14" />
          </g>
          {/* Card patterns representing secure connections */}
          <path d="M 120,65 C 150,30 200,30 230,65 C 260,100 310,100 340,65" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.5" strokeDasharray="5 5" />
          <rect x="40" y="135" width="270" height="12" rx="3" fill="rgba(34, 211, 238, 0.15)" />
          <rect x="40" y="165" width="130" height="8" rx="2" fill="rgba(34, 211, 238, 0.1)" />
          {/* Secure lock icon at bottom-right */}
          <path d="M 285,160 L 305,160 L 305,175 L 285,175 Z M 290,160 L 290,154 A 5,5 0 0 1 300,154 L 300,160" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* 2. Stylized ATM Terminal Interface Skeleton */}
      <div className="absolute top-[35%] left-[5%] w-[260px] h-[260px] opacity-[0.07] pointer-events-none hidden lg:block animate-float-chip" style={{ animationDelay: '1.5s' }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="20" y="20" width="160" height="110" rx="8" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" fill="rgba(34, 211, 238, 0.02)" />
          <line x1="35" y1="40" x2="85" y2="40" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="3" />
          <line x1="35" y1="55" x2="115" y2="55" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="2" />
          <line x1="35" y1="70" x2="95" y2="70" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="2" />
          <line x1="35" y1="85" x2="140" y2="85" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="2" />
          <rect x="145" y="35" width="20" height="60" rx="2" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" />
          <line x1="155" y1="42" x2="155" y2="88" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Card slot */}
          <rect x="40" y="145" width="120" height="14" rx="3" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
          <line x1="50" y1="152" x2="150" y2="152" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="3" className="animate-pulse" />
          {/* Keypad keys */}
          <g fill="rgba(34, 211, 238, 0.1)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1">
            <rect x="65" y="172" width="16" height="10" rx="1.5" />
            <rect x="87" y="172" width="16" height="10" rx="1.5" />
            <rect x="109" y="172" width="16" height="10" rx="1.5" />
            <rect x="131" y="172" width="16" height="10" rx="1.5" />
          </g>
        </svg>
      </div>

      {/* 3. POS Terminal / Secure Transaction graph */}
      <div className="absolute bottom-[8%] right-[10%] w-[300px] h-[180px] opacity-[0.08] pointer-events-none hidden lg:block animate-float-card" style={{ animationDelay: '0.8s' }}>
        <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="50" y="20" width="200" height="140" rx="12" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" />
          <line x1="50" y1="50" x2="250" y2="50" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
          
          <rect x="70" y="65" width="160" height="60" rx="4" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" fill="rgba(34, 211, 238, 0.02)" />
          <circle cx="150" cy="95" r="15" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
          <path d="M 143,95 L 148,100 L 158,90" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          
          <path d="M 100,20 L 200,20 L 195,10 L 105,10 Z" fill="rgba(34, 211, 238, 0.15)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" />
        </svg>
      </div>

      <motion.div
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        <div className="relative glass-card rounded-3xl p-8 md:p-16 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)] overflow-hidden group transition-colors duration-500 hover:border-cyan-500/35">
          {/* Corner Tech Accents */}
          <div className="absolute top-0 left-0 w-5 h-5 tech-bracket-tl" />
          <div className="absolute top-0 right-0 w-5 h-5 tech-bracket-tr" />
          <div className="absolute bottom-0 left-0 w-5 h-5 tech-bracket-bl" />
          <div className="absolute bottom-0 right-0 w-5 h-5 tech-bracket-br" />
          
          {/* Subtle cyber-grid inside card */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          {/* Neon scanning sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none" />
          
          {/* Subtle hover pulse */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-20 flex flex-col items-center text-center">
            {/* Logo Integration (CSC Jordan brand vector) */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-10 select-none animate-logo-pulse"
            >
              <svg viewBox="0 0 220 140" className="w-48 h-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="csc-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                {/* CSC Text block using high-fidelity geometric system fonts */}
                <text 
                  x="110" 
                  y="85" 
                  textAnchor="middle" 
                  fill="url(#csc-blue-grad)" 
                  fontSize="92" 
                  fontWeight="900" 
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
                  letterSpacing="-6"
                >
                  CSC
                </text>
                
                {/* Horizontal Line */}
                <rect x="15" y="105" width="190" height="4.5" fill="url(#csc-blue-grad)" rx="2" />
                
                {/* JORDAN text below */}
                <text x="110" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="18" fontWeight="800" fontFamily="'Cinzel', 'Times New Roman', serif" letterSpacing="4.5">JORDAN</text>
              </svg>
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
            >
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] select-none">Coming </span>
              <span className="gradient-text drop-shadow-[0_0_20px_rgba(34,211,238,0.35)] select-none">Soon</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              We're building something powerful in{' '}
              <span className="text-cyan-400 font-medium tracking-wide">Payment Solutions & POS Services</span>. 
              Stay tuned to experience the future of fintech in Jordan.
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 w-full max-w-3xl"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item) => (
                <div 
                  key={item.label} 
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#111625]/95 to-[#0A0D14]/95 border border-cyan-500/20 backdrop-blur-md relative overflow-hidden group/timer shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.4)] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-500"
                >
                  <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover/timer:opacity-100 transition-opacity duration-500" />
                  <span className="text-4xl md:text-5xl font-bold font-mono text-cyan-400 mb-2 tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs tracking-widest text-slate-500 uppercase font-semibold group-hover/timer:text-cyan-300/80 transition-colors duration-300">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact / Email (Brushed Metal Border Layout) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <div className="relative flex items-center brushed-metal-border rounded-full p-2 pr-14 pl-6 backdrop-blur-md w-full sm:w-auto min-w-[240px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] transition-all duration-300">
                <span className="text-cyan-100 font-mono text-sm tracking-wide select-all">info@cscjordan.com</span>
                <button
                  onClick={handleCopy}
                  title="Copy email address"
                  className="absolute right-1.5 p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-450 hover:to-blue-500 text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-cyan-300"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_25px_rgba(34,211,238,0.55)] transition-all duration-300 transform hover:scale-[1.03] active:scale-95 group/btn border border-cyan-400/20">
                <span>Notify Me</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
