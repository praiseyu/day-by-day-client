import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import logo from "../../assets/logo/logo.png";
import "./Header.scss";

export default function Header() {
  const user = useAuth();
  const { logout } = user;
  const token = user.token;

  const handleLogout = () => {
    logout();
    toast("Succesfully logged out.");
  };

  if (token) {
    return (
      <header>
        <nav className="authnavbar">
          <div className="authnavbar__left-wrapper">
            <Link to="/" className="authnavbar__logo">
              <img
                src={logo}
                alt="day-by-day-logo"
                className="authnavbar__logo-img"
              />
            </Link>
            <NavLink to="/about" className="authnavbar__link">
              ABOUT
            </NavLink>
          </div>
          <div className="authnavbar__right-wrapper">
            <NavLink to="/mytrips" className="authnavbar__link">
              MY TRIPS
            </NavLink>
            <button className="authnavbar__logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="header">
        <nav className="navbar">
          <div className="navbar__left-wrapper">
            <Link to="/" className="navbar__logo">
              <img
                src={logo}
                alt="day-by-day-logo"
                className="navbar__logo-img"
              />
            </Link>
            <NavLink to="/about" className="navbar__link">
              ABOUT
            </NavLink>
          </div>
          <div className="navbar__right-wrapper">
            <NavLink to="/login" className="navbar__link">
              LOGIN
            </NavLink>
            <NavLink to="/signup" className="navbar__link">
              SIGNUP
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }
}
