import React, { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ProgressForm from './ProgressForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchBooks, selectBooks } from '../features/bookReader/bookSlice';
import { Genere } from '../features/bookReader/BookAPI';
import { Book } from '../types';

interface CardProps {
  key: number;
  bookId: number;
}

const Card: React.FC<CardProps> = ({ bookId }) => {

  const intialBookObject =  { id: 0, title: 'No book selected', author: '', genere: Genere.SCIFI, progress: { totalChapters: 0, numberRead: 0 } };
  const dispatch = useAppDispatch();
  const books: Book[] = useAppSelector(selectBooks);
  const book = Array.isArray(books) ? books.find(book => book.id === bookId) : intialBookObject;

  useEffect(() => {
    dispatch(fetchBooks);
  });
  
  return (
    <div className='card-info-container'>
      <div className='card-child-container'>
        <div className='w-1/2'>
          { book && <div className='textbold-card-el'>Book ID: {book.id}</div> }   
          { book && <div className='textbold-card-el'>Name: {book.title}</div> }
          { book && <div className='textnormal-card-el'>By: {book.author}</div>}
          { book && <div className='textnormal-card-el'>Genere: {book.genere}</div>}
        </div>
        { book && <ProgressBar bookId={book.id}/>}
      </div>
      <div className='card-child-container'>
        { book && <ProgressForm book={book}/>}
      </div>
    </div>
  );
};

export default Card;
