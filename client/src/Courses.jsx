import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function useTodos() {
    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:3000/admin/courses", null).then((response) => {

            console.log(response.data);
            setTodos(response.data.courses);
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
        // <Grid item lg={8} md={2} sm={2}>
        <Card sx={{ width: 300 }} style={{ margin: 30, height: "100%" }}>
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
                    {props.description.length <= 250 ? props.description : props.description.substr(0, 250) + "..."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                    onClick={() => {
                    }}>Buy</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        // </Grid>
    );
}

export default Courses  