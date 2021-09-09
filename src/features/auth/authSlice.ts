import { signInWithPopup } from "@firebase/auth";
import { Firestore, doc, getDoc } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import { RootState } from "../../app/store";
import { auth, db } from "../../firebase";
import { history } from "../../history";

const provider = new GoogleAuthProvider();

export async function getUser(db: Firestore, uid: string) {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.data();
}

export const login = createAsyncThunk("user/login", async () => {
  const result = await signInWithPopup(auth, provider);
  const userData = await getUser(db, result.user.uid);
  if (!userData) {
    history.push("/register");
    return undefined;
  } else {
    const data = { authId: result.user.uid, username: userData?.username };
    return data;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  await signOut(auth);
});

const initialState: {
  authId?: string;
  username?: string;
} = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, action) => {
      state.authId = action.payload.authId;
      state.username = action.payload.username;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.authId = action.payload.authId;
        state.username = action.payload.username;
      }
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.authId = undefined;
      state.username = undefined;
    });
  },
});

export const selectAuthId = (state: RootState) => state.auth.authId;
export const selectAuthUsername = (state: RootState) => state.auth.username;

export const { update } = authSlice.actions;
export default authSlice.reducer;
