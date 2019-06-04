import {
  CHANGE_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  UPDATE_ACTIVE_TRACK,
  UPDATE_TIME,
  SET_IS_PLAYING,
  THROW_ERROR,
  CLEAR_ERROR
} from "../constants";

export const changeOrder = payload => (
  dispatch,
  getState,
  { getFirestore }
) => {
  getFirestore()
    .collection("trackOrder")
    .doc("IjsAb6HMd19dpmqhs3Eo")
    .update({
      order: payload
    });
};
export const changeCurrentTrack = payload => {
  return {
    type: CHANGE_CURRENT_TRACK,
    payload
  };
};
export const clearCurrentTrack = () => ({ type: CLEAR_CURRENT_TRACK });
export const updateActiveTrack = id => {
  return { type: UPDATE_ACTIVE_TRACK, id };
};
export const updateTime = time => ({ type: UPDATE_TIME, time });
export const setIsPlaying = isPlaying => ({ type: SET_IS_PLAYING, isPlaying });
export const throwError = message => ({ type: THROW_ERROR, message });
export const clearError = () => ({ type: CLEAR_ERROR });
