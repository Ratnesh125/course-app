import Cookie from 'js-cookie';
import Button from '@mui/material/Button';

function CheckoutPage() {

    const storedCourse = Cookie.get('selectedCourse');
    const decodedCourse = JSON.parse(decodeURIComponent(storedCourse));
    console.log(decodedCourse.id, "decoded");

    return (
        <div className='max-w-md mx-auto my-8 p-6 border-4 border-gray-800 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Checkout</h2>
            <img src={decodedCourse.imageLink} alt={decodedCourse.title} className='w-full h-48 object-cover rounded-lg mb-4' />
            <div className='mb-4'>
                <p className='text-lg'><span className='font-bold'>Course ID:</span> {decodedCourse.id}</p>
                <p className='text-lg'><span className='font-bold'>Course Title:</span> {decodedCourse.title}</p>
                <p className='text-lg'><span className='font-bold'>Course Price:</span> ${decodedCourse.price}</p>
            </div>
            <Button size="small" variant="contained" color='success' className='w-full' onClick={() => { }}>Buy now</Button>
        </div>
    );
}

export default CheckoutPage;
