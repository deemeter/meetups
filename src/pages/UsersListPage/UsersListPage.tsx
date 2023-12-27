import "./UsersListPage.styles.css";
import { FormEvent, useEffect } from "react";
import { fetchUserlist } from "../../store/userListSlice";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import UserList from "../../components/UserList/UserList";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { AuthData } from "../../utils/interfaces";
import { registerUser } from "../../store/userSlice";

const UsersListPage = () => {
  const token = useAppSelector((state) => state.user.token);

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userlist.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");

  const [modalActive, setModalActive] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let loginData: AuthData = {
      email: email,
      password: password,
      fio: name,
    };
    if (password === repeatPassword) {
      dispatch(registerUser(loginData)).then((result) => {
        if (result.payload) setModalActive(false);
      });
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserlist(token));
    }
    return () => {};
  }, [handleSubmit]);

  return (
    <>
      <UserList users={users} itemsPerPage={10}></UserList>
      <button className="userList__add" onClick={() => setModalActive(true)}>
        Add new user
      </button>

      <Modal active={modalActive} setActive={setModalActive}>
        <div className="create__user">
          <form className="create__form" onSubmit={handleSubmit}>
            <div className="create__fields">
              <input
                type="email"
                placeholder="new user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="createUser__input"
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="createUser__input"
              />
              <input
                type="password"
                placeholder="repeat password"
                value={repeatPassword}
                pattern={password}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                className="createUser__input"
                title="Пароли не совпадают"
              />
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="createUser__input"
              />
            </div>

            <button type="submit" className="createUser__submit">
              Register
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UsersListPage;
