import React, { useState } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Item 1', quantity: 2, price: 10 },
        { id: 2, name: 'Item 2', quantity: 1, price: 20 },
        // Add more items as needed
    ]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleIncreaseQuantity = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemoveItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}{' '}
                        <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total Price: ${getTotalPrice()}</p>
        </div>
    );
}

export default Cart;
