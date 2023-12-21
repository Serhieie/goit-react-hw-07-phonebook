import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contactsSlice';
import { persistedFilterReducer } from './filterSlice';
import { persistedFormReducer } from './formSlice';
import { themeSlice } from './theme/themeReducer.js';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: persistedFilterReducer,
  form: persistedFormReducer,
  theme: themeSlice.reducer,
});

export default rootReducer;
