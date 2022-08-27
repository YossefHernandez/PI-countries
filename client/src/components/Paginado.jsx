import React from "react";
import './Paginado.css'

export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers= []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav class="pagination">
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <button onClick={()=>paginado(number)} class="button">{number}</button>
                ))}
        </nav>
    )
}