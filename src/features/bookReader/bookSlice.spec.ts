import { configureStore } from '@reduxjs/toolkit';
import bookReducer, { addBook, removeBook, updateBook } from '../bookReader/bookSlice';
import bookAPI from './BookAPI';
import { Book } from '../../types';

describe('should return api responses', () => {
    const store = configureStore({ reducer: bookReducer });
    const newBook: Book = {
        id: 1,
        title: 'Test',
        author: 'Test',
        genere: 'Test',
        progress: {
            totalChapters: 0,
            numberRead: 0
        }
    }
    it('should add a book to the store', async () => {
        jest.spyOn(bookAPI, 'addBook').mockResolvedValueOnce(newBook);
        await store.dispatch(addBook(newBook));
        expect(store.getState().books).toEqual([newBook]);
    });
    it('should remove to the store', async () => {
        expect(store.getState().books).toEqual([newBook]);
        jest.spyOn(bookAPI, 'removeBook').mockResolvedValue(1)
        await store.dispatch(removeBook(1));
        expect(store.getState().books).toEqual([]);
    });
    it('should update book in the store', async () => {
        const updatedBook: Book = {
            id: 1,
            title: 'Updated',
            author: 'Updated',
            genere: 'Updated',
            progress: {
                totalChapters: 0,
                numberRead: 0
            }
        };

        //create data in the store
        jest.spyOn(bookAPI, 'addBook').mockResolvedValueOnce(newBook);
        await store.dispatch(addBook(newBook));
        jest.spyOn(bookAPI, 'updateBook').mockResolvedValueOnce(updatedBook);
        await store.dispatch(updateBook(updatedBook));

        expect(store.getState().books).toEqual([updatedBook]);
    });
});