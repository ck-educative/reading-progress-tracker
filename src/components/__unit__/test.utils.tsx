import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import type { AppStore, RootState, store } from '../../app/store'
// As a basic setup, import your same slice reducers
import bookReducer from '../../features/bookReader/bookSlice'
import { Provider } from 'react-redux'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store,
        ...renderOptions
    } = extendedRenderOptions


    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store as AppStore}>{children}</Provider>
      }


    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}