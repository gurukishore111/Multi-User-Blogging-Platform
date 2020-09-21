import Layout from "../components/Layout";
import SignInComponents from "./../components/auth/SignInComponents";
import { withRouter } from "next/router";
const Index = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
      </div>
      <SignInComponents />
    </Layout>
  );
};

export default withRouter(Index);
