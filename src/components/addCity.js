import React, { Component } from 'react';
import cities from 'cities.json';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import '../stules/addCity.css'

class AddCity extends Component {
    constructor(props){
        super(props);
        this.addCityUser = this.addCityUser.bind(this);
        this.checkCities = this.checkCities.bind(this);
        this.lastLetter = this.lastLetter.bind(this);
        this.enterValue = this.enterValue.bind(this);
        this.addCityAI = this.addCityAI.bind(this);
        this.sendError = this.sendError.bind(this);
        this.state = {submit: false};
    }

    enterValue (e) {
        if(e.target.value !== ''){
            this.setState({submit: true})
        }
        else{
            this.setState({submit: false})
        }
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
                    this.setState({submit: false});
                    return setTimeout(() => this.addCityAI(itemText[itemText.length - 1].toLowerCase()), 1500);
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
                    this.setState({submit: true});
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
                style={{marginRight: 25}}
                onChange={ this.enterValue }
            />
            <RaisedButton label="Send"
                          primary={true}
                          disabled={!this.state.submit}
                          onClick={this.addCityUser}
                          style={{marginLeft: 25}}
            />
        </div>

    }

}

export default AddCity