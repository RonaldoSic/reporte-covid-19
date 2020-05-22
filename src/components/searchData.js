import React, { Component } from 'react'
import './searchData.css'
import {searchPeople, searchWithBody} from '../Data/myapiCovid'
const ObjetQuery = {
    genero :'Masculino desde React',
    pais:'Guatemala E',
    departamento:'Totonicapan p',
    municipio_ciudad: "Totonicapan"
}
export default class SearchData extends Component {
    constructor(props){
        super(props)
        this.state = {
            datoABuscar:'',
            holderInput:'Buscar...',
            dataResponse: [],
            componentResponse: null,
            removeItem: 'show item_result'
            
        }
    }
    onRemove  = () =>{
        console.log('Ya se deb de elimin')
        this.setState({removeItem: 'no_show'})
    }
    onChange = async (e) =>{
        this.setState({datoABuscar: e.target.value})        
        // await this.loadData(e.target.value);
    }
    onsubmit = async (e) =>{
        e.preventDefault();        
        console.log('Buscado gente por pais')
        await this.loadData(this.state.datoABuscar);
        
    }
    // Metodo para hacer la peticion 
    loadData = async (pais) =>{
        const dataP = await searchPeople(pais);
        console.log(dataP,'estos don los datos')
        this.setState({dataResponse : dataP})   
        const datosAMostrar = await this.showData()         
        this.setState({componentResponse:datosAMostrar})  
    }
    // Meto para renderizar los resultados de la consulta
    showData = async () => {
        const resultQuery = this.state.dataResponse.map((people, i) => 
            <li className={this.state.removeItem} key={people.id}>
                <h4 className="name_lastname">{people.nombres+' '+people.apellidos}</h4>                
            </li>                    
        )      
        const itemUl = <div className="resultSearch_container">
                <ul className="ul_result">{resultQuery}</ul>
            </div>         
        return itemUl;        
    }

    loadDatacBody = async () => {
        const dataP = await searchWithBody(ObjetQuery);
        console.log('Bodu de delas cnsulta ', dataP)
    }

    async componentDidMount() {
        // await this.loadData(); 
        await this.loadDatacBody()
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
                        <label className="switchBtn">
                            <input type="checkbox"/>
                                <div className="slide round">Filter On</div>
                        </label>
                    </form>
                </div>
                <div className="container_result">
                    {this.state.componentResponse}
                </div>
            </div>
        )
    }
}




/*
parametros de busqueda son 
Pais, municipio, edad, sexo
*/ 
