import { FormEvent, useState } from "react";
import "./UserItem.styles.css";
import { MdEdit, MdClose, MdSave } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import {
  fetchDeleteUser,
  fetchEditUserRole,
  fetchEditUserData,
} from "../../store/userListSlice";
type Props = {
  email: string;
  role: string;
  id: number;
  name: string;
};

const UserItem = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState(props.email);
  const [role, setRole] = useState(props.role);
  const [name, setName] = useState(props.name);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const token = useAppSelector((state) => state.user.token) || "";

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    setIsDisabled((state) => !state);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      fetchEditUserData({
        userData: { email, password, fio: name },
        id: props.id,
        token: token,
      })
    );
    if (role != props.role)
      dispatch(fetchEditUserRole({ id: props.id, role: role, token }));
    setIsDisabled((state) => !state);
  };

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchDeleteUser({ id: props.id.toString(), token }));
  };

  return (
    <form className="useritem_form" id={props.id.toString()}>
      <div className="useritem_box">
        <input
          className="useritem_input"
          type="email"
          value={email}
          disabled={isDisabled}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="useritem_box">
        <input
          className="useritem_input"
          type="password"
          placeholder="********"
          value={password}
          disabled={isDisabled}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="useritem_box">
        <input
          className="useritem_input"
          type="text"
          placeholder="name"
          value={name}
          disabled={isDisabled}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="useritem_box">
        <select
          value={role}
          className="useritem_input"
          disabled={isDisabled}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      </div>
      <div className="useritem_box">
        {!isDisabled && (
          <button className="useritem_button" onClick={handleSave}>
            <MdSave className="useritem_icon"></MdSave>
          </button>
        )}
        {isDisabled && (
          <button className="useritem_button" onClick={handleEdit}>
            <MdEdit className="useritem_icon"></MdEdit>
          </button>
        )}
        <button className="useritem_button" onClick={handleDelete}>
          <MdClose className="useritem_icon"></MdClose>
        </button>
      </div>
    </form>
  );
};

export default UserItem;
