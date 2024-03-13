import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Book, BookState, addBook, removeBook, selectBooks } from './bookSlice';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Card from '../../components/Card';

const BookReadInput = () => {

const books = useAppSelector(selectBooks);
const dispatch = useAppDispatch(); // Initialize the dispatch function
const [id, setId] = useState(0); 
const [title, setTitle] = useState(''); // Add the missing setId function declaration
const [author, setAuthor] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const onRemove = () => {
    dispatch(removeBook(id));
};

const handleInputChange = (value: number) => {
  setErrorMessage('');
  setId(Number(value));
};

const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const existingBook = books.find((book) => book.id === id);
  if (existingBook) {
      setErrorMessage('A book with this ID already exists');
      return;
  }
  dispatch(addBook({ id, title, author, progress: {totalChapters:0, numberRead:0}} as Book));
  setId(id + 1);
  setTitle('');
  setAuthor('');
};

  useEffect(() => {
    // This function will be called whenever `books` changes.
    // You can perform side effects here.
    // For example, you can log the new list of books:
    console.log(books);
  }, [books]);

return (
  <div className="flex">
    <div className="w-1/2 items-left">
      <form onSubmit={onSubmit}>
      {errorMessage && <div className="error-message font-mono text-red-500">{errorMessage}</div>}
      <div className='p4'>
        <InputField label='Book ID' value={id.toString()} onChange={(e) => handleInputChange(Number(e.target.value))} placeholder="ID" required/>
        <InputField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required/>
        <InputField label='Author' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required/>
        <div className="px-20 inline-flex rounded-md items-center justify-center mt-auto" role="group">
          <Button buttonName='Add Book' type="submit"></Button>
          <div className='p4 gap-x-10'></div>
          <Button buttonName='Remove Book' onClick={onRemove}></Button>
        </div>
        </div>
      </form>
    </div>

    <div className="w-1/2 flex flex-wrap">
      {(books as Book[]).map((book: Book) => (
        <Card key={book.id} bookId={book.id}/>
      ))}
    </div>
  </div>
  
  );
};

export default BookReadInput;


