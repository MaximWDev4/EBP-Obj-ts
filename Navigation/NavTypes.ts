import { RouteProp } from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";

export type GPS = {
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

export type Data = {
    "gps"?: GPS,
    "imageAfter"?:string[],
    "imageBefore"?: string[],
    "qrcode"?: string,
    "sid"?: number;
    // "gpsService": GpsService
}

export type StackParams = {
    SignStack: {imageBefore: any[]};
    ObjStack: {imageBefore: any[]};
    Root: undefined;
}

export type RootStackParamList = {
    Start: undefined;
    Login: undefined;
    Welcome: undefined;
    Main: undefined;
    // Revision: undefined;
    Upload:  undefined ;
};

export type SignStackParamList = {
    SignPhotoBefore: Data;
    SignPhotoAfter: Data;
    QR: Data ;
    GPS:Data;
    Znak:Data;
}

export type ObjStackParamList ={
    ObjPhotoBefore: Data
    ObjGPS:Data;
    ObjPhotoAfter: Data
    ObjUpload: Data;
}

export type RevisionStackParamList = {
    Menu: Data;
}

export type StartScreenRouteProp = RouteProp<RootStackParamList, 'Start'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
export type UploadScreenRouteProp = RouteProp<RootStackParamList, 'Upload'>;
// export type RevisionScreenRouteProp = RouteProp<RootStackParamList, 'Revision'>;
export type StackSignStackRouteProp = RouteProp<StackParams, 'SignStack'>;
export type StackObjParamsRouteProp = RouteProp<StackParams, 'ObjStack'>;
export type StackRootParamsRouteProp = RouteProp<StackParams, 'Root'>;


export type SignPhotoBeforeScreenRouteProp = RouteProp<SignStackParamList, 'SignPhotoBefore'>;
export type QRScreenRouteProp = RouteProp<SignStackParamList, 'QR'>;
export type GPSScreenRouteProp = RouteProp<SignStackParamList, 'GPS'>;
export type ObjGPSScreenRouteProp = RouteProp<ObjStackParamList, 'ObjGPS'>;
export type SignPhotoAfterScreenRouteProp = RouteProp<SignStackParamList, 'SignPhotoAfter'>;
export type ZnakScreenRouteProp = RouteProp<SignStackParamList, 'Znak'>;

export type ObjPhotoBeforeScreenRouteProp = RouteProp<ObjStackParamList, 'ObjPhotoBefore'>;
export type ObjPhotoAfterScreenRouteProp = RouteProp<ObjStackParamList, 'ObjPhotoAfter'>;


export type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Start'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
export type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
export type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;

export type StackSignStackNavigationProp = StackNavigationProp<StackParams, 'SignStack'>;
export type StackObjStackNavigationProp = StackNavigationProp<StackParams, 'ObjStack'>;
export type StackRootStackNavigationProp = StackNavigationProp<StackParams, 'Root'>;

export type SignPhotoBeforeScreenNavigationProp = StackNavigationProp<SignStackParamList, 'SignPhotoBefore'>;
export type QRScreenNavigationProp = StackNavigationProp<SignStackParamList, 'QR'>;
export type GPSScreenNavigationProp = StackNavigationProp<SignStackParamList, 'GPS'>;
export type SignPhotoAfterScreenNavigationProp = StackNavigationProp<SignStackParamList, 'SignPhotoAfter'>;
export type ZnakScreenNavigationProp = StackNavigationProp<SignStackParamList, 'Znak'>;

export type ObjPhotoBeforeScreenNavigationProp = StackNavigationProp<ObjStackParamList, 'ObjPhotoBefore'>;
export type ObjPhotoAfterScreenNavigationProp = StackNavigationProp<ObjStackParamList, 'ObjPhotoAfter'>;
export type ObjGPSScreenNavigationProp = StackNavigationProp<ObjStackParamList, 'ObjGPS'>;


export type StackDataProps = {
    route: StackSignStackRouteProp | StackObjParamsRouteProp | StackRootParamsRouteProp,
    navigation: StackSignStackNavigationProp | StackObjStackNavigationProp | StackRootStackNavigationProp,
}

export type SignDataProps = {
    route:  GPSScreenRouteProp
        | SignPhotoBeforeScreenRouteProp
        | QRScreenRouteProp
        | SignPhotoAfterScreenRouteProp
        | ZnakScreenRouteProp;

    navigation:  GPSScreenNavigationProp
        | SignPhotoBeforeScreenNavigationProp
        | QRScreenNavigationProp
        | SignPhotoAfterScreenNavigationProp
        | ZnakScreenNavigationProp;
}

export type ObjDataProps = {
    route:
         ObjPhotoBeforeScreenRouteProp
        |ObjPhotoAfterScreenRouteProp
        |ObjGPSScreenRouteProp;

    navigation:
        | ObjPhotoAfterScreenNavigationProp
        | ObjPhotoBeforeScreenNavigationProp
        | ObjGPSScreenNavigationProp;
}
export type UndefProps = {
    route:
        LoginScreenRouteProp
        | StartScreenRouteProp

        | MainScreenRouteProp
        // | SignStackRouteProp
        // | ObjStackRouteProp
        | UploadScreenRouteProp
        | WelcomeScreenRouteProp

    navigation:
        LoginScreenNavigationProp
        | StartScreenNavigationProp
        | MainScreenNavigationProp
        | WelcomeScreenNavigationProp
        // | SignStackNavigationProp
        | UploadScreenNavigationProp
        // | ObjStackNavigationProp
}

