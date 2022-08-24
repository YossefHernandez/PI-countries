import React from "react";
import {useState, useEffect} from "react"
import { Link, useHistory } from "react-router-dom";
import { postActivity, getActivities } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";

export function createActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.activities)

    const [input, setInput] = useState({
        name:"",
        difficulty:0,
        duration:0,
        season:"",
        countryId:""
    })

    useEffect(()=>{
        dispatch(getActivities())
    }, [])
}