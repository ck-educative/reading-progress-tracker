import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/bookReader/bookSlice';
import BookReadInput from './features/bookReader//BookReadInput';

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="p-4 flex flex-col min-h-screen ">
        <div className="p-4 px-20 flex flex-col justify-center">
        <h1 className="text-blue-500 font-mono text-2xl mb-4 justify-center font-extrabold flex flex-col">Book Reading Progress Tracker App</h1>
        </div>
        <div className="justify-left items-stretch">
        <BookReadInput />
        </div>
      </div>
    </Provider>
  );
};

export default App;