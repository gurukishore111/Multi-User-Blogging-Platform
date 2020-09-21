import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { API, DOMAIN, APP_NAME } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import Card from "../../components/blog/Card";
import { SingleTag } from "./../../action/tag";

const Tag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best programming tutorials on ${tag.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${tag.name}|${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best programming tutorials on ${tag.name}`}
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/blogleaf.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/blogleaf.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
    </Head>
  );

  //console.log(blogs);
  const showTagsResult = () =>
    blogs.map((b, i) => (
      <div>
        <Card key={i} blog={b} />
        <hr />
      </div>
    ));
  return (
    <div>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-5 font-weight-bold">{tag.name}</h1>
                {showTagsResult()}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </div>
  );
};

Tag.getInitialProps = ({ query }) => {
  return SingleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

export default Tag;
