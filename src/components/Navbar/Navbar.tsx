import "./Navbar.css";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logout,
  selectAuthId,
  selectAuthUsername,
} from "../../features/auth/authSlice";
import { useCallback, useState } from "react";
import Modal from "../Modal/Modal";
import AddPost from "../Add/AddPost";

const Navbar = () => {
  const { pathname } = useLocation();
  const [openAddPost, setOpenAddPost] = useState<boolean>(false);
  const authId = useAppSelector(selectAuthId);
  const username = useAppSelector(selectAuthUsername);
  const dispatch = useAppDispatch();
  const signout = useCallback(() => dispatch(logout()), [dispatch]);

  if (openAddPost)
    return (
      <Modal>
        <AddPost closeModal={() => setOpenAddPost(false)} />
      </Modal>
    );

  return (
    <nav className="nav">
      <Link className="logo" to="/">
        <span>IG</span>
      </Link>
      <ul>
        {authId && (
          <li>
            <FaRegPlusSquare
              className="icon"
              onClick={() => setOpenAddPost(true)}
            />
          </li>
        )}
        <li>
          <Link to="/all" className={pathname === "/all" ? "active" : ""}>
            <BiWorld className="icon" />
          </Link>
        </li>
        {authId && (
          <li>
            <Link to="/" className={pathname === "/" ? "active" : ""}>
              <HiOutlineUsers className="icon" />
            </Link>
          </li>
        )}
        <li>
          <Link
            to={authId ? `/profile/${username}` : "/login"}
            className={pathname === `/profile/${username}` ? "active" : ""}
          >
            <CgProfile className="icon" />
          </Link>
        </li>
        {authId ? (
          <li>
            <button onClick={signout}>
              <FiLogOut className="icon" />
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <FiLogIn className="icon" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
