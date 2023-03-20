import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'
import BackgroundImage from '../back2.png'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle }>
            <h1 className="app">Bienvenue sur Dashboard !</h1>
            <div className="app">
                <Link to="/login">
                    <button id="">Se connecter</button>
                </Link>
                &emsp; 
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>Créer un compte</span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}