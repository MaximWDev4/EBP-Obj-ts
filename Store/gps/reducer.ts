import { CLEAR_GPS, gpsActionType, SET_GPS, stateType} from "../types";

const defaultState = {
    coords: {
        accuracy: null,
        altitude: null,
        heading: null,
        latitude: null,
        longitude: null,
    }
};

// Use the initialState as a default value
export function gpsReducer(
    state = defaultState,
    action: gpsActionType
): stateType {
    switch (action.type) {
        case SET_GPS:
            return {
                ...action.payload
            }

        case CLEAR_GPS:
            return {
                ...defaultState
            }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
