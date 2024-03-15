import React, { useState } from 'react';
import { selectBooks, updateBook } from '../features/bookReader/bookSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Book, ProgressFormProps } from '../types';
import Button from './Button';


const ProgressForm: React.FC<ProgressFormProps> = (props: ProgressFormProps) => {

  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const books = useAppSelector(selectBooks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [book, setBook] = useState(props.book);
  const [totalChapters, setTotalChapters] = useState(props.book.progress.totalChapters);
  const [numberRead, setNumberRead] = useState(props.book.progress.numberRead);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((totalChapters || numberRead) < 0) {
      alert('No negative numbers allowed');
      return;
    }
    if (totalChapters <= 0 || numberRead < 0) {
      alert('Total chapters and number of chapters read must be greater than 0');
      return;
    }
  
    // Ensure totalChapters are always greater or equal to numberRead
    if (totalChapters < numberRead) {
      alert('Total chapters cannot be less than the number of chapters read');
      return;
    }

    const updated: Book = {
      id:props.book.id,
      author:props.book.author,
      title:props.book.title,
      genere: props.book.genere,
      progress:{
        totalChapters: totalChapters,
        numberRead: numberRead
      }
    }

    dispatch(updateBook(updated));
    setBook(updated);
    // console.log(`Total chapters: ${updated.progress.totalChapters}, Chapters read: ${updated.progress.numberRead}`);
  };


  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-full max-w-xs' data-testid='progress-form'>
      <div className='flex items-center space-x-2'>
        <label className='text-sm font-medium text-gray-700'>Total Chapters:</label>
        <input type='number' id='totalChapters' value={totalChapters} onChange={(e) => setTotalChapters(parseInt(e.target.value))}  className='border-2 border-gray-200 rounded-md p-2 w-full' data-testid='select-element-total' />
      </div>
      <div className='py-15 flex items-center space-x-2'>
        <label className='text-sm font-medium text-gray-700'>Chapters Read:</label>
        <input type='number' id='numberRead' value={numberRead} onChange={(e) => setNumberRead(parseInt(e.target.value))} className='border-2 border-gray-200 rounded-md p-2 w-full' data-testid='select-element-read'/>
      </div>
      <Button buttonName='Submit' type='submit'></Button>
      {/* <button type="submit" className="bg-slate-500 text-white rounded-md p-2 w-full font-mono">Submit</button> */}
    </form>
  );
};

export default ProgressForm;