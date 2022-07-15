import React from "react";
import './ErrorModal.css';

function ErrorModal(props){
    return(

        <div className='error-div'>
            <header>
                <h2>{props.title}</h2>
            </header>
            <div>
                <p>{props.message}</p>
            </div>
            <button  onClick={props.onConfirm}>okay</button>
        </div>

    )
}

export default ErrorModal;