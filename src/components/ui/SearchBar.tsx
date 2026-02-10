"use client";

import { useState } from "react";

import { Search } from "lucide-react"; 

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input);
            setInput('');
        }
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex items-center w-full gap-3 p-2 group"
        >
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
                </div>

                <input 
                    type="text" 
                    placeholder="Buscar cidade..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-10 pr-4 py-3 rounded-xl outline-none focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all text-lg"
                />
            </div>

            <button 
                type="submit"
                className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 active:scale-95 transition-all shadow-lg shadow-black/10"
            >
                Buscar
            </button>
        </form>
    );
}