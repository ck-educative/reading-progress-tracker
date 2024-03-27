import React from 'react';

interface ButtonProps {
  buttonName: string;
  onClick?:() => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonName, onClick, type = 'button', className = 'button', disabled = false }) => {
  return (
    <div className='px-20 gap-x-10 gap-y-10 justify-center'>
      <button
        type={type}
        onClick={onClick} 
        data-twe-ripple-init
        data-twe-ripple-color='light'
        // className="px-4 pt-2 w-32 h-16 pb-4 sm:p-5 rounded text-xs font-medium uppercase leading-normal bg-blue-500 text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 dark:active:shadow-dark-strong"
        className={className}
        aria-label={buttonName}
        disabled={disabled}
      >
        { buttonName }
      </button>
    </div>
  );
};

export default Button;