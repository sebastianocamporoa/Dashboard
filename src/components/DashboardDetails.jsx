import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import AddHobbieModal from "./AddHobbieModal.jsx";
import { useRef, useState } from "react";
import UsersTable from "./UsersTable.jsx";

const DashboardDetails = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [users, setUsers] = useState({
    loading: false,
    error: false,
    data: [],
  });

  // filters state
  const [filters, setFilters] = useState({});
  const [checkBoxFilters, setCheckBoxFilter] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const formRef = useRef(null);

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
            placeholder="Search "
            className="ps-4 w-100 w-md-50"
            aria-label="Search"
            name="search"
            value={filters.search ? filters.search : ""}
            onChange={handleFilters}
          />
          <SearchIcon className="position-absolute left-25 d-none d-md-inline" />
        </Form>

        <UsersTable
          startDate={startDate}
          endDate={endDate}
          filters={filters}
          checkBoxFilters={checkBoxFilters}
          users={users}
          setUsers={setUsers}
        />
      </div>
    </>
  );
};

export default DashboardDetails;
