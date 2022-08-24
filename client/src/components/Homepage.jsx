import React from "react";
import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {getCountries, filterCountriesContinent, orderByName, orderByPopulation} from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./Searchbar";

export default function Home(){
    const dispatch = useDispatch()
    const allCountries= useSelector((state)=> state.countries)
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry= indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    const [orden, setOrden]= useState('')
    const [ordenByPop, setOrdenbyPop]= useState('')


    const paginado= (pageNumber) =>{
        setCurrentPage(pageNumber)
    }



    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries)
    }

    function handleFilterContinent(e){
        dispatch(filterCountriesContinent(e.target.value))
    }
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortPop(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrdenbyPop(`Ordenado ${e.target.value}`)
    }

    return(
        <div>
            <Link to="/countries">Create Activity</Link>
            <h1>Countries :D</h1>
            <button onClick={e=> {handleClick(e)}}>
                Reload all countries
            </button>
            <div>
            <select onChange={e=>handleSort(e)}>
                <option value='Aasc'>Ascending order</option>
                <option value='Ades'>Descending order</option>
            </select>
            <select onChange={e=>handleSortPop(e)}>
                <option value='Pasc'>Ascending order</option>
                <option value='Pdes'>Descending order</option>
            </select>
            <select onChange={e=>handleFilterContinent(e)}>
                <option value="All continents">All continents</option>
                <option value='Americas'>Americas</option>
                <option value='Asia'>Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Africa">Africa</option>
                <option value="Antarctic">Antarctic</option>
            </select>
            <select>
                <option value="All">All tourist activity</option>
            </select>
            <Paginado
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
            />
            <SearchBar/>
            {
            currentCountries?.map((e)=>{
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
