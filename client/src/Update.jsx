import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios'
import { CourseCard } from './components/home/Courses.jsx';
import { useParams } from 'react-router-dom'


function Update() {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [lvlOfDiff, setLvlOfDiff] = React.useState("")
    const [price, setPrice] = React.useState("5000")
    const [imageLink, setImageLink] = React.useState("")
    let date = moment(new Date()).format('DD/MM/YYYY')
    const [responseMessage, setResponseMessage] = React.useState("")
    const [idtoupdate, setIdtoupdate] = React.useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const inputStyle = { margin: 5, width: 350 };
    async function handleOnClick() {
        console.log(idtoupdate, "here");
        const response = await axios.put(`${process.env.BASE_URL}/admin/courses/${idtoupdate}`,
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
            })
        setResponseMessage(response.data.message)

    }

    const [course, setCourse] = React.useState([]);
    const { courseId } = useParams();
    console.log(courseId);
    React.useEffect(() => {
        console.log(courseId)
        axios.get(`${process.env.BASE_URL}/admin/course/${courseId}`, null).then((response) => {

            console.log(response.data.courses, "hi");
            setCourse(response.data.courses);
            setTitle(response.data.courses.title)
            setDescription(response.data.courses.description);
            setLvlOfDiff(response.data.courses.lvlOfDiff);
            setPrice(response.data.courses.price);
            setImageLink(response.data.courses.imageLink);
            setIdtoupdate(response.data.courses._id);
            console.log(idtoupdate, "hm")

        });
    }, []);

    console.log(course._id, "ji")
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: 15 }}  >
            <center>
                <Card variant={"outlined"} style={{ width: 400, height: 500, paddingTop: 0 }}>
                    <span style={{ fontSize: 20 }}>AddNewCourse</span >
                    <TextField required={true} label="Title" variant="outlined" style={inputStyle}
                        value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <TextField label="Description" variant="outlined" style={inputStyle}
                        value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <TextField label="level of difficuty" variant="outlined" style={inputStyle}
                        value={lvlOfDiff} onChange={(e) => { setLvlOfDiff(e.target.value) }} />
                    <TextField label="Price" variant="outlined" style={inputStyle}
                        value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    <TextField label="ImageLink" variant="outlined" style={inputStyle}
                        value={imageLink} onChange={(e) => { setImageLink(e.target.value) }} />
                    <Button variant="outlined"
                        onClick={handleOnClick}>Update</Button>
                    <h3>{responseMessage}</h3>
                </Card>
            </center>
            <div>

                <CourseCard key={course._id} title={title} description={description} lvlOfDiff={lvlOfDiff} price={price} imageLink={imageLink} />

            </div>
        </div>
    );
}
export default Update;
