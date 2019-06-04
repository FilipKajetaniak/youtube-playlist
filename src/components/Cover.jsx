import React from "react";
import { LoadingIcon } from "./Icons";

import "../sass/Cover.scss";
export default function Cover({
  loading,
  img,
  prevImg,
  nextImg,
  onPrev,
  onNext
}) {
  return (
    <div className="cover">
      {prevImg && (
        <div
          className="prev-cover"
          onClick={onPrev}
          style={prevImg ? { backgroundImage: `url(${prevImg})` } : {}}
        />
      )}
      <div
        className={img ? "current-cover" : "current-cover no-img"}
        style={img ? { backgroundImage: `url(${img})` } : {}}
      />
      {nextImg && (
        <div
          className="next-cover"
          onClick={onNext}
          style={nextImg ? { backgroundImage: `url(${nextImg})` } : {}}
        />
      )}
      {loading && (
        <div className="loading-icon-container">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}
