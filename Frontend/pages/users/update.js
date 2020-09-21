import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";
import Link from "next/link";

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid pt-5">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
