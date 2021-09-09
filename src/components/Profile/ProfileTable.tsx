import { useAppSelector } from "../../app/hooks";
import { selectPostsCount } from "../../features/posts/postsSlice";
import {
  selectFollowersCount,
  selectFollowingCount,
} from "../../features/users/usersSlice";
import "./ProfileTable.css";

const ProfileTable = ({ profileId }: { profileId: string }) => {
  const postsCount = useAppSelector(selectPostsCount);
  const followingCount = useAppSelector(selectFollowingCount(profileId));
  const followersCount = useAppSelector(selectFollowersCount(profileId));

  return (
    <table className="profile-table">
      <thead>
        <tr>
          <th>following</th>
          <th>followers</th>
          <th>posts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{followingCount}</td>
          <td>{followersCount}</td>
          <td>{postsCount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProfileTable;
