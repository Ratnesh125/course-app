import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useTodos() {
    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/courses`)
            .then((response) => {
                console.log(response.data);
                setTodos(response.data.courses);
            })
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);
    return todos;
}

function Courses(props) {
    const todos = useTodos();
    return <Render className={props.className} todos={todos} />;
}

function Render(props) {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-4">
            {props.todos.map((value) => (
                <CourseCard
                    key={value.id}
                    title={value.title}
                    description={value.description}
                    price={value.price}
                    lvlOfDiff={value.lvlOfDiff}
                    imageLink={value.imageLink}
                    id={value._id}
                    className={props.className}
                />
            ))}
        </div>
    );
}

export function CourseCard(props) {
    const navigate = useNavigate();
    const [cartText, setCartText] = React.useState("Add to Cart")


    const handleAddToCart = () => {
        // Create an object for the course data
        const courseData = {
            id: props.id,
            title: props.title,
            description: props.description,
            lvlOfDiff: props.lvlOfDiff,
            imageLink: props.imageLink,
            price: props.price,
        };

        const savedCart = localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        const existingItemIndex = cart.findIndex(item => item.id === courseData.id);

        if (existingItemIndex !== -1) {
        } else {
            cart.push(courseData);
        }
        console.log(cart)

        localStorage.setItem('cart', JSON.stringify(cart));
    };


    return (
        <div className={`max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden ${props.className}`}>
            <img
                className="w-full h-40 sm:h-48 object-cover"
                src={props.imageLink}
                alt={props.title}
            />
            <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
                <p className="text-gray-700 mb-4">{props.description}</p>
                <p className="text-sm mb-2">Price: ${props.price}</p>
                <p className="text-sm mb-2">Level of Difficulty: {props.lvlOfDiff}</p>
                <p className="text-sm mb-4">ID: {props.id}</p>
                <div className="flex justify-evenly">
                    
                    <button
                        onClick={() => {
                            handleAddToCart();
                            setCartText("Added")
                        }}
                        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        {cartText}
                    </button>
                    <button
                        onClick={() => navigate(`/course/${props.id}`)}
                        className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Courses;
