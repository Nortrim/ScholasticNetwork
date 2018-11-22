import React, {Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import {actionEdit, setData} from "../../store/actions/mainActions";
import {closePop} from "../../store/actions/popUpActions";
import * as api from "../../services/api";

class EditPop extends Component{
    state = {
        inputName: this.props.editedItem.name,
        inputQuantity: this.props.editedItem.quantity,
        inputItemPrice: this.props.editedItem.price,
        inputTotalPrice: this.props.editedItem.total,
        // Флаги правильного заполнения полей
        nameIsEmpty: false,
        quantityIsEmpty: false,
        itemPriceIsEmpty: false,
        totalPriceIsEmpty: false,
    };

    // Обработчик закрытия попапа
    closerHandler = () => {
        this.props.closePop();
    };

    // Обработчик редактирования элемента с проверкой на заполнение полей
    editHandler = () => {
        let checker = false;
        if (this.state.inputName === '') {
            this.setState({
                nameIsEmpty: true
            });
            checker = true;
        } else {
            this.setState({
                nameIsEmpty: false
            })
        }
        if (this.state.inputQuantity === '') {
            this.setState({
                quantityIsEmpty: true
            });
            checker = true;
        } else {
            this.setState({
                quantityIsEmpty: false
            })
        }
        if (this.state.inputItemPrice === '') {
            this.setState({
                itemPriceIsEmpty: true
            });
            checker = true;
        } else {
            this.setState({
                itemPriceIsEmpty: false
            })
        }
        if (this.state.inputTotalPrice === '') {
            this.setState({
                totalPriceIsEmpty: true
            });
            checker = true;
        } else {
            this.setState({
                totalPriceIsEmpty: false
            })
        }
        if (!checker) {
            let item = {
                id: this.props.editedItem.id,
                name: this.state.inputName,
                quantity: this.state.inputQuantity,
                price: this.state.inputItemPrice,
                total: this.state.inputTotalPrice
            };
            api.editItem(item).then(()=>{
                // Повторный запрос на сервер за обновленными данными(Костыль, ибо потратил кучу времени на то, чтобы разобраться с обновлением redux.state, но так ничего не нагуглил)
                api.getData().then(response => {
                    this.props.setData(response.data)
                });
                this.props.closePop();
            })
        }
    };

    changeInput = (e) => {
        let strWithoutLetters = e.target.value.replace(/\D/g, '');
        switch (e.target.name) {
            case 'name':
                this.setState({
                    inputName: e.target.value
                });
                break;
            case 'quantity':
                this.setState({
                    inputQuantity: strWithoutLetters,
                    inputTotalPrice: strWithoutLetters === '' ? '' : strWithoutLetters * (this.state.inputItemPrice !== '' ? this.state.inputItemPrice : 0)
                });
                break;
            case 'item-price':
                this.setState({
                    inputQuantity: (this.state.inputQuantity === '' || parseInt(this.state.inputQuantity) === 0) ? 1 : this.state.inputQuantity,
                    inputItemPrice: strWithoutLetters,
                    inputTotalPrice: strWithoutLetters === '' ? '' : strWithoutLetters * ((this.state.inputQuantity === '' || parseInt(this.state.inputQuantity) === 0) ? 1 : this.state.inputQuantity),

                });
                break;
            case 'total-price':
                this.setState({
                    inputQuantity: (this.state.inputQuantity === '' || parseInt(this.state.inputQuantity) === 0) ? 1 : this.state.inputQuantity,
                    inputTotalPrice: strWithoutLetters,
                    inputItemPrice: strWithoutLetters === '' ? '' : strWithoutLetters / ((this.state.inputQuantity === '' || parseInt(this.state.inputQuantity) === 0) ? 1 : this.state.inputQuantity),
                });
                break;
            default: break;
        }
    };

    render() {
        return (
            <div className="pop-up__content">
                <div className="pop-up__header">
                    <span className="pop-up__header_title">Редактировать</span>
                    <div className="pop_up__closer" onClick={this.closerHandler}>+</div>
                </div>
                <input className='pop-up__input' name='name' type="text" placeholder='Имя' value={this.state.inputName} onChange={this.changeInput}/>
                <input className='pop-up__input' name='quantity' type="text" placeholder='Количество' value={this.state.inputQuantity} onChange={this.changeInput}/>
                <input className='pop-up__input' name='item-price' type="text" placeholder='Цена за штуку' value={this.state.inputItemPrice} onChange={this.changeInput}/>
                <input className='pop-up__input' name='total-price' type="text" placeholder='Общая цена' value={this.state.inputTotalPrice} onChange={this.changeInput}/>
                <button type='button' className="pop-up__button create-button" onClick={this.editHandler}>Редактировать</button>
            </div>
        )
    }
}

const putStateToProps = (state) => {
    return {
        editedItem: state.popUpReducer.editedItem
    }
};

const putActionsToProps = (dispatch) => {
    return {
        editItem: bindActionCreators(actionEdit, dispatch),
        closePop: bindActionCreators(closePop, dispatch),
        setData: bindActionCreators(setData, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(EditPop)