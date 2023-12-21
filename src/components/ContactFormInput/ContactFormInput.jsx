import { LiaUserEditSolid } from 'react-icons/lia';
import { FiPhoneMissed } from 'react-icons/fi';
import { getTheme } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { Field } from 'formik';

export function Input() {
  const isThemeDark = useSelector(getTheme);
  return (
    <>
      <label
        htmlFor="name"
        className={`mt-2 text-xl flex items-center gap-2 md:ml-2 md:w-10/12
      md2:text-sm font-light sm:mt-1`}
      >
        <LiaUserEditSolid className="ml-3 md:ml-6" />
        Name
      </label>
      <Field
        type="text"
        name="name"
        id="name"
        placeholder="Enter name"
        className={`${
          isThemeDark
            ? ' text-darkFontDark bg-sky-900 placeholder:text-darkFontDark '
            : ' text-darkFont bg-lightPartsColor placeholder:text-darkFont '
        }text-center mx-auto w-11/12 py-1 px-5 rounded-sm h-9
          border-0 outline-none  text-4
           placeholder:font-extralight
         md:w-10/12  md:text-4 md:h-8 md:py-0.5 md:px-2 placeholder:opacity-50 
         md2:text-2 ssm:text-xs md2:text-xs font-light  transition-all`}
      />
      <label
        htmlFor="phone"
        className={`mt-1 text-xl flex items-center gap-2 md:ml-2 md:w-10/12
      md:text-4 font-light md2:text-xs`}
      >
        <FiPhoneMissed className="ml-3 md:ml-6 w-[14px] h-[14px]" />
        Phone Number
      </label>
      <Field
        type="tel"
        name="phone"
        id="phone"
        placeholder="Enter phone number"
        className={`${
          isThemeDark
            ? ' text-darkFontDark bg-sky-900 placeholder:text-darkFontDark  '
            : ' text-darkFont bg-lightPartsColor placeholder:text-darkFont  '
        } text-center w-11/12 py-1 px-5 rounded-sm h-9 
        border-0 outline-none mx-auto text-4  
        md:w-10/12  md:text-4 md:h-8 md:py-0.5 md:px-2 placeholder:opacity-50 
        md2:text-2 ssm:text-xs md2:text-xs placeholder:font-extralight font-light  transition-all`}
      />
    </>
  );
}
