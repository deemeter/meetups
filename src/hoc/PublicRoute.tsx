import { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/storeHooks";

const PublicRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PublicRoute;
