import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage3({ onNext }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group flex flex-col items-center justify-center"
          >
            <div className="w-40 h-28 md:w-48 md:h-32 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center relative shadow-[0_0_30px_rgba(255,182,193,0.2)] group-hover:shadow-[0_0_50px_rgba(255,182,193,0.4)] transition-all duration-500">
              <span className="text-6xl md:text-7xl drop-shadow-lg">💌</span>
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-pink-500 rounded-full animate-ping opacity-75" />
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-pink-400 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-white shadow-lg">1</div>
            </div>
            <p className="mt-6 md:mt-8 text-lg md:text-xl font-amiri text-pink-100/80 group-hover:text-pink-100 transition-colors">اضغطي لفتح الرسالة 💌</p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-panel p-6 md:p-12 relative overflow-hidden mx-4"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-50" />
            
            <h3 className="text-xl md:text-2xl font-amiri text-pink-300 mb-4 md:mb-6 text-right">إلى كوثر...</h3>
            
            <p className="text-lg md:text-2xl font-amiri text-white/90 leading-loose text-right whitespace-pre-line">
              هناك أشخاص يمرّون في الحياة مرورًا عاديًا،<br/>
              وهناك أشخاص يتركون في القلب أثرًا لا يشبه أحدًا...<br/><br/>
              وأنتِ من النوع الذي يجعل الأيام ألطف،<br/>
              والقلب أهدأ،<br/>
              والحياة أكثر احتمالًا وجمالًا.
            </p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              onClick={onNext}
              className="mt-8 md:mt-12 px-6 md:px-8 py-3 bg-white/10 border border-pink-300/30 rounded-full text-base md:text-lg text-pink-100 font-medium glow-button hover:bg-white/20"
            >
              أريد الرسالة التالية 💌
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
