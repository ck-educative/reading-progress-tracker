import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders the button with the correct text', () => {
    render(<Button buttonName="Test Button" />);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Button buttonName="Test Button" onClick={handleClick} />);
    fireEvent.click(screen.getByText(/Test Button/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});