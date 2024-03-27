import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import bookReducer from '../features/bookReader/bookSlice';
import bookAPI from '../features/bookReader/BookAPI';

const rootReducer = {
  counter: counterReducer,
  books: bookReducer
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: bookAPI,
      },
      serializableCheck: false,
    }),
});

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;