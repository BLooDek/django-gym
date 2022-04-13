import { createSlice } from "@reduxjs/toolkit";

export const blogState = createSlice({
  name: "blogState",
  initialState: {
    addDialog: false,
    editDialog: false,
    blogUrl: "http://127.0.0.1:8000/blog/all/",
    posts: [],
  },
  reducers: {
    setAddDialog: (state, action) => {
      state.addDialog = action.payload;
    },
    setEditDialog: (state, action) => {
      state.editDialog = action.payload;
    },
    setBlogUrl: (state, action) => {
    state.blogUrl = action.payload;
    },
    setBlogPosts: (state, action) => {
      state.posts = action.payload;
      }
  },
});

export const { setAddDialog, setEditDialog, setBlogUrl, setBlogPosts } = blogState.actions;
export default blogState.reducer;
