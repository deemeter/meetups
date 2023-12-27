import "./LoginForm.styles.css";

import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../store/userSlice";
import { AuthData } from "../../utils/interfaces";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isError = useAppSelector((state) => state.user.error);
  console.log(isError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let loginData: AuthData = {
      email: email,
      password: password,
      fio: name,
    };
    dispatch(loginUser(loginData)).then((result) => {
      if (result.payload) navigate("/");
    });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        {isError && <span className="input__hint">Проверьте данные</span>}
        <div className="login__fields">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login__input"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login__input"
          />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login__input"
          />
        </div>

        <div className="login__buttons">
          <Link to="/about" className="login__link">
            How to create <br /> account?
          </Link>
          <button type="submit" className="login_submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
