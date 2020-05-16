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
        // console.log(typeof(allDatapeople),'+++')        
        const row = allDatapeople.map(people =>{   
            // console.log(typeof(people),'alskdjfpo93')     
            console.log(people)
            return(
                <tr key={people.code}className="row-info">
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
                            <th>Depatameto</th>
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
