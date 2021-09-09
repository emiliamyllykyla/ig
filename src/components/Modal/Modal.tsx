import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = (props: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div className="modal">{props.children}</div>,
    document.getElementById("modal-root") as Element
  );
};

export default Modal;
