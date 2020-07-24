import React, { useState } from "react";
import axios from "axios";

const initialCredentials = {
  username: "",
  password: "",
};

const LoginForm = (props) => {
  const [formValues, setFormValues] = useState(initialCredentials);

  const handleChanges = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event) => {
    event.preventDefault();
    console.log("LOGIN CREDENTIALS:", formValues);
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        console.log("API RESPONSE:", res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => console.log("API ERROR:", { err }));
  };

  return (
    <div className="loginForm">
      <form onSubmit={login}>
        <div className="inputGroup">
          <label>Username</label>
          <input onChange={handleChanges} type="text" name="username"></input>
        </div>

        <div className="inputGroup">
          <label>Password</label>
          <input
            onChange={handleChanges}
            type="password"
            name="password"
          ></input>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
