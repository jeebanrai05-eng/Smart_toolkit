import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Star, Clock } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, format } from 'date-fns';

export default function AgeCalculator({ onBack }: { onBack: () => void }) {
  const [birthDate, setBirthDate] = useState('1995-01-01');

  const getAgeData = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    
    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) % 12;
    const days = differenceInDays(now, birth) % 30;

    return { years, months, days };
  };

  const getZodiac = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: 'Aries', icon: '♈' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: 'Taurus', icon: '♉' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: 'Gemini', icon: '♊' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: 'Cancer', icon: '♋' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: 'Leo', icon: '♌' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: 'Virgo', icon: '♍' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: 'Libra', icon: '♎' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: 'Scorpio', icon: '♏' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: 'Sagittarius', icon: '♐' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: 'Capricorn', icon: '♑' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: 'Aquarius', icon: '♒' };
    return { name: 'Pisces', icon: '♓' };
  };

  const age = getAgeData();
  const zodiac = getZodiac(birthDate);

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="glass-card p-6">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Select Birth Date</label>
        <input
          type="date"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}
          className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl p-4 text-xl font-bold focus:outline-none focus:border-premium-blue/50 text-white color-scheme-dark"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Years', value: age.years, icon: Calendar, color: 'text-blue-400' },
          { label: 'Months', value: age.months, icon: Star, color: 'text-purple-400' },
          { label: 'Days', value: age.days, icon: Clock, color: 'text-emerald-400' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex flex-col items-center text-center"
          >
            <item.icon size={20} className={`${item.color} mb-2`} />
            <h4 className="text-2xl font-bold leading-none">{item.value}</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{zodiac.icon}</div>
          <div>
            <h3 className="font-bold text-lg">{zodiac.name}</h3>
            <p className="text-xs text-slate-400 font-medium">Your Zodiac Sign</p>
          </div>
        </div>
        <div className="p-3 rounded-full bg-white/5">
          <Star size={24} className="text-yellow-500" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}
