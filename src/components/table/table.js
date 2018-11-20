import React, { Component } from 'react';
import './table.css'

export default class TableComponent extends Component {
    state = {
        visibleData : this.props.data
    };

    deleteHandler = (id) => {
        let lData = this.state.visibleData;
        this.setState({
            visibleData: lData.filter(item => item.id !== id)
        });
    };

    createHandler = () => {
        this.props.createPopHandler();
    };

    editHandler = (id) => {
        this.props.editPopHandler(id);
    };

    searching = (e) => {
        this.setState({
            data: this.props.data.filter(item => {
                for (let key in item) {
                    let str = String(item[key]).toLowerCase(),
                        searchingStr = e.target.value.toLowerCase();
                    if (str.indexOf(searchingStr) > -1) {
                        return true;
                    }
                }
                return false;
            })
        });
    };

    render() {
        let dataList = this.state.visibleData.map(el =>
           <tr key={el.id}>
               <td>{el.name}</td>
               <td>{el.quantity}</td>
               <td>{el.price}</td>
               <td>
                   <button type='button' onClick={() => this.deleteHandler(el.id)}>Удалить</button>
                   <button type='button' onClick={() => this.editHandler(el.id)}>Редактировать</button>
               </td>
           </tr>
        );
        return (
            <div className="wrap">
                <table className='main-table'>
                    <thead>
                        <tr>
                            <td>Имя</td>
                            <td>Количество</td>
                            <td>Цена</td>
                            <td>
                                <input type="text" name='search' placeholder='Search...' onChange={this.searching}/>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList}
                    </tbody>
                </table>
                <button onClick={this.createHandler}>Добавить товар</button>
            </div>
        )
    }
}