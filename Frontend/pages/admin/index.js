import Link from "next/link";
import Layout from "./../../components/Layout";
import Admin from "./../../components/auth/Admin";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Category</a>
                  </Link>
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Tag</a>
                  </Link>
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/admin/crud/blog">Create Blog</a>
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/admin/crud/blogs">Update/Remove Blog</a>
                </li>
                <li className="list-group-item">
                  <a href="/users/update">Update profile</a>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              {" "}
              <img
                src="https://cdn.dribbble.com/users/914722/screenshots/3249943/blog-writing-illustration-28j.png"
                className="img-responsive"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
