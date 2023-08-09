import { useState, useEffect } from 'react';

const Auth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            },
        }).then((response) => response.json())
            .then((data) => {
                setAuthenticated(data);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    console.log(authenticated)
    return authenticated;
};

export default Auth;
