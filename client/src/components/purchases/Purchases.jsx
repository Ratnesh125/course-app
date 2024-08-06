// src/components/Purchases.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Purchases = () => {
    const [Purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/purchasedCourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPurchases(response.data.purchasedCourses);
            } catch (err) {
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Purchased Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Purchases.map(course => (
                    <div key={course._id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                        <img src={course.imageLink} alt={course.title} className="w-64 h-64 object-cover rounded mb-4" />
                        <p className="text-lg mb-2">{course.description}</p>
                        <p className="text-lg font-semibold mb-4">Price: ₹{course.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Purchases;
