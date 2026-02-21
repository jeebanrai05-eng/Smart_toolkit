import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRightLeft, History } from 'lucide-react';

interface ConverterProps {
  onBack: () => void;
}

type UnitType = 'length' | 'weight' | 'temperature';

const units = {
  length: {
    meters: 1,
    kilometers: 0.001,
    miles: 0.000621371,
    feet: 3.28084,
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274,
  },
  temperature: {
    celsius: 'C',
    fahrenheit: 'F',
    kelvin: 'K',
  }
};

export default function UnitConverter({ onBack }: ConverterProps) {
  const [type, setType] = useState<UnitType>('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState<number | string>(0);

  useEffect(() => {
    const keys = Object.keys(units[type]);
    setFromUnit(keys[0]);
    setToUnit(keys[1]);
  }, [type]);

  useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit, type]);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return setResult(0);

    if (type === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = val - 273.15;

      let res = celsius;
      if (toUnit === 'fahrenheit') res = (celsius * 9/5) + 32;
      if (toUnit === 'kelvin') res = celsius + 273.15;
      
      setResult(res.toFixed(2));
    } else {
      const baseValue = val / (units[type] as any)[fromUnit];
      const res = baseValue * (units[type] as any)[toUnit];
      setResult(res.toFixed(4));
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex gap-2 p-1 glass rounded-2xl">
        {(['length', 'weight', 'temperature'] as UnitType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              type === t ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="glass-card p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">From</label>
          <div className="flex gap-3">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-bold focus:outline-none focus:border-premium-blue/50"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 font-bold appearance-none"
            >
              {Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="p-3 rounded-full glass">
            <ArrowRightLeft size={20} className="text-premium-blue" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">To</label>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-bold text-premium-blue">
              {result}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 font-bold appearance-none"
            >
              {Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
