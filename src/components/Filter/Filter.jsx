import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterValue } from '../../redux/filterSlice';
import { getFilterValue, getTheme } from '../../redux/selectors';

export function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const isThemeDark = useSelector(getTheme);

  const handleInputChange = event => {
    const value = event.target.value;
    dispatch(changeFilterValue(value));
  };

  return (
    <label
      className={`${
        isThemeDark ? 'bg-filterLabelColorDark' : 'bg-filterLabelColor'
      }  w-[60%] mx-auto mb-2 
    mt-5 py-1 px-5 rounded-0.5 flex md:w-[85%] md:text-3 md:py-1
    md:px-2 md2:w-[85%] transition-all`}
    >
      <input
        placeholder="Enter name for filter"
        type="text"
        value={filterValue}
        onChange={handleInputChange}
        className={`${
          isThemeDark
            ? ' bg-sky-900 text-darkFontDark placeholder:text-filterPlaceholderColorDark '
            : 'bg-lightPartsColor text-darkFont placeholder:text-filterPlaceholderColor  '
        }placeholder:opacity-50 flex text-m border-none outline-none w-11/12 max-w-[480px]
         h-10 rounded mx-auto opacity-70 text-center py-0.5 pr-2 pl-7 placeholder:text-center 
         placeholder:py-1 placeholder:px-5 md:w-[90%] md:text-xs md2:text-sm
          md:pl-2 ssm:pl-1 lg2:text-base placeholder:font-light font-light transition-all`}
      />
    </label>
  );
}
