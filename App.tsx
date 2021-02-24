import React, {useEffect} from 'react';
import {Alert, BackHandler, StyleSheet, Platform, Linking} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {AppNavigation} from "./Navigation/AppNavigation";
import * as FileSystem from 'expo-file-system';
import {ModalActivityIndicator} from "./Share/components";

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const fileName = FileSystem.documentDirectory + PERSISTENCE_KEY

export default function App() {
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

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        // if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await FileSystem.readAsStringAsync(fileName);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          console.log(state)
          if (state !== undefined) {
            setInitialState(state);

          }
        // }
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
            FileSystem.writeAsStringAsync(fileName, JSON.stringify(state))
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
