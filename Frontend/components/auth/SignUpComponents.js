import { useState, useEffect } from "react";
import { authenticate, isAuth, signup } from "./../../action/auth";
import Link from "next/link";
import Router from "next/router";

const SignUpComponents = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, email, password, error, loading, message, showForm });

    setvalues({ ...values, loading: true, error: false });

    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error, loading: false });
      } else {
        setvalues({
          ...values,
          name: "",
          email: "",
          password: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: false, [name]: e.target.value });
  };
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);
  const signupForm = () => {
    return (
      <div className="container">
        <h3 className="text-center pt-3">
          <span style={{ color: "#00aeff" }}>Register</span>
        </h3>
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=338&ext=jpg"
          className="rounded mx-auto d-block"
          alt="..."
        ></img>
        <form
          onSubmit={handleSubmit}
          style={{ fontFamily: "Montserrat" }}
          className="justify-center"
        >
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              type="text"
              value={name}
              className="form-control"
              placeholder="Type your name"
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("email")}
              type="text"
              value={email}
              className="form-control"
              placeholder="Type your E-mail"
            />
          </div>{" "}
          <div className="form-group">
            <input
              onChange={handleChange("password")}
              type="password"
              value={password}
              className="form-control"
              placeholder="Type your password"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Signup</button>
          </div>
        </form>
        <br />
        <br />

        <p className="text-center">
          If you already have an account ? <Link href="/signin">login</Link>
        </p>
      </div>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
};

export default SignUpComponents;
