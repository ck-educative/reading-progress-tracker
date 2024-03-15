import React, { useState } from 'react';
import './styles/ProgressBar.Module.css';
import { useAppSelector } from '../app/hooks';
import { selectBooks } from '../features/bookReader/bookSlice';
import { Book } from '../types';

export interface BookId {
    bookId: number;
}

export interface Progress {
    numberRead: number;
    totalChapters: number;
}

const calculateProgress = (progress: Progress) => {
  return (progress.numberRead / progress.totalChapters) * 283;
}

const percentage = (progess: Progress) => {
  if (progess.totalChapters === 0) return 0; 
  const fraction = (progess.numberRead / progess.totalChapters) * 100;
  return  Math.floor(fraction);
}

const ProgressBar: React.FC<BookId> = ({bookId}) => {
  const books = useAppSelector(selectBooks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage]= useState('');
  const book = Array.isArray(books) ? books.find(book => book.id === bookId) : undefined;
    
  return(
    <>
      {/*TODO : create error component*/}
      {errorMessage && <text className='font-mono'> No book found</text>}
      {book && book.progress && 
        <svg className='progress' viewBox='0 0 100 100' data-test-id='progress-bar-svg'>
          <circle className='progress-background' cx='50' cy='50' r='45'></circle>
          <circle className='progress-bar' aria-valuenow={book.progress.numberRead} aria-valuemax={book.progress.totalChapters} style={{ strokeDasharray: `${calculateProgress(book.progress)} 283` }} cx='50' cy='50' r='45' data-testid='progress-bar-circle'></circle>
          <text className='font-mono' x='50' y='55' textAnchor='middle' fill='black' fontSize='15px' data-testid='progress-percent'>{percentage(book.progress)}%</text>
        </svg>
      }
    </>
  )
}

export default ProgressBar;