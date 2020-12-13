import { loginWithGoogle, loginOut } from "../firebase";
import { reviewFavorituesAction } from "./characterDuck";

//constantes
const initState = {
 loggin: false,
 fetching: false,
};
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
//reducers
export const userReducer = (state = initState, action) => {
 switch (action.type) {
  case LOGOUT:
   return { ...initState };
  case LOGIN:
   return {
    ...state,
    fetching: true,
   };
  case LOGIN_ERROR: {
   return { ...state, fetching: false, error: action.payload };
  }
  case LOGIN_SUCCESS:
   return { ...state, fetching: false, ...action.payload, loggin: true };
  default:
   return state;
 }
};

// aux
function saveStorage(storage) {
 localStorage.storage = JSON.stringify(storage);
}

function removeStorage() {
 localStorage.removeItem("storage");
}

export const logoutAction = () => (dispatch) => {
 loginOut();
 dispatch({
  type: LOGOUT,
 });
 removeStorage();
};

export const readStorage = () => (dispatch) => {
 const storage = JSON.parse(localStorage.getItem("storage"));
 if (storage && storage.user) {
  dispatch({
   type: LOGIN_SUCCESS,
   payload: storage.user,
  });
 }
};

//actions
export const doGoogleLoginAction = () => (dispatch, getState) => {
 dispatch({
  type: LOGIN,
 });

 return loginWithGoogle()
  .then((user) => {
   dispatch({
    type: LOGIN_SUCCESS,
    payload: {
     uid: user.uid,
     email: user.email,
     photoURL: user.photoURL,
     displayName: user.displayName,
    },
   });
   saveStorage(getState());
   reviewFavorituesAction()(dispatch, getState);
  })
  .catch((err) => {
   dispatch({
    type: LOGIN_ERROR,
    payload: err.message,
   });
  });
};
