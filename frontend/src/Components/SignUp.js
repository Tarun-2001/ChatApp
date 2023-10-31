import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const history = useNavigate();
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const res = await response.json();
    console.log(res);
    if (res.success) {
      localStorage.setItem("token", res.authToken);
      history("/");
    } else {
      alert("This Email alredy is been used");
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <div class="mb-3">
            <label for="formFileMultiple" class="form-label">
              Multiple files input example
            </label>
            <input
              class="form-control"
              type="file"
              id="formFileMultiple"
              multiple
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
