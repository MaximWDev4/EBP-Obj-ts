import { RouteProp } from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {GpsService} from "../Share/gpsService";

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
    "Token": string,
    "gps"?: GPS,
    "imageAfter"?:string[],
    "imageBefore"?: string[],
    "qrcode"?: string,
    "sid"?: number;
    // "gpsService": GpsService
}

export type RootStackParamList = {
    Start: undefined;
    Login: undefined;
    Welcome: Data;
    Main: Data;
    SignStack: Data;
    ObjStack: Data;
    // Revision: undefined;
    Upload:  Data ;
};

export type SignStackParamList = {
    SignPhotoBefore: Data;
    SignPhotoAfter: Data;
    QR: Data ;
    GPS:Data;
    Znak:Data;
    Root: undefined;
}

export type ObjStackParamList ={
    ObjPhotoBefore: Data
    ObjGPS:Data;
    ObjPhotoAfter: Data
    ObjUpload: Data;
    Root: undefined;
}

export type StartScreenRouteProp = RouteProp<RootStackParamList, 'Start'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
export type UploadScreenRouteProp = RouteProp<RootStackParamList, 'Upload'>;
export type SignStackRouteProp = RouteProp<RootStackParamList, 'SignStack'>;
export type ObjStackRouteProp = RouteProp<RootStackParamList, 'ObjStack'>;
// export type RevisionScreenRouteProp = RouteProp<RootStackParamList, 'Revision'>;

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
export type SignStackNavigationProp = StackNavigationProp<RootStackParamList, 'SignStack'>;
export type ObjStackNavigationProp = StackNavigationProp<RootStackParamList, 'ObjStack'>;

export type SignPhotoBeforeScreenNavigationProp = StackNavigationProp<SignStackParamList, 'SignPhotoBefore'>;
export type QRScreenNavigationProp = StackNavigationProp<SignStackParamList, 'QR'>;
export type GPSScreenNavigationProp = StackNavigationProp<SignStackParamList, 'GPS'>;
export type SignPhotoAfterScreenNavigationProp = StackNavigationProp<SignStackParamList, 'SignPhotoAfter'>;
export type ZnakScreenNavigationProp = StackNavigationProp<SignStackParamList, 'Znak'>;

export type ObjPhotoBeforeScreenNavigationProp = StackNavigationProp<ObjStackParamList, 'ObjPhotoBefore'>;
export type ObjPhotoAfterScreenNavigationProp = StackNavigationProp<ObjStackParamList, 'ObjPhotoAfter'>;
export type ObjGPSScreenNavigationProp = StackNavigationProp<ObjStackParamList, 'ObjGPS'>;


export type SignDataProps = {
    route:  GPSScreenRouteProp
        | QRScreenRouteProp
        | SignPhotoBeforeScreenRouteProp
        | SignPhotoAfterScreenRouteProp
        | ZnakScreenRouteProp;

    navigation:  GPSScreenNavigationProp
        | QRScreenNavigationProp
        | SignPhotoBeforeScreenNavigationProp
        | SignPhotoAfterScreenNavigationProp
        | ZnakScreenNavigationProp;
}

export type ObjDataProps = {
    route:
         ObjPhotoBeforeScreenRouteProp
        |ObjPhotoAfterScreenRouteProp
        |ObjGPSScreenRouteProp;

    navigation:
          ObjPhotoBeforeScreenNavigationProp
        | ObjPhotoAfterScreenNavigationProp
        | ObjGPSScreenNavigationProp;
}

export type MainDataProps = {
    route:
          UploadScreenRouteProp
        | WelcomeScreenRouteProp
        | MainScreenRouteProp
        | SignStackRouteProp
        | ObjStackRouteProp;

    navigation:
          UploadScreenNavigationProp
        | WelcomeScreenNavigationProp
        | MainScreenNavigationProp
        | SignStackNavigationProp
        | ObjStackNavigationProp;
}

export type UndefProps = {
    route: LoginScreenRouteProp
        | StartScreenRouteProp
        // | RevisionScreenRouteProp
    ;
    navigation:LoginScreenNavigationProp | StartScreenNavigationProp
        // | RevisionScreenNavigationProp
    ;
}

