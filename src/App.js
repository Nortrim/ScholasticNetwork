import React, { Component } from 'react';
import HeaderComponent from './components/header/header'
import TableComponent from './components/table/table'
import PopUp from './components/pop-ups/pop-ups'
import './App.css';

class App extends Component {

    state = {
        data: [
            {
                id: 0,
                name: 'Van',
                quantity: 20,
                price: 10
            },
            {
                id: 1,
                name: 'Rom',
                quantity: 20,
                price: 10
            },
            {
                id: 2,
                name: 'Kek',
                quantity: 20,
                price: 10
            },
            {
                id: 3,
                name: 'Dad',
                quantity: 20,
                price: 10
            },
        ],
        createPop: false,
        changePop: false,
        editId: null,
    };

    createPopHandler = () => {
        this.setState({
            createPop: true,
            changePop: false
        })
    };

    editPopHandler = (id) => {
        this.setState({
            createPop: false,
            changePop: true,
            editId: id,
        });
    };

    closeAllPops = () => {
        this.setState({
            createPop: false,
            changePop: false
        })
    };
    createHandler = (data) => {
        this.setState({
            data: this.state.data.push({
                id: this.state.data.length,
                name: data.inputName,
                quantity: parseInt(data.inputQuantity),
                price: 10
            })
        });
        console.log(this.state)
        this.closeAllPops()
    };

    editHandler = (data) => {

        let newData = this.state.data;

        console.log(data,  newData[this.state.editId]);
        newData[this.state.editId].name = data.inputName;
        newData[this.state.editId].quantity = data.inputQuantity;

        this.setState({
            data: newData
        });

        this.closeAllPops()
    };

    render() {
        return (
            <div className="App">
                <PopUp
                    createPop={this.state.createPop}
                    changePop={this.state.changePop}
                    editData={this.state.data[this.state.editId]}

                    closeAllPops={this.closeAllPops}
                    createHandler={this.createHandler}
                    editHandler={this.editHandler}
                />
                <HeaderComponent/>
                <TableComponent
                    data={this.state.data}
                    createPopHandler={this.createPopHandler}
                    editPopHandler={this.editPopHandler}
                />

            </div>
        );
    }
}

export default App;
