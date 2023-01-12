import React, { useState } from "react";
import { IconButton } from "@mui/material";
import {
  DeleteForever,
  Edit,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import ConfirmationModal from "./ConfirmationModal";
import { Link } from "react-router-dom";

function InstructionsCard(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {props.instructions.order !== 1 && (
            <IconButton
              onClick={() => props.orderUp(props.instructions.order)}
              style={{ background: "aliceblue", marginRight: 15 }}
            >
              <KeyboardArrowUp style={{ color: "cornflowerblue" }} />
            </IconButton>
          )}
          {!props.last && (
            <IconButton
              onClick={() => props.orderDown(props.instructions.order)}
              style={{ background: "aliceblue", marginRight: 15 }}
            >
              <KeyboardArrowDown style={{ color: "#ee2828" }} />
            </IconButton>
          )}
        </div>
        <div style={{ textAlign: "right", marginBottom: 15 }}>
          <IconButton
            onClick={() => setOpen(true)}
            style={{ background: "aliceblue", marginRight: 15 }}
          >
            <DeleteForever style={{ color: "#ee2828" }} />
          </IconButton>
          <Link
            to={{
              pathname: `/update/instructions/${props.instructions._id}`,
              query: {
                id: props.instructions._id,
                title: props.instructions.title,
                description: props.instructions.description,
                detailed_description: props.instructions.detailed_description,
                image: props.instructions.image,
                type: props.instructions.type,
              },
            }}
          >
            <IconButton style={{ background: "aliceblue" }}>
              <Edit style={{ color: "#2261d4" }} />
            </IconButton>
          </Link>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {/* image & price */}
        <img width={182} height={128} src={props.instructions.image} alt="offer" />
        {/* desc, detailed desc etc */}
        <div style={{ marginLeft: 15, textAlign: "left", width: 340 }}>
          <h4 style={{ marginTop: 0 }}>{props.instructions.title}</h4>
          <p>{props.instructions.description}</p>
          {/* <p>Steps Completed: 0/1</p>
          <LinearProgress
            variant="buffer"
            value={10}
            style={{ background: "lightgray" }}
          /> */}

          {/* tags */}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "80px 20px 0 20px",
        }}
      >
        <div style={{ marginTop: "auto", display: "flex" }}>
          <p
            style={{
              background:
                props.instructions.type !== "premium" ? "lightgray" : "gold",
              fontWeight: 700,
              padding: "4px 10px",
              fontSize: 12,
              marginRight: 5,
              textTransform: "uppercase",
            }}
          >
            {props.instructions.type}
          </p>
        </div>
        <Link
          to={{
            pathname: `/instructions/details/${props.instructions._id}`,
            query: {
              id: props.instructions._id,
              title: props.instructions.title,
              description: props.instructions.description,
              detailed_description: props.instructions.detailed_description,
              type: props.instructions.type,
              image: props.instructions.image,
              details_link: props.instructions.details_link,
            },
          }}
          style={{
            background: "#eba21c",
            padding: "10px 30px",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            color: "black",
          }}
        >
          Instructions Details
        </Link>
      </div>
      <hr style={{ margin: "25px 0" }} />
      <ConfirmationModal
        deleteOffer={props.deleteInstruction}
        id={props.instructions._id}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default InstructionsCard;
