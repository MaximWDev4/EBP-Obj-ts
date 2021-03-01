import {StoreGPS, gpsActionType, SET_GPS, CLEAR_GPS} from "../types"

export function setGps(newGps: StoreGPS) : gpsActionType {
    return {
        type: SET_GPS,
        payload: newGps,
    }
}

export function clearGps() : gpsActionType {
    return {
        type: CLEAR_GPS,
        payload: undefined
    }
}
