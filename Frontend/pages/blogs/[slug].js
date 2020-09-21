import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { listRelated, singleBlog } from "../../action/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blog/SmallCard";
import DisqusThread from "../../components/DisqusThread";

const SingleBlogs = ({ blog, router }) => {
  const [related, setrelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setrelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
    // console.log(related);
  }, []);
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${router.pathname}/`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );
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
  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };
  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog.id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <article>
          <div className="container-fluid">
            <section>
              <div className="row" style={{ marginTop: "-30px" }}>
                <img
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                  className="img img-fluid featured-image"
                />
              </div>
            </section>
            <section>
              <div className="container">
                <h1 className="display-5 pb-3 text-center">{blog.title}</h1>
                <p className="lead pt-3 pb-1 mark">
                  Written by{" "}
                  <Link
                    href={`/profile/${blog.postedBy.username}`}
                    className="text"
                    style={{ color: "#00bbbd" }}
                  >
                    {blog.postedBy.username}
                  </Link>{" "}
                  | Published {moment(blog.updatedAt).fromNow()}
                </p>
                <div className="pb-3">
                  {showCategories(blog)}
                  {showTags(blog)}
                  <hr />
                </div>
              </div>
            </section>
          </div>
          <div className="container">
            <section>
              <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
            </section>
          </div>
          <div className="container pb-5 ">
            <h4 className="text-center">Related blogs</h4>
            <hr />
            <div className="row">{showRelatedBlog()}</div>
          </div>
          <div className="container pb-5">
            <h4 className="text-center">Comments</h4>
            <hr />
            <p>show comments</p>
          </div>
          <div className="container pt-5 pb-5">{showComments()}</div>
        </article>
      </Layout>
    </React.Fragment>
  );
};

SingleBlogs.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default withRouter(SingleBlogs);
