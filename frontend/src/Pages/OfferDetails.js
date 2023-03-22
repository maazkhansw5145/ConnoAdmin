import React, { useState, useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import "./ProfitTracker.css";
import url from "../Config/URL";
import Loading from "../components/Loading";

function OfferDetails(props) {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    fetch(`${url}/offer/details/${props.match.params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((details) => {
          setDetails(details);
          setLoading(false);
        });
      }
    });
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className="profitTracker" style={{ marginBottom: 30 }}>
      <div style={{ textAlign: "left", margin: "30px 45px" }}>
        <h2>{details.title}</h2>
        <p>{details.description}</p>
      </div>
      <div
        style={{
          boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
          padding: 15,
          borderRadius: 10,
          width: 620,
          margin: "15px auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img width={192} height={138} src={details.image} alt="Instruction" />
        </div>
        {details.details_link && (
          <a
            href={details.details_link}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <h4
              style={{
                color: "#000",
                backgroundColor: "#eba21c",
                padding: "10px 0",
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
                boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
              }}
            >
              Navigate to external offer page &nbsp;{" "}
              <LaunchIcon style={{ color: "cornflowerblue" }} />
            </h4>
          </a>
        )}
        <h2
          style={{
            margin: "20px 0",
            padding: "10px 16px",
            color: "#03989e",
            background: "#e3e3e3",
            textAlign: "left",
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: ".05em",
          }}
        >
          Detailed Description
        </h2>
        {/* <p>{details.detailed_description}</p> */}
        {/* change this to */}
        <pre
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "left",
          }}
        >
          {details.detailed_description}
        </pre>
      </div>
    </div>
  );
}

export default OfferDetails;
