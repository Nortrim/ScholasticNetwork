import React, {Component} from 'react'

export default class CreatePop extends Component {
    state = {
      inputName: '',
      inputQuantity: ''
    };
    closerHandler = () => {
        this.props.closerHandler();
    };

    createHandler = () => {
        let data = this.state;
        this.props.createHandler(data);
    };

    changeInput = (e) => {
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