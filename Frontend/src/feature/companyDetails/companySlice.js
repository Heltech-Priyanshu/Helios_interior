import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { companyDetails } from "../../services/api";
import axios from "axios";

export const fetchUser = createAsyncThunk("company/fetchUser", async () => {
  const response = await axios.get(companyDetails.getCompany);
  const data = response.data;
  console.log(data);
  return data;
});

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});


export default companySlice.reducer;