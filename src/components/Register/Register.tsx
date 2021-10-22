import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId, update } from "../../features/auth/authSlice";
import { uploadImage } from "../../features/image/imageSlice";
import { createUser } from "../../features/profile/profileSlice";
import { UserData } from "../../features/profile/types";
import placeholder from "../../images/placeholder_profile.png";
import DropZone from "../Dropzone/DropZone";
import "./Register.css";

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type FormData = {
  username: string;
  email: string;
  bio: string;
};

const initialFormData = {
  username: "",
  email: "",
  bio: "",
};

const makedata = (uid: string, imageUrl: string, form: FormData): UserData => {
  return {
    uid: uid,
    following: [],
    followers: [],
    imageUrl: imageUrl,
    ...form,
  };
};

const Register = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState<FormData>(initialFormData);
  const authId = useAppSelector(selectAuthId);
  const dispatch = useAppDispatch();

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    if (!authId) return;
    if (!imageFile) return null;
    ev.preventDefault();
    dispatch(uploadImage(imageFile))
      .then((r) => (r.payload as { url: string }).url)
      .then((url) => {
        const data = makedata(authId, url, form);
        dispatch(update({ authId, username: data.username }));
        dispatch(createUser(data));
      });
  };

  const handleChange = (e: ChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFileDrop = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="register">
      <h1>Welcome to IG! Register here:</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio: </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile image: </label>
          <img
            className="register-img"
            src={imagePreview || placeholder}
            alt="Profile preview"
          />
          <DropZone onFile={onFileDrop} file={imageFile} />
        </div>
        <button className="register-btn-save" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
