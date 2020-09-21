import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";
import Router from "next/router";

export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: "/signin",
        query: {
          message: "Your session is expired. Please signin",
        },
      });
    });
  }
};

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signIn = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const SignOut = (next) => {
  RemoveCookie("token");
  RemoveLoacalStorage("user");
  next();
  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("Signout Success");
      console.log("Signout Success");
    })
    .catch((err) => console.log(err));
};

//Set cookie:

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//Remove Cookie:

export const RemoveCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get Cookie:

export const GetCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//Local storage:

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//Remove Local Storage:

export const RemoveLoacalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//auth

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = GetCookie("token");

    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth = user;
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};

export const loginWithGoogle = (user) => {
  return fetch(`${API}/google-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
