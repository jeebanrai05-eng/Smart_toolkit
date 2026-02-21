import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Clock, Calculator, ArrowRightLeft, QrCode } from 'lucide-react';

interface HistoryItem {
  id: number;
  type: string;
  title: string;
  content: string;
  timestamp: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await fetch(`/api/history/${id}`, { method: 'DELETE' });
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'calculation': return <Calculator size={18} className="text-blue-400" />;
      case 'conversion': return <ArrowRightLeft size={18} className="text-purple-400" />;
      case 'qr': return <QrCode size={18} className="text-emerald-400" />;
      default: return <Clock size={18} className="text-slate-400" />;
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-premium-blue border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="flex flex-col gap-4 py-4">
      {history.length === 0 ? (
        <div className="text-center p-12 opacity-50">
          <Clock size={48} className="mx-auto mb-4" />
          <p className="font-medium">No history yet</p>
        </div>
      ) : (
        <AnimatePresence>
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-white/5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-xs text-slate-400 truncate">{item.content}</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-rose-500/50 hover:text-rose-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
