import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";



// get all jobs 
export const getJobs = createAsyncThunk('jobs/getJobs', async (title, { rejectWithValue }) => {
    try {
        console.log('Params', title);

        let response = await api.get('/jobs', {
            params: {
                title
            }
        });
        console.log('get jobs Response :', response);
        return response.data;
    } catch (error) {
        console.log('get jobs Error : ', error);
        // return rejectWithValue(error.response.data.message)
    }
})

//get my posted jobs
export const getMyJobs = createAsyncThunk('jobs/getMyJobs', async (_, { rejectWithValue }) => {
    try {

        let response = await api.get('/my-jobs');
        console.log('get my jobs Response :', response);
        return response.data;
    } catch (error) {
        console.log('get my jobs Error : ', error);
        // return rejectWithValue(error.response.data.message)
    }
})

//add job
export const addJob = createAsyncThunk('jobs/addJob', async (data, { rejectWithValue }) => {
    try {

        console.log('job data to add :', data);

        let response = await api.post('/jobs', data);
        console.log('Add new job Response :', response);
        return response.data;
    } catch (error) {
        console.log('Add new job Error : ', error);
        return rejectWithValue(error.response.data.message)
    }
})

// delete job
export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id, { rejectWithValue }) => {
    try {

        console.log('ID to delete :', id);
        let response = await api.delete(`/jobs/${id}`);
        console.log('Delete a job  :', response);
        return response.data;
    } catch (error) {
        console.log('Delete job Error : ', error);
        return rejectWithValue(error.response.data.message)
    }
})

//edit job

export const editJob = createAsyncThunk('jobs/editJob', async ({ id, data }, { rejectWithValue }) => {
    console.log('new data to edit :', data);
    try {

        console.log('ID to edit :', id);

        let response = await api.put(`/jobs/${id}`, data);
        console.log('Edit a job  :', response);
        return response.data;
    } catch (error) {
        console.log('Edit job Error : ', error);
        return rejectWithValue(error.response.data.message)
    }
})




const JobSlice = createSlice({
    name: "jobs",
    initialState: {
        test: "hicham hnn",
        jobs: [],
        isLoading: false,
        error: null,
        my_jobs: {
            list: [],
            isLoading: false,
            error: null
        },
        add_job: {
            isLoading: false,
            error: null
        },
        delete_job: {
            isLoading: false,
            error: null
        },
        edit_job: {
            isLoading: false,
            error: null
        }

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                console.log('get jobs pending');
                state.isLoading = true
                state.error = null
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                console.log('get jobs fulfilled');
                state.isLoading = false
                state.error = null
                console.log('get jobs fulfilled : ', action);
                state.jobs = action.payload[0].data
            })
            .addCase(getJobs.rejected, (state, action) => {
                console.log('get jobs rejected');
                state.isLoading = false
                console.log('get jobs rejected : ', action);
                state.error = action.payload
            })

            //get my jobs
            .addCase(getMyJobs.pending, (state) => {
                console.log('get my jobs pending');
                state.my_jobs.isLoading = true
                state.my_jobs.error = null
            })
            .addCase(getMyJobs.fulfilled, (state, action) => {
                console.log('get my jobs fulfilled');
                state.my_jobs.isLoading = false
                state.my_jobs.error = null
                console.log('get my jobs fulfilled : ', action);
                state.my_jobs.list = action.payload.jobs
            })
            .addCase(getMyJobs.rejected, (state, action) => {
                console.log('get my jobs rejected');
                state.my_jobs.isLoading = false
                console.log('get my jobs rejected : ', action);
                state.my_jobs.error = action.payload
            })

            //add job
            .addCase(addJob.pending, (state) => {
                console.log('add new job pending');
                state.add_job.isLoading = true
                state.add_job.error = null
            })
            .addCase(addJob.fulfilled, (state, action) => {
                console.log('add new job fulfilled : ', action);
                state.add_job.isLoading = false
                state.add_job.error = null
                state.my_jobs.list.push(action.payload.offer);
            })
            .addCase(addJob.rejected, (state, action) => {
                console.log('add new job rejected : ', action);
                state.add_job.isLoading = false
                state.add_job.error = action.payload
            })

            //delete job
            .addCase(deleteJob.pending, (state) => {
                console.log('delete job pending');
                state.delete_job.isLoading = true
                state.delete_job.error = null
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                console.log('delete job fulfilled : ', action);
                state.delete_job.isLoading = false
                state.delete_job.error = null
                state.my_jobs.list = action.payload.jobs;
            })
            .addCase(deleteJob.rejected, (state, action) => {
                console.log('delete job rejected : ', action);
                state.delete_job.isLoading = false
                state.delete_job.error = action.payload
            })

            //edit job
            .addCase(editJob.pending, (state) => {
                console.log('edit job pending');
                state.edit_job.isLoading = true
                state.edit_job.error = null
            })
            .addCase(editJob.fulfilled, (state, action) => {
                console.log('edit job fulfilled : ', action);
                state.edit_job.isLoading = false
                state.edit_job.error = null
                state.my_jobs.list = action.payload.jobs;
            })
            .addCase(editJob.rejected, (state, action) => {
                console.log('edit job rejected : ', action);
                state.edit_job.isLoading = false
                state.edit_job.error = action.payload
            })

    }
})



export default JobSlice.reducer;