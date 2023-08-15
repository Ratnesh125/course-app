import Cookie from 'js-cookie';
import Button from '@mui/material/Button';

function CheckoutPage() {

    const storedCourse = Cookie.get('selectedCourse');
    const decodedCourse = JSON.parse(decodeURIComponent(storedCourse));
    console.log(decodedCourse.id, "decoded");

    return (
        <div>
            <h2>Checkout:</h2>
            <p>CourseId: {decodedCourse.id}</p>
            <p>CourseTitle: {decodedCourse.title}</p>
            <p>CoursePrice: {decodedCourse.price}</p>
            <Button size="small" variant="contained" color='success' onClick={() => { }}>Buy now</Button>
        </div>
    );
}

export default CheckoutPage;
