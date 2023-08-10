import Button from "@mui/material/Button";
import React from 'react';
import Menu from './Menu.jsx';
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import Auth from "./Auth.jsx";
function Navbar() {
    const authenticated = Auth();
    return (
        <div style={{
            display: "flex",
            backgroundColor: "white",
            justifyContent: "space-between",
            width: "100%",
            height: '60px',
        }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginLeft: 10, paddingTop: 10 }}>
                <Menu />
                <span style={{ fontSize: 30 }}>Coursera</span>
            </div>
            {!authenticated && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ marginRight: 10, paddingTop: 10 }}>
                        <Signup />
                    </div>
                    <div style={{ marginRight: 10, paddingTop: 10 }}>
                        <Signin />
                    </div>
                </div>
            )}
        </div>
    );
}
export default Navbar;
