import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NavProfile } from "./navProfile";

export const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <nav className="navbar bg-light mb-3">
        <div className="container-fluid">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Main
              </Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/users">
                  Users
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            {currentUser ? (
              <NavProfile />
            ) : (
              <Link className="nav-link" aria-current="page" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="footer text-center mt-5">Copyright 2024</footer>
    </>
  );
};
