import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul class="list-group">
                <li className="list-group-item">
                  <a href="/users/crud/blog">Create Blog</a>
                </li>

                <li className="list-group-item">
                  <a href="/users/crud/blogs">Update/Delete Blog</a>
                </li>

                <li className="list-group-item">
                  <a href="/users/update">Update profile</a>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              <img
                src="https://cdn.dribbble.com/users/914722/screenshots/3249943/blog-writing-illustration-28j.png"
                style={{ maxWidth: "100%", height: "auto" }}
                className="img-responsive"
              />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
