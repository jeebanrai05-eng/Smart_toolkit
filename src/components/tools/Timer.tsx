import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function TimerTool({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'stopwatch' | 'timer'>('stopwatch');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<any>(null);

  // Timer specific
  const [timerInput, setTimerInput] = useState('05:00');

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => mode === 'stopwatch' ? prev + 10 : Math.max(0, prev - 10));
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  useEffect(() => {
    if (mode === 'timer' && time === 0 && isRunning) {
      setIsRunning(false);
      alert('Time is up!');
    }
  }, [time, mode, isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const startStop = () => setIsRunning(!isRunning);
  
  const reset = () => {
    setIsRunning(false);
    setTime(mode === 'stopwatch' ? 0 : parseInput(timerInput));
    setLaps([]);
  };

  const parseInput = (input: string) => {
    const [m, s] = input.split(':').map(Number);
    return (m * 60 + s) * 1000;
  };

  const addLap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <div className="flex flex-col h-full py-4">
      <div className="flex gap-2 p-1 glass rounded-2xl mb-12">
        <button
          onClick={() => { setMode('stopwatch'); reset(); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            mode === 'stopwatch' ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Stopwatch
        </button>
        <button
          onClick={() => { setMode('timer'); reset(); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            mode === 'timer' ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Timer
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Animated Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="144" cy="144" r="130"
              className="stroke-white/5 fill-none"
              strokeWidth="8"
            />
            <motion.circle
              cx="144" cy="144" r="130"
              className="stroke-premium-blue fill-none"
              strokeWidth="8"
              strokeDasharray="816"
              animate={{ strokeDashoffset: isRunning ? 0 : 816 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </svg>
          
          <div className="text-center">
            <h2 className="text-5xl font-mono font-bold tracking-tight mb-2">
              {formatTime(time)}
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              {isRunning ? 'Running' : 'Paused'}
            </p>
          </div>
        </div>

        <div className="flex gap-6 mt-12">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={reset}
            className="p-5 rounded-full glass text-slate-400"
          >
            <RotateCcw size={24} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={startStop}
            className={`p-8 rounded-full shadow-2xl ${isRunning ? 'glass text-rose-500' : 'gradient-bg text-white shadow-premium-blue/40'}`}
          >
            {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={mode === 'stopwatch' ? addLap : () => {}}
            className="p-5 rounded-full glass text-slate-400"
          >
            <Flag size={24} />
          </motion.button>
        </div>
      </div>

      {mode === 'stopwatch' && laps.length > 0 && (
        <div className="mt-8 glass rounded-3xl p-4 h-48 overflow-y-auto no-scrollbar">
          {laps.map((lap, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-white/5 last:border-0">
              <span className="text-xs font-bold text-slate-500">Lap {laps.length - i}</span>
              <span className="font-mono font-bold">{formatTime(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
