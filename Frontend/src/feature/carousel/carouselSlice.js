import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { carouselDetails } from "../../services/api";
import axios from "axios";


export const getCarousel  = createAsyncThunk("carousel/getCarousel", async () => {
    console.log("getCarousel");
    const response = await axios.get(carouselDetails.getCarousel);
    const data = response.data;
    console.log(data);
    return data;
  });
  
  const initialState = {
    data:[],
    loading:false,
    error:null,
  }

  const carouselSlice = createSlice({
    name:"carousel",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getCarousel.pending,(state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCarousel.fulfilled,(state, action)=>{
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getCarousel.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    }
  });


export default carouselSlice.reducer;