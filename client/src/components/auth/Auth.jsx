import { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    //need to set body/payload null then header
    useEffect(() => {
        axios.post('http://localhost:3000/authenticate', null, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            // console.log(response, "hii");
            setAuthenticated(response.data)
        })
    }, []);
    // console.log(authenticated, "true or false")
    return authenticated;
};

export default Auth;

//bug:sending 4 requests to authenticate one user