import { ReactNode, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';

const Modal = ({
  children,
  openModal,
  onClose,
  isDropDown = false,
  extrastyle,
}: {
  children: ReactNode;
  openModal: boolean;
  onClose: () => void;
  isDropDown?: boolean;
  extrastyle?: string;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = () => {
    onClose();
  };

  return (
    <>
      {openModal && (
        <div
          className={`my-1 bg-white dark:bg-[#0c0c0d]  border ${extrastyle}`}
          onClick={handleModalClick}
        >
          <div className="relative p-2" ref={modalRef}>
            {!isDropDown && (
              <IoMdClose
                className="w-8 h-8 absolute right-4 top-4"
                // onClick={handleModalClick}
              />
            )}

            <div className={`${!isDropDown && 'mt-1'}`}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
