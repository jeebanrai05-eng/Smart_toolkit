import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Copy, RefreshCw, Check, ShieldCheck } from 'lucide-react';

export default function PasswordGenerator({ onBack }: { onBack: () => void }) {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!charset) return setPassword('');

    let res = '';
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: 'Weak', color: 'bg-rose-500', width: '33%' };
    if (length < 12) return { label: 'Medium', color: 'bg-amber-500', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="glass-card p-6 flex flex-col gap-6">
        <div className="relative">
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-mono break-all min-h-[80px] flex items-center pr-16">
            {password || <span className="text-slate-600">Click generate...</span>}
          </div>
          <button 
            onClick={copy}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl glass hover:bg-white/10 transition-colors text-premium-blue"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Strength: {strength.label}</span>
            <span className="text-xs font-bold text-slate-400">{length} chars</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${strength.color}`}
              initial={{ width: 0 }}
              animate={{ width: strength.width }}
            />
          </div>
        </div>

        <input 
          type="range" 
          min="4" 
          max="32" 
          value={length}
          onChange={e => setLength(parseInt(e.target.value))}
          className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-premium-blue"
        />

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(options).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setOptions({...options, [key]: !val})}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                val ? 'bg-premium-blue/10 border-premium-blue/30 text-white' : 'glass border-transparent text-slate-500'
              }`}
            >
              <span className="text-xs font-bold capitalize">{key}</span>
              <div className={`w-4 h-4 rounded-full border-2 ${val ? 'bg-premium-blue border-premium-blue' : 'border-slate-700'}`} />
            </button>
          ))}
        </div>

        <button 
          onClick={generate}
          className="w-full py-4 rounded-2xl gradient-bg font-bold flex items-center justify-center gap-2 shadow-lg shadow-premium-blue/30 mt-2"
        >
          <RefreshCw size={20} /> Generate Password
        </button>
      </div>

      <div className="glass rounded-2xl p-4 flex gap-3 items-center">
        <ShieldCheck size={20} className="text-emerald-500" />
        <p className="text-xs text-slate-400 font-medium">
          Passwords are generated locally and never stored.
        </p>
      </div>
    </div>
  );
}
