import React from "react";
import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {getCountries, filterCountriesContinent, orderByName, orderByPopulation} from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./Searchbar";
import "./Homepage.css"

export default function Home(){
    const dispatch = useDispatch()
    const allCountries= useSelector((state)=> state.countries)
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry= indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    const [orden, setOrden]= useState('')
    const [ordenByPop, setOrdenbyPop]= useState('')
    
    if(currentPage === 1 && countriesPerPage === 10) {
        setCountriesPerPage(9) 
      } else if(currentPage !== 1 && countriesPerPage === 9) {
        setCountriesPerPage(10)
      }

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
        <div class="principal-div">
            <div class="header-div">
                    <h1 class="title">Countries</h1>
                    <SearchBar/>
                    <Link to="/createActivity"><button className="button-create">Create Activity</button></Link>
                    <button onClick={e=> handleClick(e)}className="button-reload">
                                    Reload all countries
                    </button>
            </div>
            <div>
            <div class="select">
                <div class="filter-text">
                <p>Filter by name</p>
                </div>
            <select onChange={e=>handleSort(e)}>
                <option value='Aasc'>A - Z</option>
                <option value='Ades'>Z- A</option>
            </select>
            <div className="filter-text">
            <p>Filter by population</p>
            </div>
            <select onChange={e=>handleSortPop(e)}>
                <option value='Pasc'>Ascending order</option>
                <option value='Pdes'>Descending order</option>
            </select>
            <div className="filter-text">
            <p>Filter by continent</p>
            </div>
            <select onChange={e=>handleFilterContinent(e)}>
                <option value="All continents">All continents</option>
                <option value='Americas'>Americas</option>
                <option value='Asia'>Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Africa">Africa</option>
                <option value="Antarctic">Antarctic</option>
            </select>
            <div className="filter-text">
            <p>Filter by tourist activity</p>
            </div>
            <select>
                <option value="All">XD</option>
            </select>
            </div>
            <Paginado
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
            />
                <div class="cards-div">
            {
            currentCountries?.map((e)=>{
                return(
                        <Link to = {"/home/" + e.id} class="linkto">
                        <Card name={e.name} continent={e.continent} flagimg={e.flagimg}/>
                        </Link>
                )
                
            })
            }
                    </div>
            </div>
        </div>
    )
}
