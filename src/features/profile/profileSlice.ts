import { doc } from "@firebase/firestore";
import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { setDoc, updateDoc } from "firebase/firestore";
import { RootState } from "../../app/store";
import { db } from "../../firebase";
import { UserData, UpdateFollowData } from "./types";

type State = {
  status?: "Error" | "Success" | "Loading";
  error?: string;
};

export const createUser = createAsyncThunk(
  "profile/createUser",
  async (data: UserData) => {
    await setDoc(doc(db, "users", data.uid), data);
  }
);

export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (data: UserData) => {
    await updateDoc(doc(db, "users", data.uid), data);
  }
);

export const updateFollowData = createAsyncThunk(
  "profile/updateFollowData",
  async (data: UpdateFollowData) => {
    await updateDoc(doc(db, "users", data.id), data.data);
  }
);

const initialState: State = {};

const addCase = <ThunkArg, ThunkConfig>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<void, ThunkArg, ThunkConfig>,
  error: string
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = "Loading";
      state.error = undefined;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = "Success";
      state.error = undefined;
    })
    .addCase(thunk.rejected, (state) => {
      state.status = "Error";
      state.error = error;
    });
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCase(builder, createUser, "Failed to create user");
    addCase(builder, updateUser, "Failed to update user");
    addCase(builder, updateFollowData, "Failed to update follow data.");
  },
});

export const selectProfileStatus = (state: RootState) => state.profile.status;
export default profileSlice.reducer;
