import { FormEvent, useState } from "react";
import {
  fetchDeleteMeetup,
  fetchEditMeetup,
} from "../../store/meetupListSlice";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function toDatetimeString(string: any) {
  const [date, time] = string.split(", ");
  const [day, month, year] = date.split(".");

  const formattedString = `${year}-${month}-${day}T${time}`;
  return formattedString;
}

const EditMeetup = () => {
  const { id } = useParams();
  const meetupId = Number(id);
  const userId = useAppSelector((state) => state.user.id);
  const isAdmin = useAppSelector((state) => state.user.roles).includes("ADMIN");
  const meetups = useAppSelector((state) => state.meetupList.meetups);

  const navigate = useNavigate();

  const currentMeetup = meetups.find((item) => item.id === meetupId);

  if (!(userId === Number(currentMeetup?.createdBy) || isAdmin))
    return <Navigate to="/all-meetups" />;

  const [name, setName] = useState(currentMeetup?.name || "");
  let date;
  if (currentMeetup?.time)
    date = new Date(currentMeetup?.time).toLocaleString();

  const [time, setTime] = useState(toDatetimeString(date));
  const [description, setDescriptio] = useState(
    currentMeetup?.description || ""
  );
  const [duration, setDuration] = useState(currentMeetup?.duration || 0);
  const [location, setLocation] = useState(currentMeetup?.location || "");
  const [targetAudience, setTargetAudience] = useState(
    currentMeetup?.target_audience || ""
  );
  const [needToKnow, setNeedToKnow] = useState(
    currentMeetup?.need_to_know || ""
  );
  const [willHappen, setWillHappen] = useState(
    currentMeetup?.will_happen || ""
  );
  const [reasonToCome, setReasonToCome] = useState(
    currentMeetup?.reason_to_come || ""
  );

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (token) {
      let timeDate = new Date(time);
      dispatch(
        fetchEditMeetup({
          meetupId,
          token,
          name,
          description,
          time: timeDate.toISOString(),
          duration,
          targetAudience,
          location,
          needToKnow,
          willHappen,
          reasonToCome,
        })
      ).then(() => {
        navigate("/all-meetups");
      });
    }
  };

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    if (token) {
      dispatch(fetchDeleteMeetup({ meetupId, token }));
    }
  };

  return (
    <div className="create_meetup">
      <form className="meetup_form" id="form" onSubmit={handleSubmit}>
        <div className="meetup_fields">
          <label htmlFor="form" className="meetup_heading">
            Создание митапа
          </label>
          <label>
            Название:
            <input
              type="text"
              required
              className="meetup_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Дата:
            <input
              type="datetime-local"
              required
              className="meetup_input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label>
            Длительность:
            <input
              type="number"
              required
              className="meetup_input"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </label>
          <label>
            Локация:
            <input
              type="text"
              required
              className="meetup_input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            Описание:
            <textarea
              name=""
              cols={30}
              rows={3}
              className="meetup_input"
              required
              value={description}
              onChange={(e) => setDescriptio(e.target.value)}
            ></textarea>
          </label>
          <label>
            Целевая аудитория:
            <textarea
              name=""
              cols={30}
              rows={3}
              className="meetup_input"
              required
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            ></textarea>
          </label>
          <label>
            Что нужно знать?:
            <textarea
              name=""
              cols={30}
              rows={3}
              className="meetup_input"
              required
              value={needToKnow}
              onChange={(e) => setNeedToKnow(e.target.value)}
            ></textarea>
          </label>
          <label>
            Почему нужно придти?:
            <textarea
              name=""
              cols={30}
              rows={3}
              className="meetup_input"
              required
              value={reasonToCome}
              onChange={(e) => setReasonToCome(e.target.value)}
            ></textarea>
          </label>
          <label>
            Что будет?:
            <textarea
              name=""
              cols={30}
              rows={3}
              className="meetup_input"
              required
              value={willHappen}
              onChange={(e) => setWillHappen(e.target.value)}
            ></textarea>
          </label>
          <button type="submit" className="create_meetup_submit">
            Редактировать митап
          </button>
          <button className="create_meetup_submit" onClick={handleDelete}>
            Удалить митап
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMeetup;
