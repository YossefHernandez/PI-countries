import React from "react";
import {useState, useEffect} from "react"
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Createactivity.css"
function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = "Please enter the name of the activity"
    }else if(input.difficulty > 5 || input.difficulty <= 0){
        errors.difficulty = "Please enter the difficulty between 1 and 5"
    }else if(input.duration > 24 || input.duration <= 0){
        errors.duration = "Please enter the activity time between 1 to 24 hours"
    }else if(!input.season){
        errors.season = "Please enter any season (Spring, Summer, Autumn, Winter)"
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
                        
                        <button type="submit" >Ready!</button>
                    </div>
                </div>
            </form>
            </div>
            </div>
            {input.countryId.map(el =>
                <div>
                    <p>
                        {el}
                    </p>
                    <button onClick={()=>handleDelete(el)}>X</button>
                </div>)}
        </div>
    )

}