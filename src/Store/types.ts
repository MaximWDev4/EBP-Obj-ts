export type StoreGPS = {
    "coords": {
        "accuracy": number | null,
        "altitude": number | null,
        "heading": number | null,
        "latitude": number | null,
        "longitude": number | null,
        "speed"?: number | null,
    },
    "mocked"?: boolean,
    "timestamp"?: number,
}

interface gpsActionType1 {
    type: string,
    payload: undefined
}

interface gpsActionType2 {
    type: string,
    payload: StoreGPS[]
}

interface stateType1 {
    token: string
}

interface stateType2 {
    s: {
        "coords": {
            "accuracy": number | null,
            "altitude": number | null,
            "heading": number | null,
            "latitude": number | null,
            "longitude": number | null,
            "speed"?: number | null,
        },
        "mocked"?: boolean,
        "timestamp"?: number,
    }[]
}


export const SET_GPS = 'gps/set';
export const CLEAR_GPS ='gps/clear';
export const SET_TOKEN = 'system/set-token';
export const CLEAR_TOKEN ='system/clear-token';

type systemActionType = {
    type: string,
    payload: string
}
type gpsActionType = gpsActionType1 | gpsActionType2;

export {stateType1, stateType2, systemActionType, gpsActionType}
