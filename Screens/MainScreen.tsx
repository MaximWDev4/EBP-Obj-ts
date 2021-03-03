import * as React from 'react';
import {View, StyleSheet, Button, BackHandler} from 'react-native';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

import DB from '../Share/storage'
import {MainDataProps, Data} from "../Navigation/NavTypes";
import {useEffect, useState} from "react";
import {CommonActions} from "@react-navigation/native";
import {store} from "../Store";


export default function MainScreen({ route, navigation }: MainDataProps) {
	let Data: Data = route.params;
	// const gpsService = Data.gpsService;
	const [count, setCount] = useState<number | string>('-');
	let db = new DB;
	const [rolesSource, setRolesSource] = useState('');
	let SignButton = null;
	let objectButton = null;
	let revision = null;

	useEffect( ()=> {
		const t =  FileSystem.documentDirectory + 'Token';
		FileSystem.readAsStringAsync(t)
			.then((data)=> {

				if (data === ''){
					navigation.replace('Login');
				}
			})
			.catch((err) => {
			Alert.alert('Непредвиденная ошибка', err);
			navigation.replace('Login');
		});
		const fileUri = FileSystem.documentDirectory + 'roles';
		FileSystem.readAsStringAsync(fileUri).then((data) => {
				setRolesSource(JSON.stringify(data))
			}
		);
	}, [])

	// get ready to send records amount
	db.getCount((savedCount: number) => {
		setCount(savedCount)
	});

	const logout = async() => {

		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'Token');
		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'roles');
		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'gost');
		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'tiporaz');
		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'krepl');
		store.dispatch({type: 'system/clear-token', payload: ''})
		navigation.dispatch(
			CommonActions.reset({
				index: 5,
				routes: [
					{
						name: 'Login'
					}
				]
			})
		)
	}


	const maintainSign = () => {
		Alert.alert(
			'Вы уверены что хотите обслужить знак?',
			'',
			[
				{
					text: 'Назад',
					style: 'cancel',
				},
				{text: 'Да', onPress: () => {
						navigation.push('SignStack',  Data )
					}},
			],
		);
	}

	const maintainObj = ()=> {
		Alert.alert('Обслужить объект?', '',
			[{
				text: 'Назад',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{text: 'Да', onPress: () => {
					navigation.push('ObjStack', Data)
				}},
			]
		);
	}

	// const makeRevision = ()=> {
	// 	navigation.navigate('Revision');
	// }

	const uploadSign= ()=>{

		if (!count || count === '-') {
			alert('Нечего выгружать!');
		} else {
			navigation.replace('Upload',  Data)
		}

	}

		if (rolesSource && rolesSource.indexOf("1") > -1) {
			SignButton = (
				<View style={{
					flex: 1,
				}}
				>
					<Button
						title='Обслужить дорзнак'

						onPress={() => {
							// try {
							// 	gpsService.start();
							// } catch (e) {
							// 	alert(e)
							// }
							maintainSign();
						}}
					>
					</Button>
				</View>

			);
		}

		if (rolesSource && rolesSource.indexOf("3") > -1) {
			objectButton = (

				<View style={{
					flex: 1,
				}}
				>
					<Button
						title='Обслужить объект'

						onPress={() => {
							// try {
							// 	gpsService.start();
							// } catch (e) {
							// 	alert(e)
							// }
							maintainObj()
						}}
					>
					</Button>
				</View>

			);
		}
		// if (rolesSource && rolesSource.indexOf("1") > -1) {
		// // if (rolesSource.indexOf("1") > -1) {
		// 	revision = (
		//
		// 		<View style={{
		// 			flex: 1,
		// 		}}
		// 		>
		// 			<Button
		// 				title='Ревизия'
		//
		// 				onPress={() => {
		// 					makeRevision()
		// 					// alert( getRoles())
		// 				}}
		// 			>
		// 			</Button>
		// 		</View>
		//
		// 	);
		// }


	let title = `Выгрузить данные (${count})`

	return (
		<View
			style={{
				flexDirection: 'column',


				flex: 1
			}}>

			<View style={{flex: 1}}/>

			<View
				style={{

					//justifyContent: 'space-between',
					//justifyContent: 'flex-start',
					justifyContent: 'center',

					padding: 5,
					flex: 2,

				}}
			>
				<View style={{flex: 1}}>
					{SignButton}

					{objectButton}

					{revision}
				</View>

				{/*<View style={{*/}
				{/*	flex: 1,*/}
				{/*}}*/}
				{/*>*/}
				{/*	<Button*/}
				{/*		title='Ревизия'*/}

				{/*		onPress={() => {*/}
				{/*			alert( getRoles())*/}
				{/*		}}*/}
				{/*	>*/}
				{/*	</Button>*/}
				{/*</View>*/}
				<View style={{
					//paddingTop: 5,
					flex: 1,
				}}
				>
					<Button
						title={title}

						onPress={() => {
							uploadSign()
						}}
					>
					</Button>
				</View>

				{/*
								<View style={{
									paddingTop: 25,
									flex: 1,
								}}
								>
									<Button
										title='Ревизия'

										//onPress={() => {
											//fetchData(2)
										//}}
										>
									</Button>
								</View>
								*/}


			</View>

			<View style={{
				flex: 0.33,
				flexDirection: 'column-reverse',
				padding: 5,
			}}>
				<Button
					title='Выйти из аккаунта'
					onPress={() => {
						logout().then();
					}}

					//onPress={() => {
					//fetchData(2)
					//}}
				>
				</Button>
			</View>
			<View style={{
				flex: 0.33,
				flexDirection: 'column-reverse',
				padding: 5,
			}}>
				<Button
					title='Выйти'
					onPress={() => {
						Alert.alert("Уверены?", "Выйти из приложения", [
							{
								text: "Отмена",
								onPress: () => null,
								style: "cancel"
							},
							{text: "Да", onPress: () => BackHandler.exitApp()}
						])
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




MainScreen.navigationOptions = {
	title: 'Main',
};

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
