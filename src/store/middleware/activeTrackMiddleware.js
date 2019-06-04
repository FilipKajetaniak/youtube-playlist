import { CHANGE_CURRENT_TRACK } from "../constants";
import { updateActiveTrack } from "../actions";

const activeTrackMiddleware = ({ dispatch }) => next => action => {
  switch (action.type) {
    case CHANGE_CURRENT_TRACK:
      dispatch(updateActiveTrack(action.payload.id));
      return next(action);
    default:
      return next(action);
  }
};

export default activeTrackMiddleware;
