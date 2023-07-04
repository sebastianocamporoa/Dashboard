import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { createHobby, updateHobbies } from "../services/hobbies/hobbies";
import Cookies from "js-cookie";

const AddHobbieModal = ({
  handleClose,
  show,
  initialValue,
  onUpdateHobbies,
}) => {
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddHobby = async (e) => {
    e.preventDefault();

    let name = formRef.current.name.value.trim();

    setErrorMessage("");
    if (!name) return setErrorMessage("Ingresa el nuevo hobby");

    const body = { hobby: name };
    const userId = Cookies.get("userId");

    const response = await createHobby(userId, body);
    console.log(response);

    handleClose();
  };

  const handleEditHobby = async (e) => {
    e.preventDefault();

    let name = formRef.current.name.value.trim();
    setErrorMessage("");
    if (!name) return setErrorMessage("Ingresa el nuevo hobby");

    const body = { hobby: name };

    await updateHobbies(initialValue.id, body);

    handleClose();

    onUpdateHobbies();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          closeVariant="white"
          className="text-bg-primary"
        >
          <Modal.Title>
            {initialValue === "" ? "Agregar nuevo hobby" : "Editar hobby"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={initialValue === "" ? handleAddHobby : handleEditHobby}
            ref={formRef}
          >
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Hobby</Form.Label>
              <Form.Control
                required
                placeholder="Ingresa el hobby"
                type="text"
                name="name"
                defaultValue={initialValue.hobby}
              />
            </Form.Group>

            {errorMessage && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setErrorMessage("")}
              >
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={initialValue === "" ? handleAddHobby : handleEditHobby}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddHobbieModal;
