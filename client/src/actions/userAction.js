
import { USER_LOGGED_IN } from '../constants/action-types' 

export function userLoggedIn(payload) {
    return { type: USER_LOGGED_IN, payload }
};