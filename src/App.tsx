import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

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
      className="relative min-h-screen bg-[#030712] overflow-hidden flex items-center justify-center font-sans selection:bg-indigo-500/30 text-slate-200"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <motion.div
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        <div className="relative glass-card rounded-3xl p-8 md:p-16 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
          {/* Subtle hover pulse */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-20 flex flex-col items-center text-center">
            {/* Header / Brand */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium tracking-wide text-blue-200">CSC Jordan</span>
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
            >
              <span className="text-white drop-shadow-lg glow-text">Coming </span>
              <span className="gradient-text">Soon</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              We're building something powerful in{' '}
              <span className="text-slate-200 font-medium">Payment Solutions & POS Services</span>. 
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
              ].map((item, idx) => (
                <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group/timer">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover/timer:opacity-100 transition-opacity duration-500" />
                  <span className="text-4xl md:text-5xl font-bold font-mono text-white mb-2 tracking-tighter shadow-blue-500/20 drop-shadow-md">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs tracking-widest text-slate-500 uppercase font-semibold">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact / Email */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 pr-6 pl-6 backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
                <span className="text-slate-300 font-mono text-sm mr-4">info@cscjordan.com</span>
                <button
                  onClick={handleCopy}
                  className="absolute right-1.5 p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all duration-300 transform hover:scale-105">
                Notify Me
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
