import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage5({ onNext }: Props) {
  const [interacted, setInteracted] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <AnimatePresence mode="wait">
        {!interacted ? (
          <motion.div
            key="number"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
            onClick={() => setInteracted(true)}
            className="cursor-pointer group flex flex-col items-center justify-center relative"
          >
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl md:text-[12rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 glow-text"
              style={{ textShadow: '0 0 60px rgba(255, 215, 0, 0.5)' }}
            >
              28
            </motion.h1>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-amiri text-yellow-100/80 group-hover:text-yellow-100 transition-colors animate-pulse">
              المسي الرقم ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="relative px-2"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none flex justify-center items-center">
              <div className="text-6xl text-yellow-200/30 animate-spin-slow absolute">✨</div>
              <div className="text-8xl text-pink-300/20 animate-spin-reverse absolute">🌟</div>
            </div>
            
            <p className="text-xl md:text-4xl font-amiri text-white/90 leading-loose whitespace-pre-line glow-text relative z-10">
              28 ليس مجرد رقم...<br/><br/>
              إنه اليوم الذي اختارت فيه الحياة أن تهدينا فتاة لا تشبه أحدًا 💖
            </p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              onClick={onNext}
              className="mt-12 md:mt-16 px-8 md:px-10 py-3 md:py-4 bg-white/10 border border-yellow-200/30 rounded-full text-lg md:text-xl text-yellow-100 font-medium glow-button hover:bg-white/20 relative z-10"
            >
              أكملي للمفاجأة التالية 🌙
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
