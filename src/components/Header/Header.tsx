import "./Header.styles.css";

import logo from "../../assets/images/logo.png";

import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";
import { MdPerson, MdSettings, MdExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/userSlice";

const Header = () => {
  const userLinks = [
    { path: "/all-meetups", title: "Все митапы", id: 0 },
    { path: "/my-meetups", title: "Мои митапы", id: 1 },
  ];
  const adminLinks = [{ path: "/users-list", title: "Пользователи", id: 0 }];

  const isAuth = useAppSelector((state) => state.user.isAuth);
  const isAdmin = useAppSelector((state) => state.user.roles).includes("ADMIN");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <NavLink to={"/"}>
            <img src={logo} alt="logo" width={420} height={76} />
          </NavLink>
        </div>
        <nav className="header__nav">
          <ul>
            {isAuth &&
              userLinks.map((link) => (
                <NavLink key={link.id} className="header__link" to={link.path}>
                  {link.title}
                </NavLink>
              ))}

            {isAdmin &&
              adminLinks.map((link) => (
                <NavLink key={link.id} className="header__link" to={link.path}>
                  {link.title}
                </NavLink>
              ))}
          </ul>
        </nav>
        <div className="header__buttons">
          {!isAuth && (
            <button onClick={() => navigate("/login")}>
              <MdPerson className="header__icon" size={50} />
            </button>
          )}
          {isAuth && (
            <button>
              <MdSettings className="header__icon" size={50} />
            </button>
          )}

          {isAuth && (
            <button onClick={() => dispatch(logoutUser())}>
              <MdExitToApp className="header__icon" size={50} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
