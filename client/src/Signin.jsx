import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function Signin() {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [buttonText, setButtonText] = React.useState("Signup")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSubmit = () => {
        axios.post("http://localhost:3000/admin/login",null,
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
            }).catch((error) => console.error('Error:', error)).then((req, res) => {
                console.log("success")
            });
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Signin
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Signin</DialogTitle>
                <DialogContent >
                    <DialogContentText style={{ width: 500 }} >
                        Welcome back, please signin to continue
                    </DialogContentText>
                    <TextField fullWidth={true} onChange={(e) => { setUsername(e.target.value) }} label="Username" variant="outlined" style={{ marginTop: 5 }} />
                    <br /><br />
                    <TextField fullWidth={true} onChange={(e) => { setPassword(e.target.value) }} label="Password" variant="outlined" type="password" />
                    <br /><br />
                    <Button variant="outlined"
                        onClick={handleClickSubmit}>submit
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Signin;
