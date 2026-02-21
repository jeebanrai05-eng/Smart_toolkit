import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Info } from 'lucide-react';

export default function BMICalculator({ onBack }: { onBack: () => void }) {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  const bmiValue = parseFloat(bmi);

  const getStatus = () => {
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-blue-400' };
    if (bmiValue < 25) return { label: 'Normal', color: 'text-emerald-400' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'text-amber-400' };
    return { label: 'Obese', color: 'text-rose-400' };
  };

  const status = getStatus();

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex gap-2 p-1 glass rounded-2xl">
        <button
          onClick={() => setGender('male')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            gender === 'male' ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setGender('female')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            gender === 'female' ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Female
        </button>
      </div>

      <div className="glass-card p-8 flex flex-col items-center gap-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="96" cy="96" r="80"
              className="stroke-white/5 fill-none"
              strokeWidth="12"
            />
            <motion.circle
              cx="96" cy="96" r="80"
              className={`fill-none ${status.color.replace('text', 'stroke')}`}
              strokeWidth="12"
              strokeDasharray="502"
              initial={{ strokeDashoffset: 502 }}
              animate={{ strokeDashoffset: 502 - (Math.min(bmiValue, 40) / 40) * 502 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="text-center">
            <h2 className="text-5xl font-bold tracking-tighter">{bmi}</h2>
            <p className={`text-sm font-bold uppercase tracking-widest mt-1 ${status.color}`}>{status.label}</p>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 glass rounded-2xl text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Weight (kg)</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setWeight(w => w - 1)} className="text-xl font-bold text-slate-400">-</button>
              <span className="text-2xl font-bold">{weight}</span>
              <button onClick={() => setWeight(w => w + 1)} className="text-xl font-bold text-slate-400">+</button>
            </div>
          </div>
          <div className="p-4 glass rounded-2xl text-center">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Height (cm)</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setHeight(h => h - 1)} className="text-xl font-bold text-slate-400">-</button>
              <span className="text-2xl font-bold">{height}</span>
              <button onClick={() => setHeight(h => h + 1)} className="text-xl font-bold text-slate-400">+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 flex gap-3 items-start">
        <Info size={18} className="text-premium-blue mt-0.5 shrink-0" />
        <p className="text-xs text-slate-400 leading-relaxed">
          BMI is a useful measure of overweight and obesity. It is calculated from your height and weight.
        </p>
      </div>
    </div>
  );
}
