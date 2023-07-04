import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../utilities/Forms";
import { oauth } from "../services/oauth/oauth";
import DatePicker from "../components/DatePicker";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [expeditionDate, setExpeditionDate] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      username: {
        value: username,
        isRequired: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      phoneNumber: {
        value: phoneNumber,
        isRequired: true,
      },
      documentType: {
        value: documentType,
        isRequired: true,
      },
      firstName: {
        value: firstName,
        isRequired: true,
      },
      lastName: {
        value: lastName,
        isRequired: true,
      },
      documentNumber: {
        value: documentNumber,
        isRequired: true,
      },
      birthdate: {
        value: birthdate,
        isRequired: true,
      },
      expeditionDate: {
        value: expeditionDate,
        isRequired: true,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const register = async (e) => {
    e.preventDefault();

    const isValid = validateRegister();

    if (isValid) {
      const body = {
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
        phone_number: phoneNumber,
        document_type: documentType,
        first_name: firstName,
        last_name: lastName,
        document_number: documentNumber,
        birthdate: formatDate(birthdate),
        expedition_date: formatDate(expeditionDate),
      };

      const response = await oauth(body);

      if (response?.status === 200) {
        alert("Registrado correctamente");
        navigate("/login");
      }

      // console.log(response);
      setValidate({});
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Regístrate</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={register}
                autoComplete={"off"}
              >
                <div className="username mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.username
                        ? "is-invalid "
                        : ""
                    }`}
                    id="username"
                    name="username"
                    value={username}
                    placeholder="Nombre de usuario"
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.username
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.username
                      ? validate.validate.username[0]
                      : ""}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                      name="password"
                      id="password"
                      value={password}
                      placeholder="Contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={togglePassword}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.password
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Correo"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div>
                </div>

                <div className="phoneNumber mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.phoneNumber
                        ? "is-invalid "
                        : ""
                    }`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Número de teléfono"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.phoneNumber
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.phoneNumber
                      ? validate.validate.phoneNumber[0]
                      : ""}
                  </div>
                </div>

                <div className="documentType mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.documentType
                        ? "is-invalid "
                        : ""
                    }`}
                    id="documentType"
                    name="documentType"
                    value={documentType}
                    placeholder="Tipo de documento"
                    onChange={(e) => setDocumentType(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.documentType
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.documentType
                      ? validate.validate.documentType[0]
                      : ""}
                  </div>
                </div>

                <div className="firstName mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.firstName
                        ? "is-invalid "
                        : ""
                    }`}
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    placeholder="Nombre"
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.firstName
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.firstName
                      ? validate.validate.firstName[0]
                      : ""}
                  </div>
                </div>

                <div className="lastName mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.lastName
                        ? "is-invalid "
                        : ""
                    }`}
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    placeholder="Apellido"
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.lastName
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.lastName
                      ? validate.validate.lastName[0]
                      : ""}
                  </div>
                </div>

                <div className="documentNumber mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.documentNumber
                        ? "is-invalid "
                        : ""
                    }`}
                    id="documentNumber"
                    name="documentNumber"
                    value={documentNumber}
                    placeholder="Número de documento"
                    onChange={(e) => setDocumentNumber(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.documentNumber
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.documentNumber
                      ? validate.validate.documentNumber[0]
                      : ""}
                  </div>
                </div>

                <div className="expeditionDate mb-3">
                  <DatePicker
                    setDate={setExpeditionDate}
                    date={expeditionDate}
                    placeholder="Fecha de expedición"
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.expeditionDate
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.expeditionDate
                      ? validate.validate.expeditionDate[0]
                      : ""}
                  </div>
                </div>

                <div className="birthdate mb-3">
                  <DatePicker
                    setDate={setBirthdate}
                    date={birthdate}
                    placeholder="Fecha de nacimiento"
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.birthdate
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.birthdate
                      ? validate.validate.birthdate[0]
                      : ""}
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-block">
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="auth-footer">
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
