import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import actions from './action';
import Notification from './components/notification'
import cities from 'cities.json';
import RaisedButton from 'material-ui/RaisedButton';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import List from 'material-ui/List/List';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './message.css';


class AddCity extends Component {
    constructor(props){
        super(props);
        this.addCityUser = this.addCityUser.bind(this);
        this.checkCities = this.checkCities.bind(this);
        this.lastLetter = this.lastLetter.bind(this);
        this.addCityAI = this.addCityAI.bind(this);
        this.sendError = this.sendError.bind(this);
    }

    lastLetter (letter) {
        return this.props.setStartLetter(letter.toLowerCase());
    }

    checkCities (elem) {
        let itemText = this.refs.inputCity.getValue().toLowerCase().trim();
        return elem.name.toLowerCase() === itemText;

    }

    sendError (status, message) {
        let errObj = {
            message: message,
            status: status
        };
        return this.props.catchError(errObj);
    }

    addCityUser () {
        let itemText = this.refs.inputCity.getValue().trim();
        let firstInputLetter = itemText[0].toLowerCase();
        if (!this.props.startLetter[0] || firstInputLetter === this.props.startLetter[0]) {
            let count = 0;
            let cityValid = cities.some(this.checkCities);
            if (cityValid){
                count++;
            }

            if (count === 0) {
                return this.sendError(true, 'There is no such city')
            }

            if (count > 0) {
                let isValid = this.props.addedCities.some(this.checkCities);

                if (!isValid) {
                    this.refs.inputCity.getInputNode().value = '';
                    const newItem = {
                        name: itemText,
                        author: 'I'
                    };
                    this.lastLetter(itemText[itemText.length - 1]);
                    this.props.addCity(newItem);
                    return setTimeout( this.addCityAI(itemText[itemText.length - 1].toLowerCase()), 3000);
                }
                else {
                    return this.sendError(true, 'This city has already been used')
                }
            }

        }
        else {
            return this.sendError(true, 'You need to enter a city with the first letter : ' + this.props.startLetter[0].toUpperCase())
        }
    }

    addCityAI (firstLetter){
        for (let i = 0; i < cities.length; i++ ) {
            if (cities[i].name[0].toLowerCase() === firstLetter){
                let validCity = this.props.addedCities.some(function (elem) {
                    return elem.name.toLowerCase() === cities[i].name.toLowerCase();
                });
                if (!validCity){
                    const newItemAI = {
                        name: cities[i].name,
                        author: 'AI'
                    };
                    this.lastLetter(newItemAI.name[newItemAI.name.length - 1]);
                    return this.props.addCity(newItemAI);
                }
            }
        }
    }

    render () {
        return <div>
            <TextField
                hintText = "Input city"
                ref ="inputCity"
                floatingLabelText="City"
            />
            <RaisedButton label="Send" primary={true} onClick={this.addCityUser} />
        </div>

    }

}


class UserMessage extends Component {
    render () {
        return <div >
                <ListItem

                    disabled={true}
                    leftAvatar={<Avatar>{this.props.author}</Avatar>}
                    secondaryText={
                        <p className="bubble ">{this.props.city}</p>
                    }
                >
                </ListItem>
        </div>
    }
}

class ListUserMessages extends Component{
    constructor(props){
        super(props);
    };
    render () {
        return <List>
            {this.props.cities.map((item, i) =>
                <UserMessage key={i} author={item.author} city={item.name}/>
            )}

        </List>
    }
}

/*
class ComputerMessage extends Component {
    render () {
        return <div>
                <ListItem
                    disabled={true}
                    rightAvatar={<Avatar>AI</Avatar>}
                    secondaryText={
                        <p>Test2</p>
                    }
                >
                </ListItem>
        </div>
    }
}
*/

class AppView extends Component {
    render (){
        return <MuiThemeProvider>
            <Paper  className="scroll paper-list" zDepth={2}>
                <ListUserMessages  {...this.props}/>
            </Paper>
            <Paper className="send-block" zDepth={2}>
                <AddCity catchError={this.props.catchError} addedCities={this.props.cities} addCity={this.props.addCity}
                         setStartLetter={this.props.setStartLetter} startLetter={this.props.startLetter}
                />
            </Paper>
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