import UserItem from "../UserItem/UserItem";
import { IUser } from "../../store/userListSlice";
import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import "./UserList.styles.css";
type Props = {
  users: Array<IUser>;
  itemsPerPage: number;
};

const UserList = ({ users, itemsPerPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="box">
      {currentUsers.map((user) => (
        <UserItem
          email={user.email}
          role={user.role.includes("ADMIN") ? "ADMIN" : "USER"}
          key={user.id}
          id={user.id}
          name={user.fio}
        />
      ))}
      <div className="userlist_nav_buttons">
        <button
          className="userlist_btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <MdNavigateBefore className="userlist_icon" size={50} />
        </button>
        <p>{currentPage}</p>
        <button
          className="userlist_btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <MdNavigateNext className="userlist_icon" size={50} />
        </button>
      </div>
    </div>
  );
};

export default UserList;
