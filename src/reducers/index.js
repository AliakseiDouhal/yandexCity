import { combineReducers } from 'redux';

import addCity from './addCity';
import catchError from './catchError';
import setStartLetter from './setStartLetter'

export default combineReducers({
    addCity,
    catchError,
    setStartLetter

})