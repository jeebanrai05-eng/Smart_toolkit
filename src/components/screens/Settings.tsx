import React from 'react';
import { motion } from 'motion/react';
import { Bell, Volume2, Info, Trash2, Shield, ChevronRight } from 'lucide-react';

export default function Settings() {
  const sections = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Vibration', type: 'toggle', default: true },
        { icon: Volume2, label: 'Sound Effects', type: 'toggle', default: true },
      ]
    },
    {
      title: 'Data Management',
      items: [
        { icon: Trash2, label: 'Clear History', type: 'button', color: 'text-rose-500' },
        { icon: Shield, label: 'Privacy Policy', type: 'link' },
      ]
    },
    {
      title: 'About',
      items: [
        { icon: Info, label: 'App Version', value: '1.2.0 Pro' },
        { icon: ChevronRight, label: 'Check for Updates', type: 'link' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8 py-4">
      {sections.map((section, idx) => (
        <div key={idx} className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-4">
            {section.title}
          </h3>
          <div className="glass rounded-3xl overflow-hidden">
            {section.items.map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between p-4 ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5">
                    <item.icon size={18} className={item.color || 'text-slate-300'} />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                
                {item.type === 'toggle' && (
                  <div className="w-12 h-6 rounded-full bg-white/10 relative p-1 cursor-pointer">
                    <motion.div 
                      className="w-4 h-4 rounded-full gradient-bg"
                      animate={{ x: item.default ? 24 : 0 }}
                    />
                  </div>
                )}
                
                {item.value && (
                  <span className="text-xs font-bold text-slate-500">{item.value}</span>
                )}

                {item.type === 'link' && (
                  <ChevronRight size={16} className="text-slate-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Crafted with Premium Quality
        </p>
      </div>
    </div>
  );
}
