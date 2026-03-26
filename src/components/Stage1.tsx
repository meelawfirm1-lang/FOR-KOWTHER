import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage1({ onNext }: Props) {
  const [step, setStep] = useState(0);

  const messages = [
    "قبل أن تكملي...\nهذه ليست مجرد مفاجأة،\nبل رحلة صغيرة داخل شيء صُمم لكِ من القلب.",
    "من فضلكِ...\nتأكدي أن تكوني وحدكِ، وأطفئي الأنوار 🤍",
    "ويُفضّل أن يكون الوقت ليلًا...\nلأن بعض المفاجآت لا تُشبه ضوء النهار ✨",
    "تأكدي أن لا يقاطعكِ أحد...\nوأعطي هذه اللحظات حقّها بالكامل 💖",
    "وعندما تشعرين أنكِ جاهزة...\nاضغطي للدخول إلى عالمكِ الخاص."
  ];

  useEffect(() => {
    if (step < messages.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 5500); // 5.5 seconds per message for easier reading
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
          transition={{ duration: 1 }}
          className="text-xl md:text-3xl font-amiri text-white leading-relaxed whitespace-pre-line glow-text px-2 font-medium"
        >
          {messages[step]}
        </motion.div>
      </AnimatePresence>

      {step === messages.length - 1 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={onNext}
          className="mt-12 md:mt-16 px-8 md:px-10 py-3 md:py-4 bg-white/10 border border-white/30 rounded-full text-lg md:text-xl text-white font-medium glow-button hover:bg-white/20"
        >
          أنا جاهزة... افتح عالمي ✨
        </motion.button>
      )}
    </motion.div>
  );
}
