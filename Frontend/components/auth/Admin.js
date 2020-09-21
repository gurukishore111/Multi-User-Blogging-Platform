import Router from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { isAuth } from "../../action/auth";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role !== 1) {
      Router.push("/signin");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Admin;
