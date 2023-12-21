import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ContactTableItem } from '../ContactTableItem/ContactTableItem';
import { getFilterValue, getContacts } from '../../redux/selectors';

export function ContactTable() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

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
    <div className="overflow-x-auto md:w-full">
      <table
        className="border-2 border-tableBorderColor border-collapese w-[525px]
      mt-5 mb-5 block mx-auto overflow-auto h-[542px] ssm:text-1 md:w-[310px] 
      sm2:w-[400px] md:max-w-lg mmd2:max-w-[430px] 1xl2:max-w-2xl skrB md2:w-[330px]
       ssm:w-[232px]"
      >
        <thead className="text-sm  right-0 left-0 top-0">
          <tr className="border-b-2 border-tableBorderColor">
            <th
              width="5%"
              className="items-center bg-tableHeaderBackground 
          text-darkFont font-bold min-w-4 p-2 md:text-3 md:p-0.5 "
            >
              #
            </th>
            <th
              width="38%"
              className=" items-center bg-tableHeaderBackground 
          text-darkFont font-bold min-w-4 p-2 md:text-3 md:p-0.5"
            >
              Name
            </th>
            <th
              width="42%"
              className="items-center bg-tableHeaderBackground 
          text-darkFont font-bold min-w-4 p-2 md:text-3 md:p-0.5"
            >
              Phone Number
            </th>
            <th
              width="15%"
              className="items-center bg-tableHeaderBackground 
          text-darkFont font-bold min-w-4 p-2 md:text-3 md:p-0.5"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="max-h-fit max-w-full text-lg">
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
