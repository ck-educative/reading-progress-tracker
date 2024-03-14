
export const enum Genere {
    STORY = 'story',
    FICTION = 'fiction',
    NONFICTION = 'nonfiction',
    MYSTERY = 'mystery',
    FANTASY = 'fantasy',
    SCIFI = 'sci-fi',
    BIOGRAPHY = 'biography',
    HISTORY = 'history',
    POETRY = 'poetry'
}
export type Book = {
    id: number;
    title: string;
    author: string;
    genere: string;
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

interface ProgressFormProps {
    book: Book;
}


interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
}


interface DropdownProps {
    label: string;
    onSelect: (selectedOption: Genere) => void;
}