import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage7({ onNext }: Props) {
  const [count, setCount] = useState(3);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(c => c - 1), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowText(true);
    }
  }, [count]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <AnimatePresence mode="wait">
        {!showText ? (
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[8rem] md:text-[15rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-200 to-purple-400 glow-text"
          >
            {count}
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center px-2"
          >
            <p className="text-2xl md:text-5xl font-amiri text-white leading-relaxed glow-text mb-12 md:mb-16 font-medium">
              إذا كنتِ تبتسمين الآن…<br/>
              فما زال الأجمل لم يبدأ بعد ✨
            </p>

            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              onClick={onNext}
              className="px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/50 rounded-full text-xl md:text-2xl text-white font-bold glow-button hover:bg-pink-500/40 shadow-[0_0_40px_rgba(255,105,180,0.4)]"
            >
              أنا جاهزة للمفاجأة الكبرى 🎁
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
