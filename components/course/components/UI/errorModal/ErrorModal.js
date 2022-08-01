import React from "react";

function ErrorModal(props) {
  return (
    <div className="error-parent">
      <div className="error-div">
        <div className="error-inner-div">
          <button onClick={props.onConfirm}>X</button>
          <header>
            <h2>{props.title}</h2>
          </header>
          <div>
            <p>{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
