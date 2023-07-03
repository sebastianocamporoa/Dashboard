import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import AddHobbieModal from "./AddHobbieModal.jsx";
import HobbiesTable from "./HobbiesTable.jsx";
import { hobbies } from "../services/hobbies/hobbies.js";

const DashboardDetails = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [filters, setFilters] = useState({});
  const formRef = useRef(null);
  const [listHobbies, setListHobbies] = useState([]);
  const socketRef = useRef();

  const getHobbies = async () => {
    try {
      const response = await hobbies(1);
      setListHobbies(response?.data);
    } catch (error) {
      console.error("Error al obtener los hobbies", error);
    }
  };

  useEffect(() => {
    getHobbies();
    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("hobbyAdded", (newHobby) => {
      console.log(newHobby);
      setListHobbies((prevHobbies) => [...prevHobbies, newHobby]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleClose = () => setIsAddNew(false);
  const handleFilters = (e) => {
    let value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    if (value === "" && filters.hasOwnProperty(e.target.name)) {
      let temp = filters;
      delete temp[`${e.target.name}`];
      setFilters(temp);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Administrador de hobbies</h3>
        <Button variant="success" onClick={(e) => setIsAddNew(true)}>
          Agregar hobby
        </Button>
      </div>
      {isAddNew && <AddHobbieModal show={isAddNew} handleClose={handleClose} />}

      <div className="border">
        <Form
          ref={formRef}
          className="d-flex flex-column flex-md-row align-items-center gap-2 w-100 w-md-75 p-4 position-realtive"
        >
          <Form.Control
            type="text"
            placeholder="Buscar "
            className="ps-4 w-100 w-md-50"
            aria-label="Search"
            name="search"
            value={filters.search ? filters.search : ""}
            onChange={handleFilters}
          />
          <SearchIcon className="position-absolute left-25 d-none d-md-inline" />
        </Form>

        <HobbiesTable hobbies={listHobbies} />
      </div>
    </>
  );
};

export default DashboardDetails;
