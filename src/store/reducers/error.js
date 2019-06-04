import { THROW_ERROR, CLEAR_ERROR } from "../constants";

const initialState = "";

export default function currentTrack(state = initialState, action) {
  if (action.type === THROW_ERROR) {
    return action.message;
  } else if (action.type === CLEAR_ERROR) {
    return "";
  }
  return state;
}
