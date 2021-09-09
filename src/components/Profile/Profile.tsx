import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProfileStatus } from "../../features/profile/profileSlice";
import {
  getAllUsers,
  selectUserByUsername,
  selectUsersStatus,
} from "../../features/users/usersSlice";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import "./Profile.css";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(selectUsersStatus);
  const profileStatus = useAppSelector(selectProfileStatus);
  const profile = useAppSelector(selectUserByUsername(username));

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, profileStatus]);

  if (usersStatus === "Loading") return <div>Loading...</div>;
  if (profileStatus === "Loading") return <div>Loading...</div>;
  if (!profile) return <div>Not found</div>;

  return (
    <div>
      <ProfileHeader profileId={profile.uid} />
      <ProfilePosts profileId={profile.uid} />
    </div>
  );
};

export default Profile;
