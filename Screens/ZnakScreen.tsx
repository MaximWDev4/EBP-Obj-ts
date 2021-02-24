import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as FileSystem from 'expo-file-system';
import {addRecord, getUrl, sendPhoto} from '../Share/func';
import { CommonActions } from '@react-navigation/native';
import {Data, SignDataProps} from "../Navigation/NavTypes";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import {ModalActivityIndicator} from "../Share/components";

type gostType = {id: number, name: string}[]

const gostTypes = [
	{ id: 1, name: 'Предупреждающие'},
	{ id: 2, name: 'Приоритета'},
	{ id: 3, name: 'Запрещающие'},
	{ id: 4, name: 'Предписывающие'},
	{ id: 5, name: 'Информационно-указательные'},
	{ id: 6, name: 'Сервиса'},
	{ id: 7, name: 'Дополнительной информации'},
];

export default function ZnakScreen({navigation, route}: SignDataProps) {
	const [gost, setGost] = useState<string | number>('');
	const [tiporaz, setTiporaz] = useState<number | string>(0);
	const [krepl, setKrepl] = useState< number | string >(0);
	const [gostType, setGostType] = useState(1);
	const [gostTypeSource, setGostTypeSource] = useState<gostType>(gostTypes);
	const [gostSource, setGostSource] = useState<any[]>([]);
	const [tiporazSource, setTiporazSource] = useState<string[]>([]);
	const [kreplSource, setKreplSource] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const Data: Data = route.params;
	const Network = async (): Promise<boolean> => {
		let check: boolean = false;
		await NetInfo.fetch().then(state => {
			check = state.isConnected;
		});
		return check;
	}


	useEffect(() => {
		getGost();
		getKrepl();
		getTiporaz();

	},[])

	const next = (responseJson: any) => {
		setLoading(false);
		Data.gps = undefined;
		Data.imageBefore = undefined;
		Data.imageAfter = undefined;
		Data.qrcode = undefined;
		Alert.alert('OK', 'Отчет успешно отправлен', [
			{
				text: 'Вернуться на главный экран',
				onPress: () => navigation.replace('Root')
			}
		]);
	}

	const sendData = () => {



		let body =
			'Token=' + Data.Token + '&' +
			'GPS_X=' + Data.gps?.coords.latitude + '&' +
			'GPS_Y=' + Data.gps?.coords.longitude + '&' +
			'QRDATA=' + Data.qrcode + '&' +
			'GOST=' + gost + '&' +
			'TIPORAZ=' + tiporaz + '&' +
			'KREPL=' + krepl ;

		const url = getUrl('save');
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
							return response.json()
						})
						.then((responseJson) => {
							if (responseJson.code == 0) {
								sendPhoto(responseJson.id, Data, Data.Token, "znak").then(() => next(responseJson));
							} else {
								Alert.alert('Ошибка:' + responseJson.code,  responseJson.msg, [
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
									},
									{
										text: 'Повторить попытку',
									},
								]);
							}
						})
						.catch(err => {
							setLoading(false);
							Alert.alert('Непредвиденная ошибка', err.toString());
						})
				}
				else {
					const saveRecord = async () => {
						let saveBefore = Data.imageBefore;
						let saveAfter = Data.imageAfter;
						await addRecord('znak', body, saveBefore, saveAfter)
					}
					saveRecord().then(() => {
						Alert.alert('OK', 'Знак успешно сохранен во внутреннем хранилище', [
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
							])
					});
				}
			})

		} catch (e) {
			setLoading(false);
			alert(e);
		}

	}

	const getKrepl = () => {

		const fileUri = FileSystem.documentDirectory + 'krepl';

		return FileSystem.readAsStringAsync(fileUri).then(( data ) => {
			setKreplSource(JSON.parse(data))
		});
	}



	const getTiporaz = () => {

		const fileUri = FileSystem.documentDirectory + 'tiporaz';

		return FileSystem.readAsStringAsync(fileUri).then(( data ) => {
			setTiporazSource(JSON.parse(data))
		});
	}

	const getGost = () => {

		const fileUri = FileSystem.documentDirectory + 'gost';

		return FileSystem.readAsStringAsync(fileUri).then(( data ) => {
			setGostSource(JSON.parse(data))
		});
	}

	//let gostData = null;
	//if ( gost  ) {
		//for (var i = 0; i < Things.length; i++) {
			//Things[i]
		//};
		//console.log( gost  );
		////gostData = gost.map((val, key) => {
			////return <Picker.Item value={val.id} label={val.name} key={val.id} />
		////});
	//};

	//console.log( kreplSource  );
	//return;




	let kreplData = null;
	if ( kreplSource  ) {
		kreplData = kreplSource.map((val: any, key: any) => {
			return <Picker.Item value={val.id} label={val.name} key={val.id} />
		});
		// kreplData = [<Picker.Item value={0} label={'test'} key={0}/>]
	}

	let tiporazData = null;
	if ( tiporazSource  ) {
		tiporazData = tiporazSource.map((val: any, key: any) => {
			return <Picker.Item value={val.id} label={val.name} key={val.id} />
		});
		// tiporazData = [<Picker.Item value={0} label={'test'} key={0}/>]
	}

	let gostTypeData = null;
	if ( gostTypeSource  ) {
		gostTypeData = gostTypeSource.map((obj) => {
			return <Picker.Item value={obj.id} label={obj.id + ' (' + obj.name +')' } key={obj.id} />
		});
		// gostTypeData = [<Picker.Item value={0} label={'test'} key={0}/>]
	}

	let gostData = null;
	if ( gostSource  ) {
		if (gostSource[gostType]) {
			gostData = gostSource[gostType].map((obj: any) => {
				return <Picker.Item value={obj.id} label={obj.number + ' - ' + obj.name} key={obj.id}/>
			});
			// gostData = [<Picker.Item value={0} label={'test'} key={0}/>]
		}

		//alert(gostType);
		//alert(gostSource[1]);
		//console.log(gostSource[1]);

		//gostData = gostSource[gostType].map((val, key) => {
		//return <Picker.Item value={val.id} label={val.name} key={val.id} />
		//});

		//console.log(gostData);
		//alert(typeof gostData)
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

						<Text style={styles.text}> Выберите категорию: </Text>

						<Picker
						selectedValue={gostType}
						style={styles.picker}
						onValueChange={(itemValue) => { setGostType(+itemValue) }}
						>
						{ gostTypeData }
						</Picker>

					</View>

					<View style={{ padding: 5, flex: 1,
						//paddingTop: 15,
						//paddingBottom: 25,
						marginBottom: 15,
					}}>

						<Text style={styles.text}> Номер ГОСТ: </Text>

						<Picker
						selectedValue={gost}
						style={styles.picker}
						onValueChange={(itemValue) => { setGost(itemValue) }}
						>
						{ gostData }
						</Picker>

					</View>

					<View
					style={{
						padding: 5,
						flex: 1,
						marginBottom: 15,
					}}
					>

						<Text style={styles.text}> Выберите типоразмер: </Text>

						<Picker
						selectedValue={tiporaz}
						style={styles.picker}
						onValueChange={(itemValue) => { setTiporaz(itemValue) }}
						>
						{ tiporazData}
						</Picker>

					</View>


					<View style={{ padding: 5, flex: 1, }}>

						<Text style={styles.text}> Выберите Тип крепления: </Text>

						<Picker
						selectedValue={krepl}
						style={styles.picker}
						onValueChange={(itemValue) => { setKrepl(itemValue) }}
						>
						{ kreplData }
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
									>
                                </Button>
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
