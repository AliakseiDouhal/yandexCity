import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import actions from './action';

import Notification from './components/notification'
import AddCity from './components/addCity';
import ListMessages from './components/listMessages';
import MapView from './components/map'

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppView extends Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    componentDidMount() {
        this.scrollToBottom();
    };

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render (){
        return <MuiThemeProvider>
            <Paper  className="scroll paper-list" zDepth={1}>
                <ListMessages  {...this.props}/>
                <div
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </Paper>
            <Paper className="send-block" zDepth={2}>
                <AddCity catchError={this.props.catchError} addedCities={this.props.cities} addCity={this.props.addCity}
                         setStartLetter={this.props.setStartLetter} startLetter={this.props.startLetter}
                />
            </Paper>
            <MapView {...this.props} />
            <Notification snackStatus={this.props.snackStatus} updateStatus={this.props.updateStatus}/>
        </MuiThemeProvider>
    }
}
export default connect (
    state =>  ({
        cities: state.addCity,
        snackStatus: state.catchError,
        startLetter: state.setStartLetter
    }),
    actions
)(AppView);