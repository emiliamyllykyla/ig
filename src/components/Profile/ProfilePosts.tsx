import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPostsByUserId,
  selectPosts,
  selectPostsStatus,
} from "../../features/posts/postsSlice";
import { selectUserById } from "../../features/users/usersSlice";
import Grid from "../Grid/Grid";

const ProfilePosts = ({ profileId }: { profileId: string }) => {
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostsStatus);
  const profile = useAppSelector(selectUserById(profileId));
  const dispatch = useAppDispatch();

  // Get posts
  useEffect(() => {
    if (profile) {
      dispatch(fetchPostsByUserId(profile.uid));
    }
  }, [dispatch, profile]);

  if (postsStatus === "Loading") return <span>Loading...</span>;
  if (postsStatus === "Error")
    return <span>Something went wrong while fetching posts. :(</span>;
  if (!posts) return <span>No posts</span>;
  if (posts?.length === 0) return <span>No posts yet!</span>;

  return <Grid items={posts} />;
};

export default ProfilePosts;
