import React, { useState, useEffect } from "react";
import "./ProfitTracker.css";
import Table from "../components/Table";
import Loading from "../components/Loading";
import url from "../Config/URL";
import { connect } from "react-redux";

function ProfitTracker(props) {
  const [cacheProfits, setCacheProfits] = useState([]);
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.auth.msg !== "Login Successfully") {
        props.history.push("/");
      } else {
        getProfits();
      }
  }, [props.auth.msg]);

  const getProfits = () => {
    fetch(`${url}/users/profits/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((profits) => {
        setProfits(profits);
        setCacheProfits(profits);
      })
    );
    setLoading(false);
  };

//   const onFilterByBookmaker = (bookmaker) => {
//     let filtered = cacheProfits.filter((p) => p.bookmaker === bookmaker);
//     setProfits(filtered);
//   };
console.log(cacheProfits)
//   const onFilterByMonth = (month) => {
//     let filtered = cacheProfits.forEach((object) =>
//       object.filter((p) => new Date(p.date).getMonth() === month - 1)
//     );
//     setProfits(filtered);
//   };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="profitTracker" style={{ margin: "5%",textAlign:'left' }}>
      <h1 style={{ fontSize: "2em", marginBottom: "0.5em" }}>Profit Tracker</h1>
      <p style={{ fontSize: 19 }}>
        These are the overall profits of all the users on the platform
      </p>
      <hr style={{ margin: "30px 0" }} />

      {/* <div
        style={{
          background: "aliceblue",
          borderRadius: 15,
          padding: 15,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "end",
        }}
      >
        <div>
          <p style={{ fontSize: 20, fontWeight: 400 }}>Filter By Month:</p>
          <select
            id="types"
            onChange={(e) => {
              if (e.target.value === "all") {
                setProfits([...cacheProfits]);
              } else {
                onFilterByMonth(e.target.value);
              }
            }}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              width: "webkit-fill-available",
            }}
          >
            <option value="all">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">June</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <p style={{ fontSize: 20, fontWeight: 400 }}>Filter By Bookmaker</p>
          <select
            id="types"
            onChange={(e) => {
              if (e.target.value === "all") {
                setProfits([...cacheProfits]);
              } else {
                onFilterByBookmaker(e.target.value);
              }
            }}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              width: "webkit-fill-available",
            }}
          >
            <option value="all">All</option>
            <option value="10 bet">10 Bet</option>
            <option value="12 bet">12 Bet</option>
            <option value="19 bet">19 Bet</option>
          </select>
        </div>

        <div>
          <button
            style={{
              color: "white",
              backgroundColor: "#eba21c",
              padding: "10px 20px",
              marginTop: 0,
              display: "flex",
              justifyContent: "center",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
              borderWidth: 0,
              cursor: "pointer",
            }}
            onClick={() => setProfits([...cacheProfits])}
          >
            Reset Filters
          </button>
        </div>
      </div> */}

      <div style={{ marginTop: 20 }}>
        <Table profits={profits} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfitTracker);
