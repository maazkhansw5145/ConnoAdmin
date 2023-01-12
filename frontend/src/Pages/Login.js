import React, { useState, useEffect } from "react";
import { Face, Fingerprint } from "@mui/icons-material";
import { login } from "../Redux/actions/authActions";

import { connect } from "react-redux";

const LoginForm = (props) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.auth.msg === "Login Successfully" && props.auth.token) {
      console.log(props.auth.token)
      props.history.push(`/offers`);
    } else if (props.auth.msg === "Wrong Credentials") {
      setError("Wrong Credentials");
    }
  }, [props.auth]);

  return (
    <div
      style={{
        background: "aliceblue",
        width: "50%",
        margin: "35px auto",
        padding: 20,
        borderRadius: 30,
      }}
    >
      <h2 style={{ marginLeft: 50, color: "rgb(172 29 29)" }}>
        Admin Panel Login
      </h2>

      <div style={{ margin: "70px" }}>
        <div style={{ marginBottom: "20px " }}>
          <div style={{ display: "inline-flex", marginBottom: "10px" }}>
            <div style={{ marginRight: 40 }}>
              <Face style={{ fontSize: 40 }} />
            </div>
            <div>
              <input
                placeholder="Login Id"
                onChange={(e) => setLoginId(e.target.value)}
                name="login Id"
                value={loginId}
                style={{ padding: 10, borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "inline-flex", marginBottom: "10px" }}>
            <div style={{ marginRight: 40 }}>
              <Fingerprint style={{ fontSize: 40 }} />
            </div>
            <div>
              <input
                placeholder="Passowrd"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                style={{ padding: 10, borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
        {error ? (
          <div>
            <p
              style={{
                width: "100%",
                background: "#f2dddd",
                borderRadius: 15,
                padding: 10,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                border: "1px solid red",
                color: "black",
                marginBottom: 15,
                alignItems: "center",
              }}
            >
              {error}
            </p>
          </div>
        ) : (
          ""
        )}
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => props.login({ loginId, password })}
            disabled={loginId.length < 8 || password.length < 8}
            style={{
              padding: "10px 30px",
              borderRadius: 15,
              color:
                loginId.length < 8 || password.length < 8 ? "black" : "white",
              background:
                loginId.length < 8 || password.length < 8
                  ? "lightgray"
                  : "cornflowerblue",
              borderWidth: 0,
              boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
              cursor: (loginId.length > 8 || password.length > 8) && "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(mapStateToProps, { login })(LoginForm);
