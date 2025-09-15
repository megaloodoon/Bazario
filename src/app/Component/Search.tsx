
"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'


export default function Search() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [search, setSearch] = useState("")

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (search.trim()) {
            params.set('title', search.trim());
        } else {
            params.delete('title');
        }
        params.set('page', '1');
        if (!params.get('per_page')) params.set('per_page', '4');
        router.push(`/store?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    }

    return (
        <div className="flex items-center gap-2">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className='bg-black/20 text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition'
                type="text"
                placeholder='Search'
            />
            <button onClick={handleSearch} className='bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 font-medium transition'>Search</button>
        </div>
    )
};