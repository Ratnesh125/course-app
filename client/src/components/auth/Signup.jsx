import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [message, setMessage] = React.useState("")
    const navigate = useNavigate();
    const handleClickSubmit = () => {

        axios.post("http://localhost:3000/admin/signup",
            {
                username,
                password
            }
        ).then((response) => {
            console.log(response);
            const token = response.data.token;
            const status = response.status;
            if (token !== undefined || null) {
                localStorage.setItem('token', token);
            }
            status === 200 ? navigate("/signin") : setMessage(response.data.message);
        }).catch(function (err) { setMessage(err.response.data.message) });

    }
    return (
        <div class="bg-neutral-400 min-h-screen flex flex-col">
            <div class="container max-w-lg mx-auto border-solid border-black flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-green-300 px-6 py-8 rounded text-black w-full">
                    <h1 class="text-3xl text-center">{message}</h1>
                    <h1 class="mb-8 text-3xl text-center">Sign upp</h1>
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => { setUsername(e.target.value) }} />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

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
                    >Create Account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
}
export default Signup;
