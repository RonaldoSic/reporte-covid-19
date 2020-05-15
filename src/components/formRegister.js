import React, { Component } from 'react'
import './formRegister.css'
export default class FomrRegister extends Component {
    constructor(props){
        super(props);
        this.state ={
            datosPersonales: {
                nombres:'',
                apellidos:'',
                edad:'',
                sexo:'Masculino'
            },
            datosdeUbicacion:{
                pais:'',
                estado_O_departamento:'',
                ciudad_O_municipio:''
            },
            fecha: null            
        }
    }
    
    componentDidMount() {
        this.setDate()
    }
    
    setDate =() => {
        const date = new Date();
        let fechaFormat = new Intl.DateTimeFormat('es-MX', { month: 'long', day: 'numeric', year:'numeric' }).format(new Date(date))
        this.setState({fecha:fechaFormat})
    }
    handleChange = (e) => {
        this.setState({
            datosPersonales:{
                sexo:e.target.value
            }
        })
        
    }
    handleSubmit = (e) =>{
        e.preventeDefault();

    }
    render() {
        const {fecha, datosPersonales, datosdeUbicacion } = this.state;
        return (
            <div className="wrapp">
                <div className="container-form">                    
                    <form onSubmit = {this.handleSubmit}>
                        {/* Fecha */}
                        <div className="sub-container date-container">
                            <h4>Fecha</h4>
                            <div className="date"><h5>{fecha}</h5></div>
                        </div>
                        {/* Inputs de datos personales */}
                        <div className="sub-container container-datos">
                            <h3>Datos personales</h3>
                            <div className="container-inputs">
                                <div className="inputs-item">
                                    <label>Nombres</label>
                                    <input type="text" />
                                </div>
                                <div className="inputs-item">                                <label>Apellidos</label>
                                    <input type="text" />
                                </div>
                                <div className="inputs-item">                                
                                    <label>Edad</label>
                                    <input type="number" />
                                </div>
                                <div className="inputs-item">                 <label>Sexo</label>               
                                    <select value={this.state.datosPersonales.sexo} onChange={this.handleChange}>
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                        <option>Otro</option>
                                    </select>    
                                </div>
                            </div>
                        </div>
                        {/* Inputs de Ubicacion */}
                        <div className="sub-container container-ubicacion">
                        <h3>Ubicación</h3>
                            <div className="container-inputs">
                                <div className="inputs-item">                                
                                    <label>País</label>
                                    <input type="text" />
                                </div>
                                <div className="inputs-item">                                
                                    <label>Departamento o Estado</label>
                                    <input type="text" />
                                </div>
                                <div  className="inputs-item">                                
                                    <label>Municipio</label>
                                    <input type="text" />
                                </div>
                            </div>    
                        </div>
                        <div className="container-btn">
                            <button type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
