import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contactsSlice';
import { persistedFilterReducer } from './filterSlice';
import { persistedFormReducer } from './formSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: persistedFilterReducer,
  form: persistedFormReducer,
});

export default rootReducer;
