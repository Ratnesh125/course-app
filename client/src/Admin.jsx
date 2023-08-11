import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios'

function Admin() {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    let date = moment(new Date()).format('DD/MM/YYYY')
    const [age, setAge] = React.useState('');
    const [response, setResponse] = React.useState("")
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div >

            <center>
                <Card variant={"outlined"} style={{ width: 400, height: 500, paddingTop: 0 }}>
                    <div >
                        <span style={{ fontSize: 20 }}>AddNewCourse</span >
                    </div>
                    <div>
                        <TextField label="CourseTitle" variant="outlined" style={{ margin: 5, width: 350 }}
                            onChange={(e) => { setTitle(e.target.value) }} />
                        <br />
                        <TextField label="CourseDescription" variant="outlined" style={{ margin: 5, width: 350 }}
                            onChange={(e) => { setDescription(e.target.value) }} />
                        <br />
                        <InputLabel >CourseLevelOfDifficulty</InputLabel>
                        <Select
                            value={age}
                            onChange={handleChange}

                            style={{ margin: 5, width: 350 }}
                        >
                            <MenuItem value={10}>Easy to medium</MenuItem>
                            <MenuItem value={20}>medium to hard</MenuItem>
                            <MenuItem value={30}>easy to hard</MenuItem>
                        </Select>
                        <br />
                        <TextField label="CoursePrice" variant="outlined" style={{ margin: 5, width: 350 }}
                            onChange={(e) => { setDescription(e.target.price) }} />
                        <br />
                        <TextField label="ImageLink" variant="outlined" style={{ margin: 5, width: 350 }}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                    <div>
                        <Button variant="outlined" style={{ marginTop: 5 }}
                            onClick={() => {
                                axios.post("http://localhost:3000/admin/courses",
                                    {
                                        "title": title,
                                        "description": description,
                                        "lvlOfDiff": "easy medium hard",
                                        "date": date,
                                        "price": 5000,
                                        "imageLink": "abc.jpg"
                                    },
                                    {
                                        headers: {
                                            "Authorization": "Bearer " + localStorage.getItem('token'),
                                        }
                                    }
                                ).then((response) => {
                                    setResponse(response.data.message);
                                }).catch((error) => {
                                    setResponse(error.message);
                                });

                            }
                            }>add</Button>
                        <h3>{response}</h3>
                    </div>
                </Card>
            </center>
        </div>
    );
}
export default Admin;
