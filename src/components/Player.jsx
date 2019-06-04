import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Youtube from "react-youtube";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import TrackList from "./TrackList";
import Error from "./Error";
import Title from "./Title";
import Cover from "./Cover";
import "../sass/Player.scss";
import useInterval from "../utils/useInterval";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  changeCurrentTrack,
  clearCurrentTrack,
  updateTime,
  setIsPlaying
} from "../store/actions";

const mapStateToProps = state => {
  const order = state.firestore.ordered.trackOrder;
  const rawTrackList = state.firestore.data.tracklist;
  // ADDING FIREBASES ID TO TRACKLIST ARRAY FOR EASIER DELETING FROM DATABASE
  let tracks = [];
  if (rawTrackList) {
    const firebaseTrackListIds = Object.keys(state.firestore.data.tracklist);
    firebaseTrackListIds.forEach(id => {
      tracks.push({
        ...rawTrackList[id],
        firebaseId: id
      });
    });
  }

  return {
    currentTrack: state.currentTrack,
    time: state.currentTrack.time,
    isPlaying: state.currentTrack.isPlaying,
    error: state.error,
    trackList: tracks ? tracks : [],
    tracksOrder: order ? order[0].order : []
  };
};

const mapDispatchToProps = dispatch => ({
  changeCurrentTrack: payload => dispatch(changeCurrentTrack(payload)),
  clearCurrentTrack: () => dispatch(clearCurrentTrack()),
  updateTime: time => dispatch(updateTime(time)),
  setIsPlaying: isPlaying => dispatch(setIsPlaying(isPlaying))
});

const Player = ({
  currentTrack,
  trackList,
  tracksOrder,
  changeCurrentTrack,
  clearCurrentTrack,
  updateTime,
  time,
  isPlaying,
  setIsPlaying,
  error
}) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRewinding, setIsRewinding] = useState(false);
  const [options, setOptions] = useState({
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0,
      start: time
    }
  });
  useInterval(() => {
    if (isPlaying && !isRewinding) {
      updateTime(player.getCurrentTime());
    }
  }, 1000);
  const _onReady = e => {
    setPlayer(e.target);
    setLoading(false);
  };
  const _onPlay = () => {
    setIsPlaying(true);
    setOptions({
      ...options,
      playerVars: {
        ...options.playerVars,
        autoplay: 1
      }
    });
    setLoading(false);
  };
  const stopVideo = () => {
    if (loading) {
      setLoading(false);
    }
    if (!player) {
      return;
    }
    setIsPlaying(false);
    player.pauseVideo();
    setOptions({
      ...options,
      playerVars: {
        ...options.playerVars,
        autoplay: 0
      }
    });
  };
  const playVideo = () => {
    if (!player) {
      return;
    }
    setLoading(true);
    player.playVideo();
  };

  const sliderGrab = () => {
    setIsRewinding(true);
    player.pauseVideo();
  };

  const sliderRelease = () => {
    setIsRewinding(false);
    if (isPlaying) {
      player.seekTo(time);
      playVideo();
    } else {
      setOptions({
        ...options,
        playerVars: {
          ...options.playerVars,
          start: time
        }
      });
    }
  };

  useEffect(() => {
    if (!!currentTrack.id && !tracksOrder.length) {
      clearCurrentTrack();
    }
    if (!currentTrack.id && trackList.length && tracksOrder.length) {
      changeCurrentTrack(
        trackList.find(track => track.firebaseId === tracksOrder[0])
      );
    }
  }, [currentTrack, trackList, tracksOrder]);

  const _onEnd = () => {
    if (nextTrack) {
      playNext();
    } else {
      stopVideo();
      updateTime(0);
      setIsPlaying(false);
      setOptions({
        ...options,
        playerVars: {
          ...options.playerVars,
          start: 0,
          autoplay: 0
        }
      });
    }
  };

  const _onPause = e => {
    if (isRewinding) {
      return;
    }
    setIsPlaying(false);
    setOptions({
      ...options,
      playerVars: {
        ...options.playerVars,
        start: e.target.getCurrentTime()
      }
    });
    updateTime(e.target.getCurrentTime());
  };
  const prevTrack = trackList.find(track => {
    return (
      track.firebaseId ===
      tracksOrder[tracksOrder.indexOf(currentTrack.firebaseId) - 1]
    );
  });
  const nextTrack = trackList.find(track => {
    return (
      track.firebaseId ===
      tracksOrder[tracksOrder.indexOf(currentTrack.firebaseId) + 1]
    );
  });

  const resetTrackStart = () => {
    setOptions({
      ...options,
      playerVars: {
        ...options.playerVars,
        start: 0
      }
    });
  };

  const activeTracks = track => {
    if (track.firebaseId === currentTrack.firebaseId) {
      return {
        ...track,
        active: true
      };
    }
    return {
      ...track,
      active: false
    };
  };

  const playNext = () => {
    updateTime(0);
    resetTrackStart();
    changeCurrentTrack(nextTrack);
  };
  const playPrev = () => {
    updateTime(0);
    resetTrackStart();
    changeCurrentTrack(prevTrack);
  };
  const changeTrackOnDelete = () => {
    if (prevTrack) {
      playPrev();
    } else if (nextTrack) {
      playNext();
    } else {
      resetTrackStart();
    }
  };
  return (
    <div className="player">
      <div>
        {error && <Error error={error} />}
        <Youtube
          videoId={currentTrack.id}
          opts={options}
          onReady={_onReady}
          onPlay={_onPlay}
          onEnd={_onEnd}
          onPause={_onPause}
        />
      </div>
      <Cover
        loading={loading}
        img={currentTrack.img}
        prevImg={prevTrack ? prevTrack.img : null}
        nextImg={nextTrack ? nextTrack.img : null}
        onNext={playNext}
        onPrev={playPrev}
      />
      <div className="player-container">
        <Title title={currentTrack.title} />
        <Controls
          onStop={stopVideo}
          onPlay={playVideo}
          onNext={playNext}
          onPrev={playPrev}
          enablePlay={!!currentTrack.duration}
          enablePrevTrack={!!prevTrack}
          enableNextTrack={!!nextTrack}
        />
        <ProgressBar
          time={Math.floor(time)}
          duration={currentTrack.duration}
          onGrab={sliderGrab}
          onRelease={sliderRelease}
        />
        <TrackList
          trackList={trackList.map(activeTracks)}
          tracksOrder={tracksOrder}
          onChangeTrackOnDelete={changeTrackOnDelete}
        />
      </div>
    </div>
  );
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "tracklist" }, { collection: "trackOrder" }])
)(Player);
