import { configureStore } from "@reduxjs/toolkit";

import cartslice from "./slices/cartslice";

const store = configureStore({
    reducer: {
        cart: cartslice,
    },
})


export default store;