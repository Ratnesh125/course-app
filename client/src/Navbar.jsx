    import Button from "@mui/material/Button";
    import React from 'react';
    function Navbar() {
        const [buttonText, setButtonText] = React.useState("")
        React.useEffect(() => {
            // Update the buttonText based on the current route
            if (location.pathname === "/signin"  ) {
                setButtonText("Signup");
            } else if (location.pathname === "/signup") {
                setButtonText("Signin");
            }

        }, [location.pathname]);
        const isSignInOrSignUpRoute = location.pathname === "/signin" || location.pathname === "/signup";

        return (
            <div style={{ 
                display: "flex", justifyContent: "space-between", position: 'fixed', top: 0, width: '100%', height: '60px'
}}>
                <div>
                    <h1>Coursera</h1>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button
                            variant="outlined"
                            
                            onClick={() => {
                                    // window.location = "/" + { buttontext }
                                if(buttonText === "Signup"){
                                window.location = "/signup";
                                }
                                else { window.location = "/signin"; }
                            }}
                        >
                            
                            {buttonText}
                        </Button>
                    </div>
                </div>
                    
            </div>
        );
    }
    export default Navbar;
