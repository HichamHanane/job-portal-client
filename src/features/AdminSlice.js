import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "sonner";

export const getUsers = createAsyncThunk('admin/getUsers', async (_, { rejectWithValue }) => {
    try {
        let response = await api.get('/users');
        console.log("Get Users Response :", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while fetching users : ", error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch users.';
        return rejectWithValue(errorMessage);
    }
});

// Add user
export const addUser = createAsyncThunk(
    'admin/addUser',
    async (userData, { rejectWithValue }) => {
        try {
            console.log('Sending user data to API:', userData);
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error.response.data);
            const errorMessage = error.response.data.message || 'Failed to create user.';
            return rejectWithValue(errorMessage);
        }
    }
);

//delete user

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/users/${userId}`);
            console.log('delete user response :', response);

            return { deleted_user_id: userId };

        } catch (error) {
            console.error('Error deleting user:', error.response.data);
            const errorMessage = error.response.data.message || 'Failed to delete user.';
            return rejectWithValue(errorMessage);
        }
    }
);

//get all jobs
export const getAdminAllJobs = createAsyncThunk('jobs/getAdminAllJobs', async (_, { rejectWithValue }) => {
    try {
        let response = await api.get('/jobs');
        console.log('get admin jobs Response :', response.data);
        return response.data;
    } catch (error) {
        console.log('get admin jobs Error : ', error);
        return rejectWithValue(error.response.data.message || 'Failed to fetch jobs for admin.')
    }
});



const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: {
            list: [],
            isLoading: false,
            error: null,
            test: "hnn"
        },
        addUser: {
            isLoading: false,
            error: null,
        },
        delete_user: {
            isLoading: false,
            error: null,
        },
        admin_all_jobs: {
            list: [],
            isLoading: false,
            error: null,
            
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get Users 
            .addCase(getUsers.pending, (state) => {
                state.users.isLoading = true;
                state.users.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                console.log("get users fulfilled", action);

                state.users.isLoading = false;
                state.users.list = action.payload[0];
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.users.isLoading = false;
                state.users.error = action.payload;
            })

            //add user
            .addCase(addUser.pending, (state) => {
                state.addUser.isLoading = true;
                state.addUser.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.addUser.isLoading = false;
                if (action.payload.user) {
                    state.users.list.push(action.payload.user);
                }
            })
            .addCase(addUser.rejected, (state, action) => {
                state.addUser.isLoading = false;
                state.addUser.error = action.payload;
            })

            //delete user
            .addCase(deleteUser.pending, (state) => {
                state.delete_user.isLoading = true;
                state.delete_user.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.delete_user.isLoading = false;
                const deletedId = action.payload.deleted_user_id;
                state.users.list = state.users.list.filter(user => user.id !== deletedId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.delete_user.isLoading = false;
                state.delete_user.error = action.payload;
            })

            // get all jobs 
            .addCase(getAdminAllJobs.pending, (state) => {
                console.log('get admin jobs pending');
                state.admin_all_jobs.isLoading = true
                state.admin_all_jobs.error = null
            })
            .addCase(getAdminAllJobs.fulfilled, (state, action) => {
                console.log('get admin jobs fulfilled : ', action);
                state.admin_all_jobs.isLoading = false
                state.admin_all_jobs.error = null
                state.admin_all_jobs.list = action.payload[0].data; 
                console.log('list after fulfilled : ',state.admin_all_jobs.list);
                
            })
            .addCase(getAdminAllJobs.rejected, (state, action) => {
                console.log('get admin jobs rejected : ', action);
                state.admin_all_jobs.isLoading = false
                state.admin_all_jobs.error = action.payload
            })
    }
});

export default AdminSlice.reducer;