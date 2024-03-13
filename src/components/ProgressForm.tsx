import React, { useState } from 'react';
import { Book, selectBooks, updateBook } from '../features/bookReader/bookSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

interface ProgressFormProps {
  book: Book;
}

const ProgressForm: React.FC<ProgressFormProps> = (props: ProgressFormProps) => {

  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-xs">
      <div className="flex items-center space-x-2">
        <label htmlFor="totalChapters" className="text-sm font-medium text-gray-700 font-mono">Total Chapters:</label>
        <input type="number" id="totalChapters" value={totalChapters} onChange={(e) => setTotalChapters(parseInt(e.target.value))}  className="border-2 border-gray-200 rounded-md p-2 w-full" />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="numberRead" className="text-sm font-medium text-gray-700 font-mono">Chapters Read:</label>
        <input type="number" id="numberRead" value={numberRead} onChange={(e) => setNumberRead(parseInt(e.target.value))} className="border-2 border-gray-200 rounded-md p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full font-mono">Submit</button>
    </form>
  );
};

export default ProgressForm;

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
