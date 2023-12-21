export const getContacts = state => state.contacts.items;
export const getError = state => state.contacts.error;
export const getLoading = state => state.contacts.isLoading;
export const getFilterValue = state => state.filter.filterValue;
export const getFormValueName = state => state.form.nameValue;
export const getFormValuePhone = state => state.form.phoneValue;
