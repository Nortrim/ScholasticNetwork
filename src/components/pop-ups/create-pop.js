import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { closePop } from "../../store/actions/popUpActions";
import { actionCreate } from '../../store/actions/mainActions';
import * as api from "../../services/api";

class CreatePop extends Component {
    state = {
        inputName: '',
        inputQuantity: '',
        inputItemPrice: '',
        inputTotalPrice: '',
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

    // Обработчик создания нового элемента с проверкой на заполнение полей (получилось излишне громоздко, однако на момент написания не нашел лучшего варианта)
    createHandler = () => {
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
            let newItem = {
                id: this.props.data.length ? this.props.data[this.props.data.length - 1].id + 1 : 0,
                name: this.state.inputName,
                quantity: this.state.inputQuantity,
                price: this.state.inputItemPrice,
                total: this.state.inputTotalPrice
            };
            api.createItem(newItem).then(() => {
                this.props.createNew(newItem);
                this.props.closePop();
            });
        }
    };

    // Обработчик ввода в поля с ограничением на ввод для нужных полей и расчетом цены (возможно переизбыток тернарных выражений)
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
                    <span className="pop-up__header_title">Добавить</span>
                    <div className="pop_up__closer" onClick={this.closerHandler}>+</div>
                </div>
                <input className={this.state.nameIsEmpty ? 'pop-up__input error' : 'pop-up__input'}
                       name='name'
                       type="text"
                       placeholder='Имя'
                       value={this.state.inputName}
                       onChange={this.changeInput}
                />
                <input className={this.state.quantityIsEmpty ? 'pop-up__input error' : 'pop-up__input'}
                       name='quantity'
                       type="text"
                       placeholder='Количество'
                       value={this.state.inputQuantity}
                       onChange={this.changeInput}
                />
                <input className={this.state.itemPriceIsEmpty ? 'pop-up__input error' : 'pop-up__input'}
                       name='item-price'
                       type="text"
                       placeholder='Цена за штуку'
                       value={this.state.inputItemPrice}
                       onChange={this.changeInput}
                />
                <input className={this.state.totalPriceIsEmpty ? 'pop-up__input error' : 'pop-up__input'}
                       name='total-price'
                       type="text"
                       placeholder='Общая цена'
                       value={this.state.inputTotalPrice}
                       onChange={this.changeInput}
                />
                <button type='button' className="pop-up__button create-button" onClick={this.createHandler}>
                    Добавить
                </button>
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
        createNew: bindActionCreators(actionCreate, dispatch),
        closePop: bindActionCreators(closePop, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(CreatePop)