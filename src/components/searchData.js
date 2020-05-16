import React, { Component } from 'react'
import './searchData.css'
export default class SearchData extends Component {
    constructor(props){
        super(props)
        this.state = {
            datoABuscar: '',
            holderInput:'Buscar...'
        }
    }
    onChange = (e) =>{
        this.setState({datoABuscar: e.target.value})        
    }
    onsubmit = (e) =>{
        e.preventDefault();        
        console.log(this.state.datoABuscar)
    }
    render() {
        const {holderInput}= this.state;
        return (
            <div className="search-container">
                <div>
                    <form className="form-search" onSubmit={this.onsubmit}>                    
                        <div className="item-seach-form">
                            <input className="input-search text" type="text" placeholder={holderInput} onChange={this.onChange} /> 
                            <input className="input-search btn" type="submit" value="Buscar"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}




/*
parametros de busqueda son 
Pais, municipio, edad, sexo
*/ 
