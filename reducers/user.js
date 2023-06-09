import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, email: null, password: null, gender: null, orientation: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      console.log('reducer login payload token', action.payload.token)
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.gender = action.payload.gender;
      state.value.orientation = action.payload.orientation;
      console.log('reducer login state value', state.value)
    },

    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
      state.value.password = null;
      state.value.gender = null;
      state.value.orientation = null;
      console.log('reducer logout state value', state.value)

    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;