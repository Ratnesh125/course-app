import React from 'react';
import { useRecoilState } from 'recoil';
import { usernameSelector, passwordSelector } from '../../../store/atoms';

function Login() {
    const [username, setUsername] = useRecoilState(usernameSelector);
    const [password, setPassword] = useRecoilState(passwordSelector);

    const handleLogin = () => {
        // Perform login logic here, e.g., send API request to validate credentials
        // For simplicity, we'll just log the username and password for now
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div>
            <h1>Login</h1>

            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
