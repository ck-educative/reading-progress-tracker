import React from 'react';
import { screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Card from '../Card';
import { useAppSelector } from '../../app/hooks';
import { renderWithProviders } from './test.utils';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Action } from '@reduxjs/toolkit';


// Create a mock store
const mockStore = configureMockStore();
jest.mock('../../app/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn()
  }));

// Mock data for the Card component
const mockBook = {
    id:1,
    title: 'Test Title',
    author: 'Test Author',
    progress: {
      totalChapters: 0,
      numberRead: 0
    }
};

const store = mockStore({
    books: [mockBook]
});

(useAppSelector as jest.Mock).mockReturnValue(mockBook);


describe('Card Component', () => {
    it('renders the card with the correct title and content', () => {
        //@ts-ignore
        const store: ToolkitStore<{ counter: CounterState; books: BookState; }, Action<any>> = mockStore({
            counter: {},
            books: [mockBook]
        });

        const { getByText } =renderWithProviders(<Card key={1} bookId={1}/>, {store})

        const titleElement = getByText(/Test Title/i);
        const authorElement = getByText(/Test Author/i);

        expect(titleElement).toBeInTheDocument();
        expect(authorElement).toBeInTheDocument();
    });
});