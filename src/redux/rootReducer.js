import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contactsSlice';
import { persistedFilterReducer } from './filterSlice';
import { persistedFormReducer } from './formSlice';
import { persistedThemeReducer } from './theme/themeReducer.js';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: persistedFilterReducer,
  form: persistedFormReducer,
  theme: persistedThemeReducer,
});

export default rootReducer;
