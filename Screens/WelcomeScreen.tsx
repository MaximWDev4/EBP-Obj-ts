import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Data, UndefProps} from "../Navigation/NavTypes";
import {useState} from "react";


export function WelcomeScreen({navigation, route}: UndefProps) {
	const [errorMessage, setErrorMessage] = useState('');
	const [net, setNet] = useState(false);
	const [gps, setGps] = useState(false);

	const checkNetwork = () => {
		NetInfo.fetch().then(state => {
			setNet(state.isConnected);
		})
	}

	const checkSatus = () => {

      _getLocationAsync();
	  checkNetwork();

	}

  const _getLocationAsync = async () => {
    let { status } = (await Permissions.askAsync(Permissions.LOCATION)).permissions;

    if (status.status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
    }

    let location = await Location.hasServicesEnabledAsync();
		setGps(location)
  };


	let next = net && gps ;

	return (
			<View
			style={{
				flexDirection: 'column',


		   flex: 1 }}>

		   <View
		   style={{

			   //backgroundColor: 'red',

			   padding: 20,
		   flex: 1,
		   }}
		   >


		   <Text style={styles.header}>
		   Работа сервиса
		   </Text>

		   <Text style={styles.text}>
		   Статус подключения:
		   {net ? <Text style={styles.ok}> OK </Text> : <Text style={styles.fail}> Нет </Text>}
	</Text>

		<Text style={styles.text}>
		GPS:
		{gps ? <Text style={styles.ok}> OK </Text> : <Text style={styles.fail}> Не подключено </Text>}
	</Text>


		</View>

		<View style={{ flex: 1,

			//flexDirection: 'column-reverse',
			//justifyContent: 'space-between',

			justifyContent: 'center',
			//backgroundColor: 'green',

			padding: 5,
		}} >
	<Button
		title={ next ? 'Далее' : 'Начать тест' }

	// style={{ flex: 1,
	// }}
	onPress={() => {
		if (next) {
			//props.navigation.navigate('Main', {  })
			//props.navigation.navigate('Main', Data)
			navigation.replace('Main')
		} else {
			checkSatus();
		}
	}}

	//onPress={() => {
	//fetchData(2)
	//}}
	>
		</Button>
		</View>

		</View>
		);

}




// WelcomeScreen.navigationOptions = {
//   title: 'Welcome',
// };

//const styles = StyleSheet.create({
  //centerText: {
	//flex: 1,
	//fontSize: 18,
	//padding: 32,
	//color: '#777',
  //},
  //textBold: {
	//fontWeight: '500',
	//color: '#000',
  //},
  //buttonText: {
	//fontSize: 21,
	//color: 'rgb(0,122,255)',
  //},
  //buttonTouchable: {
	//padding: 16,
  //},
  //welcome: {
	//fontWeight: '500',
	//color: 'green',
  //},
  //instructions: {
	//fontWeight: '500',
	//color: 'yellow',
  //},





//});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    //picker: {
        //width: Dimensions.get('window').width - 30
    //},
    //datepicker: {
        //width: Dimensions.get('window').width - 30,
        //margin: 10,
        //marginBottom: 20
    //},
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },



    text: {
		height: 40,
		textAlignVertical: 'bottom',
		fontSize: 17,
    },
    header: {
		height: 40,
		textAlignVertical: 'bottom',
		textDecorationLine: 'underline',
		fontSize: 22,
    },

	input: {
		height: 40,
		backgroundColor: '#eee',
		borderColor: 'gray',
		borderWidth: 1
	},
    ok: {
		color:'green',
    },
    fail: {
		color:'red',
    },

});
