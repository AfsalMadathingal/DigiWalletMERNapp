import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/slice'

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
})