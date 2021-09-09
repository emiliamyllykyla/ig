import { UpdateFollowData, UserData } from "../../features/profile/types";

const removeItem = (arr: string[], item: string) => {
  const filter = arr.filter((x) => x !== item);
  return filter;
};

const addItem = (arr: string[], item: string) => [...arr, item];

//update following list of current user
export const followingData = (
  user: UserData,
  profileId: string,
  isFollowing: boolean
): UpdateFollowData => ({
  id: user.uid,
  data: {
    following: isFollowing
      ? removeItem(user.following, profileId)
      : addItem(user.following, profileId),
  },
});

// update followers list of target user
export const followersData = (
  userId: string,
  profile: UserData,
  isFollowing: boolean
): UpdateFollowData => ({
  id: profile.uid,
  data: {
    followers: isFollowing
      ? removeItem(profile.followers, userId)
      : addItem(profile.followers, userId),
  },
});
