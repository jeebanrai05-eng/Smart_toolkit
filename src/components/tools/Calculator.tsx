import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Delete, Divide, Minus, Plus, X, Equal, Percent } from 'lucide-react';

interface CalculatorProps {
  onBack: () => void;
}

export default function ScientificCalculator({ onBack }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      // Using Function constructor as a safer alternative to eval for simple math
      const result = new Function(`return ${fullEquation.replace('×', '*').replace('÷', '/')}`)();
      
      // Save to history
      fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'calculation',
          title: 'Calculation',
          content: `${fullEquation} = ${result}`
        })
      });

      setDisplay(String(result));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    { label: 'C', action: clear, color: 'text-rose-400' },
    { label: '÷', action: () => handleOperator('/'), color: 'text-premium-blue' },
    { label: '×', action: () => handleOperator('*'), color: 'text-premium-blue' },
    { label: '⌫', action: () => setDisplay(d => d.length > 1 ? d.slice(0, -1) : '0'), color: 'text-slate-400' },
    { label: '7', action: () => handleNumber('7') },
    { label: '8', action: () => handleNumber('8') },
    { label: '9', action: () => handleNumber('9') },
    { label: '-', action: () => handleOperator('-'), color: 'text-premium-blue' },
    { label: '4', action: () => handleNumber('4') },
    { label: '5', action: () => handleNumber('5') },
    { label: '6', action: () => handleNumber('6') },
    { label: '+', action: () => handleOperator('+'), color: 'text-premium-blue' },
    { label: '1', action: () => handleNumber('1') },
    { label: '2', action: () => handleNumber('2') },
    { label: '3', action: () => handleNumber('3') },
    { label: '=', action: calculate, color: 'gradient-bg text-white', span: 'row-span-2' },
    { label: '0', action: () => handleNumber('0'), span: 'col-span-2' },
    { label: '.', action: () => handleNumber('.') },
  ];

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      <div className="flex-1 flex flex-col justify-end p-6 mb-4">
        <p className="text-right text-slate-500 text-lg font-medium h-8">{equation}</p>
        <h2 className="text-right text-6xl font-bold tracking-tighter overflow-hidden whitespace-nowrap">
          {display}
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-3 p-4 glass rounded-3xl mb-8">
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={btn.action}
            className={`
              h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors
              ${btn.span || ''} 
              ${btn.color || 'glass hover:bg-white/10'}
            `}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
