import { motion } from 'motion/react';

interface Props {
  key?: string;
}

export default function Stage9({}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="glass-panel p-6 md:p-12 relative overflow-hidden mx-4"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none" />
        
        <p className="text-lg md:text-2xl font-amiri text-white/90 leading-loose whitespace-pre-line text-right glow-text">
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
    </motion.div>
  );
}
