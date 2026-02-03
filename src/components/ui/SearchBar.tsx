import { useState } from "react";

interface SearchBarProps {
    onSearch: (city : string) => void;
}


export default function SearchBar({onSearch} : SearchBarProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if(input.trim()) () => onSearch(input);
    }


    return (
        <form 
            onSubmit={handleSubmit}
            className="search-bar"
        >
            <input 
                type="text" 
                placeholder="Digite o nome da cidade" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Buscar</button>

        </form>

    )
    

}