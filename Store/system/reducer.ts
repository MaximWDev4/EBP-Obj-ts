import {CLEAR_TOKEN, SET_TOKEN, stateType1, systemActionType} from "../types";

const defaultState = {
    token: ''
};

export function systemReducer(
    state = defaultState,
    action: systemActionType
): stateType1 {
    switch (action.type) {
        case SET_TOKEN: {
            if (!!action.payload) {
                return {
                   token: action.payload
                }
            } else {
                return  state
            }
        }

        case CLEAR_TOKEN:
            return defaultState
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
