import Router from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { isAuth } from "../../action/auth";

const Private = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Private;
