export function manageCart() {
  const getCart = () => {
    if (typeof window === "undefined") return [];
    const cart = localStorage?.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const saveCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  // Add item to cart or update its quantity
  const addToCart = (item) => {
    const cart: Array<any> = getCart();
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      cart[existingItemIndex] = item; // Add new item with quantity 1
      saveCart(cart);
    } else {
      cart.push(item);
      saveCart(cart);
    }
  };

  // Decrease item quantity or remove from cart

  // Get the current cart
  const getCartItems = () => {
    return getCart();
  };

  return { addToCart, getCartItems };
}
