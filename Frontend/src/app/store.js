import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../feature/companyDetails/companySlice";
import carouselReducer from "../feature/carousel/carouselSlice";


export const store = configureStore({
    reducer: {
        company: companyReducer,
        carousel: carouselReducer,
       
    }
})