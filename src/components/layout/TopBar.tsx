import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, History, Settings } from 'lucide-react';
import { Screen, ToolType } from '../../App';

interface TopBarProps {
  activeScreen: Screen;
  activeTool: ToolType | null;
  onBack: () => void;
}

export default function TopBar({ activeScreen, activeTool, onBack }: TopBarProps) {
  const getTitle = () => {
    if (activeScreen === 'tool' && activeTool) {
      return activeTool.charAt(0).toUpperCase() + activeTool.slice(1);
    }
    if (activeScreen === 'history') return 'History';
    if (activeScreen === 'settings') return 'Settings';
    return 'Smart Toolkit';
  };

  return (
    <header className="p-6 pt-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        {activeScreen === 'tool' && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {activeScreen === 'home' ? (
              <span className="gradient-text">Smart Toolkit</span>
            ) : (
              getTitle()
            )}
          </h1>
          {activeScreen === 'home' && (
            <p className="text-xs text-slate-400 font-medium opacity-70">Version 1.2 Pro</p>
          )}
        </div>
      </div>

      {activeScreen === 'home' && (
        <div className="flex gap-2">
          <button className="p-2.5 rounded-full glass hover:bg-white/10 transition-colors">
            <History size={20} className="text-slate-300" />
          </button>
          <button className="p-2.5 rounded-full glass hover:bg-white/10 transition-colors">
            <Settings size={20} className="text-slate-300" />
          </button>
        </div>
      )}
    </header>
  );
}
