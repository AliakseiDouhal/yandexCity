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

    componentWillReceiveProps() {
        this.enterValue();
    }

    enterValue () {
        console.log(this.refs.inputCity.getValue());
        if(this.refs.inputCity.getValue() !== ''){
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

    addCityUser (event) {
        event.preventDefault();
        let itemText = this.refs.inputCity.getValue().trim();
        let firstInputLetter = itemText[0].toLowerCase();
        if (!this.props.startLetter[0] || firstInputLetter === this.props.startLetter[0]) {
            let count = 0;
            let indexCity = 0;
            let cityValid = cities.some(function (elem) {
                indexCity++;
                return elem.name.toLowerCase() === itemText.toLowerCase();
            });
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
                    const coord = {
                        coordinates: [cities[indexCity - 1].lat, cities[indexCity - 1].lng]
                    };
                    const newItem = {
                        ...coord,
                        name: itemText,
                        id: parseInt(Date.now(), 10),
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
                    const coord = {
                        coordinates: [cities[i].lat, cities[i].lng]
                    };
                    const newItemAI = {
                        ...coord,
                        name: cities[i].name,
                        id: parseInt(Date.now(), 10),
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
        return (
            <form onSubmit={this.addCityUser}>
                <TextField
                    hintText = "Input city"
                    ref ="inputCity"
                    floatingLabelText="City"
                    style={{marginRight: 25}}
                    onChange={ this.enterValue }
                    autocomplete="off"
                />
                <RaisedButton
                    label="Send"
                    primary={true}
                    disabled={!this.state.submit}
                    style={{marginLeft: 25}}
                    type="submit"
                />
            </form>
        )

    }

}

export default AddCity