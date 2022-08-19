import React from "react";
import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {getCountries} from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home(){
    const dispatch = useDispatch()
    const allCountries= useSelector((state)=> state.countries)

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries)
    }

    return(
        <div>
            <Link to="/countries">Create Activity</Link>
            <h1>Countries :D</h1>
            <button onClick={e=> {handleClick(e)}}>
                Reload all countries
            </button>
            <div>
            <select>
                <option value="UnAlph">No alphabetical order</option>
                <option value='Aasc'>Ascending order</option>
                <option value='Ades'>Descending order</option>
            </select>
            <select>
                <option value="Unpop">No population order</option>
                <option value='Pasc'>Ascending order</option>
                <option value='Pdes'>Descending order</option>
            </select>
            <select>
                <option value="AllC">All continents</option>
                <option value='Ame'>Americas</option>
                <option value='Asi'>Asia</option>
                <option value="Eur">Europe</option>
                <option value="Oce">Oceania</option>
                <option value="Afr">Africa</option>
            </select>
            <select>
                <option value="All">All tourist activity</option>
            </select>
            {
            allCountries?.map((e)=>{
                return(
                    <fragment>
                        <Link to = {"/home/" + e.id}>
                        <Card name={e.name} continent={e.continent} flagimg={e.flagimg}/>
                        </Link>
                    </fragment>
                )
                
            })
            }
            </div>
        </div>
    )
}
