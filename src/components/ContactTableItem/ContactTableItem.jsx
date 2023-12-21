import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserDelete } from 'react-icons/ai';
import Modal from 'react-modal';
import { PulseLoader } from 'react-spinners';
import normalizePhoneNumber from 'helpers/numberNormalize';
import { deleteContact } from '../../redux/contacts/mockData-api';
import { settings, settings2 } from 'helpers/deleteModalSettings';
import { getTheme } from '../../redux/selectors';

Modal.setAppElement('#root');

export function ContactTableItem({ contact, index }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const windowWidth = window.innerWidth;
  const [modalIsOpen, setIsOpen] = useState(false);
  const subtitle = useRef();
  const isThemeDark = useSelector(getTheme);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    setIsOpen(false);
    setIsLoading(prevLoading => !prevLoading);
    try {
      await dispatch(deleteContact(contact.id));
      setIsLoading(prevLoading => !prevLoading);
    } catch (error) {
      setIsLoading(prevLoading => !prevLoading);
      throw new Error(error.message);
    }
  };

  return (
    <tr
      className={`${
        isThemeDark
          ? ' border-tableBorderColorDark '
          : ' border-tableBorderColor '
      }border-b-2  `}
    >
      <td
        width="5%"
        className={`${
          isThemeDark ? ' bg-lightPartsColorDark ' : ' bg-lightPartsColor '
        }p-1 text-cente  md:text-3 ssm:text-1 `}
      >
        {index + 1}
      </td>
      <td
        width="38%"
        className={`${
          isThemeDark ? ' bg-lightPartsColorDark ' : ' bg-lightPartsColor '
        }p-1 text-center   md:text-md ssm:text-sm  `}
      >
        {contact.name}
      </td>
      <td
        width="42%"
        className={`${
          isThemeDark ? ' bg-lightPartsColorDark ' : ' bg-lightPartsColor '
        }p-1 text-center   md:text-md ssm:text-sm `}
      >
        {normalizePhoneNumber(contact.phone)}
      </td>
      <td
        width="15%"
        className={`${
          isThemeDark ? ' bg-lightPartsColorDark ' : ' bg-lightPartsColor '
        } p-1 text-center   md:text-md ssm:text-sm  `}
      >
        <button
          id="delete-btn"
          onClick={openModal}
          className={` ${
            isThemeDark
              ? ' bg-buttonColorDark hover:bg-buttonHoverColorDark text-lightPartsColorDark hover:text-darkFontDark'
              : ' bg-buttonColor hover:bg-buttonHoverColor text-lightPartsColor '
          } mx-auto border-none
           py-1 px-2 min-w-[50px] min-h-[28px] text-xs cursor-pointer 
           duration-300 flex text-center items-center 
            rounded-sm font-light justify-center sm:min-h-[20px] sm:min-w-[30px]`}
        >
          {isLoading ? (
            <PulseLoader color="#F5DEB3" size="2px" />
          ) : windowWidth < 768 ? (
            <AiOutlineUserDelete style={{ marginRight: '4px' }} />
          ) : (
            'Delete'
          )}
        </button>
      </td>
      <Modal
        style={isThemeDark ? settings2 : settings}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="md:w-[340px]"
      >
        <h2
          ref={subtitle}
          className={`${
            isThemeDark ? 'text-darkFontDark' : 'text-darkFont'
          } text-center   text-2xl md:text-sm `}
        >
          Delete contact{' '}
          <span className="font-bold text-green-700">{contact.name}</span>?
        </h2>
        <div
          className="flex jusrify-center items-center mx-auto mt-10 
             md:mt-6 gap-1 "
        >
          <button
            onClick={handleDelete}
            className={`${
              isThemeDark
                ? ' bg-deleteBtnColorDark hover:bg-deleteBtnHoverColorDark text-darkFontDark '
                : ' bg-deleteBtnColor hover:bg-deleteBtnHoverColor text-lightPartsColor '
            }text-4  
            border-none py-3 px-10 rounded-0.5 cursor-pointer 
            duration-300 mx-auto  md:py-2 md:px-5
             font-light`}
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className={`${
              isThemeDark
                ? ' bg-buttonColorDark text-darkFontDark hover:text-lightPartsColorDark hover:bg-buttonHoverColorDark '
                : ' bg-buttonColor text-lightPartsColor hover:bg-buttonHoverColor '
            }text-4  
            border-none py-3 px-10 rounded-0.5 cursor-pointer 
            duration-300 mx-auto  md:py-2 md:px-5
            font-light `}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </tr>
  );
}

const ContactType = {
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

ContactTableItem.propTypes = {
  contact: PropTypes.shape(ContactType).isRequired,
  index: PropTypes.number,
};
