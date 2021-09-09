import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId } from "../../features/auth/authSlice";
import {
  fetchPostsByUserIdList,
  selectPosts,
  selectPostsStatus,
} from "../../features/posts/postsSlice";
import { selectFollowing } from "../../features/users/usersSlice";
import Grid from "../Grid/Grid";

const makeList = (
  authId: string | undefined,
  following: string[] | undefined
) => (!authId ? [] : following ? [...following, authId] : [authId]);

const Feed = () => {
  const dispatch = useAppDispatch();
  const authId = useAppSelector(selectAuthId);
  const following = useAppSelector(selectFollowing(authId));
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostsStatus);

  useEffect(
    () => void dispatch(fetchPostsByUserIdList(makeList(authId, following))),
    [dispatch, following, authId]
  );

  if (!authId) return <Redirect to="/login" />;
  if (postsStatus === "Loading") return <span>Loading...</span>;
  if (postsStatus === "Error")
    return <span>Something went wrong while fetching posts. :(</span>;
  if (!posts) return <span>No posts</span>;

  return <Grid items={posts} />;
};

export default Feed;
