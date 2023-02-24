import {configureStore} from '@reduxjs/toolkit';
import selectLanguageSlice from '../../views/components/SelectLanguage/selectLanguageSlice';

const store = configureStore({
  reducer: {
    selectLanguage: selectLanguageSlice.reducer,
  },
});

export default store;
