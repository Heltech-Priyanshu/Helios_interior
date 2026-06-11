
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Protechted({allow}) {
    const data = localStorage.getItem("token")
    if (!data) {
        return <Navigate to="login" replace />;
    }
    const user = jwtDecode(data)

    if (!allow.includes(user.role)) {
      return <Navigate to="login"  replace />;
    }

  return <Outlet/>
}

export default Protechted;
