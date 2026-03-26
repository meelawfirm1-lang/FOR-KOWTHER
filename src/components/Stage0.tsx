import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Props {
  key?: string;
  onSuccess: () => void;
}

export default function Stage0({ onSuccess }: Props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize name
    const normalizedName = name.trim().toLowerCase().replace(/[\u064B-\u065F]/g, '');
    const validNames = ['كوثر', 'kawthar', 'kawther', 'kowsar'];
    const isNameValid = validNames.some(v => normalizedName.includes(v));

    // Normalize date
    const normalizedDate = date.trim().toLowerCase();
    const has28 = normalizedDate.includes('28') || normalizedDate.includes('٢٨');
    const hasWrongYear = (normalizedDate.match(/\d{4}/) && !normalizedDate.includes('1998') && !normalizedDate.includes('١٩٩٨'));
    const isDateValid = has28 && !hasWrongYear;

    if (isNameValid && isDateValid) {
      setError(false);
      setSuccess(true);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto p-6 md:p-8 glass-panel text-center relative overflow-hidden mx-4"
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleVerify} 
            className="space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-amiri text-pink-100 mb-4 glow-text font-bold">مرحبًا...</h1>
              <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                هذه ليست صفحة عادية،<br/>
                بل مفاجأة صُنعت لقلبٍ محدد جدًا 💖
              </p>
              <p className="text-xs md:text-sm text-white/90 mt-4">من فضلكِ أخبرينا من أنتِ...</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتبي اسمكِ هنا..."
                className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-xl focus:outline-none focus:border-pink-300 text-center text-white placeholder:text-white/60 transition-colors text-sm md:text-base font-medium"
              />
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="اكتبي تاريخ ميلادكِ بأي طريقة تعرفينها..."
                className="w-full px-4 py-3 bg-black/40 border border-white/30 rounded-xl focus:outline-none focus:border-pink-300 text-center text-white placeholder:text-white/60 transition-colors text-sm md:text-base font-medium"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-pink-300/80 text-sm mt-4 font-amiri"
              >
                ممم... يبدو أن هذه البوابة لا تُفتح إلا لصاحبة القلب التي صُممت لها المفاجأة 💌
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl text-pink-100 font-medium glow-button hover:bg-pink-500/30"
            >
              تحقق
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 py-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
            />
            
            <Sparkles className="w-16 h-16 mx-auto text-yellow-200 animate-pulse" />
            
            <div className="space-y-4 relative z-10">
              <h2 className="text-2xl font-amiri text-pink-100 glow-text font-bold">تم التحقق بنجاح...</h2>
              <p className="text-xl text-white font-medium">أهلًا بكِ يا كوثر 💖</p>
              <p className="text-white/90">نعم... هذه المفاجأة خُلقت لكِ وحدكِ.</p>
            </div>

            <button
              onClick={onSuccess}
              className="px-8 py-3 bg-white/10 border border-yellow-200/50 rounded-full text-yellow-100 font-medium glow-button hover:bg-white/20 relative z-10"
            >
              ادخلي إذا كنتِ مستعدة ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
