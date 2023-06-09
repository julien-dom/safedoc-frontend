import { createSlice } from '@reduxjs/toolkit';

const initialState = {
// Tableau vide pour specialties et tags, donc push dans la fonction

// Rajouter recos
  value: { _id: null, firstname: null, lastname: null, email: null, phone: null, address: null, latitude: null, longitude: null, sector: {label: '',value:null}, specialties: [], tags: [] },
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    addDocToReducer: (state, action) => {
      state.value._id = action.payload._id;
      console.log('reducer addDoc payload doctor id', action.payload._id)
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.phone = action.payload.phone;
      state.value.address = action.payload.address;
      state.value.latitude = action.payload.latitude
      state.value.longitude = action.payload.longitude;
      state.value.sector = action.payload.sector;
      state.value.languages = action.payload.languages;
      state.value.specialties = action.payload.specialties;
      state.value.tags = action.payload.tags;
      console.log('reducer addDoc state value', state.value)
    },

    deleteDocFromReducer: (state) => {
      state.value._id = null;
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.email = null;
      state.value.phone = null;
      state.value.address = null;
      state.value.latitude = null;
      state.value.longitude = null;
      state.value.sector = null;
      state.value.specialties = []
      state.value.tags = []
      console.log('reducer deleteDoc state value', state.value)

    },
  },
});

export const { addDocToReducer, deleteDocFromReducer } = doctorSlice.actions;
export default doctorSlice.reducer;