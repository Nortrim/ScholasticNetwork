import React, {Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import {actionEdit} from "../../store/actions/mainActions";
import {closePop} from "../../store/actions/popUpActions";

class EditPop extends Component{
    state = {
        inputName: this.props.editedItem.name,
        inputQuantity: this.props.editedItem.quantity
    };

    closerHandler = () => {
        this.props.closePop();
    };

    editHandler = () => {
        let item = {
            id: this.props.editedItem.id,
            name: this.state.inputName,
            quantity: this.state.inputQuantity,
            price: 11
        };
        this.props.editItem(item);
        this.props.closePop();
    };

    editInput = (e) => {
        if (e.target.name === 'name') {
            this.setState({
                inputName: e.target.value
            });
        } else if (e.target.name === 'quantity') {
            this.setState({
                inputQuantity: e.target.value
            });
        }
    };

    render() {
        return (
            <div className="pop-up__content">
                <div className="pop-up__header">
                    <span className="pop-up__header_title">Edit</span>
                    <div className="pop_up__closer" onClick={this.closerHandler}>+</div>
                </div>
                <input className='pop-up__input' name='name' type="text" placeholder='Имя' value={this.state.inputName} onChange={this.editInput}/>
                <input className='pop-up__input' name='quantity' type="text" placeholder='Количество' value={this.state.inputQuantity} onChange={this.editInput}/>
                <button type='button' className="pop-up__button create-button" onClick={this.editHandler}>Edit</button>
            </div>
        )
    }
}

const putStateToProps = (state) => {
    return {
        editedItem: state.mainReducer.data[state.popUpReducer.editId]
    }
};

const putActionsToProps = (dispatch) => {
    return {
        editItem: bindActionCreators(actionEdit, dispatch),
        closePop: bindActionCreators(closePop, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(EditPop)