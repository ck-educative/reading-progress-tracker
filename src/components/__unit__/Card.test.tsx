import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Card from '../Card';
import {  useAppDispatch, useAppSelector } from '../../app/hooks';
import { renderWithContext } from './test.utils';
import bookAPI from '../../features/bookReader/BookAPI';
import { Book } from '../../types';
import { store } from '../../app/store';
import { addBook, fetchBooks, selectBooks } from '../../features/bookReader/bookSlice';

// Create a mock store
jest.mock('../../app/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn()
}));

describe('Card Component', () => {
  const newBook: Book = {
    id:55,
    title: 'Test for Card',
    author: 'Test for Card',
    genere: 'Test for Card',
    progress: {
      totalChapters: 5,
      numberRead: 1
    }
  };

  const updatedBook: Book = {
    id: 55,
    title: 'Test for Card',
    author: 'Test for Card',
    genere: 'Test for Card',
    progress: {
      totalChapters: 5,
      numberRead: 3
    }
  };

  beforeAll(async()=>{
    await store.dispatch(addBook(newBook));
  });
  it('renders the card with the correct title and content', () => {
    (useAppDispatch as jest.Mock).mockReturnValue(store.dispatch);

    renderWithContext(<Card key={1} bookId={55}/>);
        
    jest.spyOn(bookAPI, 'getBooks').mockResolvedValueOnce([newBook]);
    const titleElement = screen.getByText(/Book ID:/i);
    const nameElement = screen.getByText(/Name:/i);
    const authorElement = screen.getByText(/By:/i);
    const genereElement = screen.getByText(/By:/i);

    expect(titleElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(genereElement).toBeInTheDocument();
  });

  it('renders the progessbar component', () => {

    (useAppDispatch as jest.Mock).mockReturnValue(store.dispatch);
    (useAppSelector as jest.Mock).mockReturnValue(store.getState().books.books);
    (useAppSelector as jest.Mock).mockReturnValue(store.getState().books.books);
    renderWithContext(<Card key={1} bookId={55}/>, store.getState());
    const bar = screen.getAllByTestId('progress-bar-circle');
    const percent = screen.getByText('20%');
    expect(bar[0]).toBeInTheDocument();
    expect(percent).toBeInTheDocument();
  });



  it('renders the card with correct totalChapters and readNumber',async () => {

    (useAppDispatch as jest.Mock).mockReturnValue(store.dispatch);
    (useAppSelector as jest.Mock).mockReturnValue(store.getState().books.books);
    (useAppSelector as jest.Mock).mockReturnValue(store.getState().books.books);
    renderWithContext(<Card key={1} bookId={55}/>, store.getState());

    // Assume your select element has a test id of 'select-element'
    const totalElement = screen.getByTestId<HTMLInputElement>('select-element-total');
    const readElement = screen.getByTestId<HTMLInputElement>('select-element-read');

    expect(totalElement.value).toBe("5");
    expect(readElement.value).toBe("1");
  });


  it('update total on the card',async () => {
    (useAppDispatch as jest.Mock).mockReturnValue(store.dispatch);
    (useAppSelector as jest.Mock).mockReturnValue(store.getState().books.books);
    (useAppSelector as jest.Mock).mockReturnValue(store.getState().books.books);

    renderWithContext(<Card key={1} bookId={55}/>, store.getState());
    const updateApi = jest.spyOn(bookAPI, 'updateBook');
    // Assume your select element has a test id of 'select-element'
    const totalElement = screen.getByTestId<HTMLInputElement>('select-element-total');
    const readElement = screen.getByTestId<HTMLInputElement>('select-element-read');
    const submit = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(totalElement, {target: {value: 20}});
    fireEvent.change(readElement, {target: {value: 10}});
    fireEvent.click(submit);

    expect(updateApi).toHaveBeenCalledTimes(1);  
  });
});