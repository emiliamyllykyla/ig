import { Redirect } from "react-router-dom";
import GoogleButton from "react-google-button";
import "./Login.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuthId, login } from "../../features/auth/authSlice";
import { useCallback } from "react";

const Login = () => {
  const authId = useAppSelector(selectAuthId);
  const dispatch = useAppDispatch();
  const signIn = useCallback(() => dispatch(login()), [dispatch]);

  if (authId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div>
            <h1>Sign in!</h1>
            <GoogleButton onClick={signIn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
