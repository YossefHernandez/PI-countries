import React from "react";
import {useState, useEffect} from "react"
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Createactivity.css"
function validate(input){
    var errors = {}
    const onlyLetters = new RegExp('^[A-Z]+$', 'i');
    const onlyNumbers= new RegExp("^[0-9]+$")
    let seasons = ['Spring', 'Summer', 'Autumn', 'Winter']
    if(!input.name){
        errors.name = "Please enter the name of the activity"
    }else if(!onlyLetters.test(input.name)){
        errors.name = "Please enter name whitout numbers or signs"
    }else if(!onlyNumbers.test(input.difficulty)){
        errors.difficulty = "Please only enter numbers" 
    }else if(input.difficulty > 5 || input.difficulty <= 0){
        errors.difficulty = "Please enter the difficulty between 1 and 5"
    }else if(!onlyNumbers.test(input.duration)){
        errors.duration = "Please only enter numbers"
    }else if(input.duration > 24 || input.duration <= 0){
        errors.duration = "Please enter the activity time between 1 to 24 hours"
    }else if(!onlyLetters.test(input.season)){
        errors.season = "Please enter season"
    }else if(!input.season){
        errors.season = "Please enter any season (Spring, Summer, Autumn, Winter)"
    }else if(seasons.includes(input.season)=== false){
        errors.season = "Please enter a correct season (Spring, Summer, Autumn, Winter)"
    }
    return errors   
}
export default function CreateActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries)
    const history = useHistory()
    const [errors,setErrors]= useState({})

    const sortCountries = countries.sort(function (a, b){
        if (a.name < b.name){
            return -1
        }
        if (b.name < a.name){
            return 1
        }
        return 0
    })

    const [input, setInput] = useState({
        name:"",
        difficulty:0,
        duration:0,
        season:"",
        countryId:[]
    })
    
    useEffect(()=>{
        dispatch(getCountries())
    }, [])
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            countryId:[...new Set([...input.countryId, e.target.value])],
        })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postActivity(input))
        alert("Actividad creada!")
        setInput({
            name: "",
            difficulty: null,
            duration: null,
            season: "",
            countryId: []
        })
        history.push("/home")
    }

    function handleDelete(el){
        setInput({
            ...input,
            countryId: input.countryId.filter(cou => cou !== el)
        })
    }

    function capitalizarPrimeraLetra() {
        if(input.season){
            const palabra = input.season;
            var mayuscula = palabra.substring(0,1).toUpperCase();
            if (palabra.length > 0) {
              var minuscula = palabra.substring(1).toLowerCase();
            }
            input.season = mayuscula.concat(minuscula);
          
          }
    }
    
    function buttonReady(){
        if (Object.entries(errors).length === 0){
            return <button type="submit" class="buttonReady">Ready!</button>
        }else{
            return <p>Please complete the form</p>}
    }
    return(
        <div class="principal-create-div">
            <div class="button-div">
            <Link to="/home"><button class="Back-home-2">Home</button></Link>
            </div>
            <div class='allinput'>
            <div class="tourist-title">
            <h1>Create your tourist activity!</h1>
            </div>
            <div class="select-options">
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                   <div>
                        <label class="input-name">Name</label>
                            <input 
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={e => handleChange(e)}
                            class="css-input"
                            />
                            {errors.name &&(
                                <p>{errors.name}</p>
                            )}
                   </div>

                    <div>
                        <label class="input-name">Difficulty</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={input.difficulty}
                            name="difficulty"
                            onChange={e => handleChange(e)}
                            class="css-input"
                            />
                            {errors.difficulty &&(
                                <p>{errors.difficulty}</p>
                            )}
                    </div>

                    <div>
                        <label class="input-name">Duration in hours</label>
                            <input
                            type="number"
                            min="1"
                            max="24"
                            value={input.duration}
                            name="duration"
                            onChange={e => handleChange(e)}
                            class="css-input"
                            />
                            {errors.duration &&(
                                <p>{errors.duration}</p>
                            )}
                    </div>

                    <div>
                        <label class="input-name">Season</label>
                            <input 
                            type="text"
                            value={input.season}
                            name="season"
                            onChange={e => handleChange(e)}
                            class="css-input"
                            onkeyup={capitalizarPrimeraLetra()}
                            />
                            {errors.season &&(
                                <p>{errors.season}</p>
                            )}
                    </div>
                    <div class="select-country">
                        <select onChange={(e)=> handleSelect(e)}>
                            {sortCountries.map((e) => {
                                return(
                                <option key={e.id} value={e.id}>{e.name}</option>
                                )
                            })}
                        </select>
                        {errors.countryId &&(
                                <p>{errors.countryId}</p>
                            )}
                        
                        {buttonReady()}
                        
                    </div>
                </div>
            </form>
            </div>
            {input.countryId.map(el =>
                <div class="country-selected">
                    <p>
                        {el}
                    </p>
                    <button onClick={()=>handleDelete(el)} class="deleteButton">X</button>
                </div>)}
            </div>
        </div>
    )

}