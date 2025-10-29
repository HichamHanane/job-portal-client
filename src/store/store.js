import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from '../features/AuthSlice'
import JobSlice from '../features/JobSlice'
import ApplicationsSlice from '../features/ApplicationsSlice'
import AdminSlice from '../features/AdminSlice'


const store = configureStore({
    reducer: {
        auth: AuthSlice,
        admin: AdminSlice,
        jobs: JobSlice,
        applications: ApplicationsSlice
    }
});

export default store;