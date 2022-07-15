import React from "react";
import './Card.css'

function Card (props){
    const classes = `card ${props.classes}`;
    return <div  className={classes}>
        {props.children}
    </div>
}

export default Card;