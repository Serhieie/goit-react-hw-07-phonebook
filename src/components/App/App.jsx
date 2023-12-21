import React, { useEffect } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactTable } from 'components/ContactTable/ContactTable';
import { Filter } from 'components/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/mockData-api';
import { setTheme } from '../../redux/theme/themeReducer.js';
import { getTheme } from '../../redux/selectors';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

export function App() {
  const dispatch = useDispatch();
  const isThemeDark = useSelector(getTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (isThemeDark) {
      root.style.setProperty('--scrollbar-thumb-light', 'rgb(26, 29, 39)');
      root.style.setProperty(
        '--scrollbar-track-light',
        'rgba(64, 81, 127, 0.5)'
      );
      document.body.style.backgroundColor = 'var(--scrollbar-body-dark)';
    } else {
      root.style.setProperty('--scrollbar-thumb-light', 'rgb(215, 159, 63)');
      root.style.setProperty(
        '--scrollbar-track-light',
        'rgba(250, 250, 210, 0.5)'
      );

      document.body.style.backgroundColor = 'var(--scrollbar-body-light)';
    }
  }, [isThemeDark]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const toggleTheme = () => {
    dispatch(setTheme(!isThemeDark));
  };

  return (
    <div
      className={`${
        isThemeDark
          ? 'shadow-shadowBoxDark text-darkFontDark from-gradientColor1Dark to-gradientColor2Dark '
          : ' shadow-shadowBox text-darkFont  from-gradientColor1 to-gradientColor2 '
      }
    flex gap-4 sm:gap-0 justify-around mx-auto 
    w-9/12 mt-6 p-8 sm:p-2 rounded shadow-xl
    md:flex-col md:items-center md:text-base md:px-1.5 md:w-11/12
    text-xl min-h-562 select-none 
    bg-gradient-to-tr 
    sm:mt-1  transition-all relative`}
    >
      <div
        className={`${
          isThemeDark
            ? 'dark:bg-sky-800 shadow-cyan-950'
            : 'bg-buttonColor shadow-darkFont'
        } absolute top-[26%] right-[8%] mmd2:top-[1%] 
        mmd2:-right-[6%] md2:top-[1%] md2:-right-[6%]  1xl2:top-[1%]
        1xl2:-right-[6%] sm:w-20 sm:h-8 w-8 h-20 md2:w-8 md2:h-20  mmd2:w-8 mmd2:h-20
        1xl2:w-8 1xl2:h-20 rounded-full   p-1 transition-transform z-10  shadow-inner
        ssm:top-[2%] ssm:right-[38%] sm2:right-[5%] sm2:top-[4%] ssm:w-14 ssm:h-7`}
      >
        <button onClick={toggleTheme}>
          {isThemeDark ? (
            <FiSun
              className="absolute right-0.5 bottom-2 sm:left-2 sm:top-0.5 ssm:-left-12 ssm:-top-0.5  transition-all"
              size={28}
            />
          ) : (
            <FaRegMoon
              className="absolute top-2 right-[3px] sm:right-2 sm:top-[4px] ssm:-right-12 ssm:-top-0.5  transition-all"
              size={26}
            />
          )}

          <div
            className={`${
              isThemeDark
                ? 'sm:translate-y-0 sm:translate-x-12 ssm:translate-x-0  bg-smallWraperGradient1Dark'
                : 'bg-themeBtnLight sm:translate-x-0 translate-y-12 sm:translate-y-0 ssm:translate-x-7'
            } w-6 h-6 ssm:h-5 ssm:w-5 rounded-full shadow-md transform duration-300`}
          />
        </button>
      </div>

      <ContactForm />
      <div
        className={`${
          isThemeDark
            ? ' shadow-shadowBoxDark from-smallWraperGradient1Dark to-smallWraperGradient2Dark '
            : ' shadow-shadowBox from-smallWraperGradient1 to-smallWraperGradient2 '
        } 
      w-8/12 flex justify-center items-center flex-col
      px-5 pr-4 rounded-sm shadow-lg min-h-562
      select-none bg-gradient-to-tr
      relative md:mt-3 md:py-7 md:px-1 md2:px-2 md:w-11/12  transition-all`}
      >
        <TbUserSearch
          className={`
        absolute w-4 h-4 top-9 left-1/4 opacity-40 
        z-10 ${
          !isThemeDark
            ? ' text-filterPlaceholderColor '
            : ' text-filterPlaceholderColorDark '
        } 
        md:w-5 md:h-5 md:top-16 md:left-1/4 md2:max-w-sm md2:top-9
        md2:left-1/6 ssm:hidden lg2:left-1/3 xl2:left-1/3  transition-all`}
        />
        <Filter />
        <ContactTable />
      </div>
    </div>
  );
}
