import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch data thunk
const fetchData = createAsyncThunk('fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  return response.json();
});

// Post data thunk
const postData = createAsyncThunk('postData', async ({ userId, id, title, completed }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      id,
      title,
      completed,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
});

// Delete post thunk
const deletePost = createAsyncThunk('deletePost', async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  return id;
});

// Update post thunk
const updatePost = createAsyncThunk('updatePost', async ({ id, userId, title, completed }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      userId,
      id,
      title,
      completed
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
});

// Toggle completed status thunk
const toggleCompleted = createAsyncThunk('toggleCompleted', async ({ id, completed }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      completed: !completed
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  });
  return response.json();
});

// Slice for managing fetch and post data
const fetchReducer = createSlice({
  name: 'fetchReducer',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch cases
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Post cases
    builder.addCase(postData.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
    });
    builder.addCase(postData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Delete cases
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.data = state.data.filter((u) => u.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Update cases
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const index = state.data.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Toggle Completed cases
    builder.addCase(toggleCompleted.fulfilled, (state, action) => {
      const index = state.data.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], completed: action.payload.completed };
      }
      state.loading = false;
    });
    builder.addCase(toggleCompleted.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleCompleted.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  }
});

export default fetchReducer.reducer;
export { fetchData, postData, deletePost, updatePost, toggleCompleted };
