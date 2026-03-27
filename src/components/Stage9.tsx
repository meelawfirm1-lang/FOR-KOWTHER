import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Props {
  key?: string;
}

export default function Stage9({}: Props) {
  const [giftState, setGiftState] = useState<'hidden' | 'box' | 'opened'>('hidden');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGiftState('box');
    }, 4000); // Show gift box after 4 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (giftState === 'opened' && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [giftState]);

  const openGift = () => {
    setGiftState('opened');
    
    // Spectacular Confetti Explosion
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#ffd700', '#ff69b4', '#ffffff']
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#ffd700', '#ff69b4', '#ffffff']
      }));
    }, 250);

    // Center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffd700']
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh] py-12"
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="glass-panel p-6 md:p-12 relative overflow-hidden mx-4 w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {giftState !== 'opened' && (
            <motion.div
              key="intro-text"
              exit={{ opacity: 0, height: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden"
            >
              <p className="text-lg md:text-2xl font-amiri text-white leading-loose whitespace-pre-line text-right glow-text font-medium">
                إذا وصلتِ إلى هنا...<br/>
                فهذا يعني أنكِ أخذتِ هذه اللحظة كما تستحق،<br/>
                وهذا بالضبط ما أردته لكِ:<br/>
                أن يكون لكِ في هذا اليوم<br/>
                شيءٌ مختلف،<br/>
                مبهج،<br/>
                ودافئ...<br/>
                يشبه قيمتكِ الحقيقية في القلب.<br/><br/>
                
                <span className="text-2xl md:text-3xl text-pink-300 font-bold block mt-6 md:mt-8 leading-relaxed">
                  عيد ميلاد سعيد وعمر مديد ياكوثر وكل عام وانتي اجمل اقداري 🌙💖
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {giftState === 'box' && (
            <motion.div
              key="gift-box"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              onClick={openGift}
              className="mt-12 cursor-pointer flex flex-col items-center animate-float-slow"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-7xl md:text-8xl drop-shadow-[0_0_30px_rgba(255,182,193,0.8)] relative"
              >
                <div className="absolute inset-0 bg-pink-400/20 blur-2xl rounded-full animate-pulse-glow" />
                🎁
              </motion.div>
              <p className="mt-6 text-pink-200 font-amiri text-xl md:text-2xl animate-pulse font-bold">
                افتحي الهدية ✨
              </p>
            </motion.div>
          )}

          {giftState === 'opened' && (
            <motion.div
              key="gift-opened"
              initial={{ opacity: 0, scale: 0.5, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              transition={{ duration: 0.8, type: "spring", delay: 0.5 }}
              className="mt-4 flex flex-col items-center justify-center animate-float-slow w-full"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-pink-300/30 shadow-[0_0_40px_rgba(255,182,193,0.5)] mb-8 bg-black/20 animate-pulse-glow">
                <img 
                  src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80" 
                  alt="Bouquet of Red Roses" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.pexels.com/photos/540522/pexels-photo-540522.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 animate-shimmer leading-relaxed text-center">
                إلى كوكي حبيبتي 💖
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="mt-8 flex flex-col items-center"
              >
                <p className="text-2xl md:text-3xl font-amiri text-white mb-6 text-center glow-text">
                  لا أملك إلا أن أهديكِ قلبي
                </p>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl md:text-8xl drop-shadow-[0_0_40px_rgba(255,0,0,0.8)]"
                >
                  ❤️
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
