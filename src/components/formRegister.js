import React, { Component } from 'react'
import './formRegister.css'
import {setPeopleData} from "../Data/usDataPeople";

export default class FomrRegister extends Component {
    constructor(props){
        super(props);
        this.state ={
            code :'0',
            first_name:'',
            last_name:'',
            age: '',
            gender:'Masculino',
            country:'',
            department:'',
            city:''
        }
    }
    
    async componentDidMount() {
        this.setDate()
    }

    setDate =() => {
        const date = new Date();
        let fechaFormat = new Intl.DateTimeFormat('es-MX', { month: 'long', day: 'numeric', year:'numeric' }).format(new Date(date))
        this.setState({fecha:fechaFormat})
    }

    handleChange = (e) => {
        this.setState({
                gender:e.target.value
        })
    }
    handleChangeInputs = (e) =>{
            this.setState({[e.target.name]: e.target.value})
            // console.log(e.target.name,' ',e.target.value)
    }

    handleSubmit = async (e)  =>{
        e.preventDefault();
        let resp = this.state;
        const res = await setPeopleData(resp);
        console.log(res)
    }

    render() {
        const {fecha} = this.state;
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
                                    <input name="first_name" type="text" onChange={this.handleChangeInputs}/>
                                </div>
                                <div className="inputs-item">                                <label>Apellidos</label>
                                    <input name="last_name" type="text" onChange={this.handleChangeInputs} />
                                </div>
                                <div className="inputs-item">                                
                                    <label>Edad</label>
                                    <input name="age" type="number" onChange={this.handleChangeInputs}/>
                                </div>
                                <div className="inputs-item">                 
                                <label>Sexo</label>               
                                    <select value={this.state.gender} onChange={this.handleChange}>
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
                                    <input name="country" type="text" onChange={this.handleChangeInputs}/>
                                </div>
                                <div className="inputs-item">                                
                                    <label>Departamento o estado</label>
                                    <input name="department" type="text" onChange={this.handleChangeInputs} />
                                </div>
                                <div  className="inputs-item">                                
                                    <label>Municipio</label>
                                    <input name="city" type="text" onChange={this.handleChangeInputs} />
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
