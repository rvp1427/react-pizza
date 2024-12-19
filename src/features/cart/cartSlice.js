import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
  // isActive:false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity > 0) item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export function getPizzas(store) {
  return store.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);
}

export function getCurrQuantity(id, fn) {
  const data = fn(
    (store) => store.cart?.cart?.find((item) => item?.pizzaId === id)?.quantity
  );
  return data;
}

export function getTotalPrice(store) {
  return store.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
}

// export function getCurrQuantity(store) {
//   return store.cart.cart.find();
// }

export const { addItem, removeItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
