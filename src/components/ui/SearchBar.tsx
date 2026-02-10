"use client"; // Lembre-se que componentes com useState no Next.js precisam disso

import { useState } from "react";

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
            className="flex gap-2 p-4"
        >
            <input 
                type="text" 
                placeholder="Digite o nome da cidade" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 rounded"
            />
            <button 
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Buscar
            </button>
        </form>
    );
}