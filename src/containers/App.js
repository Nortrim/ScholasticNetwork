import React, { Component } from 'react';

import HeaderComponent from '../components/header/header'
import TableComponent from '../components/table/table'
import PopUp from '../components/pop-ups/pop-ups'

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <PopUp/>
                <HeaderComponent/>
                <TableComponent/>
            </div>
        );
    }
}

export default App;
