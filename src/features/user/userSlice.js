import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action) {
      state.username = action.payload;
    },
  },
});

export const { createUser } = userSlice.actions;
export default userSlice.reducer;
