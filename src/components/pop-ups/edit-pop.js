import React, {Component} from 'react'

export default class EditPop extends Component{
    state = {
        inputName: this.props.editData.name,
        inputQuantity: this.props.editData.quantity
    };
    closerHandler = () => {
        this.props.closerHandler();
        console.log(this.props);
    };

    editHandler = () => {
        let data = this.state;
        this.props.editHandler(data);
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
        console.log(this.state)
    };

    render() {
        return (
            <div className="pop-up__content">
                <div className="pop-up__header">
                    <span className="pop-up__header_title">Edit</span>
                    <div className="pop_up__closer" onClick={this.closerHandler}>+</div>
                </div>
                <input className='pop-up__input' name='name' type="text" placeholder='Имя' value={this.state.inputName} onInput={this.editInput}/>
                <input className='pop-up__input' name='quantity' type="text" placeholder='Количество' value={this.state.inputQuantity} onInput={this.editInput}/>
                <button type='button' className="pop-up__button create-button" onClick={this.editHandler}>Edit</button>
            </div>
        )
    }
}