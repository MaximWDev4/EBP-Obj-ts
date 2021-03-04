import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {LoginScreen} from "../Screens/LoginScreen";
import Svg, {Path} from 'react-native-svg'
import {
    ObjDataProps,
    ObjStackParamList,
    RootStackParamList,
    SignDataProps,
    SignStackParamList
} from "./NavTypes";
import StartScreen from "../Screens/StartScreen";
import QRScreen from "../Screens/QRScreen";
import {UploadScreen} from "../Screens/UploadScreen";
import {WelcomeScreen} from "../Screens/WelcomeScreen";
import MainScreen from "../Screens/MainScreen";
import GPSScreen from "../Screens/GPSScreen";
// import {RevisionScreen} from "../Screens/RevisionScreen";
import ZnakFotoAfterScreen from "../Screens/ZnakFotoAfterScreen";
import ZnakScreen from "../Screens/ZnakScreen";
import ZnakFotoBeforeScreen from "../Screens/ZnakFotoBeforeScreen";
import ObjPhotoBeforeScreen from "../Screens/ObjPhotoBeforeScreen";
import ObjPhotoAfterScreen from "../Screens/ObjPhotoAfterScreen";
import ObjUpload from "../Screens/UploadObj";
import ObjGPSScreen from "../Screens/ObjGPSScreen";
import {Home} from "../Share/components";
import {CommonActions} from "@react-navigation/native";



const RootStack = createStackNavigator<RootStackParamList>();
const SignStack = createStackNavigator<SignStackParamList>();
const ObjStack = createStackNavigator<ObjStackParamList>();

const returnHome = (navigation: any) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                {
                    name: 'Root'
                }
            ]
        })
    )
}

function SignNavigation({ navigation, route }: SignDataProps) {
    return(
        <SignStack.Navigator initialRouteName="SignPhotoBefore" >
            <SignStack.Screen name="SignPhotoBefore" component={ZnakFotoBeforeScreen} options={{title: 'Фото знака до работ', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} initialParams={route.params}/>
            <SignStack.Screen name="QR" component={QRScreen} options={{title: 'QR код занка', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <SignStack.Screen name="GPS" component={GPSScreen} options={{title: 'Уточнение локаци', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <SignStack.Screen name="SignPhotoAfter" component={ZnakFotoAfterScreen} options={{title: 'Фото знака после работ', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <SignStack.Screen name="Znak" component={ZnakScreen} options={{title: 'Параметры знака', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <SignStack.Screen name="Root" component={AppNavigation} options={{ headerShown: false }}/>
        </SignStack.Navigator>
    )
}

function ObjNavigation({ navigation, route }: ObjDataProps) {
    return(
        <ObjStack.Navigator initialRouteName="ObjPhotoBefore" >
            <ObjStack.Screen name="ObjPhotoBefore" component={ObjPhotoBeforeScreen} options={{title: 'Фото объекта до работ', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} initialParams={route.params}/>
            <ObjStack.Screen name="ObjGPS" component={ObjGPSScreen} options={{title: 'Уточнение локации', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <ObjStack.Screen name="ObjPhotoAfter" component={ObjPhotoAfterScreen} options={{title: 'Фото объекта после работ', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <ObjStack.Screen name="ObjUpload" component={ObjUpload} options={{title: 'Параметры объекта', headerRight: () => (
                    <Home onPress={() => returnHome(navigation)} color='#222' size={50}/>
                )}} />
            <ObjStack.Screen name="Root" component={AppNavigation} options={{headerShown: false }}/>
        </ObjStack.Navigator>
    )
}

export function AppNavigation() {
    return (
        <RootStack.Navigator initialRouteName="Start">
            <RootStack.Screen name="Login" component={LoginScreen} options={{title: 'Вход',}} />
            <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{title: 'Проверка разрешений',}}/>
            <RootStack.Screen name="Start" component={StartScreen} options={{title: 'Вход',}}/>
            <RootStack.Screen name="Main" component={MainScreen}  options={{title: 'Меню',}} />
            <RootStack.Screen name="SignStack" component={SignNavigation} options={{title: '', headerShown: false }}/>
            <RootStack.Screen name="ObjStack" component={ObjNavigation}  options={{title: '', headerShown: false }}/>
            <RootStack.Screen name="Upload" component={UploadScreen} options={{title: 'Выгрузка сохраненных записей',}}/>

        </RootStack.Navigator>
    );
}
