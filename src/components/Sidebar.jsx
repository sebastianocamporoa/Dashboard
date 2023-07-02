import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <section className="p-2 d-flex flex-column gap-3 text-left position-sticky position-md-fixed ">
      <div className="mb-3 align-self-center">
        <img src={logo} alt="logo" />
      </div>
      <div
        className="mb-3 text-muted d-flex align-items-center"
        onClick={() => navigate("/home")}
      >
        <DashboardIcon fontSize="large" />
        <span className="ms-4 fw-bold ">Inicio</span>
      </div>
    </section>
  );
};

export default Sidebar;
