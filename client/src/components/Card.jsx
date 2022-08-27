import React from "react";
import './Card.css'
export default function Card({name, continent, flagimg}){
    return (
        <div class="card-div">
            <div class="div-img">
            <img src={flagimg} alt="Flag not found" class="img"/>
            </div>
            <div class="data">
            <h3 class="name">{name}</h3>
            <h5 class="continent">{continent}</h5>
            </div>
        </div>
    )
}