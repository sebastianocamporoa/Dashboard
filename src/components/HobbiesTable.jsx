import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const HobbiesTable = (props) => {
  const { hobbies, isLoading } = props;

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
                <td>Editar</td>
                <td>Eliminar</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default HobbiesTable;