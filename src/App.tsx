import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import LoginForm from "./components/LoginForm/LoginForm";
import PublicRoute from "./hoc/PublicRoute";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import About from "./components/About/About";
import RequireAuth from "./hoc/RequireAuth";
import RequireRole from "./hoc/ReuireRole";
import UsersListPage from "./pages/UsersListPage/UsersListPage";
import CreateMeetup from "./components/CreateMeetup/CreateMeetup";
import EditMeetup from "./components/EditMeetup/EditMeetup";
import { useAppSelector } from "./store/storeHooks";

import MeetupList from "./components/MeetupList/MeetupList";

function App() {
  const meetups = useAppSelector((state) => state.meetupList.meetups);
  const userId = useAppSelector((state) => state.user.id);
  const onlyMyMeetups = meetups.filter((meetup) =>
    meetup.users.includes(Number(userId))
  );
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/all-meetups"
          element={
            <RequireAuth>
              {<MeetupList meetups={meetups} itemsPerPage={10} />}
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/my-meetups"
          element={
            <RequireAuth>
              {<MeetupList meetups={onlyMyMeetups} itemsPerPage={10} />}
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/users-list"
          element={
            <RequireRole role="ADMIN">
              <UsersListPage />
            </RequireRole>
          }
        ></Route>
        <Route
          path="/create-meetup"
          element={
            <RequireAuth>
              <CreateMeetup />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/edit-meetup/:id"
          element={<EditMeetup></EditMeetup>}
        ></Route>
        <Route path="/test"></Route>
      </Route>
    </Routes>
  );
}

export default App;
