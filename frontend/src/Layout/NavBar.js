import React from "react";
import "./NavBar.css";
import { connect } from "react-redux";
import { logout } from "../Redux/actions/authActions";

import { NavLink } from "react-router-dom";

function NavBar(props) {
  return (
    <div className="navbar">
      <NavLink to="/offers" className="title" exact>
        ProfitOutcome - Admin Panel
      </NavLink>
      {props.auth.isAuthenticated && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <NavLink
            to="/instructions"
            className="title"
            exact
            activeStyle={{
              color: "coral",
              textDecoration: "overline",
            }}
          >
            Instructions
          </NavLink>
          <NavLink
            to="/profit/tracker"
            className="title"
            exact
            activeStyle={{
              color: "coral",
              textDecoration: "overline",
            }}
          >
            Profit Tracker
          </NavLink>
          <NavLink
            to="/premium/users"
            className="title"
            exact
            activeStyle={{
              color: "coral",
              textDecoration: "overline",
            }}
          >
            Premium Users
          </NavLink>
          <NavLink
            to="/offers"
            className="title"
            exact
            activeStyle={{
              color: "coral",
              textDecoration: "overline",
            }}
            style={{ marginRight: 20 }}
          >
            Offers
          </NavLink>
          <div
            style={{
              borderLeft: "1px solid rgb(148 242 227)",
              height: 35,
              marginRight: 12,
            }}
          />
          <button
            onClick={() => props.logout()}
            className="login"
            style={{ background: "none", borderWidth: 0, marginRight: 12 }}
          >
            Logout
          </button>
          <div
            style={{
              borderLeft: "1px solid rgb(148 242 227)",
              height: 35,
              marginRight: 12,
            }}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
