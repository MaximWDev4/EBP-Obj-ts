import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {Data, UndefProps} from '../Navigation/NavTypes'
import { getUrl } from '../Share/func';
import {useState} from "react";


export function LoginScreen ({route, navigation}: UndefProps) {
	let Token: any = '';
	const Data: Data = {
		Token
	};
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onChangeText1 = (text: string) => {
		setUsername(text);
	}

	const onChangeText2 = (text: string) => {
		setPassword(text);
	}
	const getToken = () => {

		if (!username || !password) {
			alert('Empty Username or Password');
			return;
		}

		const url = getUrl('auth');
		let body = 'USERNAME=' + username + '&' + 'PASSWORD=' + password;

		try {
			return fetch(url, {

				//return await fetch(url, {
				method: 'post',
				//method: 'get',
				headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					'Accept': 'application/json'
				},
				body: body,
			})
				.then(response => {
					if (response.ok) {
						return response.json()
					} else if (response.status === 404) {
						return Promise.reject('error 404: ' + response.statusText).then((success) => {
						}, (error) => Alert.alert('Error 404', 'Не найден путь'));
					} else {
						return Promise.reject('some other error: ' + response.status).then((success) => {
						}, (error) => Alert.alert('Error', 'Неожиданная ошибка сети'));
					}
				})
				//.then(async(responseJson) => {
				.then((responseJson) => {
					//if ( responseJson.code == 0 ) {
					if (typeof responseJson.token !== 'undefined' || responseJson.token !== null) {
						//const id = responseJson.id;
						//const Token = responseJson.token;
						Token = responseJson.token;

						const fileUri = FileSystem.documentDirectory + 'Token';

						//const p1 = FileSystem.getInfoAsync(fileUri);
						return FileSystem.writeAsStringAsync(fileUri, Token);

					} else {
						//Alert.alert('Res:', responseJson.msg + ' -- ' + responseJson.code );
						//Alert.alert('Error', responseJson.code + ': ' + responseJson.msg );
						Alert.alert('Error ' + responseJson.code + ': ', responseJson.msg);
					}

				})

				.then(async (responseJson) => {
					const url = getUrl('objtype');

					//return fetch(url) .then((response) => {
					return await fetch(url).then((response) => {
						return response.json()
					}).then((responseJson) => {

						let data: any[] = [];

						for (var i = 0; i < responseJson.length; i++) {
							let obj = responseJson[i];

							data.push({
								id: obj.id,
								name: obj.name,
							})
						}

						const fileUri = FileSystem.documentDirectory + 'objtype';
						return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
					})

				}).then(async (responseJson) => {
					const url = getUrl('vidr');
					return await fetch(url).then((response) => {
						return response.json()
					}).then((responseJson) => {

						let data: any[] = [];

						for (var i = 0; i < responseJson.length; i++) {
							let obj = responseJson[i];

							data.push({
								id: obj.id,
								name: obj.name,
							})
						}

						const fileUri = FileSystem.documentDirectory + 'vidr';
						return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
					})

				})
				.then(async (responseJson) => {
					const url = getUrl('gost');

					//return fetch(url) .then((response) => {
					return await fetch(url).then((response) => {
						return response.json()
					})
						.then((responseJson) => {

							let data: any[] = [];

							for (var i = 0; i < responseJson.length; i++) {
								let obj = responseJson[i];

								if (!Array.isArray(data[obj.type])) {
									data[obj.type] = [];
								}

								data[obj.type].push({
									id: obj.id,
									name: obj.name,
									number: obj.number,
								})
							}

							const fileUri = FileSystem.documentDirectory + 'gost';
							return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
						})

				})
				.then(async (responseJson) => {
					const url = getUrl('krepl');

					return await fetch(url).then((response) => {
						return response.json()
					}).then((responseJson) => {

						const fileUri = FileSystem.documentDirectory + 'krepl';
						return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson));
					})

				})
				.then(async (responseJson) => {
					const url = getUrl('tiporaz');

					return await fetch(url).then((response) => {
						return response.json()
					}).then((responseJson) => {

						const fileUri = FileSystem.documentDirectory + 'tiporaz';
						return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson));
					})

				})
				.then(async (responseJson) => {
					const url = getUrl('roles');

					let body = 'Token=' + Token;

					return fetch(url, {
						method: 'post',
						headers: {
							"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
						},
						body: body,
					})
						.then((response) => {
							return response.json()
						}).then((responseJson) => {
							console.log(JSON.stringify(responseJson))
							const fileUri = FileSystem.documentDirectory + 'roles';
							return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson));
						})

				})
				.then((responseJson) => {
					Data.Token = Token;
					navigation.replace('Welcome', Data)
					//this.props.navigation.navigate('Znak', { Data: this.Token })

				}).catch((error) => Alert.alert('Неверный логин или пароль'));
		} catch (e) {
			alert(e);
		}
	}
	return (
			<View style={{ flexDirection: 'column', flex: 1 }}>
				<View style={{ flex: 1 }} />

				<View style={{ padding: 5, flex: 1}}>
					<Text style={styles.text}>
						Login
					</Text>

					<TextInput style={styles.input} onChangeText={text => onChangeText1(text)}
						//onChangeText={text => onChangeText(text)}
						//value={value}
						value={username}
					/>


					<Text style={styles.text}>
						Password
					</Text>

					<TextInput style={styles.input} onChangeText={text => onChangeText2(text)}
						//onChangeText={text => onChangeText(text)}
						//value={value}
						value={password}
					/>

				</View>

				<View style={{ flex: 1, flexDirection: 'column-reverse', padding: 5, }} >
					<Button title='Войти' onPress={() => {
						getToken();
					}}
						//this.props.navigation.navigate('Welcome', { Data })
						//this.props.navigation.navigate('Welcome', {
						//Data: {
						//Token: 'a6065650fb9b5df5f8bdaa796ab50c84',
						//}
						//})
						//this.props.navigation.navigate('Welcome', {
						//routes: this.state.routes,
						////parking: this.state.parking, car: this.state.carname, carsjson: this.state.dataSource
						//})
						//this.fetchData(2)
					>
						Text
					</Button>
				</View>

			</View>
		);
}


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
