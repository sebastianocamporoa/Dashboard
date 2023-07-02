import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { user } from "./services/users/users.js";
import { setUserName } from "./redux/actions/userActions.js";

const App = () => {
  const dispatch = useDispatch();

  const hasCookies = () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    return token && userId;
  };

  const fetchUserName = async () => {
    try {
      const response = await user(1);
      console.log(response);
      if (response?.status === 200) {
        const userName = response?.data?.username;
        dispatch(setUserName(userName));
      } else {
        // Handle error response
        console.error("Error fetching user name:", response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error fetching user name:", error);
    }
  };

  useEffect(() => {
    if (hasCookies()) {
      fetchUserName();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {hasCookies() ? (
            <Route path="/home" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
          )}
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
