import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../InputField';

describe('InputField', () => {

  it('renders the input field with the correct value and placeholder', () => {
    const handleChange = jest.fn();
    render(<InputField label='Test' value='Test Value' onChange={handleChange} placeholder='Test Placeholder' />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder') as HTMLInputElement;
    expect(inputElement.value).toBe('Test Value');
  });

  it('calls the onChange handler when its value changes', () => {
    const handleChange = jest.fn();
    render(<InputField label='Test' value='Test Value' onChange={handleChange} placeholder='Test Placeholder' />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalled();
  });
});