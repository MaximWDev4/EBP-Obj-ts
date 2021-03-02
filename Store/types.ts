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

interface stateType {
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


type gpsActionType = gpsActionType1 | gpsActionType2;

export {stateType, gpsActionType}
