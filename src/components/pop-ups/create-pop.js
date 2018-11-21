import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { closePop } from "../../store/actions/popUpActions";
import { actionCreate } from '../../store/actions/mainActions';

class CreatePop extends Component {
    state = {
      inputName: '',
      inputQuantity: ''
    };

    closerHandler = () => {
        this.props.closePop();
    };

    createHandler = () => {
        this.props.createNew(this.state);
        this.props.closePop();
    };

    changeInput = (e) => {
        if (e.target.name === 'name') {
            this.setState({
                inputName: e.target.value
            });
        } else if (e.target.name === 'quantity') {
            this.setState({
                inputQuantity: parseInt(e.target.value)
            });
        }
    };

    render() {
        return (
            <div className="pop-up__content">
                <div className="pop-up__header">
                    <span className="pop-up__header_title">Create</span>
                    <div className="pop_up__closer" onClick={this.closerHandler}>+</div>
                </div>
                <input className='pop-up__input' name='name' type="text" placeholder='Имя' onInput={this.changeInput}/>
                <input className='pop-up__input' name='quantity' type="text" placeholder='Количество'  onInput={this.changeInput}/>
                <button type='button' className="pop-up__button create-button" onClick={this.createHandler}>Create</button>
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