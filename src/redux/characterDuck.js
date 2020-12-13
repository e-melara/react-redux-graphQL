import axios from "axios";
import { updateDB, reviewFav } from "../firebase";

//constantes
const initial_state = {
 array: [],
 current: {},
 favoritus: [],
 fetching: false,
 fetchingFav: false,
};

// FAVORITOS
const ADD_FAVORITUS = "ADD_FAVORITUS";
const REMOVE_CHARACTER = "REMOVE_CHARACTER";

const GET_FAVS = "GET_FAVS";
const GET_FAVS_ERROR = "GET_FAVS_ERROR";
const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";

//CHARACTERS
const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCESS";

const URL = "https://rickandmortyapi.com/api/character";
//reducers
export default function reducer(state = initial_state, action) {
 switch (action.type) {
  case GET_FAVS:
   return { ...state, fetchingFav: true };
  case GET_FAVS_ERROR:
   return { ...state, fetchingFav: false, error: action.payload };
  case GET_FAVS_SUCCESS:
   return { ...state, fetchingFav: false, favoritus: action.payload };

  case ADD_FAVORITUS: {
   return { ...state, ...action.payload };
  }
  case REMOVE_CHARACTER:
   return { ...state, array: action.payload };
  case GET_CHARACTERS_SUCCESS:
   return {
    ...state,
    fetching: false,
    array: action.payload,
   };
  case GET_CHARACTERS:
   return {
    ...state,
    fetching: true,
   };

  case GET_CHARACTERS_ERROR:
   return {
    ...state,
    fetching: false,
    err: action.payload,
   };
  default:
   return state;
 }
}
//actions(thunk)

export const reviewFavorituesAction = () => async (dispatch, getState) => {
 const { uid } = getState().user;
 dispatch({
  type: GET_FAVS,
 });
 try {
  const results = await reviewFav(uid);
  dispatch({
   type: GET_FAVS_SUCCESS,
   payload: [...results],
  });
 } catch (error) {
  dispatch({
   type: GET_FAVS_ERROR,
   error: error.message,
  });
 }
};
export const addFavoritus = () => (dispatch, getState) => {
 const { array, favoritus } = getState().characters;
 const { uid } = getState().user;
 const char = array.shift();
 favoritus.push(char);
 updateDB(favoritus, uid);
 dispatch({
  type: ADD_FAVORITUS,
  payload: {
   array: [...array],
   favoritus: [...favoritus],
  },
 });
};

export const removeCharacters = () => (dispatch, getState) => {
 const { array } = getState().characters;
 array.shift();
 return dispatch({
  type: REMOVE_CHARACTER,
  payload: [...array],
 });
};

export const startGetCharacters = () => (dispatch) => {
 dispatch({
  type: GET_CHARACTERS,
 });
 axios
  .get(URL)
  .then((res) => {
   dispatch({
    type: GET_CHARACTERS_SUCCESS,
    payload: res.data.results,
   });
  })
  .catch((err) =>
   dispatch({
    type: GET_CHARACTERS_ERROR,
    payload: err.response.message,
   })
  );
};
