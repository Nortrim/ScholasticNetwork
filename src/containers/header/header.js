import React from 'react';
import logo from '../../assets/icons/logo.svg';
import './header.css'

export default function HeaderComponent() {
    return (
        <div className="main-header">
            <img className='main-header__logo' src={logo} alt="logo"/>
            <div className='main-header__title'>Test React App</div>
        </div>
    )
}