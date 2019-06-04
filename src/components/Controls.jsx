import React from "react";
import { connect } from "react-redux";
import { setIsPlaying } from "../store/actions";
import { PlayIcon, StopIcon, NextSongIcon, PrevSongIcon } from "./Icons";
import "../sass/Controls.scss";

const mapStateToProps = state => ({
  isPlaying: state.currentTrack.isPlaying
});

const mapDispatchToProps = dispatch => ({
  setIsPlaying: isPlaying => dispatch(setIsPlaying(isPlaying))
});

const Controls = ({
  onStop,
  onPlay,
  onNext,
  onPrev,
  enablePrevTrack,
  enablePlay,
  enableNextTrack,
  isPlaying,
  setIsPlaying
}) => {
  const toggleIcons = () => {
    if (!enablePlay) {
      return;
    }
    if (isPlaying) {
      onStop();
    } else {
      onPlay();
    }
    setIsPlaying(!isPlaying);
  };
  const prevTrack = () => {
    if (enablePrevTrack) {
      onPrev();
    }
  };
  const nextTrack = () => {
    if (enableNextTrack) {
      onNext();
    }
  };
  return (
    <div className="controls-container">
      <span
        className={enablePrevTrack ? "" : "icon-disabled"}
        onClick={prevTrack}
      >
        <PrevSongIcon />
      </span>
      <div
        className={enablePlay ? "play-button" : "play-button icon-disabled"}
        onClick={toggleIcons}
      >
        {isPlaying ? <StopIcon /> : <PlayIcon />}
      </div>
      <span
        className={enableNextTrack ? "" : "icon-disabled"}
        onClick={nextTrack}
      >
        <NextSongIcon />
      </span>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
