import React, { useState } from 'react';
import './styles/ProgressBar.Module.css';
import { useAppSelector } from '../app/hooks';
import { selectBooks } from '../features/bookReader/bookSlice';
import { Book } from '../types';
import  Error from './Error'; 

export interface ProgressBarProps {
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

const ProgressBar: React.FC<ProgressBarProps> = ({bookId}) => {
  const books:Book[] = useAppSelector(selectBooks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage]= useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showError, setShowError] = useState(false);
  const book: Book | undefined = Array.isArray(books) ? books.find(book => book.id === bookId) : undefined;
    
  return(
    <>
      {showError && <Error message={errorMessage} onClose={() => setShowError(false)} />}
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