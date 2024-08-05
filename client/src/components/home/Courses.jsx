import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

function useTodos() {
    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/courses`, null).then((response) => {
            console.log(response.data);
            setTodos(response.data.courses);
        });
    }, []);
    return todos;
}

function Courses(props) {
    const todos = useTodos();
    return <Render className={props.className} todos={todos} />;
}

function Render(props) {
    return (
        <div className="flex flex-wrap justify-center">
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

    return (
        <div className={`mx-4 my-6 overflow-hidden bg-white rounded-lg shadow-lg ${props.className} `}>

            <img
                className="object-cover w-full h-40 sm:h-48 md:h-40 lg:h-52 xl:h-28 "
                src={props.imageLink}
                alt={props.title}
            />
            <div className="px-6 py-4 h-full bg-neutral-200 overflow-hidden ">
                <div className="text-xl font-bold" >{props.title}</div>
                <p className="text-gray-700 " >{props.description}</p>
                <p className="mt-2 text-sm">Price: {props.price}</p>
                <p className="text-sm">Level of Difficulty: {props.lvlOfDiff}</p>
                <p className="text-sm">ID: {props.id}</p>
            </div>
            <div className="flex justify-between px-6 py-4 bg-gray-800">
                <button
                    onClick={() => {
                        Cookie.set('selectedCourse', JSON.stringify({
                            id: props.id,
                            title: props.title,
                            description: props.description,
                            lvlOfDiff: props.lvlOfDiff,
                            imageLink: props.imageLink,
                            price: props.price,

                        }));
                        navigate(`/checkout/${props.id}`);
                    }}
                    className="px-8 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                >
                    Buy
                </button>
                <button
                    onClick={() => navigate("/payments")}
                    className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default Courses;
