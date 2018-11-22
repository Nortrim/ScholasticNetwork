import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

import {closePop} from "../../store/actions/popUpActions";
import CreatePop from './create-pop'
import EditPop from './edit-pop'

import './pop-ups.css'

// Компонент попапа (объединил общую логику попапов в один компонент)

class PopUp extends Component {
    // Обработчик закрытия попапа (лежит здесь для возможности закрыть попап кликом в бэкграунд (возможно костыль))
    closerHandler = () => {
        this.props.closePop()
    };
    // Условное отображение нужного попапа ( Не уверен насколько правильно так делать )
    popUp = () => {
        if (this.props.isCreatePopOpen) {
            return (
                <div className='pop-up__wrapper'>
                    <div className='pop_up__background' onClick={this.closerHandler}/>
                    <CreatePop
                        closerHandler={this.closerHandler}
                        createHandler={this.createHandler}
                    />
                </div>
            )
        } else if (this.props.isEditPopOpen) {
            return (
                <div className='pop-up__wrapper'>
                    <div className='pop_up__background' onClick={this.closerHandler}/>
                    <EditPop
                        closerHandler={this.closerHandler}
                        editHandler={this.editHandler}
                        editData={this.props.editData}
                    />
                </div>
            )
        } else return null;
    };

    render () {
        return this.popUp()
    }
}

const putActionsToProps = (dispatch) => {
    return {
        closePop: bindActionCreators(closePop, dispatch)
    }
};


const putStateToProps = (state) => {
    return {
        isCreatePopOpen: state.popUpReducer.isCreatePopOpen,
        isEditPopOpen: state.popUpReducer.isEditPopOpen,
    }
};

export default connect(putStateToProps, putActionsToProps)(PopUp)