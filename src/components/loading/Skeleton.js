import React from "react";

const Skeleton = (props) => {
  return (
    <div
      className="skeleton"
      style={{
        height: props.height,
        width: props.width || "100%",
        borderRadius: props.rounded,
      }}
    ></div>
  );
};

export default Skeleton;
