import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Card from '../Card';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { renderWithContext } from './test.utils';
import { thunk } from 'redux-thunk';
import bookAPI from '../../features/bookReader/BookAPI';
import { Book } from '../../types';
import { store } from '../../app/store';
import configureMockStore from 'redux-mock-store';
import { addBook } from '../../features/bookReader/bookSlice';


// Create a mock store



jest.mock('../../app/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn()
  }));

describe('Card Component', () => {
    const newBook: Book = {
        id: 0,
        title: 'Test',
        author: 'Test',
        genere: 'Test',
        progress: {
            totalChapters: 5,
            numberRead: 1
        }
    };
    it('renders the card with the correct title and content', () => {
        store.dispatch(addBook(newBook));
        const dispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(store.dispatch);

        renderWithContext(<Card key={1} bookId={1}/>);
        
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

//     it('renders the card with correct form, selects options, clicks submit, and validates store', () => {
        
//         store.dispatch(addBook(newBook));
//         (useAppDispatch as jest.Mock).mockReturnValue(store.dispatch);
//         renderWithContext(<Card key={1} bookId={1}/>);
    
//         // Assume your select element has a test id of 'select-element'
//         const totalElement = screen.getByTestId('select-element-total');
//         fireEvent.change(totalElement, { target: { value: '6' } });

//         const readElement = screen.getByTestId('select-element-read');
//         fireEvent.change(readElement, { target: { value: '7' } });
    
//         // Assume your submit button has a test id of 'submit-button'
//         const submitButton = screen.getByRole('button', {
//             name:/submit/i
//         });

//         fireEvent.click(submitButton);
    
//         // Check if the store has the correct state
//         const expectedState = { books: [{ id: 1, title: 'Updated Book', author: 'Author' }] };
//         expect(store.getState().books.books[0]).toEqual({});
//     });
});