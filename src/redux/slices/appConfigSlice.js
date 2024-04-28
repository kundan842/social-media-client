import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axioClient } from '../../utils/client';


export const getMyInfo = createAsyncThunk(
    "user/getMyInfo",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await axioClient.get("/user/getMyInfo");
            console.log('inside get my info ', response)
            return response.result;
            
        } catch (error) {
            console.log('get my info error', error)
            return Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
);


export const updateMyProfile = createAsyncThunk(
    "user/updateMyProfile",
    async (body, thunkAPI) => {
        try {
            console.log('inside updateprofile actions')
            thunkAPI.dispatch(setLoading(true));
            const response = await axioClient.put("/user/", body);
            console.log('after updating in thunk', response)
            return response.result;
        } catch (error) {
           
            return Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

const appConfigSlice = createSlice({
    name:'appConfigSlice',
    initialState:
    {
        isLoading: false,
        myProfile: null
    },
    reducers:
    {
        setLoading : (state, action) =>
        {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            console.log(action.payload)
            state.myProfile = action.payload.user;
        })
        .addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        });}

})

export default appConfigSlice.reducer;
export const {setLoading} = appConfigSlice.actions