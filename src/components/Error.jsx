import React, { useEffect, useState } from "react";
import "../sass/Error.scss";
import { connect } from "react-redux";
import { clearError } from "../store/actions";

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearError())
});

const Error = ({ error, clearError }) => {
  const [fade, setFade] = useState(true);
  useEffect(() => {
    setFade(false);
    setTimeout(() => {
      setFade(true);
    }, 2800);
    setTimeout(() => {
      clearError();
    }, 3000);
  }, [error, clearError]);
  return (
    <div className={fade ? "error-container fade-in" : "error-container"}>
      {error}
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Error);
