import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const UsersTable = (props) => {
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
              <th>Eliminar hobbie</th>
            </tr>
          </thead>
          <tbody>
            {hobbies.map((hobbie, idx) => (
              <tr key={idx}>
                <td className="text-center">
                  <Form.Check type="checkbox" />
                </td>
                <td className="d-flex align-items-center">
                  {/* <img src={user.avatar} alt="avatar" /> */}
                  <span className="ms-2"> {hobbie.id}</span>
                </td>
                <td>{hobbie.hobbie}</td>
                <td>Eliminar</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersTable;
