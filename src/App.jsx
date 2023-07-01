import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Cookies from "js-cookie";

const App = () => {
  const hasCookies = () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    return token && userId;
  };

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
