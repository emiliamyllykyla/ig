import * as Toolkit from "@reduxjs/toolkit";
import * as FS from "firebase/firestore";
import { RootState } from "../../app/store";
import { db } from "../../firebase";

export type Post = { id: string; data: FS.DocumentData };

export type PostData = {
  userId: string;
  imageUrl: string;
  caption: string;
  timestamp: FS.Timestamp;
};

const formatTimestamp = (timestamp: FS.Timestamp) => {
  return timestamp.toDate().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const addPost = Toolkit.createAsyncThunk(
  "profile/addPost",
  async (data: PostData) => {
    // Firestore auto-generates an id
    await FS.addDoc(FS.collection(db, "posts"), data);
  }
);

export const fetchPostsByUserIdList = Toolkit.createAsyncThunk(
  "profile/fetchPostsByUserIdList",
  async (users: string[] | undefined) => {
    const q = FS.query(
      FS.collection(db, "posts"),
      FS.where("userId", "in", users),
      FS.orderBy("timestamp", "desc")
    );
    const querySnapshot = await FS.getDocs(q);
    const posts = querySnapshot.docs.map((doc): Post => {
      const data: FS.DocumentData = {
        ...doc.data(),
        timestamp: formatTimestamp(doc.data().timestamp),
      };
      return {
        id: doc.id,
        data: data,
      };
    });
    return posts;
  }
);

export const fetchPostsByUserId = Toolkit.createAsyncThunk(
  "profile/fetchPostsByUserId",
  async (userId: string) => {
    const q = FS.query(
      FS.collection(db, "posts"),
      FS.where("userId", "==", userId),
      FS.orderBy("timestamp", "desc")
    );
    const querySnapshot = await FS.getDocs(q);
    const posts = querySnapshot.docs.map((doc): Post => {
      const data: FS.DocumentData = {
        ...doc.data(),
        timestamp: formatTimestamp(doc.data().timestamp),
      };
      return {
        id: doc.id,
        data: data,
      };
    });
    return posts;
  }
);

export const fetchPosts = Toolkit.createAsyncThunk("posts/fetch", async () => {
  const q = FS.query(
    FS.collection(db, "posts"),
    FS.orderBy("timestamp", "desc")
  );
  const querySnapshot = await FS.getDocs(q);
  const posts = querySnapshot.docs.map((doc): Post => {
    const data: FS.DocumentData = {
      ...doc.data(),
      timestamp: formatTimestamp(doc.data().timestamp),
    };
    return {
      id: doc.id,
      data,
    };
  });
  return posts;
});

type State = {
  status: "Loading" | "Success" | "Error";
  error?: string;
  posts?: Post[];
};

const initialState: State = { status: "Loading" };

const addCase = <ThunkArg, ThunkConfig>(
  builder: Toolkit.ActionReducerMapBuilder<State>,
  thunk: Toolkit.AsyncThunk<Post[], ThunkArg, ThunkConfig>
) => {
  builder.addCase(thunk.pending, (state) => {
    state.status = "Loading";
    state.error = undefined;
    state.posts = undefined;
  });
  builder.addCase(thunk.fulfilled, (state, action) => {
    state.status = "Success";
    state.error = undefined;
    state.posts = action.payload;
  });
  builder.addCase(thunk.rejected, (state) => {
    state.status = "Error";
    state.error = "Failed to fetch posts";
    state.posts = undefined;
  });
};

export const postsSlice = Toolkit.createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCase(builder, fetchPosts);
    addCase(builder, fetchPostsByUserId);
    addCase(builder, fetchPostsByUserIdList);
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.status = "Success";
      state.error = undefined;
    });
    builder.addCase(addPost.pending, (state, action) => {
      state.status = "Loading";
      state.error = undefined;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.status = "Error";
      state.error = "Failed to add a new post";
    });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsCount = (state: RootState) => state.posts.posts?.length;

export const selectPostById = (postId: string) => (state: RootState) =>
  selectPosts(state)?.find((post) => post.id === postId);

export const selectUserIdByPostId = (postId: string) => (state: RootState) =>
  selectPostById(postId)(state)?.data?.userId;

export default postsSlice.reducer;
