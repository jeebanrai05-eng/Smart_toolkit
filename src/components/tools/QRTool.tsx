import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
// @ts-ignore
import QrScanner from 'react-qr-scanner';
import { Scan, Type, Download, Copy, Check } from 'lucide-react';

interface QRToolProps {
  onBack: () => void;
}

export default function QRTool({ onBack }: QRToolProps) {
  const [mode, setMode] = useState<'generate' | 'scan'>('generate');
  const [text, setText] = useState('');
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = (data: any) => {
    if (data) {
      setScannedData(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const copyToClipboard = () => {
    if (scannedData) {
      navigator.clipboard.writeText(scannedData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex gap-2 p-1 glass rounded-2xl">
        <button
          onClick={() => setMode('generate')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            mode === 'generate' ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type size={16} /> Generate
        </button>
        <button
          onClick={() => setMode('scan')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            mode === 'scan' ? 'gradient-bg text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scan size={16} /> Scan
        </button>
      </div>

      {mode === 'generate' ? (
        <div className="glass-card p-6 flex flex-col items-center gap-6">
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text to generate QR..."
              className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-premium-blue/50 min-h-[100px] resize-none"
            />
          </div>

          <div className="p-6 bg-white rounded-3xl shadow-xl shadow-premium-blue/20">
            <QRCodeSVG value={text || ' '} size={200} />
          </div>

          <button className="w-full py-4 rounded-2xl gradient-bg font-bold flex items-center justify-center gap-2 shadow-lg shadow-premium-blue/30">
            <Download size={20} /> Download QR
          </button>
        </div>
      ) : (
        <div className="glass-card p-6 flex flex-col items-center gap-6">
          <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-premium-blue/30 relative">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <div className="absolute inset-0 border-2 border-premium-blue animate-pulse pointer-events-none opacity-30" />
          </div>

          {scannedData && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-4 glass rounded-xl flex flex-col gap-2"
            >
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Result</p>
              <p className="text-sm break-all font-medium">{scannedData}</p>
              <button 
                onClick={copyToClipboard}
                className="mt-2 flex items-center gap-2 text-premium-blue text-xs font-bold"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
