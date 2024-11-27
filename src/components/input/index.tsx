"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

import {FiSearch} from 'react-icons/fi'

export function Input(){
  
    const [input,setInput] = useState('');

    const router = useRouter();
  
    function handleSearch(e:FormEvent){
        e.preventDefault();

        if(!input){return}

        //roteamento inperativo
        router.push(`/game/search/${input}`)
    }

    return(
        <form onSubmit={handleSearch} 
        className="w-full bg-slate-200 my-5 flex items-center justify-between gap-2 rounded-lg p-2">
            <input 
            className="w-11/12 bg-slate-200 outline-none"
            type="text"
            placeholder="Procurando algun jogo?..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />

            <button>
                <FiSearch size={24} color="#ea580c"/>
            </button>
        </form>
    )
}