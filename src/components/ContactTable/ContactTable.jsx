import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ContactTableItem } from '../ContactTableItem/ContactTableItem';
import {
  getFilterValue,
  getContacts,
  getLoading,
  getError,
  getTheme,
} from '../../redux/selectors';

export function ContactTable() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);
  const isThemeDark = useSelector(getTheme);

  //Чи потрібен юз мемо у подібній функції?
  const getVisibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    if (!Array.isArray(contacts)) {
      return [];
    }
    const filteredContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.phone.toLowerCase().includes(normalizedFilter)
    );
    const sortedContacts = [...filteredContacts].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return sortedContacts;
  }, [contacts, filter]);

  return (
    <div className="overflow-x-auto w-[92%]">
      {!contacts?.length && !error && !isLoading && (
        <p className=" text-center font-light">No contacts found.</p>
      )}
      {error && <p className=" text-center font-light">{error}</p>}

      <table
        className={`${
          isThemeDark
            ? 'border-tableBorderColorDark '
            : 'border-tableBorderColor '
        } border-2  border-collapese 
      mt-5 mb-5 block mx-auto overflow-auto w-full h-[534px] 
        ssm:text-xs  `}
      >
        <thead className="text-sm  right-0 left-0 top-0 w-full">
          <tr
            className={`${
              isThemeDark
                ? 'border-tableBorderColorDark '
                : 'border-tableBorderColor '
            } border-b-2  `}
          >
            <th
              width="7%"
              className={`${
                isThemeDark
                  ? 'bg-tableHeaderBackgroundDark  text-darkFontDark '
                  : 'bg-tableHeaderBackground text-darkFont '
              } items-center  
           font-bold min-w-4 p-2 md:p-0.5 `}
            >
              #
            </th>
            <th
              width="40%"
              className={`${
                isThemeDark
                  ? 'bg-tableHeaderBackgroundDark text-darkFontDark '
                  : 'bg-tableHeaderBackground text-darkFont '
              } items-center 
           font-bold min-w-4 p-2 md:p-0.5  `}
            >
              Name
            </th>
            <th
              width="42%"
              className={`${
                isThemeDark
                  ? 'bg-tableHeaderBackgroundDark text-darkFontDark '
                  : 'bg-tableHeaderBackground text-darkFont '
              }items-center  
           font-bold min-w-4 p-2 md:p-0.5  `}
            >
              Phone Number
            </th>
            <th
              width="15%"
              className={`${
                isThemeDark
                  ? 'bg-tableHeaderBackgroundDark  text-darkFontDark '
                  : ' bg-tableHeaderBackground text-darkFont '
              }items-center  
           font-bold min-w-4 p-2 md:p-0.5  `}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="max-h-fit max-w-full text-lg sm:text-sm md2:text-base  select-text">
          {getVisibleContacts.map((contact, index) => (
            <ContactTableItem
              key={contact.id}
              contact={contact}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
