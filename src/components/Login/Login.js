import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
import "./Login.css";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  let location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        setError("");
        setIsSuccess(true);
        navigate(from, { replace: true });
        form.reset();
      })
      .catch((error) => {
        setIsSuccess(false);
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <p className="error-massage">{error}</p>
        {isSuccess ? (
          <p className="success-message">Successully loged In</p>
        ) : (
          <p className="error-massage">Failed to login</p>
        )}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </div>
      </form>
      <p className="link-text">
        New to Ema-John? <Link to="/signup">Create New Account</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
