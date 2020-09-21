import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { handleResponse, isAuth } from "./auth";

export const createBlogaction = (blog, token) => {
  let createBlogEndpoints;

  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoints = `${API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoints = `${API}/user/blog`;
  }

  return fetch(`${createBlogEndpoints}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogaWithCatoryandTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const listRelated = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {
  let listBlogEndpoints;

  if (username) {
    listBlogEndpoints = `${API}/${username}/blogs`;
  } else {
    listBlogEndpoints = `${API}/blogs`;
  }
  return fetch(`${listBlogEndpoints}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  let removeBlogEndpoints;

  if (isAuth() && isAuth().role === 1) {
    removeBlogEndpoints = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    removeBlogEndpoints = `${API}/user/blog/${slug}`;
  }
  return fetch(`${removeBlogEndpoints}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response);

      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let updateBlogEndpoints;

  if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoints = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndpoints = `${API}/user/blog/${slug}`;
  }
  return fetch(`${updateBlogEndpoints}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);

      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  console.log("search params", params);
  let query = queryString.stringify(params);
  console.log("query params", query);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
