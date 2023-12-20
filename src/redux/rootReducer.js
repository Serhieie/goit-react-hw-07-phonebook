import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contactsSlice';
import { filterSlice } from './filterSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterSlice.reducer,
});

export default rootReducer;
