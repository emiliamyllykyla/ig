import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId, update } from "../../features/auth/authSlice";
import { createUser } from "../../features/profile/profileSlice";
import { UserData } from "../../features/profile/types";

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type FormData = {
  username: string;
  email: string;
  bio: string;
  imageUrl: string;
};

const initialFormData = {
  username: "",
  email: "",
  bio: "",
  imageUrl: "",
};

const makedata = (uid: string, form: FormData): UserData => {
  return {
    uid: uid,
    following: [],
    followers: [],
    ...form,
  };
};

const Register = () => {
  const [form, setForm] = useState<FormData>(initialFormData);
  const authId = useAppSelector(selectAuthId);
  const dispatch = useAppDispatch();

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    if (!authId) return;
    ev.preventDefault();
    const data = makedata(authId, form);
    dispatch(update({ authId, username: data.username }));
    dispatch(createUser(data));
  };

  const handleChange = (e: ChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      Welcome to IG! Register here:
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            bio:{" "}
            <textarea name="bio" value={form.bio} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            email:{" "}
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            profile image url:{" "}
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </label>
        </div>
        <input type="submit" value="submit" />
      </form>
      <div>
        https://images.unsplash.com/photo-1548678756-aa5ed92c4796?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
      </div>
    </div>
  );
};

export default Register;
