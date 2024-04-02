import { configureStore } from "@reduxjs/toolkit";
import SearchitemsSlice from "./SearchitemsSlice.js";

export const store = configureStore({
  reducer: {
    search: SearchitemsSlice,
  },
});
