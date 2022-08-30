import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesName } from "../actions/actions";
import './Searchbar.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountriesName(name))
    }

    return (
        <div className="searchbar-div">
            <input
            class="searchbar-input"
            type='text'
            placeholder="Search country...(with capital letter)"
            onChange={(e)=> handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=> handleSubmit(e)} class="search-button">Search</button>
        </div>
    )
}