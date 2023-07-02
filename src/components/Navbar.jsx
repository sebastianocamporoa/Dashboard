import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Nav from "react-bootstrap/Nav";
import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import moment from "moment/moment.js";
import "moment/locale/es";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../redux/actions/userActions";

function Navbar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userName);
  const [currentTime, setCurrentTime] = useState(moment().format("LLLL:ss"));
  const [greeting, setGreeting] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("LLLL:ss"));
      setGreeting(getGreeting());
    }, 1000); // Actualiza la hora cada segundo

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getGreeting = () => {
    const currentHour = moment().hour();

    if (currentHour >= 0 && currentHour < 12) {
      return "Buenos días";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");

    dispatch(setUserName(""));

    navigate("/login");
  };

  return (
    <BootstrapNavbar
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
      sticky="top"
      className="mb-3 w-100 "
    >
      <BootstrapNavbar.Brand className="d-flex align-items-center justify-content-center">
        <Nav.Link>
          <MenuOpenIcon fontSize="large" onClick={() => setIsOpen((s) => !s)} />
        </Nav.Link>
        <span className="mx-3 text-muted d-none d-md-inline">{greeting},</span>
        <span className="text-muted d-none d-md-inline">{currentTime}</span>
      </BootstrapNavbar.Brand>

      <BootstrapNavbar.Toggle aria-controls="responsive-BootstrapNavbar-nav" />
      <BootstrapNavbar.Collapse id="responsive-BootstrapNavbar-nav">
        <Nav className="ms-auto">
          <NavDropdown title={userName} id="Admin-nav-dropdown">
            <NavDropdown.Item>Editar información</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              Cerrar sesión
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
