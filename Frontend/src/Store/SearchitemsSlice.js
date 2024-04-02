import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Searchvalue: "",
};

const SearchitemsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    SetSearchItem: (state, action) => {
      state.Searchvalue = action.payload;
    },
    DeleteSearchItem: (state) => {
      state.Searchvalue = "";
    },
  },
});

export const { SetSearchItem, DeleteSearchItem } = SearchitemsSlice.actions;
export default SearchitemsSlice.reducer;
