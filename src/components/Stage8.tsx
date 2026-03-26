import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage8({ onNext }: Props) {
  const [showFinalButton, setShowFinalButton] = useState(false);

  useEffect(() => {
    // Fire confetti continuously
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#ffd700', '#ff69b4', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#ffd700', '#ff69b4', '#ffffff']
      });
    }, 250);

    // Show final button after 15 seconds
    const btnTimer = setTimeout(() => setShowFinalButton(true), 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(btnTimer);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto text-center px-4 py-12 flex flex-col items-center justify-center min-h-[80vh] relative z-10"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-amiri font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-400 to-yellow-200 glow-text mb-4 md:mb-8 leading-relaxed">
          عيد ميلاد سعيد وعمر مديد ياكوثر وكل عام وانتي اجمل اقداري 🎂👑💖
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="glass-panel p-6 md:p-12 w-full text-right"
      >
        <p className="text-lg md:text-3xl font-amiri text-white leading-[2] md:leading-[2.5] whitespace-pre-line glow-text font-medium">
          في 28 مارس 1998،<br/>
          لم يولد يوم جميل فقط...<br/>
          بل وُلد سبب يجعل الحياة أرقّ،<br/>
          والأيام ألطف،<br/>
          والقلب أكثر امتنانًا.<br/><br/>
          
          كل عام وأنتِ فرحٌ لا يُملّ،<br/>
          ونعمة لا تُشبه شيئًا،<br/>
          وقربٌ يجعل الدنيا أخف وأجمل.<br/><br/>
          
          وأمنيتي الأصدق...<br/>
          أن نكون كل عام معًا،<br/>
          في سعادة،<br/>
          وفي طمأنينة،<br/>
          وفي حبٍ يزداد نضجًا وجمالًا مع الأيام.<br/><br/>
          
          كل عام وأنتِ أجمل ما حدث في هذا التاريخ 💖✨
        </p>
      </motion.div>

      <AnimatePresence>
        {showFinalButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onNext}
            className="mt-16 px-8 py-3 bg-white/10 border border-white/30 rounded-full text-sm text-white hover:bg-white/20 transition-all duration-300 font-medium"
          >
            رسالة أخيرة لكِ فقط 🤍
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
