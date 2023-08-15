import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

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
                <CourseCard key={value.id} title={value.title} description={value.description} price={value.price} lvlOfDiff={value.lvlOfDiff} imageLink={value.imageLink} id={value._id} />
            ))}
        </div>
    );
}
export function CourseCard(props) {
    const navigate = useNavigate()

    return (
        <Card sx={{ width: 300 }} style={{ margin: 30 }}>
            <CardMedia
                component="img"
                alt={props.title}
                height="140"
                image={props.imageLink}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ height: 80 }}>
                    {props.description}

                </Typography>

                <Typography>
                    Price: {props.price}
                </Typography>
                <Typography>
                    level of difficulty: {props.lvlOfDiff}
                </Typography>
                id : {props.id}
            </CardContent>
            <CardActions>

                <Button size="small" onClick={() => {
                    Cookie.set('selectedCourse', JSON.stringify({
                        id: props.id,
                        title: props.title,
                        price: props.price,
                    }));
                    navigate(`/checkout/${props.id}`)
                }}>Buy</Button>
                <Button size="small" onClick={() => { navigate("/payments") }}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Courses  