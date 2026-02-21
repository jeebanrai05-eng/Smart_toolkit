import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  Calculator,
  ArrowLeftRight,
  QrCode,
  StickyNote,
  Timer,
  Zap,
  Activity,
  Key,
  Calendar,
  Scan
} from 'lucide-react';
import Home from './components/screens/Home';
import History from './components/screens/History';
import Settings from './components/screens/Settings';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';

// Tool Components
import ScientificCalculator from './components/tools/Calculator';
import UnitConverter from './components/tools/Converter';
import QRTool from './components/tools/QRTool';
import Notepad from './components/tools/Notepad';
import TimerTool from './components/tools/Timer';
import Flashlight from './components/tools/Flashlight';
import BMICalculator from './components/tools/BMICalculator';
import PasswordGenerator from './components/tools/PasswordGenerator';
import AgeCalculator from './components/tools/AgeCalculator';

export type Screen = 'home' | 'history' | 'settings' | 'tool';
export type ToolType = 
  | 'calculator' 
  | 'converter' 
  | 'qr' 
  | 'notepad' 
  | 'timer' 
  | 'flashlight' 
  | 'bmi' 
  | 'password' 
  | 'age';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);

  const openTool = (tool: ToolType) => {
    setActiveTool(tool);
    setActiveScreen('tool');
  };

  const closeTool = () => {
    setActiveTool(null);
    setActiveScreen('home');
  };

  const renderTool = () => {
    switch (activeTool) {
      case 'calculator': return <ScientificCalculator onBack={closeTool} />;
      case 'converter': return <UnitConverter onBack={closeTool} />;
      case 'qr': return <QRTool onBack={closeTool} />;
      case 'notepad': return <Notepad onBack={closeTool} />;
      case 'timer': return <TimerTool onBack={closeTool} />;
      case 'flashlight': return <Flashlight onBack={closeTool} />;
      case 'bmi': return <BMICalculator onBack={closeTool} />;
      case 'password': return <PasswordGenerator onBack={closeTool} />;
      case 'age': return <AgeCalculator onBack={closeTool} />;
      default: return null;
    }
  };

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <TopBar 
        activeScreen={activeScreen} 
        activeTool={activeTool} 
        onBack={closeTool} 
      />

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">
        <AnimatePresence mode="wait">
          {activeScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Home onOpenTool={openTool} />
            </motion.div>
          )}

          {activeScreen === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <History />
            </motion.div>
          )}

          {activeScreen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Settings />
            </motion.div>
          )}

          {activeScreen === 'tool' && (
            <motion.div
              key="tool"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full"
            >
              {renderTool()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav 
        activeScreen={activeScreen} 
        onScreenChange={setActiveScreen} 
      />
    </div>
  );
}
