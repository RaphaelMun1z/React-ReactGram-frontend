import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
}

// Get user details
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.profile(user, token)

        return data
    }
)

// Update user details
export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.updateProfile(user, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

// Get user details
export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id, thunkAPI) => {
        const data = await userService.getUserDetails(id)

        return data
    }
)

// Unsolicite Follow
export const unsoliciteFollow = createAsyncThunk(
    "user/unsolicitefollow",
    async (followedUser, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.unsoliciteFollow({ followedUserId: followedUser._id }, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

// Follow somebody
export const follow = createAsyncThunk(
    "user/follow",
    async (followedUser, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.follow({ followedUserId: followedUser._id }, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

// Unfollow somebody
export const unfollow = createAsyncThunk(
    "user/unfollow",
    async (unfollowedUserId, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.unfollow({ unfollowedUserId }, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

// Get user by name
export const getUser = createAsyncThunk(
    "user/search",
    async (username, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.getUser(username, token)

        return data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
                state.message = "Usuário atualizado com sucesso!"
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = {}
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload
            })
            .addCase(follow.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null

                state.user.followSolicitation.push({
                    id: action.payload.authUser._id,
                    name: action.payload.authUser.name,
                })

                state.message = action.payload.message
            })
            .addCase(follow.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(unsoliciteFollow.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null

                const indexToRemove = state.user.followSolicitation.findIndex(followerAsk => followerAsk.id === action.payload.authUser._id);

                if (indexToRemove !== -1) {
                    state.user.followSolicitation.splice(indexToRemove, 1);
                }

                state.message = action.payload.message
            })
            .addCase(unsoliciteFollow.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(unfollow.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null

                const indexToRemove = state.user.followers.findIndex(follower => follower.id === action.payload.authUser._id);

                if (indexToRemove !== -1) {
                    state.user.followers.splice(indexToRemove, 1);
                }

                state.message = action.payload.message
            })
            .addCase(unfollow.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user.search = action.payload
            })
    },
})

export const { resetMessage } = userSlice.actions
export default userSlice.reducer