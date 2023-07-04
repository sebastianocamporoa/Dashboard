import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import edit from "../assets/icon-edit.png";
import iconDelete from "../assets/icon-delete.png";
import { deleteHobbies } from "../services/hobbies/hobbies";

const HobbiesTable = (props) => {
  const { hobbies, isLoading } = props;

  const handleDelete = async (id) => {
    const response = await deleteHobbies(id);
    if (response.status === 204) {
      props.onDelete(id);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" variant="dark" />
      ) : (
        <Table bordered hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Id</th>
              <th>Hobbie</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {hobbies.map((hobbie, idx) => (
              <tr key={idx}>
                <td className="d-flex align-items-center">
                  {/* <img src={user.avatar} alt="avatar" /> */}
                  <span className="ms-2"> {hobbie.id}</span>
                </td>
                <td>
                  <span className="ms-2"> {hobbie.hobby}</span>
                </td>
                <td>
                  <img src={edit} width={"16px"} alt={`edit-${idx}`} />
                </td>
                <td>
                  <img
                    src={iconDelete}
                    width={"16px"}
                    alt={`delete-${idx}`}
                    onClick={() => handleDelete(hobbie.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default HobbiesTable;
