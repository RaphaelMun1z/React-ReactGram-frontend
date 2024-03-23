import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import systemService from "../services/systemService";

const initialState = {
    reports: [],
    report: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

    }
})

export default systemSlice.reducer
