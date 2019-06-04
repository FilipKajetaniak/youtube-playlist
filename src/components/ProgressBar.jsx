import React from "react";
import toMinutes from "../utils/toMinutes";
import "../sass/ProgressBar.scss";
import { updateTime } from "../store/actions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  reduxtime: state.currentTrack.time
});

const mapDispatchToProps = dispatch => ({
  updateTime: time => dispatch(updateTime(time))
});

const ProgressBar = ({ time, duration, onGrab, onRelease, updateTime }) => {
  return (
    <div className="progress-bar-container">
      <div className="input-container">
        {!!duration && (
          <input
            type="range"
            min="0"
            max={duration}
            onChange={e => updateTime(e.target.value)}
            value={time}
            className="slider"
            id="myRange"
            onMouseDown={onGrab}
            onTouchStart={onGrab}
            onTouchEnd={onRelease}
            onMouseUp={onRelease}
          />
        )}
        <div className="progress-bar" />
        <div
          className="progress-fill"
          style={{ width: `${(time / duration) * 100}%` }}
        />
      </div>
      <div className="labels-container">
        <span className="time-label">{toMinutes(time)}</span>
        <span className="length-label">{toMinutes(duration)}</span>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBar);
