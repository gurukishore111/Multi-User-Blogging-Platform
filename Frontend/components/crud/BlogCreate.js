import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { GetCookie, isAuth } from "../../action/auth";
import { getCategory } from "../../action/category";
import { getTag } from "../../action/tag";
import { createBlogaction } from "../../action/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

const CreateBlog = ({ router }) => {
  const blogFormLocal = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };
  const [body, setBody] = useState(blogFormLocal());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });
  const [categories, setcategories] = useState([]);
  const [tags, settags] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTags] = useState([]);

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  //   console.log(categories);
  //   console.log(tags);

  const token = GetCookie("token");
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setcategories(data);
      }
    });
  };

  const initTags = () => {
    getTag().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        settags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    //console.log("ready to publishBlog");
    createBlogaction(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled ${data.title} is created`,
        });
        setBody("");
        setcategories("");
        settags("");
      }
    });
  };

  const handleChange = (name) => (e) => {
    //console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    //console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToogle = (c) => () => {
    setValues({ ...values, error: "" });

    const clickedCatory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCatory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCatory, 1);
    }

    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const handleToogleTags = (t) => () => {
    setValues({ ...values, error: "" });

    const clickedTags = checked.indexOf(t);
    const all = [...checked];

    if (clickedTags === -1) {
      all.push(t);
    } else {
      all.splice(clickedTags, 1);
    }

    console.log(all);
    setCheckedTags(all);
    formData.set("tags", all);
  };

  const showCatorgories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li className="list-unstyled" key={i}>
          <input
            onChange={handleToogle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li className="list-unstyled" key={i}>
          <input
            onChange={handleToogleTags(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            value={body}
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />
              <small className="text-muted">Max Size :1MB</small>
              <br />
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="images/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <h5>Categories</h5>
          <hr />

          <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showCatorgories()}
          </ul>
          <h5>Tags</h5>
          <hr />

          <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showTags()}
          </ul>
        </div>
      </div>
    </div>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(CreateBlog);
