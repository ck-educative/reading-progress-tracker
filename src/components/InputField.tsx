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
        <label className='label-main-form' 
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
          className = 'input-main-form'
          aria-label={ placeholder }
        />
      </div>
    </div>
  );
};

export default InputField;

