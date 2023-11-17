import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchPrams from "./searchPramsSlice";

const store = configureStore({
    reducer: {
        adoptedPet,
        searchPrams
    }
})

export default store;