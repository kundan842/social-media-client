import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axioClient } from "../../utils/client";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await axioClient.post("/user/getUserProfile", body);
            console.log('userProfile', response);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })
    },
});

export default postsSlice.reducer;