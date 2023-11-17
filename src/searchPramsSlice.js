import { createSlice } from "@reduxjs/toolkit";

export const searchPramsSlice = createSlice({
  name: "searchPrams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchPramsSlice.actions;

export default searchPramsSlice.reducer;
