import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import "../sass/AddTrack.scss";
import { addTrack } from "../store/actions/addTrack";
import { throwError } from "../store/actions";

const mapDispatchToProps = dispatch => ({
  addTrack: id => dispatch(addTrack(id)),
  throwError: message => dispatch(throwError(message))
});
const AddTrack = ({ addTrack, throwError }) => {
  const [showInput, setShowInput] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showInput]);
  const submitTrack = () => {
    if (url.includes("?v=")) {
      addTrack(url.substr(url.indexOf("?v=") + 3, 11));
      setUrl("");
      setShowInput(false);
    } else if (url.includes("youtu.be/")) {
      addTrack(url.substr(url.indexOf("youtu.be/") + 9, 11));
      setUrl("");
      setShowInput(false);
    } else {
      throwError("Ooops! Seems like the URL is incorrect!");
    }
  };
  return (
    <div className="add-track-container">
      {showInput ? (
        <div className="add-track-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter youtube url here"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button className="add-track-button" onClick={() => submitTrack()}>
            Add
          </button>
          <button
            className="cancel-track-button"
            onClick={() => {
              setShowInput(false);
              setUrl("");
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="add-track" onClick={() => setShowInput(true)}>
          Add track
        </div>
      )}
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(AddTrack);
