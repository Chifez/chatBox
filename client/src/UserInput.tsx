import { ChangeEvent } from 'react';

const UserInput = (props: {
  label?: string;
  type?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { label, name, value, placeholder, className, readonly, inputChange } =
    props;
  return (
    <div className="relative w-full ">
      <div className="p-3 flex items-center justify-between rounded-lg border border-[#551FFF]">
        <input
          type="text"
          id={label}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`${className} flex-1 outline-none mr-1`}
          onChange={inputChange}
          readOnly={readonly}
        />
      </div>
    </div>
  );
};

export default UserInput;
