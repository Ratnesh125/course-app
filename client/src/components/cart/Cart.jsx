import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Auth from '../auth/Auth';

function Cart() {
    const [cartItems, setCartItems] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const authStatus = Auth();

    React.useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const items = JSON.parse(savedCart);
            setCartItems(items);
            const total = items.reduce((sum, item) => sum + item.price, 0);
            setTotalPrice(total);
        }
    }, []);

    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        const newTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(newTotal);
    };

    const handleResetCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
        setTotalPrice(0);
    };


    const handleCheckout = async () => {
        if (authStatus != 1) {
            alert("Please SignIn to Checkout and procced with payments")
            return
        }
        const stripe = await loadStripe(import.meta.env.VITE_API_STRIPE_PUBLIC_KEY);
        const body = {
            products: cartItems,
        };

        try {
            // Create a checkout session
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    },
                }
            );
            
            // Access the session ID directly from the response data
            const { id: sessionId } = response.data;

            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({
                sessionId,
            });

            if (error) {
                console.error('Error redirecting to checkout:', error);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                            <img
                                src={item.imageLink}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-md mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-gray-700">{item.description}</p>
                                <p className="text-sm">Price: ${item.price}</p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex flex-col gap-4 mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
                            <button
                                onClick={handleCheckout}
                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Checkout
                            </button>
                        </div>
                        <button
                            onClick={handleResetCart}
                            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Reset Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
