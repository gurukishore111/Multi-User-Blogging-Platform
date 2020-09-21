import Link from "next/link";
import Layout from "./../../../components/Layout";
import Admin from "./../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/BlogCreate";
import BlogRead from "../../../components/crud/BlogRead";
const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blog</h2>
            </div>
            <div className="col-md-12">
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
