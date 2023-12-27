import { useState } from "react";
import { Meetup } from "../../store/meetupListSlice";
import "./MeetupItem.styles.css";
import { MdPerson, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import {
  fetchSubUserOnMeetup,
  fetchUnsubUserOnMeetup,
  fetchMeetupList,
} from "../../store/meetupListSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MeetupItem = (props: Meetup) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const userId = useAppSelector((state) => state.user.id) || 0;
  const token = useAppSelector((state) => state.user.token) || "";
  const dispatch = useAppDispatch();
  const [isOnMeetUp, setIsOnMeetUp] =
    useState(props.users.includes(userId)) || false;

  const isAuthor = userId == Number(props.createdBy);

  useEffect(() => {
    (async () => {
      await dispatch(fetchMeetupList(token));
    })();
  }, [isOnMeetUp]);

  const handleSub = (e: any) => {
    e.preventDefault();
    dispatch(
      fetchSubUserOnMeetup({ token: token, meetupId: props.id, userId: userId })
    ).then(() => setIsOnMeetUp(!isOnMeetUp));
  };

  const handleUnsub = (e: any) => {
    e.preventDefault();
    dispatch(
      fetchUnsubUserOnMeetup({
        token: token,
        meetupId: props.id,
        userId: userId,
      })
    ).then(() => setIsOnMeetUp(!isOnMeetUp));
  };

  const date = new Date(props.time).toLocaleString();
  return (
    <div className="meetup" id={props.id.toString()}>
      <div className="meetup__content">
        <div className="meetup__heading">
          <h2>{[props.name]}</h2>
          <p className="meetup__subscribers">
            Подписчики: {props.users.length}
          </p>
          <h2>{date}</h2>
        </div>
        <div className="meetup__data">
          {props.description}
          {expanded && (
            <>
              <div className="meetup__point">
                <h3>Целевая аудитория</h3>
                <p>{props.target_audience}</p>
              </div>
              <div className="meetup__point">
                <h3>Длительность</h3>
                <p>{props.duration} минут(ы)</p>
              </div>
              <div className="meetup__point">
                <h3>Почему надо обязательно придти?</h3>
                <p>{props.reason_to_come} </p>
              </div>
              <div className="meetup__point">
                <h3>Что нужно знать?</h3>
                <p>{props.need_to_know} </p>
              </div>
              <div className="meetup__point">
                <h3>Что будет?</h3>
                <p>{props.will_happen} </p>
              </div>
            </>
          )}
        </div>

        <div className="meetup__footer">
          <div className="author">
            <MdPerson></MdPerson>
            {props.owner.fio}
          </div>
          <div className="meetup_buttons">
            {isAuthor && (
              <button
                className="meetup_subscribe"
                onClick={() => navigate("/edit-meetup/" + props.id)}
              >
                Редактировать
              </button>
            )}
            {!isOnMeetUp && (
              <button className="meetup_subscribe" onClick={handleSub}>
                Я пойду!
              </button>
            )}

            {isOnMeetUp && (
              <button className="meetup_subscribe" onClick={handleUnsub}>
                Я не пойду!
              </button>
            )}

            {!expanded && (
              <button
                className="meetup_dropdown"
                onClick={() => setExpanded(!expanded)}
              >
                <MdArrowDropDown size={50} />
              </button>
            )}
            {expanded && (
              <button
                className="meetup_dropdown"
                onClick={() => setExpanded(!expanded)}
              >
                <MdArrowDropUp size={50} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupItem;
