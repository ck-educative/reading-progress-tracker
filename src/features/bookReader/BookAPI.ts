import { Book } from '../../types';

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

const mockBooks: Book[] = [
  { id: 1, title: 'Book 1', author: 'Author 1', genere: Genere.FICTION, progress: { totalChapters: 45, numberRead: 0 } },
  { id: 2, title: 'Book 2', author: 'Author 2', genere: Genere.SCIFI, progress: { totalChapters: 10, numberRead: 10 } },
  // Add more books as needed
];

const getBooks = async () => {
  return mockBooks;
};

const addBook = async (book: Book) => {
  // const duplicateBook = mockBooks.find((b) => b.id === book.id);
  // if (duplicateBook) {
  //     throw new Error('A book with this ID already exists');
  // }
  mockBooks.push(book);
  return book;
};

const updateBook = async (book: Book) => {
  const index = mockBooks.findIndex((b) => b.id === book.id);
  console.log('updating book', mockBooks[index]);
  if (index !== -1) {
    mockBooks[index] = book;
  }
  return book;
};

const removeBook = async (id: number) => {
  const index = mockBooks.findIndex((b) => b.id === id);
  if (index !== -1) {
    mockBooks.splice(index, 1);
  }
  return id;
};


const updateProgress = async (id: number, totalChapters: number, numberRead: number) => {
  const index = mockBooks.findIndex((b) => b.id === id);
  console.log('inside', id);
  if (index !== -1) {
    mockBooks[index].progress.totalChapters = totalChapters;
    mockBooks[index].progress.numberRead = numberRead;
  }
  return mockBooks[index];
};

const bookAPI = {
  getBooks,
  addBook,
  updateBook,
  removeBook,
  updateProgress
};

export default bookAPI;