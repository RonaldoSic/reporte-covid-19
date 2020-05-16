import React, { Component } from 'react'
import './formRegister.css'
import {setPeopleData, getPeopleData} from "../Data/usDataPeople";

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
            city:'',
            rowTable: null
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
    // cargando los datos para la tabla
    loadPeoplesData = async () =>{
        const allDatapeople = await getPeopleData();
        const row = allDatapeople.map(people =>{
        
            return(
                <tr key={people.code} className="row-info">
                    <td>{people.first_name}</td>
                    <td>{people.last_name}</td>
                    <td>{people.age}</td>
                    <td>{people.gender}</td>
                    <td>{people.country}</td>
                    <td>{people.department}</td>
                    <td>{people.city}</td>
                </tr>
            )
        });
    this.setState({rowTable: row})        
    }

    handleChange = (e) => {
        this.setState({ gender:e.target.value })
    }
    handleChangeInputs = (e) =>{
            this.setState({[e.target.name]: e.target.value})
            // console.log(e.target.name,' ',e.target.value)
    }

    handleSubmit = async (e)  =>{
        e.preventDefault();
        let resp = this.state;
        await setPeopleData(resp);
        this.setState({
            first_name:'',
            last_name:'',
            age: '',
            gender:'Masculino',
            country:'',
            department:'',
            city:''
        })
        // await this.loadPeoplesData();
        // console.log(res)
        // console.log(this.state)
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
                                    <input value={this.state.first_name} name="first_name" type="text" onChange={this.handleChangeInputs}/>
                                </div>
                                <div className="inputs-item">                                <label>Apellidos</label>
                                    <input value={this.state.last_name} name="last_name" type="text" onChange={this.handleChangeInputs} />
                                </div>
                                <div className="inputs-item">                                
                                    <label>Edad</label>
                                    <input value={this.state.age} name="age" type="number" onChange={this.handleChangeInputs}/>
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
                                    <input value={this.state.country} name="country" type="text" onChange={this.handleChangeInputs}/>
                                </div>
                                <div className="inputs-item">                                
                                    <label>Departamento o estado</label>
                                    <input value={this.state.department} name="department" type="text" onChange={this.handleChangeInputs} />
                                </div>
                                <div  className="inputs-item">                                
                                    <label>Municipio</label>
                                    <input value={this.state.city} name="city" type="text" onChange={this.handleChangeInputs} />
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
