import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/storeHooks";

type Props = {
  role: string;
  children: any;
};

const RequireRole = ({ role, children }: Props) => {
  const location = useLocation();
  const userRoles = useAppSelector((state) => state.user.roles);
  const hasRole = userRoles.includes(role);
  if (!hasRole) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RequireRole;
