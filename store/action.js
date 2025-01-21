export const increment = (id) => {
    return {
        type: "increment",
        id:id
    }
};
export const decrement=(id) => {
   return {
     type: "decrement",
     id: id,
   };
};

export const addToCart = (product) => {
  return {
    type: "addToCart",
    product: product,
  };
};
export const settotalQuantity = (quantity) => {
  return {
    type: "showTotalQuantity",
    quantity: quantity,
  };
};
