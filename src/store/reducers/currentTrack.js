import {
  CHANGE_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  UPDATE_TIME,
  SET_IS_PLAYING
} from "../constants";

const initialState = {
  title: "",
  img: "",
  id: "",
  firebaseId: "",
  time: "",
  duration: "",
  isPlaying: false
};

export default function currentTrack(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_TRACK:
      return action.payload;
    case UPDATE_TIME:
      return {
        ...state,
        time: action.time
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    case CLEAR_CURRENT_TRACK:
      return {
        title: "",
        img: "",
        id: "",
        firebaseId: "",
        time: "",
        duration: "",
        isPlaying: false
      };
    default:
      return state;
  }
}
