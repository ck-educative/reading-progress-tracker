import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import ProgressBar from './ProgressBar';
import ProgressForm from './ProgressForm';
import { selectBooks } from '../features/bookReader/bookSlice';

interface CardProps {
  key: number;
  bookId: number;
}

const Card: React.FC<CardProps> = ({ bookId }) => {
  const intialBookObject =  { id: 0, title: 'No book selected', author: '', progress: { totalChapters: 0, numberRead: 0 } };

  const books = useAppSelector(selectBooks);  
  const [book, setBook] = useState(intialBookObject);

  useEffect(() => {
    const foundBook = Array.isArray(books) ? books.find(book => book.id === bookId) : undefined;
    if (foundBook) {
      setBook(foundBook);
    } else {
      setBook(intialBookObject);
    }
  }, [books, bookId, intialBookObject]);

return (
        <div className="w-96 h-70 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 border-2 border-gray-300 flex flex-col justify-between">
            <div className="p-4 flex justify-between items-center">
                <div className="w-1/2">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold overflow-ellipsis overflow-hidden font-mono">Book ID: {book.id}</div> {/* Add this line */}    
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold overflow-ellipsis overflow-hidden font-mono">Name: {book.title}</div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold overflow-ellipsis overflow-hidden font-mono">By: {book.author}</div>
                </div>
                <ProgressBar bookId={book.id}/>
            </div>
            <div className="p-4">
                <ProgressForm book={book}/>
            </div>
        </div>
    );
};

export default Card;