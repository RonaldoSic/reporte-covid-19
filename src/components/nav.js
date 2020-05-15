import React, { Component } from "react";
import './nav.css'
export default class Nav extends Component {
    constructor(props){
        super(props);
        this.state ={
            scrolled: false,
            classSolid:'nav nav-container solid',
            classTransparent:'nav nav-container'
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', () =>{
            const isTop = window.scrollY > 100;
            isTop?this.setState({scrolled: true}):this.setState({scrolled: false}); 
        })
        // para determinar el tamanio de la pantalla 
    }
    componentWillUnmount(){
        window.removeEventListener('scroll');
        window.removeEventListener("resize", this.updateWindiwDimensions);
    }
    render() {
        const {
            classSolid,
            classTransparent,
            scrolled
        } = this.state;
        return (
            // <nav className="nav nav-container">
            <nav className={scrolled?classSolid:classTransparent}>
                <div className="logo-container">
                    <p>
                        <a href="#principal">Covid-19</a>
                    </p>
                </div>
                <ul className="ul-menu">
                    <li className="item-menu">
                        <a className="go-to" href="#mundial">Mundial</a>
                    </li>
                    <li className="item-menu">
                        <a className="go-to" href="#pais">Por país</a>
                    </li>
                    <li className="item-menu">
                        <a className="go-to" href="#guate">Solo Guatemala</a>
                    </li>
                    <li className="item-menu">
                        <a className="go-to" href="#registrar">Registrar caso</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
