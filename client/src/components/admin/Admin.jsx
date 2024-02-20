import React from 'react';
import axios from 'axios'
import { CourseCard } from '../home/Courses.jsx';

function Admin() {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [lvlOfDiff, setLvlOfDiff] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [imageLink, setImageLink] = React.useState("")
    let date = new Date()
    const [response, setResponse] = React.useState("")

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
        <div className='border-8 border-gray-900 bg-gradient-to-r from-emerald-950 from-10% via-green-700 via-40% to-emerald-900 to-100% h-auto md:flex md:flex-row flex flex-col justify-center'>
            {console.log(new Date(), "hii")
            }<div className="w-full md:w-96 bg-gray-900 border-8 p-4 flex flex-col items-center">
                <span className="text-xl font-bold">Add New Course</span>
                <input
                    required
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Level of Difficulty"
                    onChange={(e) => setLvlOfDiff(e.target.value)}
                />
                <input
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Image Link"
                    onChange={(e) => setImageLink(e.target.value)}
                />
                <button
                    className="w-full mt-2 p-2 border border-gray-300 rounded bg-blue-500 text-white"
                    onClick={handleOnClick}
                >
                    Add
                </button>
                <h3 className="mt-2">{response}</h3>
            </div>

            <div className='flex items-center justify-center border-8 w-full md:w-96'>
                {courses.map((course) => (
                    <CourseCard
                        className=" md:w-3/4  lg:w-full "
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        lvlOfDiff={course.lvlOfDiff}
                        price={course.price}
                        imageLink={imageLink}
                    />
                ))}
            </div>
        </div>
    );
}
export default Admin;
