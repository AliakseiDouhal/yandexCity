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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './message.css';


class AddCity extends Component {
    constructor(props){
        super(props);
        this.addCityUser = this.addCityUser.bind(this);
        this.checkCities = this.checkCities.bind(this);
        this.lastLetter = this.lastLetter.bind(this);
        this.addCityAI = this.addCityAI.bind(this)
    }

    lastLetter (letter) {
        return this.props.setStartLetter(letter);
    }

    checkCities (elem) {
        let itemText = this.refs.inputCity.getValue().toLowerCase().trim();
        return elem.name.toLowerCase() === itemText;

    }

    addCityUser () {
        let itemText = this.refs.inputCity.getValue().trim();
        if (itemText !== "") {
            let count = 0;
            let cityValid = cities.some(this.checkCities);
            if (cityValid){
                count++;
            }

            if (count === 0) {
                let errObj = {
                    message: 'There is no such city',
                    status: true
                };
                return this.props.catchError(errObj);
            }

            if (count > 0) {
                let isValid = this.props.addedCities.some(this.checkCities);

                if (!isValid) {
                    this.refs.inputCity.getInputNode().value = '';
                    const newItem = {
                        name: itemText,
                        author: 'I'
                    };
                  /*  this.lastLetter(itemText[itemText.length - 1]);*/
                    this.props.setStartLetter(itemText[itemText.length - 1]);
                    console.log(itemText[itemText.length - 1]);
                    this.props.addCity(newItem);
                    return this.addCityAI();
                }
                else {
                    let errObj = {
                        message: 'This city has already been used',
                        status: true
                    };
                    return this.props.catchError(errObj);
                }
            }

        }
    }

    addCityAI (){
        console.log(this.props.startLetter[0]);

        for (let i = 0; i < cities.length; i++ ) {
            if (cities[i].name[0].toLowerCase() === this.props.startLetter[0]){
                for (let n = 0; n < this.props.addedCities.length; n++ ) {
                    if (cities[i].name.toLowerCase() !== this.props.addedCities[n].name.toLowerCase()) {
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
    }

    render () {
        return <div>
            <TextField
                hintText = "Input city"
                ref ="inputCity"
                floatingLabelText="Floating Label Text"
            />
            <RaisedButton label="Primary" primary={true} onClick={this.addCityUser} />
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

    }
    render () {
        return <List>
            {this.props.cities.map((item, i) =>
                <UserMessage key={i} author={item.author} city={item.name}/>
            )}

        </List>
    }
}

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

class AppView extends Component {
    render (){
        return <MuiThemeProvider>
            <ListUserMessages {...this.props}/>
            <AddCity catchError={this.props.catchError} addedCities={this.props.cities} addCity={this.props.addCity}
                     setStartLetter={this.props.setStartLetter} startLetter={this.props.startLetter}
            />
            <Notification snackStatus={this.props.snackStatus} updateStatus={this.props.updateStatus}/>

        </MuiThemeProvider>
    }
}
export default connect (
    state =>  ({
        test: console.log(state),
        cities: state.addCity,
        snackStatus: state.catchError,
        startLetter: state.setStartLetter
    }),
    actions
)(AppView);