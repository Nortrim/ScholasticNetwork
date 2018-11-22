import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


import { openCreatePop, openEditPop } from "../../store/actions/popUpActions";
import { actionDelete, setData } from "../../store/actions/mainActions";
import * as api from "../../services/api";


import editIcon from '../../assets/icons/edit.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import './table.css'

class TableComponent extends Component {
    state = {
        visibleData : this.props.data,
        total: null
    };

    componentDidMount(){
        // Получение данных для отображения в таблице
        api.getData().then(response => {
            this.props.setData(response.data)
        })
    }

    // Обновление данных при изменении store
    componentWillReceiveProps(nextProps){
        this.setState({
            visibleData: nextProps.data
        });
    }

    // Счетчик "ВСЕГО"
    totalCounter = (data) => {
        let total = {
            quantity: 0,
            price: 0,
        };
        data.forEach(item => {
            total.quantity += parseInt(item.quantity);
            total.price += item.total !== null ? parseInt(item.total) : 0;
        });
        return total
    };

    // Обработчик удаления элемента таблицы
    deleteHandler = (id) => {
        let vData = this.state.visibleData;
        api.deleteItem(id).then(() => {
            this.props.deleteItem(id);
            this.setState({
                visibleData: vData.filter(item => item.id !== id)
            });
        });
    };

    // Логика поиска
    searching = (e) => {
        this.setState({
            visibleData: this.props.data.filter(item => {
                let str = String(item['name']).toLowerCase(),
                    searchingStr = e.target.value.toLowerCase();
                return str.indexOf(searchingStr) > -1;
            })
        });
    };

    render() {
        let counter = this.totalCounter(this.state.visibleData);
        // Описание элемента таблицы ( не уверен нужно ли выносить его в отдельный компонент )
        let dataList = this.state.visibleData.map(el =>
           <tr className='main-table__row' key={el.id}>
               <td>{el.name}</td>
               <td>{el.quantity}</td>
               <td>{el.price} руб.</td>
               <td>{el.total} руб.</td>
               <td>
                   <img className='rowButton' src={editIcon} alt="edit" onClick={() => this.props.openEditPop(el)}/>
                   <img className='rowButton' src={deleteIcon} alt="edit" onClick={() => this.deleteHandler(el.id)}/>
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
                            <td>Цена за штуку</td>
                            <td>Общая цена</td>
                            <td>
                                <input className='main-table__search' type="text" name='search' placeholder='Поиск...' onChange={this.searching}/>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList}
                        <tr className='main-table__total-row'>
                            <td>Всего</td>
                            <td>{counter.quantity}</td>
                            <td></td>
                            <td>{counter.price} руб.</td>
                        </tr>
                    </tbody>
                </table>
                <button className='create-item-button' onClick={this.props.openCreatePop}>Добавить товар</button>
            </div>
        )
    }
}

const putStateToProps = (state) => {
    return {
        data: state.mainReducer.data,
    }
};

const putActionsToProps = (dispatch) => {
    return {
        openCreatePop: bindActionCreators(openCreatePop, dispatch), // Обработчик открытия попапа "Добавить"
        openEditPop: bindActionCreators(openEditPop, dispatch), // Обработчик открытия попапа "Редактировать"
        deleteItem: bindActionCreators(actionDelete, dispatch),
        setData: bindActionCreators(setData, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(TableComponent);