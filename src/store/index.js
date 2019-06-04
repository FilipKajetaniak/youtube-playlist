import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import activeTrackMiddleware from "./middleware/activeTrackMiddleware";
import { getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "../firebase/firebaseConfig";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      activeTrackMiddleware,
      thunk.withExtraArgument({ getFirebase, getFirestore })
    ),
    reduxFirestore(firebase)
  )
);
export default store;
