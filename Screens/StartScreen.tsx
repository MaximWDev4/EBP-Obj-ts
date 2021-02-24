import * as React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {Data, UndefProps} from "../Navigation/NavTypes";
import {useEffect} from "react";
import {Button} from "react-native-elements";


export default function StartScreen({ navigation }: UndefProps) {
	let Data: Data = {
		"Token": '',
	}

	useEffect(() => {
		let asyncFunc = async () => {
			const fileUri = FileSystem.documentDirectory + 'Token';
			let p1;
			try {
				p1 = (await FileSystem.getInfoAsync(fileUri)).exists
			}catch (e) {
				Alert.alert(e);
				navigation.replace('Login');
			}
			// navigation.replace('Login');
			if (p1) {
				FileSystem.readAsStringAsync(fileUri).then((data) => {
					Data.Token = data;
					navigation.replace('Main',
						Data)
				});
			} else {
				navigation.replace('Login')
			}
		}
		asyncFunc();
	}, [])



	return (
		<View style={{flexDirection: 'column', flex: 1}}>
			<Button title={'Перейти ко входу'} onPress={() => {navigation.replace('Login') }}/>
		</View>
	);

}



StartScreen.navigationOptions = {
	title: 'Start',
	headerLeft: null,
	gesturesEnabled: false,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

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
    },
	input: {
		height: 40,
		backgroundColor: '#eee',
		borderColor: 'gray',
		borderWidth: 1
	},




    button: {
        margin: 5
    }
});
