import Link from "next/link";
import Layout from "./../../../components/Layout";
import Admin from "./../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/BlogCreate";
import BlogRead from "../../../components/crud/BlogRead";
import Private from "./../../../components/auth/Private";
import { isAuth } from "../../../action/auth";
const Blog = () => {
  const userName = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blog</h2>
            </div>
            <div className="col-md-12">
              <BlogRead username={userName} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
