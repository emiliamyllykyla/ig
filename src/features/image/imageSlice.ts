import * as Toolkit from "@reduxjs/toolkit";
import * as Storage from "firebase/storage";
import { RootState } from "../../app/store";
import { storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

// Upload a file to Storage
export const uploadImage = Toolkit.createAsyncThunk(
  "image/upload",
  async (file: File) => {
    // Create unique filenames to avoid conflicts
    const filename = uuidv4() + file.name;
    const ref = Storage.ref(storage, filename);
    const url = await Storage.uploadBytes(ref, file).then(() =>
      Storage.getDownloadURL(ref)
    );
    return { url };
  }
);

// Delete a file from Storage
export const deleteImage = Toolkit.createAsyncThunk(
  "image/delete",
  async (filename: string) => {
    const ref = Storage.ref(storage, filename);
    await Storage.getDownloadURL(ref).then(() => Storage.deleteObject(ref));
    return { url: "" };
  }
);

type State = {
  status: "loading" | "success" | "error" | "not asked";
  error?: string;
  url?: string;
};

const initialState: State = { status: "not asked" };

const addCase = <ThunkArg, ThunkConfig>(
  builder: Toolkit.ActionReducerMapBuilder<State>,
  thunk: Toolkit.AsyncThunk<{ url: string }, ThunkArg, ThunkConfig>
) => {
  builder.addCase(thunk.pending, (state) => {
    state.status = "loading";
    state.error = undefined;
    state.url = undefined;
  });
  builder.addCase(thunk.fulfilled, (state, action) => {
    state.status = "success";
    state.error = undefined;
    if (action.payload.url === "") {
      state.url = undefined;
    } else {
      state.url = action.payload.url;
    }
  });
  builder.addCase(thunk.rejected, (state) => {
    state.status = "error";
    state.error = "Failed to upload";
    state.url = undefined;
  });
};

export const imageSlice = Toolkit.createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCase(builder, uploadImage);
    addCase(builder, deleteImage);
  },
});

export const selectImageStatus = (state: RootState) => state.image.status;

export default imageSlice.reducer;
