import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import systemService from "../services/systemService";
import { useEffect } from "react";

const initialState = {
    systems: [],
    system: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// Report an user
export const reportUser = createAsyncThunk(
    "system/userReport",
    async (reportData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await systemService.reportUser(reportData, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        resetSystemMessage: (state) => {
            state.message = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(reportUser.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(reportUser.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.report = action.payload
                state.message = "Denúncia realizada com sucesso!"
            })
            .addCase(reportUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.report = {}
            })
    },
})

export const { resetSystemMessage } = systemSlice.actions
export default systemSlice.reducer