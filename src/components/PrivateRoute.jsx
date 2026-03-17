import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles, userRole }) => {
  return allowedRoles.includes(userRole) ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
