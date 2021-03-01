import React, {useEffect} from 'react';
import {Alert, BackHandler, StyleSheet, Linking} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {AppNavigation} from "./Navigation/AppNavigation";
import * as FileSystem from 'expo-file-system';
import {ModalActivityIndicator} from "./Share/components";
import {store} from "./Store";
import {GpsService} from './Share/gpsService'
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const fileName = FileSystem.documentDirectory + PERSISTENCE_KEY


export default function App() {
  const gpsService = new GpsService();
  const SetGps = console.log('Initial state: ', store.getState())
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const unsubscribe = store.subscribe(() =>
      console.log('State after dispatch: ', store.getState())
  )
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
    gpsService.start();
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => { backHandler.remove(); unsubscribe(); }
  }, []);
  useEffect(() => {
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
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <ModalActivityIndicator show={!isReady}/>
  }

  return (
        <NavigationContainer
            initialState={initialState}
            onStateChange={(state) => {
              FileSystem.writeAsStringAsync(fileName, JSON.stringify({...state, timestamp: Date.now() + 24*60*60}))
            }
            }
        >
          {AppNavigation()}
        </NavigationContainer>
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
