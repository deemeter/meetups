import { Meetup } from "../../store/meetupListSlice";
import MeetupItem from "../MeetupItem/MeetupItem";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { fetchMeetupList } from "../../store/meetupListSlice";
type Props = {
  meetups: Array<Meetup>;
  itemsPerPage: number;
};

const MeetupList = ({ meetups, itemsPerPage }: Props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token) || "";
  useEffect(() => {
    (async () => {
      await dispatch(fetchMeetupList(token));
    })();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = meetups.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meetups.length / itemsPerPage);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="box">
      {currentUsers.map((meetup) => (
        <MeetupItem {...meetup} key={meetup.id} />
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

export default MeetupList;
