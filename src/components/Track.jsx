import React from "react";
import { DeleteIcon } from "../components/Icons";
import { connect } from "react-redux";
import { deleteTrack } from "../store/actions/deleteTrack";
import { changeCurrentTrack } from "../store/actions";
import toMinutes from "../utils/toMinutes";
import "../sass/Track.scss";

const mapDispatchToProps = dispatch => ({
  deleteTrack: id => dispatch(deleteTrack(id)),
  changeCurrentTrack: payload => dispatch(changeCurrentTrack(payload))
});

const Track = ({
  track,
  isDragging,
  deleteTrack,
  changeCurrentTrack,
  onChangeTrackOnDelete
}) => {
  const { title, firebaseId, duration, active } = track;
  const handleDelete = e => {
    e.stopPropagation();
    deleteTrack(firebaseId);
    if (active) {
      onChangeTrackOnDelete();
    }
  };
  return (
    <div
      className={`track ${active && "track-active"} ${isDragging &&
        "track-dragging"}`}
      onClick={() => {
        changeCurrentTrack({
          ...track,
          time: 0
        });
      }}
    >
      <div className="track-info">
        <span className="track-title">{title}</span>
        <div className="fade" />
      </div>
      <span className="track-time">{toMinutes(duration)}</span>
      <div className="track-icons">
        <span onClick={handleDelete}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Track);
