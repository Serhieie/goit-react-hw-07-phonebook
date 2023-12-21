import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, postContact, deleteContact } from './mockData-api';
import { initialState } from './initial';

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //FetchAll
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      //PostContact
      .addCase(postContact.pending, handlePending)
      .addCase(postContact.fulfilled, handleFulfilled)
      .addCase(postContact.rejected, handleRejected)
      //DeleteContact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilled)
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
