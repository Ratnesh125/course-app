import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios'
import { CourseCard } from './Courses.jsx';

function Admin() {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [lvlOfDiff, setLevelOfDiff] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [imageLink, setImageLink] = React.useState("")
    let date = moment(new Date()).format('DD/MM/YYYY')
    const [response, setResponse] = React.useState("")
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const inputStyle = { margin: 5, width: 350 };
    function handleOnClick() {
        axios.post("http://localhost:3000/admin/courses",
            {
                "title": title,
                "description": description,
                "lvlOfDiff": lvlOfDiff,
                "date": date,
                "price": price,
                "imageLink": imageLink
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
    const courses = [
        {
            title: title,
            description: description,
            lvlOfDiff: lvlOfDiff,
            price: price,
            imageLink: imageLink
        }
    ];
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: 15 }}  >
            <center>
                <Card variant={"outlined"} style={{ width: 400, height: 500, paddingTop: 0 }}>
                    <span style={{ fontSize: 20 }}>AddNewCourse</span >
                    <TextField required={true} label="Title" variant="outlined" style={inputStyle}
                        onChange={(e) => { setTitle(e.target.value) }} />
                    <TextField label="Description" variant="outlined" style={inputStyle}
                        onChange={(e) => { setDescription(e.target.value) }} />
                    <TextField label="level of difficuty" variant="outlined" style={inputStyle}
                        onChange={(e) => { setLevelOfDiff(e.target.value) }} />
                    <TextField label="Price" variant="outlined" style={inputStyle}
                        onChange={(e) => { setPrice(e.target.value) }} />
                    <TextField label="ImageLink" variant="outlined" style={inputStyle}
                        onChange={(e) => { setImageLink(e.target.value) }} />
                    <Button variant="outlined"
                        onClick={handleOnClick}>add</Button>
                    <h3>{response}</h3>
                </Card>
            </center>
            <div>
                {courses.map((course) => (
                    <CourseCard key={course.id} title={course.title} description={course.description} lvlOfDiff={course.lvlOfDiff} price={course.price} />
                ))}
            </div>
        </div>
    );
}
export default Admin;
