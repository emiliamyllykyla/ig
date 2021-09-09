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

const makedata = (uid: string, user: UserData, form: FormData) => ({
  uid: uid,
  following: user.following,
  followers: user.followers,
  ...form,
});

const EditModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const authId = useAppSelector(selectAuthId);
  const user = useAppSelector(selectUserById(authId));
  const [form, setForm] = useState<FormData>(makeInitialData(user));

  const handleSubmit = (e: React.SyntheticEvent) => {
    if (!authId || !user) return <Redirect to="/login" />;
    e.preventDefault();
    const data = makedata(authId, user, form);
    dispatch(update({ authId, username: data.username }));
    dispatch(updateUser(data)).then(() => {
      history.push(`/profile/${data.username}`);
    });
  };

  const handleChange = (e: ChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-modal">
      <FaTimes className="modal-close" onClick={onClose} />
      <div className="edit-modal-content">
        <h1 className="edit-modal-h1">Edit Profile</h1>
        <img
          className="edit-profile-img"
          src={form.imageUrl}
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
            <label htmlFor="imageUrl">New profile image URL: </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
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
