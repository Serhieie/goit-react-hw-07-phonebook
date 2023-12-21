import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { PulseLoader } from 'react-spinners';

import { getContacts, getLoading } from '../../redux/selectors';
import { postContact } from '../../redux/contacts/mockData-api';
import { schema } from 'constants';
import { succesMessage, nameCheckerError } from 'helpers/notiflix';
import { Input } from '../ContactFormInput/ContactFormInput';
import normalizePhoneNumber from 'helpers/numberNormalize';
import normalizeName from 'helpers/nameNormalize';

//Як правильно передавати стейт форміку з локал стореджу персісту?
const initialValues = {
  name: '',
  phone: '',
};

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getLoading);

  const handleSubmit = (values, { resetForm }) => {
    const { name, phone } = values;

    let someNum = normalizePhoneNumber(phone);
    let normName = normalizeName(name);

    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === normName.toLowerCase()
    );

    if (isNameExists) {
      return nameCheckerError();
    }
    handleAddContact(normName, someNum);
    succesMessage();
    resetForm();
  };

  const handleAddContact = (name, phone) => {
    dispatch(
      postContact({ id: nanoid(), name, phone: normalizePhoneNumber(phone) })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form
        autoComplete="off"
        className="flex gap-2 flex-col w-1/3 py-20 pr-7 pl-5 rounded-sm
          shadow-lg shadow-shadowBox  bg-gradient-to-tr
        from-smallWraperGradient1 to-smallWraperGradient2 md:py-7 md:px-5
        md:min-h-0 md:w-[99%]"
      >
        <h1 className="text-center text-3xl m-0 md:text-xl md2:text-xl font-normal ">
          Add Contact Field
        </h1>
        <Input />
        <div
          className="w-full flex justify-center font-extralight items-center flex-col 
          h-20 mt-2 md:text-base md:h-7 text-center"
        >
          <ErrorMessage
            className="text-xl text-errorMsg m-0 p-0 font-extralight items-center 
              md:w-10/12 md:text-base md2:text-sm"
            name="name"
            component="div"
          />
          <ErrorMessage
            className="text-xl text-errorMsg m-0 p-0 font-extralight items-center 
              md:w-10/12 md:text-base md2:text-sm"
            name="phone"
            component="div"
          />
        </div>
        <button
          type="submit"
          className="text-center  font-light w-40 h-11 rounded-sm bg-buttonColor
           border-none outline-none mx-auto  cursor-pointer shadow-md shadow-shadowBox
            flex items-center justify-around transition-all duration-300 text-buttonTextColor
            text-4 hover:bg-buttonHoverColor md:w-40 md:h-11  text-lg md2:w-32
             md2:text-sm "
        >
          {isLoading ? (
            <PulseLoader color="#F5DEB3" size="6px" />
          ) : (
            <>
              Add Contact <AiOutlineUserAdd />
            </>
          )}
        </button>
      </Form>
    </Formik>
  );
}
