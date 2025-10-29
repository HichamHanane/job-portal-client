import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { toast } from "sonner";



export const getEmpApplications = createAsyncThunk('application/getEmpApplications', async (_, { rejectWithValue }) => {
    try {
        let response = await api.get('/my-job-applications');
        console.log("get employer applications response :", response);
        return response.data;
    } catch (error) {
        console.log("Error while getting the employer applications : ", error);
        return rejectWithValue(error.response.data.message)
    }
})



export const updateApplicationStatus = createAsyncThunk('application/updateApplicationStatus', async ({ id, status }, { rejectWithValue }) => {
    try {
        let response = await api.put(`/update-applications-status/${id}`, { status });
        console.log("get employer applications response :", response);
        return response.data;
    } catch (error) {
        console.log("Error while getting the employer applications : ", error);
        return rejectWithValue(error.response.data.message)
    }
})


export const getUserApplications = createAsyncThunk('application/getUserApplications', async (_, { rejectWithValue }) => {
    try {
        let response = await api.get('/my-applications');
        console.log("get employer applications response :", response);
        return response.data;
    } catch (error) {
        console.log("Error while getting the employer applications : ", error);
        return rejectWithValue(error.response.data.message)
    }
})


export const deleteApplication = createAsyncThunk('application/deleteApplication', async (id, { rejectWithValue }) => {
    console.log('Application ID :', id);

    try {
        let response = await api.delete(`/user-application/${id}`);
        console.log("delete a, application response :", response);
        return {
            message: response.data.message,
            id
        };
    } catch (error) {
        console.log("Error while deleting an application : ", error);
        return rejectWithValue(error.response.data.message)
    }
})

export const applyForJob = createAsyncThunk(
    'application/applyForJob',
    async (jobId, { rejectWithValue }) => {
        try {
            toast.loading('Submitting application...', { id: 'applyToast' });

            let response = await api.post(`/applications/${jobId} `);
            console.log('Apply to a job response : ', response);
            toast.dismiss('applyToast');
            return response.data;
        }
        catch (error) {
            toast.dismiss('applyToast');
            console.log('Apply Job Error : ', error);
            const errorMessage = error.response?.data?.message || error.message;
            if (errorMessage && errorMessage.includes('Integrity constraint violation: 1062 Duplicate entry')) {
                return rejectWithValue('DUPLICATE_APPLICATION_ERROR');
            }
            return rejectWithValue(errorMessage || 'Application failed due to a server error.');
        }
    }
);




const ApplicationsSlice = createSlice({
    name: 'applications',
    initialState: {
        list: [],
        isLoading: false,
        error: null,
        test: 'hnnn',
        update_application: {
            isLoading: false,
            error: null
        },
        user_application: {
            list: [],
            isLoading: false,
            error: null
        },
        delete_application: {
            isLoading: false,
            error: null
        },
        apply_job: {
            isLoading: false,
            error: null,
            success: null,
        },


    },
    reducers: {
        resetApplyStatus: (state) => {
            state.apply_job = { isLoading: false, error: null, success: null };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmpApplications.pending, (state) => {
                console.log('get employer applications pending');
                state.isLoading = true
                state.error = null
            })
            .addCase(getEmpApplications.fulfilled, (state, action) => {
                console.log('get employer applications fulfilled : ', action);
                state.isLoading = false
                state.error = null
                state.list = action.payload
            })
            .addCase(getEmpApplications.rejected, (state, action) => {
                console.log('get employer applications rejected : ', action);
                state.isLoading = false
                state.error = action.payload
            })

            //update application status
            .addCase(updateApplicationStatus.pending, (state) => {
                console.log('update status applications pending');
                state.update_application.isLoading = true
                state.update_application.error = null
            })
            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                console.log('update status applications fulfilled : ', action);
                state.update_application.isLoading = false
                state.update_application.error = null
                state.list = action.payload.applications;

            })
            .addCase(updateApplicationStatus.rejected, (state, action) => {
                console.log('update status applications rejected : ', action);
                state.update_application.isLoading = false
                state.update_application.error = action.payload
            })

            //get user applications
            .addCase(getUserApplications.pending, (state) => {
                console.log('get user applications pending');
                state.user_application.isLoading = true
                state.user_application.error = null
            })
            .addCase(getUserApplications.fulfilled, (state, action) => {
                console.log('get user applications fulfilled : ', action);
                state.user_application.isLoading = false
                state.user_application.error = null
                state.user_application.list = action.payload
            })
            .addCase(getUserApplications.rejected, (state, action) => {
                console.log('get user applications rejected : ', action);
                state.user_application.isLoading = false
                state.user_application.error = action.payload
            })

            //delete application
            .addCase(deleteApplication.pending, (state) => {
                console.log('get user applications pending');
                state.delete_application.isLoading = true
                state.delete_application.error = null
                toast.loading('Deleting...')
            })
            .addCase(deleteApplication.fulfilled, (state, action) => {
                console.log('get user applications fulfilled : ', action);
                state.delete_application.isLoading = false
                state.delete_application.error = null
                state.user_application.list = state.user_application.list.filter((app) => app.id != action.payload.id);
                toast.dismiss();

            })
            .addCase(deleteApplication.rejected, (state, action) => {
                console.log('get user applications rejected : ', action);
                state.delete_application.isLoading = false
                state.delete_application.error = action.payload
            })

            //apply for a job

            .addCase(applyForJob.pending, (state) => {
                state.apply_job.isLoading = true;
                state.apply_job.error = null;
                state.apply_job.success = null;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.apply_job.isLoading = false;
                state.apply_job.success = action.payload.message;
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.apply_job.isLoading = false;
                state.apply_job.error = action.payload;
            });
    }
});

export const { resetApplyStatus } = ApplicationsSlice.actions;
export default ApplicationsSlice.reducer;