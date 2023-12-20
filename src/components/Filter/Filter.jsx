import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterValue, getFilterValue } from '../../redux/filterSlice';

export function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const handleInputChange = event => {
    const value = event.target.value;
    dispatch(changeFilterValue(value));
  };

  return (
    <label className="bg-filterLabelColor w-[60%] mx-auto mb-2 mt-5 py-1 px-5 rounded-0.5 flex md:w-[85%] md:text-3 md:py-1 md:px-2 md2:w-[85%]">
      <input
        placeholder="Enter name for filter"
        type="text"
        value={filterValue}
        onChange={handleInputChange}
        className="placeholder:opacity-50 flex text-md font-medium bg-lightPartsColor text-darkFont border-none outline-none w-11/12 max-w-[480px] h-10 rounded mx-auto opacity-70 text-center py-0.5 pr-2 pl-7 placeholder:text-center placeholder:text-filterPlaceholderColor placeholder:py-1 placeholder:px-5 md:w-[90%] md:text-xs md2:text-sm md:pl-2 ssm:pl-1 lg2:text-base"
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
