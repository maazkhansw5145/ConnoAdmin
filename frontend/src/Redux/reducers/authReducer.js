import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
} from "../Types";

const initialState = {
  isAuthenticated: null,
  msg: null,
  token: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        msg: "Login Successfully",
        token: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        msg: "Wrong Credentials",
        token: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        msg: "Logout",
        token: null,
      };
    case CLEAR_AUTH_MSG:
      return {
        ...state,
        isAuthenticated: false,
        msg: null,
        token: null,
      };
    default:
      return state;
  }
}
