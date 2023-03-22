import React, { useState, useEffect } from "react";
import "./ProfitTracker.css";
import Table from "../components/Table";
import Loading from "../components/Loading";
import url from "../Config/URL";
import { connect } from "react-redux";
import PremiumUsersTable from "../components/PremiumUsersTable";

function PremiumUser(props) {
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.auth.msg !== "Login Successfully") {
      props.history.push("/");
    } else {
      getProfits();
    }
  }, [props.auth.msg]);

  const getProfits = () => {
    fetch(`${url}/premium/users/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((premiumUsers) => {
        setPremiumUsers(premiumUsers);
      })
    );
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
console.log("PPPPPPP",premiumUsers)
  return (
    <div className="profitTracker" style={{ margin: "5%", textAlign: "left" }}>
      <h1 style={{ fontSize: "2em", marginBottom: "0.5em" }}>Premium Users</h1>
      <p style={{ fontSize: 19 }}>Following are the premium users</p>
      <hr style={{ margin: "30px 0" }} />
      <div style={{ marginTop: 20 }}>
        <PremiumUsersTable users={premiumUsers} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PremiumUser);
