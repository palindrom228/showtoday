import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import logo from './img/logo.svg'

export const Header = () => {
    return(
        <div className="row head">
            <img className="col s2 offset-s5" src={logo} alt=""></img>
        </div>
    )
}

export default Header