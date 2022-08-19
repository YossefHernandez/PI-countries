import React from "react";

export default function Card({name, continent, flagimg}){
    return (
        <div>
            <img src={flagimg} alt="Flag not found" width="250px" height="200px"/>
            <h3>{name}</h3>
            <h5>{continent}</h5>
        </div>
    )
}