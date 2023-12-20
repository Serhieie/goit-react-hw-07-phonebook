import React from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactTable } from 'components/ContactTable/ContactTable';
import { Filter } from 'components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  getContacts,
} from '../../redux/contactsSlice';
import { getFilterValue } from '../../redux/filterSlice';
import normalizePhoneNumber from '../../helpers/numberNormalize';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  const handleAddContact = (name, number) => {
    dispatch(
      addContact({ id: nanoid(), name, number: normalizePhoneNumber(number) })
    );
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className="flex gap-4 sm:gap-0 justify-around mx-auto w-9/12 mt-5 p-8 sm:p-2 rounded shadow-xl shadow-shadowBox md:flex-col md:items-center md:text-base  md:px-1.5 md:w-11/12 text-xl text-darkFont min-h-562 select-none bg-gradient-to-tr from-gradientColor1 to-gradientColor2 sm:mt-1">
      <ContactForm onSubmit={handleAddContact} />
      <div className="w-8/12 flex justify-center items-center flex-col px-5 pr-4 rounded-sm shadow-lg shadow-shadowBox min-h-562 select-none bg-gradient-to-tr from-smallWraperGradient1 to-smallWraperGradient2 relative md:mt-3 md:py-7 md:px-5 md:w-11/12">
        <TbUserSearch className="absolute w-4 h-4 top-9 left-1/4 opacity-40 z-10 text-filterPlaceholderColor md:w-5 md:h-5 md:top-16 md:left-1/4 md2:max-w-sm md2:top-9 md2:left-1/6 ssm:hidden lg2:left-1/3 xl2:left-1/3" />
        <Filter />
        <ContactTable
          getVisibleContacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}
