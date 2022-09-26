import React, {useEffect} from 'react';
import {Alert, BackHandler, StyleSheet, Linking} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {StackNavigator} from "./Navigation/AppNavigation";
import * as FileSystem from 'expo-file-system';
import {ModalActivityIndicator} from "./Share/components";
import {store} from "./Store";
import {GpsService} from './Share/gpsService'
import {GestureHandlerRootView} from "react-native-gesture-handler";
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const fileName = FileSystem.documentDirectory + PERSISTENCE_KEY
const fileUri = FileSystem.documentDirectory + 'Token';

export default function App() {
  const gpsService = new GpsService();
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Уверены?", "Выйти из приложения", [
        {
          text: "Отмена",
          onPress: () => null,
          style: "cancel"
        },
        {text: "Да", onPress: () => BackHandler.exitApp()}
      ]);
      return true;
    };
    let unsubscribe2 = store.subscribe(() => {
      if (store.getState().system.token !== '') {
        if (!gpsService.isRunning) {
          gpsService.start().then();
        }
      }
    })
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => { backHandler.remove(); unsubscribe2();}
  }, []);
  useEffect(() => {
    let asyncFunc = async () => {
      const fileUri = FileSystem.documentDirectory + 'Token';
      let p1;
      try {
        p1 = (await FileSystem.getInfoAsync(fileUri)).exists
      }catch (e) {
        Alert.alert('Ошибка');
      }
      // navigation.replace('Login');
      if (p1) {
        FileSystem.readAsStringAsync(fileUri).then((data) => {
          store.dispatch({type: 'system/set-token', payload: data})
        });
      }
    }
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        // Only restore state if there's no deep link and we're not on web
        const savedStateString = await FileSystem.readAsStringAsync(fileName);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        if (state !== undefined && state.timestamp > Date.now()) {
          delete state.timestamp;
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    }
      if (!isReady) {
        restoreState();
        asyncFunc();
      }
  }, [isReady]);
  if (!isReady) {
    return <GestureHandlerRootView style={{ flex: 1 }}><ModalActivityIndicator show={!isReady}/></GestureHandlerRootView>
  }
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer
            initialState={initialState}
            onStateChange={(state) => {
              console.log(store.getState().system);
              console.log(state);
              FileSystem.writeAsStringAsync(fileName, JSON.stringify({...state, timestamp: Date.now() + 24*60*60}))
            }
            }
        >
          {StackNavigator()}
        </NavigationContainer>
      </GestureHandlerRootView>
  );
}
// export default function App() {
//   const gpsService = new GpsService;
//
//
//
//   return (
//
//       <NavigationContainer>
//         {Platform.OS === 'ios' && <StatusBar/>}
//
//       </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
