import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import bookReducer, { Book, BookState, addBook, removeBook } from './bookSlice';

describe('book reducer', () => {
    const initialState: BookState = {
        books: [],
        status: 'idle',
        error: null,
    };

    it('should handle initial state', () => {
        expect(bookReducer(undefined, { type: 'unknown' } as AnyAction)).toEqual({
            books: [],
            status: 'idle',
            error: null,
        });
    });

    // TODO: fix typing for these tests
    // it('should handle removeBook', () => {
    //     const actual = bookReducer(initialState, removeBook(1));
    //     expect(actual.books).toEqual([]);
    // });


    // it('should handle addBook', () => {
    //     const actual = bookReducer(initialState, addBook({
    //         id: 1, title: 'Test Book', author: 'Test Author',
    //         progress: {
    //             totalChapters: 0,
    //             numberRead: 0
    //         }
    //     }) as unknown as AsyncThunkAction<Book, Book, AsyncThunkConfig>);
    //     expect(actual.books).toEqual([{ id: 1, title: 'Test Book', author: 'Test Author' }]);
    // });

});
