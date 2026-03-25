import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage2({ onNext }: Props) {
  const [step, setStep] = useState(0);

  const messages = [
    "ليس كل يوم 28 مارس يومًا عاديًا...",
    "في 28 مارس 1998...\nوُلدت كوثر،\nومنذ ذلك اليوم...\nصار للجمال تاريخ 💖"
  ];

  useEffect(() => {
    if (step < messages.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 5000);
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
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.5 }}
          className="text-2xl md:text-4xl font-amiri text-pink-100 leading-relaxed whitespace-pre-line glow-text px-2"
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
          أكملي... هناك شيء أجمل ✨
        </motion.button>
      )}
    </motion.div>
  );
}
