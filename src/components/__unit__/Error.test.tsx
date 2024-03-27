import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Error from '../Error';

describe('Error component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Error message='Test error message' onClose={() => {}} />);
    expect(getByText('Error:')).toBeInTheDocument();
    expect(getByText('Test error message')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByRole } = render(<Error message='Test error message' onClose={onClose} />);
    fireEvent.click(getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});