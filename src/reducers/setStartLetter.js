
export default function setStartLetter(state = [], action) {
    switch (action.type){
        case 'SET_START_LETTER':
            return [
                action.item
            ];
    }
    return state;

};

