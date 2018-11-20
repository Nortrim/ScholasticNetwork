import React, {Component} from 'react'
import CreatePop from './create-pop'
import EditPop from './edit-pop'
import './pop-ups.css'

export default class PopUp extends Component {

    closerHandler = () => {
        this.props.closeAllPops()
    };

    createHandler = (data) => {
        this.props.createHandler(data)
    };

    editHandler = (data) => {
        this.props.editHandler(data)
    };

    popUp = () => {
        if (this.props.createPop) {
            return (
                <div className='pop-up__wrapper'>
                    <div className='pop_up__background'/>
                    <CreatePop
                        closerHandler={this.closerHandler}
                        createHandler={this.createHandler}
                    />
                </div>
            )
        } else if (this.props.changePop) {
            console.log(this.props)
            return (
                <div className='pop-up__wrapper'>
                    <div className='pop_up__background'/>
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