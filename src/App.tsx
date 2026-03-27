import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import Stage0 from './components/Stage0';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import Stage4 from './components/Stage4';
import Stage5 from './components/Stage5';
import Stage6 from './components/Stage6';
import Stage7 from './components/Stage7';
import Stage8 from './components/Stage8';
import Stage9 from './components/Stage9';

const TOTAL_STAGES = 9; // Stage 1 to 9 (Stage 0 is verification)

export default function App() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Global click confetti
    const handleClick = (e: MouseEvent) => {
      if (stage < 8) return; // Hide confetti until the birthday reveal (stage 8)
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      confetti({
        origin: { x, y },
        particleCount: 25,
        spread: 70,
        startVelocity: 20,
        colors: ['#ffb6c1', '#ffd700', '#ff69b4', '#ffffff', '#00ffff', '#ff00ff'],
        zIndex: 9999,
        disableForReducedMotion: true,
        ticks: 100
      });
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [stage]);

  useEffect(() => {
    // Romantic piano track
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112135.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Happy Birthday track
    birthdayAudioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=happy-birthday-to-you-bossa-nova-version-13685.mp3');
    birthdayAudioRef.current.loop = true;
    birthdayAudioRef.current.volume = 0.6;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        birthdayAudioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    const activeAudio = stage >= 8 ? birthdayAudioRef.current : audioRef.current;
    
    if (activeAudio) {
      if (isPlaying) {
        audioRef.current?.pause();
        birthdayAudioRef.current?.pause();
      } else {
        activeAudio.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-play music when entering stage 1 if not already playing
  useEffect(() => {
    if (stage === 1 && !isPlaying && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Auto-play blocked by browser:", e));
    }
    
    // Switch to Happy Birthday music on Stage 8
    if (stage === 8 && isPlaying) {
      audioRef.current?.pause();
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.currentTime = 0;
        birthdayAudioRef.current.play().catch(e => console.log("Birthday audio play failed:", e));
      }
    }
  }, [stage, isPlaying]);

  const nextStage = () => {
    setStage(prev => Math.min(prev + 1, TOTAL_STAGES));
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05050A]">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#05050a] to-[#000000]" />
        
        {/* Magical Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] bg-rose-500/15 rounded-full blur-[90px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute top-[60%] left-[20%] w-[30%] h-[30%] bg-fuchsia-500/15 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDuration: '9s' }} />
        
        {/* Stars - Reduced count for better mobile performance */}
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          return (
            <div 
              key={`star-${i}`}
              className="absolute bg-white rounded-full star"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--duration': `${Math.random() * 3 + 2}s`,
                '--delay': `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7 + 0.3
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {/* Header Controls */}
      {stage > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50"
        >
          <button 
            onClick={toggleMusic}
            className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            {isPlaying ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {stage < 8 && (
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/50 font-cairo mb-2">المرحلة {stage} من 7</span>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i < stage ? 'w-6 bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.5)]' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-20">
        <AnimatePresence mode="wait">
          {stage === 0 && <Stage0 key="s0" onSuccess={nextStage} />}
          {stage === 1 && <Stage1 key="s1" onNext={nextStage} />}
          {stage === 2 && <Stage2 key="s2" onNext={nextStage} />}
          {stage === 3 && <Stage3 key="s3" onNext={nextStage} />}
          {stage === 4 && <Stage4 key="s4" onNext={nextStage} />}
          {stage === 5 && <Stage5 key="s5" onNext={nextStage} />}
          {stage === 6 && <Stage6 key="s6" onNext={nextStage} />}
          {stage === 7 && <Stage7 key="s7" onNext={nextStage} />}
          {stage === 8 && <Stage8 key="s8" onNext={nextStage} />}
          {stage === 9 && <Stage9 key="s9" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
