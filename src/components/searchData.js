import React, { Component } from 'react'
import './searchData.css'
import {searchWithBody} from '../Data/myapiCovid'
import { Doughnut } from 'react-chartjs-2';
export default class SearchData extends Component {
    constructor(props){
        super(props)
        this.state = {            
            holderInput:'Buscar...',
            graphicComponent: null,
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
            },
            mujeres:0,
            hombres:0,
            Otros:0,
            formularioEdades: null
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
        await this.loadDataWithBody();
        await this.createGraphic();
        }else{
            alert('Ingresa los datos Adecuados')
        }
    }
    // Sumbit para edadaes
    onSumbit2 = async (e) =>{
        e.preventDefault();
        const {datoABuscar,optionAux,itemSelected,edadMinAux,edadMaxAux} =this.state;        
        this.setState({objetoRequest: {
            edadMin: edadMinAux,
            edadMax: edadMaxAux,
            buscarEsto:datoABuscar,
            parametro:itemSelected,
            opcionNum: optionAux
        }})        
        await this.loadDataWithBody();
        await this.createGraphic();
        console.log(this.state)
    }
    // OnChange 2 para los imputs de edades
    onChange2 = (e) =>{
        if(e.target.name === 'min'){
            this.setState({edadMinAux: e.target.value})
        }else{
            this.setState({edadMaxAux: e.target.value})
        }        
    }

    // Metodo para crear un peque;o formulario para las edades
    submitByAge = async () =>{
        const form2 = <div>
            <form onSubmit={this.onSumbit2} className="formulario2">
                <input className="it2" placeholder="Minimo" name="min" type="number" onChange={this.onChange2}/>
                <input className="it2" placeholder="Maximo" name="max" type="number" onChange={this.onChange2}/>
                <input className="it2B" type="submit" value="Buscar"/>
            </form>
        </div>
        this.setState({formularioEdades: form2})
        
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
        let minEdad, maxEdad;
        if(numOption === 5){
            this.submitByAge();
            // minEdad = prompt("Dime la edad minima para filtrar")
            // // console.log(minEdad)
            // maxEdad = prompt("Dime la edad maxima para filtrar")
            // console.log(maxEdad)
        }        
        this.setState({itemSelected: valor, optionAux: numOption, edadMaxAux:maxEdad, edadMinAux:minEdad})
        
    }    
    // Meto para renderizar el render de los datos retornados por el servidor
    showData = async () => {
        const resultQuery = this.state.dataResponse.map((people, i) => 
            <li className="item_result" key={people.id}>
                <h4 className="name_lastname">{people.nombres+' '+people.apellidos}</h4>                
            </li>                    
        )      
        const itemUl = <div className="resultSearch_container">
                <ul className="ul_result">{resultQuery}</ul>
            </div>  
        // Cuantificando los hombres y mujeres
        let man = [], woman =[], other = [];
        this.state.dataResponse.map(persona => {            
            switch(persona.genero){
                case 'Masculino': 
                    man.push(persona.genero);
                break;
                case 'Femenino': 
                    woman.push(persona.genero);
                break;
                case 'Otro': 
                    other.push(persona.genero);
                break;
                default: break;
            }
            return ''
        })
        // console.log(`Hay ${woman.length} mujeres`)        
        // console.log(`Hay ${man.length} hombres`)
        // console.log(`Hay ${other.length} Gay`)
        this.setState({mujeres:woman.length,hombres:man.length,Otros:other.length})
        return itemUl;        
    }
    // Metodo para realizar la consulta con body y sacar datos del servidor
    loadDataWithBody = async () => {
        const {objetoRequest} = this.state;
        const dataP = await searchWithBody(objetoRequest);
        this.setState({dataResponse:dataP})
        const mostrarDato = await this.showData();                
        this.setState({componentResponse: mostrarDato})                
    }
    // Meto para renderizar las graficas
    createGraphic = async () =>{
        const {mujeres,hombres,Otros}= this.state;
        const obGrap ={
        labels: ['Mujeres', 'Hombres', 'Otros'],
        datasets: [
                {
                    label: 'Genero',
                    backgroundColor: [
                        '#D72638',
                        '#12355B',
                        '#6457A6'
                    ],
                    hoverBackgroundColor: [
                        '#EF767A',
                        '#7692FF',
                        '#7D7ABC'
                    ],
                    data: [mujeres,hombres,Otros]
                }
            ]
        }
        // 
    const graphic = <Doughnut
        data={obGrap}
        options={{
            title:{
                display:true,
                text:'Grafica por genero',
                fontSize:35                
                },
            legend:{
                display:true,
                position:'right'
            }
        }} />

    this.setState({graphicComponent: graphic})
    }
    // Meto para testiar los metodos de consulta
    async componentDidMount() {
        // this.createGraphic();
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
                <div>{this.state.formularioEdades}</div>
                <div className="container_result">
                    {this.state.componentResponse}
                </div>
                <div>
                    {this.state.graphicComponent}
                </div>
            </div>
        )
    }
}