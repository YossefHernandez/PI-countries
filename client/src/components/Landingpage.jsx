import React from 'react'
import {Link} from 'react-router-dom'
import "./Landingpage.css"

export default function LandingPage(){
    return(
        <div class='background'>
        <div class="container">
            <h1 class="title">Welcome To Countries</h1>
            <Link to='/home'>
                <button class="enter">Enter</button>
            </Link>
        </div>
        </div>
    )
}