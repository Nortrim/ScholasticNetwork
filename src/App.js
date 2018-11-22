import React, { Component } from 'react';

import HeaderComponent from './containers/header/header'
import TableComponent from './components/table/table'
import PopUp from './components/pop-ups/pop-ups'

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
