import { ReactNode } from 'react';

const Button = ({
  children,
  className,
  isLoading,
  handleClick,
}: {
  children: string | ReactNode;
  className?: string;
  isLoading?: boolean;
  handleClick?: () => void;
}) => {
  return (
    <div
      role="button"
      onClick={handleClick}
      className={`bg-[#551FFF] text-white text-center text-xl font-semibold rounded-lg w-full p-2 ${className} cursor-pointer`}
    >
      {isLoading ? <h1>Loading ...</h1> : <div>{children}</div>}
    </div>
  );
};

export default Button;
