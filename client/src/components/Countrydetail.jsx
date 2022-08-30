import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";
import { useEffect } from "react";
import "./Countrydetail.css"

export default function Detail(props){
    console.log(props)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])


const country = useSelector((state)=>state.detail);

return(
    <div class="shadow-div">
        <Link to="/home">
            <button class="Back-home">Back to home</button>
        </Link>
    <div class="detail-container">
        {
            country.length > 0 ?
            <div>
                <img src={country[0].flagimg} width="500px" height="350px"/>
                <div class="principal-text">
                <h2>ID: {country[0].id}</h2>
                <h1>Name: {country[0].name}</h1>
                <h2>Capital: {country[0].capital}</h2>
                </div>
                <div class="secundary-text">
                <p class="sub">Subregion: {country[0].subregion}</p>
                <p class="sub">Area: {country[0].area}km²</p>
                <p class="sub">Population: {country[0].population} persons</p>
                <p class="sub">Tourist Activities: {country[0].TouristActivities.map(el=> el.name + (','))}</p>
                </div>
            </div> : <p class="not-found">Country not found</p>
        }
    </div>
    </div>
)
} 