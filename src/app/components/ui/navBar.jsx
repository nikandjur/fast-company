import { Link, Outlet } from "react-router-dom";

export const NavBar = (params) => {
  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/users">
            Users
          </Link>
        </li>
      </ul>
      <main>
        <Outlet />
      </main>
      <footer className="footer text-center mt-5">Copyright 2021</footer>
    </>
  );
};
