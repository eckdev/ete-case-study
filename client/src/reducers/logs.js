import {INSERT_LOGS} from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
        case INSERT_LOGS:
            return state.concat(action.payload)    
        default:
                return state;
    }
}