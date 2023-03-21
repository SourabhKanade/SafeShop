import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    clearCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    addProduct: (state, action) => {
      let foundProductIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      // console.log({ payload: action.payload, foundProductIndex });
      if (foundProductIndex !== -1) {
        state.products[foundProductIndex].quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, { payload }) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        ({ _id: id, size, color }) =>
          id !== payload.id || size !== payload.size || color !== payload.color
      );
      state.total -= payload.totalPrice;
    },
  },
});

export const { addProduct, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit"

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: Number(),
//     total: Number()
//   },
//   reducers: {
//     addProduct: (state, { payload }) => {
//       state.quantity += 1
//       state.products = [...state.products, payload]
//       state.total += payload.price * payload.qte
//     },
//     updateProduct: (state, { payload }) => {
//       state.products = state.products.map((product) =>
//         product._id === payload.id &&
//         product.size === payload.size &&
//     product.color === payload.color
//       ? { ...product, qte: product.qte + payload.qte }
//       : product
//   )
//   state.total += payload.qte < 1 ? -payload.price : payload.price
// },
// deleteProduct: (state, { payload }) => {
//   state.quantity -= 1
//   state.products = state.products.filter(
//     ({ _id: id, size, color }) =>
//       id !== payload.id || size !== payload.size || color !== payload.color
//   )
//   state.total -= payload.totalPrice
// },
// initializeCart: (state) => {
//   state.quantity = 0
//       state.products = []
//       state.total = 0
//     }
//   }
// })

// export const { addProduct, updateProduct, deleteProduct, initializeCart } =
//   cartSlice.actions
// export default cartSlice.reducer
