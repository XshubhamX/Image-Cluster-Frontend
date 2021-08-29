import React from "react";

export const Spinner = () => {
  return (
    <div className="myspinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
