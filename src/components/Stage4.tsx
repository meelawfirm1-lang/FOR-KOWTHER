import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage4({ onNext }: Props) {
  const [step, setStep] = useState(0);

  const messages = [
    "كوثر... اسم لا يُقال فقط، بل يُشعَر.",
    "كوثر... اسم يشبه الطمأنينة.",
    "كوثر... بعض الأسماء تكفي لتجعل القلب يبتسم."
  ];

  useEffect(() => {
    if (step < messages.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step, messages.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-6xl md:text-9xl font-amiri text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-12 md:mb-16 glow-text"
        style={{ textShadow: '0 0 40px rgba(255, 182, 193, 0.4)' }}
      >
        كوثر
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-3xl font-amiri text-pink-100 leading-relaxed glow-text px-2"
        >
          {messages[step]}
        </motion.div>
      </AnimatePresence>

      {step === messages.length - 1 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          onClick={onNext}
          className="mt-12 md:mt-16 px-8 md:px-10 py-3 md:py-4 bg-white/10 border border-pink-300/30 rounded-full text-lg md:text-xl text-pink-100 font-medium glow-button hover:bg-white/20"
        >
          وماذا بعد اسمي؟ ✨
        </motion.button>
      )}
    </motion.div>
  );
}
