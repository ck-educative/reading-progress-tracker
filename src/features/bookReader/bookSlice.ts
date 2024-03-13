import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import bookAPI from './BookAPI';
import { RootState, AppThunk } from '../../app/store';

// ... your existing code ...

export type Book = {
    id: number;
    title: string;
    author: string;
    progress: {
        totalChapters: number;
        numberRead: number;
    }
    // Add any other properties you need for a book
};

export interface BookState {
    books: Book[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BookState = {
    books: [],
    status: 'idle',
    error: null
};

// Async Thunk actions
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await bookAPI.getBooks();
    return response;
});

export const addBook = createAsyncThunk('books/addBook', async (book: Book) => {
    const response = await bookAPI.addBook(book);
    return response;
});

export const updateBook = createAsyncThunk('books/updateBook', async (book: Book) => {
    const response = await bookAPI.updateBook(book);
    return response;
});

export const removeBook = createAsyncThunk('books/removeBook', async (id: number) => {
    await bookAPI.removeBook(id);
    return id;
});


export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        // addBook: (state, action: PayloadAction<Book>) => {
        //     state.books.push(action.payload);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.status = 'succeeded';
                state.books.push(action.payload);
            })
            .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const index = state.books.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                    state.books[index].progress.totalChapters = action.payload.progress.totalChapters;
                    state.books[index].progress.numberRead = action.payload.progress.numberRead;
                }
            })
            .addCase(removeBook.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.books.findIndex(book => book.id === action.payload);
                if (index !== -1) {
                    state.books.splice(index, 1);
                }
            })
    },
});

// export const { addBook } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;


export default booksSlice.reducer;

// ... your existing code ...