import { ChangeEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { history } from "../../history";
import { Timestamp } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId } from "../../features/auth/authSlice";
import { addPost, PostData } from "../../features/posts/postsSlice";
import { selectUserById } from "../../features/users/usersSlice";
import { uploadImage } from "../../features/image/imageSlice";
import AddPostModal from "./AddPostModal";

const makepost = (uid: string, url: string, caption: string): PostData => ({
  userId: uid,
  imageUrl: url,
  caption: caption,
  timestamp: Timestamp.fromDate(new Date()),
});

const AddPost = ({ closeModal }: { closeModal: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const dispatch = useAppDispatch();
  const authId = useAppSelector(selectAuthId);
  const user = useAppSelector(selectUserById(authId));
  useEffect(() => () => setFile(null), []);

  const handleCaptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCaption(e.target.value);
  };

  // New post
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user) return <Redirect to="/login" />;
    if (!file) return null;
    dispatch(uploadImage(file))
      .then((r) => {
        const url = (r.payload as { url: string }).url;
        return dispatch(addPost(makepost(user.uid, url, caption)));
      })
      .then(() => {
        history.push(`/profile/${user.username}`);
        closeModal();
      });
  };

  return (
    <AddPostModal
      setFile={(file) => setFile(file)}
      file={file}
      onCancel={closeModal}
      onCaptionChange={handleCaptionChange}
      onSubmit={handleSubmit}
      caption={caption}
    />
  );
};

export default AddPost;
