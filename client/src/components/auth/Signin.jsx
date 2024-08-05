import React from 'react';
import axios from 'axios';
import { CourseCard } from '../home/Courses';

function Signin() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleClickSubmit = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/login`,null,
            {
                headers: {
                    "username": username,
                    "password": password
                }
            }
        ).then((response)=> {
                console.log(response.data);
                const token = response.data.token;
                localStorage.setItem('token', token);
                if (response.data.message === 'Logged in successfully') {
                    window.location = "/admin";
                }
                else {
                    alert(response.data.message);
                }
            }).catch((error) => console.error('Error:', error))
    }
    
    return (
        <div class="bg-neutral-400 min-h-screen flex flex-col">
            <div class="container max-w-lg mx-auto border-solid border-black flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-green-300 px-6 py-8 rounded text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign in</h1>
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name"
                        onChange={(e) => { setUsername(e.target.value) }} />

                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => { setPassword(e.target.value) }} />

                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                        onClick={handleClickSubmit}
                    >Signin</button>
                </div>
            </div>
        </div>
    );
}
export default Signin;
