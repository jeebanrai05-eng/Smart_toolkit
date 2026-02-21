import React from 'react';
import { motion } from 'motion/react';
import { Home, History, Settings } from 'lucide-react';
import { Screen } from '../../App';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BottomNavProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass rounded-3xl p-2 flex items-center justify-around z-50 shadow-2xl shadow-black/50">
      {tabs.map((tab) => {
        const isActive = activeScreen === tab.id || (tab.id === 'home' && activeScreen === 'tool');
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onScreenChange(tab.id as Screen)}
            className={cn(
              "relative flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-all duration-300",
              isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 gradient-bg rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
