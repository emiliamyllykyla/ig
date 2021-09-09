import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { FaTimes } from "react-icons/fa";
import "./PostModal.css";
import {
  selectPostById,
  selectPostsStatus,
  selectUserIdByPostId,
} from "../../features/posts/postsSlice";
import { selectUserById } from "../../features/users/usersSlice";

interface PostModalProps {
  postId: string;
  onClose: () => void;
}

const PostModal = ({ postId, onClose }: PostModalProps) => {
  const post = useAppSelector(selectPostById(postId));
  const postsStatus = useAppSelector(selectPostsStatus);
  const userId = useAppSelector(selectUserIdByPostId(postId));
  const profile = useAppSelector(selectUserById(userId));

  if (postsStatus === "Loading") return <span>Loading...</span>;
  if (postsStatus === "Error") return <span>Failed to fetch post</span>;
  if (!profile) return <span>Profile not found </span>;
  if (!post) return <div>Post not found :( </div>;
  return (
    <div className="post-modal">
      <FaTimes className="modal-close" onClick={onClose} />
      <img className="post-modal-img" src={post?.data.imageUrl} alt="Post" />
      <div className="post-modal-text">
        <Link
          className="post-modal-username"
          onClick={onClose}
          to={`/profile/${profile?.username}`}
        >
          {profile?.username}
        </Link>
        <span className="timestamp">{post?.data.timestamp}</span>
        {post?.data.caption}
      </div>
    </div>
  );
};

export default PostModal;
