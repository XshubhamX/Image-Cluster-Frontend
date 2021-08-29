import React from "react";
import "../pages/CSS/Modal.css";

export const Modal = ({ show, close, subject, message }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Error</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h4>{subject}</h4>
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={close} className="btn-cancel">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
