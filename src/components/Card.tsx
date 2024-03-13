import React, { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ProgressForm from './ProgressForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchBooks, selectBooks } from '../features/bookReader/bookSlice';
import { Genere } from '../features/bookReader/BookAPI';

interface CardProps {
  key: number;
  bookId: number;
}

const Card: React.FC<CardProps> = ({ bookId }) => {
  const intialBookObject =  { id: 0, title: 'No book selected', author: '', genere: Genere.SCIFI, progress: { totalChapters: 0, numberRead: 0 } };
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const book = Array.isArray(books) ? books.find(book => book.id === bookId) : intialBookObject;

  useEffect(() => {
    dispatch(fetchBooks);
  })
  
return (
        <div className="w-96 h-70 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 border-2 border-gray-300 flex-col justify-between">
            <div className="p-4 flex justify-between items-center">
                <div className="w-1/2">
                    { book && <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold overflow-ellipsis overflow-hidden font-mono">Book ID: {book.id}</div> }   
                    { book && <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold overflow-ellipsis overflow-hidden font-mono">Name: {book.title}</div> }
                    { book && <div className="uppercase tracking-wide text-sm text-indigo-500 overflow-ellipsis overflow-hidden font-mono font-medium">By: {book.author}</div>}
                    { book && <div className="uppercase tracking-wide text-sm text-indigo-500 overflow-ellipsis overflow-hidden font-mono font-medium">Genere: {book.genere}</div>}
                </div>
                { book && <ProgressBar bookId={book.id}/>}
            </div>
            <div className="p-4">
              { book && <ProgressForm book={book}/>}
            </div>
        </div>
    );
};

export default Card;
