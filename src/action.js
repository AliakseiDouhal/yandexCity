let addCity = function (item) {
    return {
        type: 'ADD_CITY',
        item
    }
};

let catchError = function (item) {
    return {
        type: 'ERROR_CITY',
        item
    }
};

let updateStatus = function (item) {
    return {
        type: 'UPDATE_SNACK_STATUS',
        item
    }
};

let setStartLetter = function (item) {
    return {
      type: 'SET_START_LETTER',
      item
    }
};

module.exports = {addCity, catchError, updateStatus, setStartLetter };