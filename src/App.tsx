import React, { useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import All from "./components/All/All";
import { history } from "./history";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase";
import { useAppDispatch } from "./app/hooks";
import { getUser, logout, update } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(db, user.uid);
        if (userData) {
          dispatch(update({ authId: user.uid, username: userData.username }));
        }
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <Navbar />
      <div className="app">
        <Switch>
          <Route exact path="/">
            <div className="page">
              <Feed />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <div className="page">
              <Register />
            </div>
          </Route>
          <Route path="/all">
            <div className="page">
              <All />
            </div>
          </Route>
          <Route path="/profile/:username">
            <div className="page">
              <Profile />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
