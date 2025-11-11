import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //add item
    const existingItem = state.items.findIndex(
      (item) => item.id === action.meal.id
    );
    const updatedItems = [...state.items];

    if (existingItem > -1) {
      const existingMeal = updatedItems[existingItem];
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity + 1,
      };
      updatedItems[existingItem] = updatedMeal;
    } else {
      updatedItems.push({ ...action.meal, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  } else if (action.type === "REMOVE_ITEM") {
    //remove item
    const existingItem = state.items.findIndex((item) => item.id === action.id);
    const updatedItems = [...state.items];
    if (updatedItems[existingItem].quantity === 1) {
      updatedItems.splice(existingItem, 1);
    } else {
      const existingMeal = updatedItems[existingItem];
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity - 1,
      };
      updatedItems[existingItem] = updatedMeal;
    }
    return { ...state, items: updatedItems };
  } else if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  } else {
    return state;
  }
};

function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  function addItemToCart(meal) {
    dispatch({ type: "ADD_ITEM", meal });
  }

  function removeItemFromCart(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: state.items,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
