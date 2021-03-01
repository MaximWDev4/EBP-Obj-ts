import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

import { Alert } from 'react-native';
import {SignDataProps} from "../Navigation/NavTypes";
import {useEffect} from "react";




export default function QRScreen ({route, navigation}: SignDataProps) {

	const Data = {...route.params};

   useEffect( () => {
     		getPermissionsAsync().then();
   		}
   , []);

	let scan = true;
	let last=0;

	const handleBarCodeScanned = ({ type, data }: any) => {
		let now = new Date();
		let dt = now.getTime();

		//this.setState({scan: false});

		if (!scan) {
			return false;
		}

		if (dt - last < 5000) {
			return false;
		}

		//this.setState({scan: true});

		last = dt;

		//alert(`Bar code with type ${type} and data ${data} has been scanned!`);

		let str = data;
		scan = false;


		//this._getLocationAsync();

		Alert.alert(
			//'Alert Title',
			//'MyAlert Msg',
			'Сканирование прошло успешно',
			str,
			//null,
			[
				//{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
				{
					text: 'Еще раз..',
					onPress: () => {
						last = 0;
						scan = true;
					},
					//onPress: () => console.log('Cancel Pressed'),
					//style: 'cancel',
				},
				//{text: 'Продолжить', onPress: () => console.log('OK Pressed')},
				{
					text: 'Продолжить', onPress: () => {
						scan = false;
						//this.next(data);
						next(data);
					}
				},
			],
			{cancelable: false},
		);
	}

	const getPermissionsAsync = async () => {
		const { status } = (await Permissions.askAsync(Permissions.CAMERA)).permissions
	};

	 const next = async(data: string) => {
	  // @ts-ignore
		Data.qrcode = data;

	  navigation.navigate('GPS',  Data )
  }

    return (
      <View
        style={{
          flex: 1
        }}>
        <BarCodeScanner

          onBarCodeScanned={handleBarCodeScanned}
		  //barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]}}
          //barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
		  //torchMode='on'

		  //type={BarCodeScanner.Constants.Type.front}
		  //flashMode={BarCodeScanner.Constants.FlashMode.on }

          style={StyleSheet.absoluteFillObject}
		  //accessibilityIgnoresInvertColors={true}
        />

      </View>
    );
  }




//
// QRScreen.navigationOptions = {
//   title: 'QR',
// };

const styles = StyleSheet.create({
  centerText: {
	flex: 1,
	fontSize: 18,
	padding: 32,
	color: '#777',
  },
  textBold: {
	fontWeight: '500',
	color: '#000',
  },
  buttonText: {
	fontSize: 21,
	color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
	padding: 16,
  },
  welcome: {
	fontWeight: '500',
	color: 'green',
  },
  instructions: {
	fontWeight: '500',
	color: 'yellow',
  },





});

