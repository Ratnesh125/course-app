import React from 'react';
import Courses from './Courses';

function Home() {
    return (
        <div className="bg-gradient-to-r from-emerald-950 from-10% via-green-700 via-40% to-emerald-900 to-100%  flex justify-center items-center flex-col lg:px-8 xl:px-28 2xl:px-1/2 ">
            <div className='flex flex-col bg-gray-200 '>
                <div className="relative border-8 ">
                    <img
                        src="/src/assets/offers/republic_day_sale.jpg"
                        alt="Sale Offer"
                        className="object-center "
                    />
                    <div className="absolute top-0 text-center p-6">
                        <div className="text-sm font-bold text-white bg-red-500 rounded-lg shadow-lg">Sale Now!</div>
                        <p className="text-lg text-white bg-black bg-opacity-75 p-2 mt-2 rounded-lg">Up to 50% off</p>
                        <span className="text-sm text-orange-500">Happy </span>
                        <span className="text-sm text-blue-500">Republic </span>
                        <span className="text-sm text-green-500">Day </span>
                    </div>
                </div>

            </div>
            <Courses className="w-3/4 sm:w-1/2 md:w-1/3 xl:w-1/4 flex flex-col justify-between" />
        </div>
    );
}

export default Home;
