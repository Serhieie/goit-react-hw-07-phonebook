import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contactsSlice';
import { persistedFilterReducer } from './filterSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: persistedFilterReducer,
});

export default rootReducer;
