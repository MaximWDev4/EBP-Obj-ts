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


interface gpsActionType2 {
    type: string,
    payload: StoreGPS
}

interface stateType {
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


export const SET_GPS = 'gps/set';
export const CLEAR_GPS ='gps/clear';


type gpsActionType = gpsActionType2;

export {stateType, gpsActionType}
