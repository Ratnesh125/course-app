import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React from 'react';

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function Signup() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [message, setMessage] = React.useState("")
    const handleClickSubmit = () => {

        axios.post("http://localhost:3000/admin/signup",
            {
                username,
                password
            }
        ).then((response) => {
            console.log(response);
            const token = response.data.token;
            if (token !== undefined || null) {
                localStorage.setItem('token', token);
            }
            setMessage(response.data.message);
        }).catch(function (err) { setMessage(err.response.data.message) });

    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                signup
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >signUp</DialogTitle>

                <DialogContent style={{ width: 500 }} >
                    <TextField onChange={(e) => { setUsername(e.target.value) }} fullWidth={true} label="Username" variant="outlined" style={{ marginTop: 5 }} />
                    <br /><br />
                    <TextField onChange={(e) => { setPassword(e.target.value) }} fullWidth={true} label="Password" variant="outlined" type="password" />

                    <br /> <br />
                    <Button variant="outlined"
                        onClick={handleClickSubmit}
                    >submit</Button >
                    <h3>{message}</h3>

                </DialogContent>
            </Dialog>
        </div>
    );
}
export default Signup;
