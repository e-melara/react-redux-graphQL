import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import charactersReducer, { reviewFavorituesAction } from "./characterDuck";
import { userReducer, readStorage } from "./userDuck";

//actions
import { startGetCharacters } from "./characterDuck";

const rootReducers = combineReducers({
 user: userReducer,
 characters: charactersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const generateStore = () => {
 const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
 );
 startGetCharacters()(store.dispatch);
 readStorage()(store.dispatch);
 reviewFavorituesAction()(store.dispatch, store.getState);
 return store;
};
