import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dropdown from '../Dropdown';
import { Genere } from '../../features/bookReader/BookAPI';

describe('Dropdown component', () => {
    it('renders correctly', () => {
        render(<Dropdown label='test' onSelect={() => {}} />);
        const dropdown = screen.getByRole('combobox');
        expect(dropdown).toBeInTheDocument();
    });

    it('calls onSelect when an option is selected', () => {
        const handleSelect = jest.fn();
        render(<Dropdown label='test' onSelect={handleSelect} />);
        const dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: Genere.BIOGRAPHY } });
        expect(handleSelect).toHaveBeenCalledWith(Genere.BIOGRAPHY);
    });
});