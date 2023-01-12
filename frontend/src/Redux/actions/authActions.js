import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
  LOGIN_FAIL,
} from "../Types";
import url from "../../Config/URL";

export const login = (data) => (dispatch) => {
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log("LOGIN Response", res);
    if (res.status === 200) {
      res.json().then((token) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: token,
        });
      })
      
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const clearAuthMsg = () => async (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_MSG,
  });
};
