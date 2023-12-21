import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { PulseLoader } from 'react-spinners';

import { getContacts, getLoading, getTheme } from '../../redux/selectors';
import { postContact } from '../../redux/contacts/mockData-api';
import { schema } from 'constants';
import { succesMessage, nameCheckerError } from 'helpers/notiflix';
import { Input } from '../ContactFormInput/ContactFormInput';
import normalizePhoneNumber from 'helpers/numberNormalize';
import normalizeName from 'helpers/nameNormalize';

const initialValues = {
  name: '',
  phone: '',
};

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getLoading);
  const isThemeDark = useSelector(getTheme);

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
        className={`${
          isThemeDark
            ? ' shadow-shadowBoxDark from-smallWraperGradient1Dark to-smallWraperGradient2Dark '
            : ' from-smallWraperGradient1 shadow-shadowBox to-smallWraperGradient2 '
        }  flex gap-2 flex-col w-1/3 py-20 pr-7 pl-5 rounded-sm
          shadow-lg bg-gradient-to-tr md:py-7 md:px-5 md:min-h-0 md:w-[99%]
          transition-all ssm:pt-14 `}
      >
        <h1 className="text-center text-3xl m-0 md:text-xl md2:text-xl font-normal">
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
          className={`${
            isThemeDark
              ? '  shadow-none hover:bg-buttonHoverColorDark text-buttonTextColorDark hover:text-lightPartsColorDark bg-buttonColorDark '
              : ' shadow-shadowBox hover:bg-buttonHoverColor text-buttonTextColor bg-buttonColor '
          } text-center  font-light w-40 h-11 rounded-sm 
           border-none outline-none mx-auto  cursor-pointer shadow-md 
            flex items-center  justify-around transition-all duration-30 
            text-4  md:w-40 md:h-11  text-lg md2:w-32
             md2:text-sm  sm:justify-self-start sm:mx-0 ssm:mx-auto `}
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
