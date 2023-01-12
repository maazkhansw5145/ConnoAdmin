import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import '../ProfitTracker.css'
function InstructionsDetails(props) {
  console.log(props.location.query)
  return (
    <div className="profitTracker" style={{marginBottom:30}}>
      <div style={{ textAlign: "left", margin: "30px 45px" }}>
        <h2>{props.location.query.title}</h2>
        <p>{props.location.query.description}</p>
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
       <div style={{display:'flex',justifyContent:'center'}}>
        <img
          width={192}
          height={138}
          src={props.location.query.image}
          alt="Instruction"
        />
        </div>
         {props.location.query.details_link && (
          <a
            href={props.location.query.details_link}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <h4
              style={{
                color: "#000",
                backgroundColor: "#eba21c",
                padding: "10px 0",
                marginTop: 0,
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
        <p>{props.location.query.detailed_description}</p>
      </div>
    </div>
  );
}

export default InstructionsDetails;
