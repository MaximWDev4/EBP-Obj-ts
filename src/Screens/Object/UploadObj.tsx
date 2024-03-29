import { Text, View, StyleSheet, Button } from 'react-native';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import {addRecord, getUrl, sendPhoto} from '../../Share/func';
import DB from '../../Share/storage'
import {Data, SignDataProps} from "../../Navigation/NavTypes";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import {CommonActions} from "@react-navigation/native";
import {ModalActivityIndicator} from "../../Share/components";
import {store} from "../../Store";


export type listItem ={
	"id": number,
	"name": string
}

export default function ObjUpload({navigation, route}: SignDataProps) {
	const [vidRabSource, setVidRabSource] = useState<listItem[]>([]);
	const [objTypeSource, setObjTypeSource] = useState<listItem[]>([]);
	const [objType, setObjType] = useState<string|number>('');
	const [vidRab, setVidRab] = useState<string|number>('');
	const [loading, setLoading] = useState<boolean>(false);
	const Data: Data = route.params;
	const Token = store.getState().system.token;
	const db = new DB;
	const Network = async (): Promise<boolean> => {
		let check: boolean = false;
		await NetInfo.fetch().then(state => {
			check = state.isConnected??false;
		});
		return check;
	}


	useEffect(() => {
		getVidRab();
		getObjType();

	},[])
	const sendData = () => {

		let body =
			'Token=' + Token + '&' +
			'GPS_X=' + Data.gps?.coords.latitude + '&' +
			'GPS_Y=' + Data.gps?.coords.longitude + '&' +
			'TYPE=' + objType + '&' +
			'VIDR=' + vidRab;

		const url = getUrl('saveobj');
		// const saveImage = async (Data: Data, id: number) => {
		// 	let ImgStorage = FileSystem.documentDirectory + 'Image_';
		// 	let uri = id === 1 ? Data.imageBefore : Data.imageAfter;
		// 	let destination = ImgStorage + uri?.substr(uri?.length - 10);
		// 	if (uri) {
		// 		let downloadObject = FileSystem.moveAsync({
		// 				from: uri,
		// 				to: destination
		// 			}
		// 		);
		// 		await downloadObject;
		//
		// 		return destination;
		// 	} else{
		// 		return ''
		// 	}
		// }
		const next = (response: any) => {
			setLoading(false);
			Data.gps = undefined;
			Data.imageBefore = [];
			Data.imageAfter = [];
			Alert.alert('OK', 'Отчет успешно отправлен', [
				{
					text: 'Вернуться на главный экран',
					onPress: () => navigation.dispatch(
						CommonActions.reset({
							index: 5,
							routes: [
								{
									name: 'Root'
								}
							]
						})
					)
				}
			]);
		}
		setLoading(true);
		try	{
			Network().then((state) => {
				if (
					state
				) {
					fetch(url, {
						method: 'post',
						headers: {
							"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
						},
						body: body,
					})
						.then((response) => {
							console.log(JSON.stringify(response));
							return response.json()
						})
						.then((responseJson) => {
							if (responseJson.code == 0) {
							sendPhoto(responseJson.id, Data, 'obj').then(() => next((responseJson: any) =>  { console.log(responseJson)}));
							} else {
								//Alert.alert('Res:', responseJson.msg + ' -- ' + responseJson.code );
								Alert.alert('Ошибка:' + responseJson.code,  responseJson.msg, [
									{
										text: 'Сохранить и вернуться на главный экран',
										onPress: () => {
											const saveRecord = async () => {
												let saveBefore = Data.imageBefore;
												let saveAfter = Data.imageAfter;
												addRecord('obj', body, saveBefore, saveAfter).then((data) => {
												});
											}
											saveRecord().then(() => {
												Alert.alert('OK', 'Отчет успешно сохранен во внутреннем хранилище', [
													{
														text: 'Вернуться на главный экран',
														onPress: () => navigation.dispatch(
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
												]);
											});
										}
									},
									{
										text: 'Повторить попытку',
									},
								]);
							}
						})
						// .then(function(response: any) {
						// 	    if (!response.ok) {
						// 			throw response.msg
						// 		}
						// })
						.catch(err => {
							const saveRecord = async () => {
								let saveBefore = Data.imageBefore;
								let saveAfter = Data.imageAfter;
								addRecord('obj', body, saveBefore, saveAfter).then((data) => {
								});
							}
							saveRecord().then(() => {
								Alert.alert('OK', 'Отчет успешно сохранен во внутреннем хранилище', [
									{
										text: 'Вернуться на главный экран',
										onPress: () => navigation.dispatch(
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
								]);
							});
							setLoading(false);
							alert(err.toString());
							//err.text().then( errorMessage => {
							//props.dispatch(displayTheError(errorMessage))
							//})
						})
				}
				else {
					const saveRecord = async () => {
						let saveBefore = Data.imageBefore;
						let saveAfter = Data.imageAfter;
						addRecord('obj', body, saveBefore, saveAfter).then((data) => {
						});
					}
					saveRecord().then(() => {
						Alert.alert('OK', 'Отчет успешно сохранен во внутреннем хранилище' + '', [
							{
								text: 'Вернуться на главный экран',
								onPress: () => navigation.dispatch(
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
						]);
					});
				}
			})

		} catch (e) {
			setLoading(false);
			alert('Ошибка');
		}

	}
	let vidRabData: JSX.Element[] = [];
	let objTypeData: JSX.Element[] = [];
	const getVidRab = () => {

		const fileUri = FileSystem.documentDirectory + 'vidr';

		return FileSystem.readAsStringAsync(fileUri).then(( data ) => {
			setVidRabSource(JSON.parse(data));
		});
	}

	const getObjType = () => {

		const fileUri = FileSystem.documentDirectory + 'objtype';

		return FileSystem.readAsStringAsync(fileUri).then(( data ) => {
			setObjTypeSource(JSON.parse(data));
		});
	}

	if ( objTypeSource  ) {
		objTypeData = objTypeSource.map((obj) => {
			return <Picker.Item value={obj.id} label={obj.id + ' (' + obj.name +')' } key={obj.id} />
		});
	}
	if ( vidRabSource  ) {
		vidRabData = vidRabSource.map((obj) => {
			return <Picker.Item value={obj.id} label={obj.id + ' (' + obj.name +')' } key={obj.id} />
		});
	}


		return (
				<View style={{ flexDirection: 'column', flex: 1 }}>
					<ModalActivityIndicator show={loading}/>
					<View style={{
						padding: 5,
						//paddingBottom: 15,
						marginBottom: 15,
						//paddingTop: 15,
			  		 	flex: 1,
						//height:15,
					//backgroundColor: 'red'
					}}>

						<Text style={styles.text}> Выберите вид объекта: </Text>

						<Picker
						selectedValue={ objType }
						style={styles.picker}
						onValueChange={(itemValue) => { setObjType(itemValue) }}
						>
							{ objTypeData }
						</Picker>

					</View>

					<View style={{ padding: 5, flex: 1,
						//paddingTop: 15,
						//paddingBottom: 25,
						marginBottom: 15,
					}}>

						<Text style={styles.text}> Вид работ: </Text>

						<Picker
						selectedValue={ vidRab }
						style={styles.picker}
						onValueChange={(itemValue) => { setVidRab(itemValue) }}
						>
						{ vidRabData }
						</Picker>

					</View>


					<View style={{ padding: 5, flex: 1, }} />
					<View style={{ padding: 5, flex: 1, }} />




					<View style={{ flex: 1,
						flexDirection: 'column-reverse',
						padding: 5,
					}} >
                                <Button
                                    title='Отправить'
									// style={{ flex: 1,
									// }}
									onPress={() => {
										///fetchGost()
										sendData()
									}}
									/>
					</View>

				</View>
			   );

}



//
// ZnakScreen.navigationOptions = {
//   title: 'Znak',
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
		//padding: 5,
		paddingTop: 15,
		fontSize: 15,
    },
	input: {
		height: 40,
		backgroundColor: '#eee',
		borderColor: 'gray',
		borderWidth: 1
	},


    picker: {
		backgroundColor: '#eee',
        //width: Dimensions.get('window').width - 30
    },


    button: {
        margin: 5
    }
});
