import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';


export default class Snack extends Component {
    constructor(props){
        super(props);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.state = {
            open: false,
            message: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.snackStatus) {
            this.setState({
                open: nextProps.snackStatus[0].status,
                message: nextProps.snackStatus[0].message
            })
        }
    }
    handleRequestClose = () => {
        return this.props.updateStatus({
            status: false,
            message: ''
        })
    };

    render() {
        return (
            <div>
                <Snackbar
                    open = {this.state.open}
                    message = {this.state.message}
                    autoHideDuration = {3000}
                    onRequestClose = {this.handleRequestClose}
                />
            </div>
        );
    }
}