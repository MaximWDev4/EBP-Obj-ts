import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as FileSystem from 'expo-file-system';
import { sendZnakObj } from '../Share/func';
import DB from '../Share/storage'
import {SignDataProps, Data} from "../Navigation/NavTypes";
import {useEffect, useState} from "react";

export type gostType = {id: number, name: string}[];
const gostTypes: gostType = [
	{ id: 1, name: 'Предупреждающие'},
	{ id: 2, name: 'Приоритета'},
	{ id: 3, name: 'Запрещающие'},
	{ id: 4, name: 'Предписывающие'},
	{ id: 5, name: 'Информационно-указательные'},
	{ id: 6, name: 'Сервиса'},
	{ id: 7, name: 'Дополнительной информации'},
];

export default function TestScreen({navigation, route}: SignDataProps) {
	const [gost, setGost] = useState('');
	const [tiporaz, setTiporaz] = useState('');
	const [krepl, setKrepl] = useState('');
	const [gostType, setGostType] = useState(0);
	const [gostTypeSource, setGostTypeSource] = useState([{id: 0, name: ''}]);
	const [gostSource, setGostSource] = useState([[]]);
	const [tiporazSource, setTiporazSource] = useState(['']);
	const [kreplSource, setKreplSource] = useState(['']);

	const Data: Data = route.params;

	//Token=a6065650fb9b5df5f8bdaa796ab50c84&GPS_X=43.2784767&GPS_Y=76.8956883&QRDATA=QR SMEU15028659185727&GOST=19&TIPORAZ=1&KREPL=74


	let db: any;


	useEffect(() => {

		getGostTypes();
		getGost().then();
		getKrepl().then();
		getTiporaz().then();

		db = new DB();
	}, [])

	const saveToDB = (str: string) => {

		db.add(str);
	}

	const sendData = async () => {

		const formData =
			'GPS_X=' + Data.gps?.coords.latitude + '&' +
			'GPS_Y=' + Data.gps?.coords.longitude + '&' +
			'QRDATA=' + Data.qrcode + '&' +
			'GOST=' + gost + '&' +
			'TIPORAZ=' + tiporaz + '&' +
			'KREPL=' + krepl;

		let body = 'Token=' + Data.Token + '&' + formData;

		let send = await sendZnakObj(body, 'saveobj');

		if (!send) {
			saveToDB(formData);
		}

	}


	const getKrepl = () => {

		const fileUri = FileSystem.documentDirectory + 'krepl';

		return FileSystem.readAsStringAsync(fileUri).then((data) => {
			setKreplSource( JSON.parse(data))
		});
	}


	const getTiporaz = () => {

		const fileUri = FileSystem.documentDirectory + 'tiporaz';

		return FileSystem.readAsStringAsync(fileUri).then((data) => {
			setTiporazSource( JSON.parse(data))
		});
	}

	const getGostTypes = () => {

		setGostTypeSource( gostTypes )
	}

	const getGost = () => {

		const fileUri = FileSystem.documentDirectory + 'gost';

		return FileSystem.readAsStringAsync(fileUri).then((data) => {
			setGostSource( JSON.parse(data))
		});
	}

	//var carsjson = props.navigation.getParam('carsjson')

	//<Picker
	//selectedValue={carname}
	//style={styles.picker}
	//onValueChange={(itemValue) => { setState({ carname: itemValue }) }}>
	//{data}
	//</Picker>

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
	if (kreplSource) {

		//for (var i = 0; i < Things.length; i++) {
		//Things[i]
		//};
		//console.log( gost  );
		kreplData = kreplSource.map((val: any, key: any) => {
			return <Picker.Item value={val.id} label={val.name} key={val.id}/>
		});

		//console.log(kreplData);
		//alert(typeof kreplData)
		//kreplData.push(

		//<Picker.Item label="Java" value="java" />
		//);
	}

	let tiporazData = null;
	if (tiporazSource) {
		//for (var i = 0; i < Things.length; i++) {
		//Things[i]
		//};
		//console.log( gost  );
		tiporazData = tiporazSource.map((val: any, key: any) => {
			return <Picker.Item value={val.id} label={val.name} key={val.id}/>
		});

		//console.log(tiporazData);
		//alert(typeof tiporazData)
		//tiporazData.push(

		//<Picker.Item label="Java" value="java" />
		//);
	}

	let gostTypeData = null;
	//if ( gostTypes  ) {
	if (gostTypeSource) {
		//gostTypeData = gostTypeSource.map((val, key) => {
		//gostTypeData = gostTypes.map((val, key) => {
		//gostTypeData = gostTypes.map((obj) => {
		gostTypeData = gostTypeSource.map((obj) => {
			return <Picker.Item value={obj.id} label={obj.id + ' (' + obj.name + ')'} key={obj.id}/>
		});
	}

	let gostData = null;
	if (gostSource) {
		//console.log( gost  );

		//alert(gostSource[gostType]);
		//console.log(gostSource[gostType]);

		if (gostSource[gostType]) {
			gostData = gostSource[gostType].map((obj: any) => {
				return <Picker.Item value={obj.id} label={obj.number + ' - ' + obj.name} key={obj.id}/>
			});
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
		<View style={{flexDirection: 'column', flex: 1}}>


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
					onValueChange={(itemValue) => {
						setGostType(+itemValue)
					}}
				>
					{gostTypeData}
				</Picker>

			</View>

			<View style={{
				padding: 5, flex: 1,
				//paddingTop: 15,
				//paddingBottom: 25,
				marginBottom: 15,
			}}>

				<Text style={styles.text}> Номер ГОСТ: </Text>

				<Picker
					selectedValue={gost}
					style={styles.picker}
					onValueChange={(itemValue) => {
						setGost(itemValue.toString())
					}}
				>
					{gostData}
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
					onValueChange={(itemValue) => {
						setTiporaz(itemValue.toString())
					}}
				>
					{tiporazData}
				</Picker>

			</View>


			<View style={{padding: 5, flex: 1,}}>

				<Text style={styles.text}> Выберите Тип крепления: </Text>

				<Picker
					selectedValue={krepl}
					style={styles.picker}
					onValueChange={(itemValue) => {
						setKrepl(itemValue.toString())
					}}
				>
					{kreplData}
				</Picker>

			</View>


			<View style={{padding: 5, flex: 1,}}/>
			<View style={{padding: 5, flex: 1,}}/>


			<View style={{
				flex: 1,
				flexDirection: 'column-reverse',
				padding: 5,
			}}>
				<Button
					title='Отправить'
					onPress={() => {
						///fetchGost()
						sendData()
						//fetchGost()
						//fetchTiporaz()
						//fetchKrepl()
						//alert(tiporaz);
						//alert(krepl);
						//alert(gostType);
						//alert(image);
						//alert(111)
						//alert(image);
						//alert(222)
						//alert(props.image);

						//alert(image);
						//alert(Data.token);
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
