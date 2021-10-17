import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPosts,
  selectPosts,
  selectPostsStatus,
} from "../../features/posts/postsSlice";
import { getAllUsers } from "../../features/users/usersSlice";
import Grid from "../Grid/Grid";

const All = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostsStatus);
  useEffect(() => void dispatch(fetchPosts()), [dispatch]);
  useEffect(() => void dispatch(getAllUsers()), [dispatch]);

  if (postsStatus === "Loading") return <span>Loading...</span>;
  if (postsStatus === "Error")
    return <span>Something went wrong while fetching posts. :(</span>;
  if (!posts) return <span>No posts</span>;

  return <Grid items={posts} />;
};

export default All;
