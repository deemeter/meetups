import { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/storeHooks";

const RequireAuth = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
