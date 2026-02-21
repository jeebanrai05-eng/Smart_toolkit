import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Save, X, StickyNote } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  timestamp: string;
}

export default function Notepad({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: 'bg-amber-500' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
  };

  const saveNote = async () => {
    if (!newNote.title || !newNote.content) return;
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    });
    setNewNote({ title: '', content: '', color: 'bg-amber-500' });
    setIsAdding(false);
    fetchNotes();
  };

  const deleteNote = async (id: number) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const colors = [
    'bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-purple-500'
  ];

  return (
    <div className="flex flex-col h-full py-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">My Notes</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-3 rounded-2xl gradient-bg shadow-lg shadow-premium-blue/30"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto no-scrollbar pb-12">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-5 relative group"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${note.color} rounded-l-2xl`} />
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{note.title}</h4>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="p-1 text-rose-500/30 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{note.content}</p>
              <p className="text-[10px] text-slate-600 mt-4 font-bold uppercase tracking-wider">
                {new Date(note.timestamp).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">New Note</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 glass rounded-full">
                <X size={20} />
              </button>
            </div>

            <input
              placeholder="Title"
              value={newNote.title}
              onChange={e => setNewNote({...newNote, title: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-4 font-bold focus:outline-none focus:border-premium-blue/50"
            />
            <textarea
              placeholder="Start writing..."
              value={newNote.content}
              onChange={e => setNewNote({...newNote, content: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-6 min-h-[150px] resize-none focus:outline-none focus:border-premium-blue/50"
            />

            <div className="flex gap-2 mb-8">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setNewNote({...newNote, color: c})}
                  className={`w-8 h-8 rounded-full ${c} ${newNote.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-premium-dark' : ''}`}
                />
              ))}
            </div>

            <button 
              onClick={saveNote}
              className="w-full py-4 rounded-2xl gradient-bg font-bold flex items-center justify-center gap-2"
            >
              <Save size={20} /> Save Note
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
