import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

export const fetchAllLists = createAsyncThunk("lists/fetchAll", async () => {
  const response = await axios.get("http://localhost:8000/");
  return response.data;
});

const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: []
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
  },

})

export const { addList, deleteList } = listSlice.actions;
export const store = configureStore({
  reducer: {
    list: listSlice.reducer,
  },
});