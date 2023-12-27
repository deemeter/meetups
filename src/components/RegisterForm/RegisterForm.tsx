import { FormEvent, useState } from "react";
import { registerUser } from "../../store/userSlice";
import { AuthData } from "../../utils/interfaces";
import { useAppDispatch } from "../../store/storeHooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let loginData: AuthData = {
      email: email,
      password: password,
      fio: name,
    };
    if (password === repeatPassword)
      dispatch(registerUser(loginData)).then((result) => {
        if (result.payload) navigate("/");
      });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
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
            type="password"
            placeholder="repeat password"
            value={repeatPassword}
            pattern={password}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="login__input"
            title="Пароли не совпадают"
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
          <Link to="/login" className="login__link">
            Login
          </Link>
          <button type="submit" className="login_submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
