import React, { Component } from 'react';
import './App.css';
import Nav from './components/nav';
import Header from './components/header';
import Section from './components/section';
import { guateData } from './Data/guateData'
import { byCountry, searchCountry } from './Data/countryData'
import { globalData } from './Data/dataGlobal';
import {titlesAllSections} from './Data/titlesAndContext';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        dataGlobal: {},
        dataGuate: {},
        dataPaises: {},
        registrarData: {},
        tituloMundial:'',
        parrafoMundial:'',
        tituloPaises:'',
        parrafoPaises:'',
        tituloGuate:'',
        parrafoGuate:'',
        tituloInsert:'',
        parrafInsert:'',
        }
      }
  async componentDidMount(){
    await this.loadDataGuate();
    await this.loadDatabyCountry('spain');
    await this.loadDataGlobal();
    const tt = titlesAllSections();
    // console.log(tt)
    this.setState({
        tituloMundial:tt.titleMundial,
        parrafoMundial:tt.parrafoMundial,
        tituloPaises:tt.titlePaises,
        parrafoPaises:tt.parrafoPaises,
        tituloGuate:tt.titleGuatemala,
        parrafoGuate:tt.parrafoGuate,
        tituloInsert:tt.titleRegistrar,
        parrafInsert:tt.parrafoInsertar
    })
    
        // console.log(tt.titleRegistrar)
  }
  loadDataGuate = async () => {
    const getDataGuate = await guateData();
    this.setState({dataGuate:getDataGuate})
  }
  loadDatabyCountry = async (name) => {
    const getDataByCountry = await byCountry(name);
    // console.log(getDataByCountry);
    this.setState({dataPaises:getDataByCountry})
  }  
  loadDataGlobal = async () =>{
    const allData = await globalData();
    this.setState({dataGlobal:allData})
  }  
  loadAllCountry = () =>{
    const allConuntrys = searchCountry();
    const options = allConuntrys.map((pais) =>
      <option className="this-country" key={pais}>{pais}</option>
    )
    const dataReturn = (<select onChange={this.handleChangeCountry} className="list-country">{options}</select>);
    this.setState({selectPaise:dataReturn})    
  return (dataReturn)
  }
  render(){
    const {dataGlobal, dataGuate, dataPaises,
      tituloMundial, parrafoMundial,
      tituloPaises, parrafoPaises, 
      tituloGuate, parrafoGuate, 
      tituloInsert, parrafInsert} = this.state;
    return(
      <>
      <Nav />
      <Header />
      {/* seccion para info mundial */}
        <Section
          id_section="mundial"
          title={tituloMundial}
          description={parrafoMundial}
          dataChar ={dataGlobal}
        />
        {/* seccion para info por pais */}
        <Section
          id_section="pais"
          title={tituloPaises}
          description={parrafoPaises}
          dataChar={dataPaises}
          titleChar='Curva de contagios de coronavirus en otros Paises'
          // selectPais ={selectPaise}
        />
        {/* seccion para info de Guatemala */}
        <Section 
          id_section ="guate"
          title={tituloGuate} 
          description={parrafoGuate}
          dataChar={dataGuate}
          titleChar='Gráfica contagios de coronavirus en Guatemala'
        />
        {/* seccion para INSERT O SELECT */}
        <Section 
          id_section="insert-data"
          title={tituloInsert}
          description={parrafInsert}
          />
          <footer>
              <div className="col-container">
                  <div className="noticias-nacionales nts">
                      <h4>Noticias</h4>
                      <div className="enlaces">
                          <a href="https://www.mspas.gob.gt/index.php/noticias/covid-19/coronavirus-2019-ncov">Corona virus en Guatemala</a>
                          <a href="https://www.mspas.gob.gt/index.php/noticias/covid-19/casos">Casos en Guatemala</a>
                          <a href="https://www.bbc.com/mundo/noticias-51705060">Mapa de infectados</a>
                      </div>
                  </div>
              </div>
              <div className="escod">By ESCod</div>
          </footer>
        </>
    )
  }
}
