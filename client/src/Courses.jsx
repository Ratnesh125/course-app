import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function useTodos() {
    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                setTodos(data.courses);
            })
        });
    }, []);
    return todos
}

function Courses() {
    const todos = useTodos();
    return (
        <Render todos={todos} />
    )
}
function Render(props) {
    return (
        <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center"
        }}>
            {props.todos.map((value) => (
                <CourseCard key={value.id} title={value.title} description={value.description} />
            ))}
        </div>
    );
}
function CourseCard(props) {
    return (
        <Card sx={{ width: 345 }} style={{ margin: 20, height: "100%" }}>
            <CardMedia
                component="img"
                alt={props.title}
                height="140"
                image={"https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ height: 100 }}>
                    {props.description.length <=250 ? props.description : props.description.substr(0, 250) + "..."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                    onClick={() => {

                    }}>Buy</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Courses 