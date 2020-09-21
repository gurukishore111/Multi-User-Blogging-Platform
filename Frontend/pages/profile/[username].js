import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../action/user";
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead" style={{ color: "#00bbbd" }}>
              {blog.title}
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      {head()}
      <Layout>
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>{user.name}</h5>

                      <p className="text-muted">
                        Joined {moment(user.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: "100px", maxWidth: "100%" }}
                        alt="user profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary btn-spec pt-4 pb-4 pl-4 pr-4 text-white">
                    Recent blogs by {user.name}
                  </h5>

                  {showUserBlogs()}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary btn-spec pt-4 pb-4 pl-4 pr-4 text-light">
                    Message {user.name}
                  </h5>
                  <br />
                  <p>
                    Any queries about this blog or contact him by
                    <br />
                    <a href={`"mailto:${user.email}`}>
                      <p>Send Feedback</p>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  // console.log(query);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;
