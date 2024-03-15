import React, { useState } from 'react';
import { Genere } from '../features/bookReader/BookAPI'; // replace with the actual path to the Genre enum

interface DropdownProps {
  label: string;
  onSelect: (selectedOption: Genere) => void;
}

const Dropdown: React.FC<DropdownProps> = ( { label, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Genere | null>(null);

  const handleSelect = (option: Genere) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const genere = [
    Genere.BIOGRAPHY,
    Genere.FANTASY,
    Genere.FICTION,
    Genere.HISTORY,
    Genere.MYSTERY,
    Genere.NONFICTION,
    Genere.POETRY,
    Genere.SCIFI,
    Genere.STORY
  ]

  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        <label className='label-main-form' 
          data-testid='grid-bookname-label'
          aria-label='label'>
          { label }
        </label>
      </div>
      <div className='md:w-2/3'>
        <select 
          className='select-main-form'
          value={selectedOption || ''}
          onChange={(e) => handleSelect(e.target.value as Genere)}
        >
          <option value=''>Select...</option>
          {Object.values(genere).map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
