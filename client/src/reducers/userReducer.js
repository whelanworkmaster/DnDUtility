
import { USER_LOGGED_IN } from '../constants/action-types' 

const initialState = {
    user: []
};

function rootReducer(state = initialState, action) {
    if(action.type === USER_LOGGED_IN) {
        return Object.assign({}, state, {
            user: state.user.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;