import React, { Component } from 'react'
import './viewPeople.css'
import {getPeopleData} from '../Data/usDataPeople'
export default class ViewPeople extends Component {
    constructor(props){
        super(props)
        this.state ={
            rowTableSubComponet: null,
            tdArray: []
        }
    }
    // Get data people
    loadPeoplesData = async () =>{
        const allDatapeople = await getPeopleData();
        // console.log(allDatapeople,'+++')
        const row = allDatapeople.map(people =>{        
            return(
                <tr key={people.id} className="row-info">
                    <td>{people.nombres}</td>
                    <td>{people.apellidos}</td>
                    <td>{people.edad}</td>
                    <td>{people.genero}</td>
                    <td>{people.pais}</td>
                    <td>{people.departamento}</td>
                    <td>{people.municipio_ciudad}</td>
                </tr>
            )
        });
    this.setState({rowTableSubComponet: row})        
    }
    async componentDidMount() {
        await this.loadPeoplesData();
    }    
    render() {
        return (
            <div className ='card-container'>
                <div className="title-card"><h3>Registros hechos</h3></div>
                <div className="data-people">
                    <table>
                        <thead>
                        <tr className="header-table">
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Genero</th>
                            <th>País</th>
                            <th>Departameto</th>
                            <th>Municipio</th>
                        </tr> 
                        </thead>
                        <tbody>
                            {this.state.rowTableSubComponet}  
                        </tbody>
                        
                    </table>
                </div>
            </div>
        )
    }
}
