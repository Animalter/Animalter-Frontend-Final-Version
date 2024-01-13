import { configureStore } from '@reduxjs/toolkit'
import { animalApi } from './slices/apiSlice'

export default configureStore({

reducer: {
    [animalApi.reducerPath]: animalApi.reducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animalApi.middleware),

})
