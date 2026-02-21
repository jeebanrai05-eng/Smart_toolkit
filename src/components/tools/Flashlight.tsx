import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, AlertTriangle, Radio } from 'lucide-react';

export default function Flashlight({ onBack }: { onBack: () => void }) {
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState<'normal' | 'sos' | 'strobe'>('normal');

  React.useEffect(() => {
    let interval: any;
    if (isOn && mode !== 'normal') {
      const speed = mode === 'strobe' ? 100 : 500;
      interval = setInterval(() => {
        setIsOn(prev => !prev);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isOn, mode]);

  const toggle = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  };

  return (
    <div className={`flex flex-col h-full transition-colors duration-500 ${isOn ? 'bg-white' : ''}`}>
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div className={`p-12 rounded-full transition-all duration-500 ${isOn ? 'bg-slate-100 shadow-[0_0_100px_rgba(255,255,255,0.8)]' : 'glass shadow-none'}`}>
          <Zap size={80} className={isOn ? 'text-yellow-500' : 'text-slate-700'} fill={isOn ? 'currentColor' : 'none'} />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className={`px-12 py-6 rounded-3xl font-bold text-xl transition-all ${
            isOn 
              ? 'bg-slate-900 text-white' 
              : 'gradient-bg text-white shadow-xl shadow-premium-blue/30'
          }`}
        >
          {isOn ? 'TURN OFF' : 'TURN ON'}
        </motion.button>

        <div className="flex gap-4 p-2 glass rounded-2xl">
          <button 
            onClick={() => setMode('normal')}
            className={`p-4 rounded-xl transition-all ${mode === 'normal' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
          >
            <Zap size={20} />
          </button>
          <button 
            onClick={() => setMode('sos')}
            className={`p-4 rounded-xl transition-all ${mode === 'sos' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
          >
            <AlertTriangle size={20} />
          </button>
          <button 
            onClick={() => setMode('strobe')}
            className={`p-4 rounded-xl transition-all ${mode === 'strobe' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
          >
            <Radio size={20} />
          </button>
        </div>
      </div>

      <p className={`text-center mb-12 font-bold uppercase tracking-widest text-xs ${isOn ? 'text-slate-400' : 'text-slate-600'}`}>
        {isOn ? 'Light Active' : 'Light Inactive'}
      </p>
    </div>
  );
}
