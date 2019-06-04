import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import currentTrack from "./currentTrack";
import error from "./error";

const rootReducer = combineReducers({
  currentTrack,
  error,
  firestore: firestoreReducer
});

export default rootReducer;
