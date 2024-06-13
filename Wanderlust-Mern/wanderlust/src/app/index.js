import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
};

export const allList = createAsyncThunk("lists/fetchAll", async () => {
  let fetchLists = await axios.get("http://localhost:8000/", {
    });
    return fetchLists.data
});

const listSlice = createSlice({
  name: "list",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    list : listSlice.reducer },
});

export const { setList } = listSlice.actions;