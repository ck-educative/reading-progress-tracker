import React from 'react';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, required = false }) => {
  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        <label className='block font-bold md:text-right mb-1 md:mb-0 pr-4 text-gray-500' 
          datatest-id='grid-bookname-label'
          aria-label='label'>
          { label }
        </label>
      </div>
      <div className='md:w-2/3'>
        <input 
          value= { value }
          onChange = { onChange }
          placeholder = { placeholder }
          required = { required }
          className = 'p-4 text-blue-300 border-2 border-gray-500 rounded-md mb-4 space-y-10'
          aria-label={ placeholder }
        />
      </div>
    </div>

  );
};

export default InputField;

