import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import AddHobbieModal from "./AddHobbieModal.jsx";
import { useEffect, useRef, useState } from "react";
import UsersTable from "./UsersTable.jsx";
import { hobbies } from "../services/hobbies/hobbies.js";

const DashboardDetails = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [users, setUsers] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [filters, setFilters] = useState({});
  const formRef = useRef(null);

  const [listHobbies, setListHobbies] = useState([]);

  const getHobbies = async () => {
    try {
      const response = await hobbies(1);
      if (response?.status === 200) {
        setListHobbies(response?.data);
      } else {
        // Handle error response
        console.error("Error al obtener los hobbies");
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error al obtener los hobbies");
    }
  };

  useEffect(() => {
    getHobbies();
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
          Agregar hobbie
        </Button>
      </div>
      {isAddNew && (
        <AddHobbieModal
          show={isAddNew}
          handleClose={handleClose}
          setUsers={setUsers}
        />
      )}

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

        <UsersTable hobbies={listHobbies} />
      </div>
    </>
  );
};

export default DashboardDetails;
