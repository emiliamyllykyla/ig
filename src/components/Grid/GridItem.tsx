import { useAppSelector } from "../../app/hooks";
import {
  Post,
  selectPostById,
  selectUserIdByPostId,
} from "../../features/posts/postsSlice";
import { selectUserById } from "../../features/users/usersSlice";

const GridItem = ({ item, setOpen }: { item: Post; setOpen: () => void }) => {
  const post = useAppSelector(selectPostById(item.id));
  const userId = useAppSelector(selectUserIdByPostId(item.id));
  const profile = useAppSelector(selectUserById(userId));

  return (
    <div key={item.id} className="grid-item" onClick={setOpen}>
      <img src={item.data.imageUrl} alt="post" />
      <p className="grid-item-preview">
        {profile?.username}
        <span className="timestamp">{post?.data.timestamp}</span>
      </p>
    </div>
  );
};

export default GridItem;
