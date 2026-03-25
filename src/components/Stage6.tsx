import { motion } from 'motion/react';

interface Props {
  key?: string;
  onNext: () => void;
}

export default function Stage6({ onNext }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-3xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="glass-panel p-6 md:p-16 relative overflow-hidden mx-2"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 to-purple-500/5 pointer-events-none" />
        
        <p className="text-lg md:text-3xl font-amiri text-pink-100 leading-[2] md:leading-[2.5] whitespace-pre-line text-right glow-text">
          كوثر...<br/>
          أتمنى أن تعرفي شيئًا مهمًا جدًا:<br/>
          بعض الأشخاص لا يكونون جميلين فقط في ملامحهم،<br/>
          بل في أثرهم...<br/>
          في الطريقة التي يهدّئون بها الفوضى،<br/>
          في الطريقة التي يجعلون بها التعب أخف،<br/>
          وفي الطريقة التي يتركون بها داخلنا رغبة صادقة بأن يبقوا دائمًا.<br/><br/>
          وأنتِ... من هذا النوع النادر جدًا.<br/>
          وجودكِ لا يُمرّ مرورًا عاديًا،<br/>
          بل يُحسّ، ويُحفظ، ويظلّ.
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          onClick={onNext}
          className="mt-12 md:mt-16 px-8 md:px-10 py-3 md:py-4 bg-white/10 border border-pink-300/30 rounded-full text-lg md:text-xl text-pink-100 font-medium glow-button hover:bg-white/20 w-full md:w-auto"
        >
          أكملي... اقتربنا 💖
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
