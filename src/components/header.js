import React, { Component } from 'react'
import './header.css'
import img_covid from '../img/covid-19.jpg';
export default class Header extends Component {
    render() {
        return (
            <header id="principal" className="header-container">
                <div className="img-container">       
                    <img className="img-header" src={img_covid} alt="img-Covid"></img>
                </div>
                <div className="info-header">
                    <h2>Conóce al<span> COVID 19</span></h2>
                    <p>
                        COVID-19 es una efermedad respiratoria nueva que se identificó por primera vez en Wuhan, China.
                        Actualmente, la propagación se da principalmente de persona a persona.
                        Los coronavirus son conocidos por provocar un amplio rango de enfermedades, desde un resfriado hasta infecciones respiratorias. El nuevo coronavirus en una cepa no identificada en humanos previamente.
                    </p>
                </div>
            </header>
        )
    }
}
