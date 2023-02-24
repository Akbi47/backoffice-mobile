import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
  name: 'selectLanguage',
  initialState: {activeLanguage: 'en'},
  reducers: {
    changeSelectLanguage: (state, action) => {
      state.activeLanguage = action.payload;
    },
  },
});
