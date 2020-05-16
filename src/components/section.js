import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './section.css';
import { Line, Bar } from 'react-chartjs-2';
import { byCountry, searchCountry} from '../Data/countryData'
import FomrRegister from './formRegister'
import ViewPeople from './viewPeople';
import SearchData from './searchData'
export default class Section extends Component {
    static propTypes = {
        title:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
        id_section: PropTypes.string.isRequired,
        // dataChar: PropTypes.object.isRequired,
        // titleChar:PropTypes.string.isRequired
        // optionsChar: PropTypes.object.isRequired        
    }
    constructor(props){
        super(props);                
        this.state ={
            datachar: this.props.dataChar,
            optionsChar: this.props.dataChar,
            charLine: {
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: this.props.titleChar,
                        fontSize: 30,
                        padding: 30,
                        fontColor: '#12619c',
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            boxWidth: 15,
                            fontFamily: 'system-ui',
                            fontColor: 'black',
                        }
                    },
                    layout: {
                        padding: {
                            right: 50,
                        }
                    },
                    tooltips: {
                        backgroundColor: '#0584f6',
                        titleFontSize: 20,
                        xPadding: 20,
                        yPadding: 20,
                        bodyFontSize: 15,
                        bodySpacing: 10,
                        mode: 'x',
                    },
                    elements: {
                        line: {
                            borderWidth: 8,
                            fill: false,
                        },
                        point: {
                            radius: 6,
                            borderWidth: 4,
                            backgroundColor: 'white',
                            hoverRadius: 8,
                            hoverBorderWidth: 4,
                        }
                    }
                },
            CharBar: {
                title: {
                    display: true,
                    text: "Datos a nivel mundial",
                    fontSize: 25,
                    fontColor: '#12619c'
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    text: 'Fad'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                tooltips: {
                    backgroundColor: '#0584f6',
                    titleFontSize: 20,
                    xPadding: 20,
                    yPadding: 20,
                    bodyFontSize: 15,
                    bodySpacing: 10,
                    mode: 'x',
                }
            },
            countryValue: "Spain",
            selectPais: null,
            datacharPaises:this.props.dataChar
            }
    }
    async componentDidMount() {
        this.loadAllCountry();
    }
    alltheCountry = async (name) => {
        const getDataByCountry = await byCountry(name);
        this.setState({datacharPaises:getDataByCountry})
    }  
    // funcion que hace el combo-box
    loadAllCountry = () => {
        const allConuntrys = searchCountry();
        const options = allConuntrys.map((pais) =>
            <option className="this-country" key={pais}>{pais}</option>
        )
        const dataReturn = (<select className="list-country" onChange={this.handleChangeCountry}>{options}</select>);
        this.setState({ selectPais: dataReturn })
        return (dataReturn)
    }
    // evento para el combo-box
    handleChangeCountry = async (event) => {
        this.setState({countryValue:event.target.value})
        const val = this.alltheCountry(this.state.countryValue)
        // console.log("pais seleccionado del state",this.state.countryValue)
        this.setState({datacharPaises:val,
            countryValue:event.target.value})
    }

    static defaultProps ={
        titleChar:'Representación en gráficas'
    }
    render() {
        const { id_section, title, description, dataChar, titleChar} = this.props;
        const {charLine, CharBar, selectPais,datacharPaises} = this.state;
        
        return (
            <section id={id_section}  className="section">
                <div className="info-section">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                {id_section==="pais"?<div className="container-select">{selectPais}</div>:''}
                {id_section==="insert-data"
                    ?<div><FomrRegister /> <ViewPeople /> <SearchData /></div>
                    :<div className="chart-section">
                        {id_section==="mundial"
                            ?<Bar data= {dataChar} options={CharBar}/>
                            :id_section === "pais"
                                ?<Line data ={datacharPaises} options= {charLine} titleChar={titleChar}/>
                                :<Line data ={dataChar} options= {charLine} titleChar={titleChar}/>}
                    </div>   
                }    
            </section>
        )
    }
}