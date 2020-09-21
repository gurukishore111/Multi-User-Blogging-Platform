import moment from "moment";
import Link from "next/link";
import { API } from "./../../config";
import renderHTML from "react-render-html";
const Cards = ({ blog }) => {
  //   console.log(blog);

  const showCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  const showTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-dark btn-sm mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h5 className="display-5 pt-3 pb-3 font-weight-bold title">
              {blog.title}
            </h5>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by{" "}
          <Link
            href={`/profile/${blog.postedBy.username}`}
            style={{ color: "#00bbbd" }}
          >
            <a>{blog.postedBy.username}</a>
          </Link>{" "}
          | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showCategories(blog)}
        {showTags(blog)}
        <br />
        <br />
      </section>
      <div className="row">
        <div className="col-md-4">
          <section className="text-center">
            <img
              className="img img-fluid rounded pb-3"
              style={{ maxHeight: "90%", width: "auto" }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section style={{ fontSize: 16 }}>
            {renderHTML(blog.excerpt)}
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cards;
