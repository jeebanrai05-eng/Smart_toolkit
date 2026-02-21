import React from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  ArrowLeftRight, 
  QrCode, 
  StickyNote, 
  Timer, 
  Zap, 
  Activity, 
  Key, 
  Calendar 
} from 'lucide-react';
import { ToolType } from '../../App';

interface HomeProps {
  onOpenTool: (tool: ToolType) => void;
}

interface ToolCardProps {
  key?: any;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
}

function ToolCard({ icon: Icon, title, subtitle, color, onClick }: ToolCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card p-5 flex flex-col items-start text-left group relative overflow-hidden"
    >
      <div className={`p-3 rounded-2xl ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
      <p className="text-xs text-slate-400 font-medium line-clamp-1">{subtitle}</p>
      
      {/* Subtle glow effect on hover */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${color}`} />
    </motion.button>
  );
}

export default function Home({ onOpenTool }: HomeProps) {
  const tools: { id: ToolType; icon: React.ElementType; title: string; subtitle: string; color: string }[] = [
    { id: 'calculator', icon: Calculator, title: 'Calculator', subtitle: 'Scientific & Basic', color: 'bg-blue-500' },
    { id: 'converter', icon: ArrowLeftRight, title: 'Converter', subtitle: 'Units & Currency', color: 'bg-purple-500' },
    { id: 'qr', icon: QrCode, title: 'QR Suite', subtitle: 'Scan & Generate', color: 'bg-emerald-500' },
    { id: 'notepad', icon: StickyNote, title: 'Notepad', subtitle: 'Smart Notes', color: 'bg-amber-500' },
    { id: 'timer', icon: Timer, title: 'Timer', subtitle: 'Stopwatch & Laps', color: 'bg-rose-500' },
    { id: 'flashlight', icon: Zap, title: 'Flashlight', subtitle: 'SOS & Strobe', color: 'bg-yellow-500' },
    { id: 'bmi', icon: Activity, title: 'BMI Calc', subtitle: 'Health Tracker', color: 'bg-cyan-500' },
    { id: 'password', icon: Key, title: 'Password', subtitle: 'Secure Generator', color: 'bg-indigo-500' },
    { id: 'age', icon: Calendar, title: 'Age Calc', subtitle: 'Zodiac & Exact', color: 'bg-pink-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          icon={tool.icon}
          title={tool.title}
          subtitle={tool.subtitle}
          color={tool.color}
          onClick={() => onOpenTool(tool.id as ToolType)}
        />
      ))}
    </div>
  );
}
