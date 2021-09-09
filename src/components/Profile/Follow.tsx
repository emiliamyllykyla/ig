import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId } from "../../features/auth/authSlice";
import { selectUserById } from "../../features/users/usersSlice";
import { updateFollowData } from "../../features/profile/profileSlice";
import { UserData } from "../../features/profile/types";
import { followersData, followingData } from "./functions";
import "./Follow.css";

// check if current user follows this profile
const isFollowingCheck = (user: UserData, profileId: string) =>
  user?.following.find((item: string) => item === profileId) ? true : false;

const Follow = ({ profileId }: { profileId: string }) => {
  const dispatch = useAppDispatch();
  const authId = useAppSelector(selectAuthId);
  const user = useAppSelector(selectUserById(authId));
  const profile = useAppSelector(selectUserById(profileId));
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) setIsFollowing(isFollowingCheck(user, profileId));
  }, [user, profileId]);

  if (profileId === authId) return null;
  if (!user) return null;
  if (!profile) return null;

  const handleClick = () => {
    if (isFollowing === null) return null;
    dispatch(updateFollowData(followersData(user.uid, profile, isFollowing)));
    dispatch(updateFollowData(followingData(user, profileId, isFollowing)));
  };

  return (
    <button
      className={`follow-btn ${isFollowing && "unfollow"}`}
      onClick={handleClick}
    >
      {isFollowing ? "unfollow" : "follow"}
    </button>
  );
};

export default Follow;
