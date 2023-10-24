import {configureStore} from "@reduxjs/toolkit";

import {userReducer} from "@/redux/slices/usersSlice";


const store = configureStore({
    reducer: {
        users: userReducer,
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export type {
    RootState,
    AppDispatch,
}

export {
    store
}
