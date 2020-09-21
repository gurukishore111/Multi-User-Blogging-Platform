import Router from "next/router";
import { useEffect, useState } from "react";
import { authenticate, isAuth, signIn } from "./../../action/auth";
import Link from "next/link";
import LoginGoogle from "./LoginGoogle";

const SignInComponents = () => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, email, password, error, loading, message, showForm });

    setvalues({ ...values, loading: true, error: false });

    const user = { email, password };

    signIn(user).then((data) => {
      if (data.error) {
        setvalues({ ...values, error: data.error, loading: false });
      } else {
        //Save user Token
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/users");
          }
        });
      }
    });
  };
  const handleChange = (name) => (e) => {
    setvalues({ ...values, error: false, [name]: e.target.value });
  };

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <div className="container">
        <h3 className="text-center pt-3">
          <span style={{ color: "#00aeff" }}>Login</span>
        </h3>

        <img
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?size=338&ext=jpg"
          className="rounded mx-auto d-block"
          alt="..."
        ></img>
        <div className="text-center">
          <LoginGoogle />
          <p>OR</p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ fontFamily: "Montserrat" }}
          className="justify-center"
        >
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
            <button className="btn btn-primary justify-center">Signin</button>
          </div>
        </form>

        <br />
        <br />
        <br />

        <p className="text-center">
          If you do not have an account ? <Link href="/signup">register</Link>
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

export default SignInComponents;
