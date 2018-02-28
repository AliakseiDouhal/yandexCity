
export default function addCity(state = [], action) {
    switch (action.type){
        case 'ADD_CITY':
            return [
                ...state,
                action.item
            ];
        default:
            return state
    }
};

