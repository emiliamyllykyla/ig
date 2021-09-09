import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { RootState } from "../../app/store";
import { db } from "../../firebase";
import { UserData } from "../profile/types";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => doc.data() as UserData);
});

export const getUsersByIdList = createAsyncThunk(
  "users/getUsersByIdList",
  async (ids: string[]): Promise<UserData[]> => {
    const users = await Promise.all(
      ids.map(async (id) => {
        const docSnap = await getDoc(doc(db, "users", id));
        return docSnap.data() as UserData;
      })
    );
    return users.filter((x): x is UserData => x !== undefined);
  }
);

type State = {
  status: "Loading" | "Success" | "Error";
  error?: string;
  users?: UserData[];
};

const initialState: State = { status: "Loading" };

const addCase = <ThunkArg, ThunkConfig>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<UserData[], ThunkArg, ThunkConfig>
) => {
  builder.addCase(thunk.pending, (state) => {
    state.status = "Loading";
    state.error = undefined;
    state.users = undefined;
  });
  builder.addCase(thunk.fulfilled, (state, action) => {
    state.status = "Success";
    state.error = undefined;
    state.users = action.payload;
  });
  builder.addCase(thunk.rejected, (state) => {
    state.status = "Error";
    state.error = "Failed to fetch users";
    state.users = undefined;
  });
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCase(builder, getUsersByIdList);
    addCase(builder, getAllUsers);
  },
});

export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsers = (state: RootState) => state.users.users;

export const selectUserByUsername = (username: string) => (state: RootState) =>
  selectUsers(state)?.find((user) => user.username === username);

export const selectUserById = (id?: string) => (state: RootState) =>
  selectUsers(state)?.find((user) => user.uid === id);

export const selectFollowersCount = (profileId: string) => (state: RootState) =>
  selectUsers(state)?.find((user) => user.uid === profileId)?.followers.length;

export const selectFollowingCount = (profileId: string) => (state: RootState) =>
  selectUsers(state)?.find((user) => user.uid === profileId)?.following.length;

export const selectFollowing = (profileId: string | undefined) => (state: RootState) =>
  selectUsers(state)?.find((user) => user.uid === profileId)?.following;

export default usersSlice.reducer;
