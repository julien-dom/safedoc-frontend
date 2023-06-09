import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const docplacesSlice = createSlice({
  name: 'docplaces',
  initialState,
  reducers: {
    addDocPlacesToReducer: (state, action) => {
        state.value = action.payload;
        console.log('docplaces reducer is', state.value)
    },

    deleteDocPlacesFromReducer: (state) => {
        state.value= null;
    },

  },
});

export const { addDocPlacesToReducer, deleteDocPlacesFromReducer } = docplacesSlice.actions;
export default docplacesSlice.reducer;