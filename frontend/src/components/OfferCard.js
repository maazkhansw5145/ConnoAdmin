import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { IconButton } from "@mui/material";
import {
  DeleteForever,
  Edit,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import ConfirmationModal from "./ConfirmationModal";
import { Link } from "react-router-dom";
function OfferCard(props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {props.offer.order !== 1 && (
            <IconButton
              onClick={() => props.orderUp(props.offer.order)}
              style={{ background: "aliceblue", marginRight: 15 }}
            >
              <KeyboardArrowUp style={{ color: "cornflowerblue" }} />
            </IconButton>
          )}
          {!props.last && (
            <IconButton
              onClick={() => props.orderDown(props.offer.order)}
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
              pathname: `/offer/update/${props.offer._id}`,
              query: {
                id: props.offer._id,
                title: props.offer.title,
                description: props.offer.description,
                detailed_description: props.offer.detailed_description,
                tags: props.offer.tags,
                price: props.offer.price,
                image: props.offer.image,
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
        <div style={{ marginBottom: 20 }}>
          <img width={182} height={128} src={props.offer.image} alt="offer" />
          <div style={{ background: "rgb(2, 122, 126)" }}>
            <p style={{ marginTop: 0, padding: 6, color: "white" }}>
              Training Guid: {props.offer.price} USDT
            </p>
          </div>
        </div>
        {/* desc, detailed desc etc */}
        <div style={{ marginLeft: 15, textAlign: "left", width: 340 }}>
          <h4 style={{ marginTop: 0 }}>{props.offer.title}</h4>
          <p>{props.offer.description}</p>
          {/* <p>Steps Completed: 0/1</p>
          <LinearProgress
            variant="buffer"
            value={10}
            style={{ background: "lightgray" }}
          /> */}

          {/* tags */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 100,
            }}
          >
            <div style={{ marginTop: "auto", display: "flex" }}>
              {props.offer.tags.map((tag) => {
                return (
                  <p
                    style={{
                      background: "lightgray",
                      fontWeight: 700,
                      padding: "2px 10px",
                      fontSize: 12,
                      marginRight: 5,
                    }}
                  >
                    {tag.text}
                  </p>
                );
              })}
            </div>
            <Link
              to={{
                pathname: `/offer/details/${props.offer._id}`,
                query: {
                  id: props.offer._id,
                  title: props.offer.title,
                  description: props.offer.description,
                  detailed_description: props.offer.detailed_description,
                  tags: props.offer.tags,
                  price: props.offer.price,
                  image: props.offer.image,
                  details_link: props.offer.details_link,
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
              Offer Details
            </Link>
          </div>
        </div>
      </div>
      <hr style={{ margin: "25px 0" }} />
      <ConfirmationModal
        deleteOffer={props.deleteOffer}
        id={props.offer._id}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default OfferCard;
