import React, { Component } from 'react';
import {connect} from 'react-redux'
import './table.css'
import {bindActionCreators} from "redux";
import { openCreatePop, openEditPop } from "../../store/actions/popUpActions";
import {actionDelete} from "../../store/actions/mainActions";

class TableComponent extends Component {
    state = {
        visibleData : this.props.data,
    };

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.setState({
            visibleData: nextProps.data
        })
    }

    deleteHandler = (id) => {
        let vData = this.state.visibleData;
        this.props.deleteItem(id);
        this.setState({
            visibleData: vData.filter(item => item.id !== id)
        });
    };

    editHandler = (id) => {
        this.props.openEditPop(id);
    };

    searching = (e) => {
        this.setState({
            visibleData: this.props.data.filter(item => {
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
                <button onClick={this.props.openCreatePop}>Добавить товар</button>
            </div>
        )
    }
}

const putStateToProps = (state) => {
    return {
        data: state.mainReducer.data
    }
};

const putActionsToProps = (dispatch) => {
    return {
        openCreatePop: bindActionCreators(openCreatePop, dispatch),
        openEditPop: bindActionCreators(openEditPop, dispatch),
        deleteItem: bindActionCreators(actionDelete, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(TableComponent);