import Layout from "../components/Layout";
import Link from "next/link";
const Index = () => {
  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-4">
            <h2>
              <span style={{ color: "#4ab2cd" }}>Blog</span> Leaf
            </h2>
            <h5>A multiuser blogging paltform ✍️</h5>
            <img
              src={
                !`../static/image/logo.png` ||
                `https://clt.manoa.hawaii.edu/wp-content/uploads/2015/02/CLTicon2013color.png`
              }
              className="img-thumbnail"
            />
            <p>Write / learn what you want from professional developers</p>
            <h3>Popular title</h3>
            <p>Recents</p>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a href="/categories/react" className="nav-link">
                  React
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/categories/node-trends">
                  Node
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/categories/mern-stack">
                  Mern
                </a>
              </li>
            </ul>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-8">
            <Link href="/categories/react">
              <h2>React</h2>
            </Link>
            <h5>Frontend firing trends</h5>
            <Link href="/categories/react">
              <img
                className="img-thumbnail"
                src="https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg.webp"
              />
            </Link>
            <p>
              React is an open-source JavaScript library for building user
              interfaces or UI components. It is maintained by Facebook and a
              community of individual developers and companies. React can be
              used as a base in the development of single-page or mobile
              applications.
            </p>
            <br />
            <Link href="/categories/mern-stack">
              <h2>Mern Stack</h2>
            </Link>
            <h5>It make development simple</h5>
            <Link href="/categories/mern-stack">
              <img
                className="img-thumbnail"
                src="https://i.morioh.com/67feeaf72f.png"
              />
            </Link>
            <p>
              MERN Stack is a Javascript Stack that is used for easier and
              faster deployment of full-stack web applications. MERN Stack
              comprises of 4 technologies namely: MongoDB, Express, React and
              Node. js. It is designed to make the development process smoother
              and easier.
            </p>
            <br />
            <Link href="/categories/react+firebase">
              <h2>React + firebase</h2>
            </Link>
            <h5>It make development simple</h5>
            <Link href="/categories/react+firebase">
              <img
                className="img-thumbnail"
                src="https://img-a.udemycdn.com/course/750x422/2655532_1d0b_2.jpg"
              />
            </Link>
            <p>
              Learn to build real-world applications using modern React! Much
              more than an intro, you’ll start from the ground up, getting all
              the way to using the ...
            </p>
          </div>
        </div>
      </div>

      <div
        className="jumbotron text-center"
        style={{ backgroundColor: "#4ab2cd", marginBottom: -13 }}
      >
        <p>@All Right Reserved</p>
      </div>
    </Layout>
  );
};

export default Index;
