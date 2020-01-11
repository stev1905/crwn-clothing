export const addItemToCart = (cartItems, cartItemAddToAdd) => {
    const existingCartItem = cartItems.find(cartItem => 
        cartItem => cartItem.id === cartItemAddToAdd.id
    );
    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemAddToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        )
    }

    return [...cartItems, {...cartItemAddToAdd, quantity: 1 }];
};