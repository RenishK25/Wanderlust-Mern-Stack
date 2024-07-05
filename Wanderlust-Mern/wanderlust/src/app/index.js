import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

  const JsonUser = localStorage.getItem('user');
  const user =  JsonUser? JSON.parse(JsonUser) : null;

const initialState = {
  lists: [],
};

export const allList = createAsyncThunk("lists/fetchAll", async () => {
  let fetchLists = await axios.get("http://localhost:8000/", {
    });
    return fetchLists.data
});

export const listShow = createAsyncThunk("lists/fetchOne", async (listId) => {
  let fetchLists = await axios.get(`http://localhost:8000/list/${listId}`, {
    });
    return fetchLists.data
});

export const listEdit = createAsyncThunk("lists/edit", async (listId) => {
  let fetchLists = await axios.get(`http://localhost:8000/list/${listId}/edit`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  });
    return fetchLists.data
});

export const listUpdate = createAsyncThunk("lists/update", async (listId, formData) => {
  const response = await axios.put("http://localhost:8000/list/"+listId+"/edit", formData, {
    headers: {
        Authorization: `Bearer ${user.accessToken}`
    }
  });
    return response.data
});

export const listDelete = createAsyncThunk("lists/delete", async (listId) => {
  const response = await axios.delete(`http://localhost:8000/list/${listId}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  });
    return response.data
});

const listSlice = createSlice({
  name: "list",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(listShow.fulfilled, (state, action) => {
      state.lists = action.payload.list;
    });
    builder.addCase(listEdit.fulfilled, (state, action) => {
      state.lists = action.payload.list;
    });
    builder.addCase(listUpdate.fulfilled, (state, action) => {
      state.lists = action.payload.list;
    });
    builder.addCase(listDelete.fulfilled, (state, action) => {
      // state.lists = action.payload.list;
    });
  },
});

// const userSlice = createSlice({
//   name: "list",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(allList.fulfilled, (state, action) => {
//       state.lists = action.payload;
//     });
//     builder.addCase(listShow.fulfilled, (state, action) => {
//       state.lists = action.payload.list;
//     });
//     builder.addCase(listEdit.fulfilled, (state, action) => {
//       state.lists = action.payload.list;
//     });
//     builder.addCase(listUpdate.fulfilled, (state, action) => {
//       state.lists = action.payload.list;
//     });
//     builder.addCase(listDelete.fulfilled, (state, action) => {
//       // state.lists = action.payload.list;
//     });
//   },
// });

export const store = configureStore({
  reducer: {
    list : listSlice.reducer },
});

export const { setLists } = listSlice.actions;