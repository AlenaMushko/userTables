import {createAsyncThunk, createSlice, isFulfilled, isPending,} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IPagination, IResult, IUser, IUsersParams} from "@/interfaces";
import {userService} from "@/services";
import {RootState} from "@/redux/store";

const initialState: IUser = {
    results: [],
    count: 0,
    next: '',
    previous: '',
    currentUser: null,
    isLogin: false,
    isLoading: false,
    limit: 8,
};


const getAll = createAsyncThunk<IPagination, IUsersParams>(
    'usersSlice/getAll',
    async ({url, limit}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll({url, limit});
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.message)
        }
    }
);

const getUserById = createAsyncThunk<IResult, { id: number }>(
    'usersSlice/getUserById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.message)
        }
    }
);

// В постмані бачу, що арі може виконувати лише GET операції. Тому видалення і апдейт юзера виконую гіпотетично.
// то спеціально щоб помучити того хто виконує тестове?   :(
const deleteUser = createAsyncThunk<void, { id: number }>(
    'usersSlice/deleteUser',
    async ({id}, {rejectWithValue, dispatch, getState}) => {
        try {
            await userService.deleteById(id);
            const {users: {limit}} = getState() as RootState;
            dispatch(getAll({url: null, limit: limit}))
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message)
        }
    }
)

const update = createAsyncThunk<void, { id: number, user: IResult }>(
    'carsSlice/update',
    async ({id, user}, {rejectWithValue}) => {
        try {
            await userService.updateById(id, user)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.message)
        }
    }
)

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        setLimit: (state, {payload}) => {
            state.limit = payload
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
        .addCase(getUserById.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
        .addCase(update.fulfilled, (state, {payload}) => {
            state.currentUser = null
            state.isLoading = false
        })

        .addCase(deleteUser.rejected, (state, {error}) => {
            state.isLoading = false;
        })

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
    getAll,
    deleteUser,
    getUserById,
    update
}

export {
    userAction,
    userReducer
}
