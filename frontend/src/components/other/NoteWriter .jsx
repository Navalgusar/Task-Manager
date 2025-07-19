import { useState, useRef, useEffect } from "react";


export default function NoteWriter({
    width = '100%',
    backgroundColor = 'rgb(50,50,50,0.5)',
    color = 'white',
    placeholder = "• Write your notes here...",
    storageKey = "note-writer-text",
    style = {}
}) {
    const [note, setNote] = useState('');
    const [savedNote, setSavedNote] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const textareaRef = useRef();
    const fullTitle = "Sticky-notes";

    // Typewriter effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypewriterText(fullTitle.slice(0, ++i));
            if (i >= fullTitle.length) clearInterval(interval);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    // Load saved note from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setNote(saved);
            setSavedNote(saved);
        }
        textareaRef.current?.focus();
        autoResize();
    }, [storageKey]);

    const handleSave = () => {
        setSavedNote(note);
        localStorage.setItem(storageKey, note);
    };

    const handleClear = () => {
        setNote('');
        setSavedNote('');
        localStorage.removeItem(storageKey);
        textareaRef.current.focus();
    };

    const handleTyping = (e) => {
        setNote(e.target.value);
        setIsTyping(true);
        autoResize();
        clearTimeout(textareaRef.current?.typingTimeout);
        textareaRef.current.typingTimeout = setTimeout(() => setIsTyping(false), 500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const before = note.substring(0, start);
            const after = note.substring(start);
            const bullet = '\n• ';
            const updated = before + bullet + after;
            setNote(updated);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + bullet.length;
            }, 0);
            autoResize();
        }
    };

    const autoResize = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    return (
        <div
            className="relative p-4 rounded-xl shadow-md flex flex-col gap-4 animate-fade-in transition-all"
            style={{
                width,
                backgroundColor,
                color,
                ...style
            }}
        >
            {/* Pencil Animation */}
            <div
                className={`absolute top-2 right-3 text-xl transition-transform duration-300 ${
                    isTyping ? 'animate-pencil-wiggle' : ''
                }`}
            >
                ✏️
            </div>

            {/* Typewriter Header */}
            <div className="text-md font-mono font-bold border-b pb-1">
                {typewriterText}
            </div>

            {/* Text Input */}
            <textarea
                ref={textareaRef}
                className="resize-none overflow-hidden rounded-md p-2 text-sm font-mono bg-transparent border border-dashed border-white outline-none focus:border-solid whitespace-pre-wrap"
                placeholder={placeholder}
                value={note}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                style={{ color, lineHeight: '1.5' }}
                rows={1}
            />

            {/* Action Buttons */}
            <div className="flex justify-between gap-2 text-xs">
                <button
                    onClick={handleSave}
                    className="px-3 py-1 border rounded-md hover:bg-indigo-400 hover:text-white transition-all"
                >
                    Save
                </button>
                <button
                    onClick={handleClear}
                    className="px-3 py-1 border border-red-500 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all"
                >
                    Clear
                </button>
            </div>

            {/* Custom CSS */}
            <style>{`
                @keyframes pencilWiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-15deg); }
                    75% { transform: rotate(15deg); }
                }
                .animate-pencil-wiggle {
                    animation: pencilWiggle 0.5s ease-in-out;
                }
                .markdown-preview ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                }
                .markdown-preview p {
                    margin-bottom: 0.5rem;
                }
                .markdown-preview code {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
