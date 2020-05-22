import React, { Component } from 'react'
import './searchData.css'
import {searchPeople, searchWithBody} from '../Data/myapiCovid'
export default class SearchData extends Component {
    constructor(props){
        super(props)
        this.state = {            
            holderInput:'Buscar...',
            dataResponse: [],
            componentResponse: null,            
            itemSelected: 'País',            
            datoABuscar:'',
            optionAux: 1,
            edadMinAux: 0,
            edadMaxAux: 0,
            objetoRequest: {                
                edadMin: 0,
                edadMax: 0,
                buscarEsto:'',
                parametro:'',
                opcionNum: 1
            }            
        }
    }    
    // aplica al Input, coloca el valor en el state de datoAbuscar 
    onChange = async (e) =>{
        this.setState({datoABuscar: e.target.value})         
    }  
    // Envia los datos al servidor para realiar las consultas  
    onsubmit = async (e) =>{
        e.preventDefault();                        
        if(this.state.datoABuscar !== ''){
        const {datoABuscar,optionAux,itemSelected,edadMinAux,edadMaxAux} =this.state;        
        this.setState({objetoRequest: {
            edadMin: edadMinAux,
            edadMax: edadMaxAux,
            buscarEsto:datoABuscar,
            parametro:itemSelected,
            opcionNum: optionAux
        }})
        await this.loadData(this.state.datoABuscar);
        await this.loadDataWithBody()
        }else{
            alert('Ingresa los datos Adecuados')
        }
    }
    // Aplica para los RadiosButton para colocar el item seleccionado
    onChangeOption = (e) =>{        
        const valor = e.target.name;
        let numOption = 1;        
        switch(valor){
            case 'País': numOption = 1; break;
            case 'Departamento': numOption = 2; break;
            case 'Municipio': numOption = 3; break;
            case 'Genero': numOption = 4; break;
            case 'Rango de edades': numOption = 5; break;
            default:
                console.log('Default')
                break;
        }        
        this.setState({itemSelected: valor, optionAux: numOption})
    }
    // Metodo para hacer la peticion por pais
    loadData = async (pais) =>{
        const dataP = await searchPeople(pais);
        // console.log(dataP,'Respuesta del servidor')
        this.setState({dataResponse : dataP})   
        const datosAMostrar = await this.showData()         
        this.setState({componentResponse:datosAMostrar})  
    }
    // Meto para renderizar el render de los datos retornados por el servidor
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
    // Metodo para realizar la consulta con body y sacar datos del servidor
    loadDataWithBody = async () => {
        const {objetoRequest} = this.state;
        const dataP = await searchWithBody(objetoRequest);
        console.log('Body de la consulta ', dataP)
    }
    // Meto para testiar los metodos de consulta
    async componentDidMount() {}

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
                        <div className="options_container">
                            <h3>Has tu busqueda por</h3>
                            <div className="allOptions">
                            <label className="labe_container">País
                                <input type="radio" name="País" 
                                onChange={this.onChangeOption} 
                                checked={this.state.itemSelected === 'País'}/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="labe_container">Departamento
                                <input type="radio" name="Departamento"
                                onChange={this.onChangeOption} 
                                checked={this.state.itemSelected === 'Departamento'} />
                                <span className="checkmark"></span>
                            </label>
                            <label className="labe_container">Municipio
                                <input type="radio" name="Municipio"
                                onChange={this.onChangeOption} 
                                checked={this.state.itemSelected === 'Municipio'}/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="labe_container">Genero
                                <input type="radio" name="Genero" 
                                onChange={this.onChangeOption} 
                                checked={this.state.itemSelected === 'Genero'}/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="labe_container">Rango de edades
                                <input type="radio" name="Rango de edades" 
                                onChange={this.onChangeOption} 
                                checked={this.state.itemSelected === 'Rango de edades'}/>
                                <span className="checkmark"></span>
                            </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container_result">
                    {this.state.componentResponse}
                </div>
            </div>
        )
    }
}