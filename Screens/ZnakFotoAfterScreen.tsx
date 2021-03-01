import * as React from 'react';
import {StyleSheet, GestureResponderEvent, ListRenderItem, Image, View, Text, TouchableOpacity} from 'react-native';
import {Data, SignDataProps} from "../Navigation/NavTypes";
import {useEffect, useState} from "react";
import {pickImage, RenderPhotoView} from "../Share/screensAPI";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function ZnakFotoAfterScreen ({route, navigation}: SignDataProps) {

	const Data = route.params;
	const [hasPermission, setHasPermission] = useState(true);
	const [images, setImages] = useState<string[]>([]);

	useEffect(() => {
		ImagePicker.getPendingResultAsync().then((pend_img) => {
			if (pend_img && pend_img[0].hasOwnProperty('uri')) {
				// @ts-ignore
				setImages([pend_img[0].uri]);
			}
		});
		askPermission().then();
	}, [])

	async function askPermission() {
		const {status} = (await Permissions.askAsync(Permissions.CAMERA)).permissions;
		setHasPermission(status === 'granted');
	}


	const deleteFoto = () => {
		return async function (p1: GestureResponderEvent) {
			let fileExists = (await FileSystem.getInfoAsync(images[0])).exists;
			if (fileExists) {
				await FileSystem.deleteAsync(images[0]);
			}
			setImages([]);
		}
	}

	const next = () => {
		let data: Data = Data;
		data.imageAfter = images;

		//props.navigation.navigate('Znak', {
		//image: state.image,
		//})

		navigation.navigate('Znak', data);
	}


	const IM: ListRenderItem<any> = (props) => {
		let image;
		console.log(images[props.index])
		if (images[props.index] !== '' && typeof images[props.index] !== "undefined") {
			image = (
				<Image source={
					// require('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540maxdev4%252Febp-react-ts/Image_1.png')
					{uri: images[props.index]}
				} style={{width: 100, height: 100}}/>
			)
		}
		return (
			<View style={{
				marginTop: 10,
				flexDirection: 'row',
				//flexDirection: 'column',
				justifyContent: 'space-between',
				flex: 1
			}}>

				<View style={{
					flex: 3
				}}>

					<Image source={{uri: images[props.index]}} style={{width: 100, height: 100}}/>
				</View>

				<View style={{
					paddingTop: 15,
					flex: 5
				}}>
					<Text style={{ fontSize: 20,height: 40, textAlignVertical: 'bottom'}}>Изображение выбрано </Text>


				</View>

				<View
					style={{
						//width: 32,
						//justifyContent: 'flex-end',
						//padding:30,
						paddingBottom: 25,
						flex: 1
					}}>
					<TouchableOpacity onPress={ () => deleteFoto()}>
						<Image style={{
							width: 32,
							height: 32,
						}}
							   source={require('../assets/images/delete.png')}/>
					</TouchableOpacity>
				</View>

			</View>
		)
	}

	return (RenderPhotoView(images, next, IM, (type) => pickImage(type, hasPermission, (s, result) => {
				if (s) {
					setImages([result]);
				} else {
					console.log(result);
				}
			})
		)
	)

}

