import React from "react";
import "../sass/Title.scss";
export default function Title({ title }) {
  return (
    <div className="title">
      {title.length > 32 ? `${title.slice(0, 29)}...` : title}
    </div>
  );
}
