let initState = [{
    message: '',
    status: false
}];
export default function catchError(state = initState, action) {
    switch (action.type){
        case 'ERROR_CITY':
            return [
                action.item
            ];
        case 'UPDATE_SNACK_STATUS':
            return [
                action.item
            ];
        default:
            return state;
    }

};

