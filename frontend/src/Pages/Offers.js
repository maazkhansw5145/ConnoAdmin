import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import url from "../Config/URL";
import OfferCard from "../components/OfferCard";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function Offers(props) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offersType, setOffersType] = useState("casino");

  useEffect(() => {
    if (props.auth.msg !== "Login Successfully") {
      props.history.push("/");
    } else if (props.auth.token) {
      getOffers();
    }
  }, [props.auth, offersType]);
console.log(offersType)
  const getOffers = async () => {
    // let token = await JSON.parse(window.localStorage.getItem("persist:auth"))
    //   .token;
    fetch(`${url}/offers/${offersType}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("LOGIN Response", res);
      if (res.status === 200) {
        res.json().then((offers) => {
          setOffers(offers);
          setLoading(false);
        });
      }
    });
  };

  const deleteOffer = async (id) => {
    let token = await JSON.parse(window.localStorage.getItem("persist:auth"))
      .token;
    fetch(`${url}/offer/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Offer Delete Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getOffers();
      }
    });
  };

  const orderUp = (order) => {
    console.log("ORDER",order)
    fetch(`${url}/offer/order/up/${offersType}/${order}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      toast.success("Offer Moved Upwards", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(true)
      getOffers();
    });
  };

  const orderDown = (order) => {
    console.log(order)
    fetch(`${url}/offer/order/down/${offersType}/${order}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      toast.success("Offer Moved Downwards", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(true)

      getOffers();
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ display: "flex", margin: 15 }}>
        <div style={{ marginLeft: "auto" }}>
          <select
            id="types"
            value={offersType}
            onChange={(e) => setOffersType(e.target.value)}
            style={{ padding: "10px 20px", borderRadius: 10 }}
          >
            <option value="sports">Sports</option>
            <option value="casino">Casino</option>
          </select>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 25px",
              borderRadius: 10,
              background: "cornflowerblue",
              borderWidth: 0,
              color: "white",
              boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
              cursor: "pointer",
            }}
            onClick={() => props.history.push("/add/offer")}
          >
            <AddIcon /> &nbsp; Add Offer
          </button>
        </div>
      </div>

      {offers.length === 0 ? (
        <div
          style={{
            width: 600,
            background: "aliceblue",
            padding: 50,
            borderRadius: 20,
            margin: "111px auto",
          }}
        >
          <h2>
            Currently there is no offer, Click on the top right{" "}
            <span style={{ color: "cornflowerblue" }}>"Add Offer"</span>
            button to add one.
          </h2>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
            padding: 8,
            borderRadius: 10,
            width: 580,
            margin: "20px auto",
          }}
        >
          <h3 style={{ textAlign: "start", marginLeft: 15 }}>
            Following are the offers
          </h3>
          <hr style={{ margin: "25px 0" }} />
          {offers.map((offer, index) => {
            console.log(index + 1, offers.length);
            return (
              <OfferCard
                {...props}
                offer={offer}
                deleteOffer={deleteOffer}
                key={index}
                last={index + 1 === offers.length}
                orderUp={orderUp}
                orderDown={orderDown}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Offers);
