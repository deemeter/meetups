import "./CreateMeetup.styles.css";
import { FormEvent, useState } from "react";
import { fetchCreateMeetup } from "../../store/meetupListSlice";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";

const CreateMeetup = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescriptio] = useState("");
  const [duration, setDuration] = useState(0);
  const [location, setLocation] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [needToKnow, setNeedToKnow] = useState("");
  const [willHappen, setWillHappen] = useState("");
  const [reasonToCome, setReasonToCome] = useState("");

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (token) {
      let timeDate = new Date(time);
      dispatch(
        fetchCreateMeetup({
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
      ).then((result) => {
        if (result.payload) console.log("meetup created");
      });
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
            Создать митап
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeetup;
