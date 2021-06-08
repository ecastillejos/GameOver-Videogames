import React from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css"
import btnyes from "../../img/btnyes.png"
import btnred from "../../img/btnred.png"

export default function MainPage() {
    return (
        <div className="Main">
            <div className='btn'>
                <NavLink exact to="/home">
                    <img className='btn1'src={btnyes} alt="yes"/>
                </NavLink>
                <NavLink exact to="/home">
                    <img className='btn2'src={btnred} alt="yes"/>
                </NavLink>
            </div>
        </div>
    )
}