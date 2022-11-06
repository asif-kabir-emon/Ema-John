import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    // console.log(email, password, confirm);

    if (password.length < 6) {
      setError("Password must be 6 characters or more.");
      return;
    }

    if (password !== confirm) {
      setError("Your Password did not match!!!");
      return;
    }

    signUp(email, password)
      .then(() => {
        setError("");
        setIsSuccess(true);
        form.reset();
      })
      .catch((error) => {
        setIsSuccess(false);
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <p className="error-massage">{error}</p>
        {isSuccess ? (
          <p className="success-message">Successully Account Created</p>
        ) : (
          <p className="error-massage">Failed to Sign Up</p>
        )}
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="" />
        </div>
        <div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </div>
      </form>
      <p className="link-text">
        Already Have an Account? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
};

export default SignUp;
