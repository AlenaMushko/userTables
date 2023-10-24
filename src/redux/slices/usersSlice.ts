import {createAsyncThunk, createSlice, isFulfilled, isPending,} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IPagination, IUser, IUsersParams} from "@/interfaces";
import {userService} from "@/services";

const initialState: IUser = {
    results: [],
    count:0,
    next: '',
    previous: '',
    isLogin: false,
    isLoading:false,
    page: 1,
    theme: 'light'
};


const getAll = createAsyncThunk<IPagination, IUsersParams>(
    'usersSlice/getAll',
    async ({url, limit}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll({url,limit});
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err)
        }
    }
);
const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ?'dark': 'light' ;
        },
        resetPage: (state) => {
            state.page = 1
        },
        setIsLogin: (state, {payload}) => {
            state.isLogin = payload
        },
        setIsLoading: (state, {payload}) => {
            state.isLoading = payload
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, {payload}) => {
            state.count = payload.count
            state.results = payload.results
            state.next = payload.next
            state.previous = payload.previous
        })
        // .addCase(getMovieById.fulfilled, (state, {payload}) => {
        //     state.currentMovie = payload
        // })
        // .addCase(getSearchMovie.fulfilled, (state, {payload}) => {
        //     state.movies = payload.results
        //     state.page = payload.page
        //     state.total_pages = payload.total_pages
        // })
        // .addCase(getSoonMovies.fulfilled, (state, {payload}) => {
        //     state.movies = payload.results
        //     state.page = payload.page
        //     state.total_pages = payload.total_pages
        // })
        // .addCase(getAnimationMovies.fulfilled, (state, {payload}) => {
        //     state.movies = payload.results
        //     state.page = payload.page
        //     state.total_pages = payload.total_pages
        // })
        .addMatcher(isPending(), state => {
            state.isLoading = true
        })
        .addMatcher(isFulfilled(), (state, {payload}) => {
            state.isLoading = false
        })
})

const {reducer: userReducer, actions} = usersSlice;

const userAction = {
    ...actions,
    getAll
}

export {
    userAction,
    userReducer
}
