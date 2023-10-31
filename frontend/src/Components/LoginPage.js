import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const history = useNavigate()
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [credentials, setcredentials] = useState({email:'',password:''});
  const handleClick = async(e)=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }), 
      });
      const res = await response.json();
      console.log(res)
      if(res.message===('Login successfully')){
        localStorage.setItem('token',res.token);
        history("/")
      }
      else{ alert("invalid login")}
    
}
  return (
    <div className="container my-3">
      <form onSubmit={handleClick}>
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
          <label
            htmlFor="password"
            className="form-label"
           
          >
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
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
