import React, { Component } from 'react'
import './footer.css'
export default class Footer extends Component {
    render() {
        return (
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
        )
    }
}