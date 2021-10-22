import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Redirect } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId, update } from "../../features/auth/authSlice";
import { selectUserById } from "../../features/users/usersSlice";
import { updateUser } from "../../features/profile/profileSlice";
import { UserData } from "../../features/profile/types";
import { history } from "../../history";
import "./EditModal.css";
import DropZone from "../Dropzone/DropZone";
import placeholder from "../../images/placeholder_profile.png";
import { uploadImage } from "../../features/image/imageSlice";

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type FormData = {
  username: string;
  email: string;
  bio: string;
  imageUrl: string;
};

const makeInitialData = (user: UserData | undefined) => ({
  username: user?.username || "",
  email: user?.email || "",
  bio: user?.bio || "",
  imageUrl: user?.imageUrl || "",
});

const makedata = (
  uid: string,
  user: UserData,
  form: FormData,
  imageUrl?: string
) => {
  const data = {
    uid: uid,
    following: user.following,
    followers: user.followers,
    ...form,
  };
  return imageUrl ? { ...data, imageUrl: imageUrl } : data;
};

const EditModal = ({ onClose }: { onClose: () => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useAppDispatch();
  const authId = useAppSelector(selectAuthId);
  const user = useAppSelector(selectUserById(authId));
  const initialData = makeInitialData(user)
  const [form, setForm] = useState<FormData>(initialData);

  const handleSubmit = (e: React.SyntheticEvent) => {
    if (!authId || !user) return <Redirect to="/login" />;
    e.preventDefault();

    const makeData = async () => {
      // If no image file, make data with old profile image url
      if (!imageFile) {
        return makedata(authId, user, form);
      } else {
        // Else upload new image to Cloud Storage and make data with new url
        return dispatch(uploadImage(imageFile))
          .then((r) => {
            // TODO: Delete old image from Coud Storage
            return (r.payload as { url: string }).url
          })
          .then((url) => {
            return makedata(authId, user, form, url);
          });
      }
    };
    // Then update userdata
    makeData().then((data) => {
      dispatch(update({ authId, username: data.username }));
      dispatch(updateUser(data)).then(() => {
        history.push(`/profile/${data.username}`);
      });
    });

    // DELETE OLD IMAGE FROM STORAGE
  };

  const handleChange = (e: ChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFileDrop = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="edit-modal">
      <FaTimes className="modal-close" onClick={onClose} />
      <div className="edit-modal-content">
        <h1 className="edit-modal-h1">Edit Profile</h1>
        <img
          className="edit-profile-img"
          src={imagePreview || form.imageUrl || placeholder}
          alt="Edited profile"
        />
        <form className="edit-form">
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <textarea
              id="bio"
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>New profile image: </label>
            <DropZone onFile={onFileDrop} file={imageFile} />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="edit-btn-save"
          >
            Save
          </button>
          <button onClick={onClose} className="edit-btn-cancel">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
