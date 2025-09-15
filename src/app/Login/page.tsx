"use client"
import React, { useState } from 'react'
import Container from '../Component/Container'
import axios from 'axios';
import Cookie from 'js-cookie'
import { redirect } from 'next/navigation';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {



        const response = {
            token: "bajfhauhfiajosfiajgihaig",
            expire: 7,
        };


        Cookie.set("token", response.token, { expires: response.expire });
        redirect("/dashboard");
    };

    return (
        <div>
            <Container>
                <div className='border p-4 flex flex-col w-72 mx-auto'>
                    <input onChange={(e) => setUsername(e.target.value)} className='mt-2 border' type="text" placeholder='Username' />
                    <input onChange={(e) => setPassword(e.target.value)} className='mt-2 border' type="password" placeholder='Password' />

                    <button onClick={handleLogin} className='mt-2 cursor-pointer'>Login</button>
                </div>
            </Container>
        </div>
    )
}