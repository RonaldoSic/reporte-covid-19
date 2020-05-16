import React, { Component } from 'react'
import './viewPeople.css'
import {getPeopleData} from '../Data/usDataPeople'
const aa = (<tr className="row-info">
    <td>Peter</td>
    <td>Griffin</td>
    <td>$100</td>
    <td>Peter</td>
    <td>Griffin</td>
    <td>$100</td>
    <td>$100</td>
</tr>);
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
        console.log(allDatapeople)
        const row = allDatapeople.map(data =>
            <tr className="row-info" key={data.code}>
                <td>data.first_name</td>
                <td>data.last_name</td>
                <td>data.age</td>
                <td>data.</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        ) 
        
        
        // this.setState({rowTableSubComponet: row})
        // console.log(this.state.rowTableSubComponet)
        // allDatapeople.nombres.forEach(element => {
        //     console.log(element)
        // });
    }




    async componentDidMount() {
        // await this.loadDataPeople();
        await this.loadPeoplesData();
    }
     // consultamos nuesteos datos 
    loadDataPeople = async () =>{
        // const dataPeople = await getPeopleData();
        // console.log(dataPeople)
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
