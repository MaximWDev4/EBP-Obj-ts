import * as React from 'react';
import {GestureResponderEvent, Image, ListRenderItem, Text, TouchableOpacity, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Data, SignDataProps} from "../Navigation/NavTypes";
import {useEffect, useState} from "react";
import {pickImage, RenderPhotoView} from "../Share/screensAPI";
import * as FileSystem from "expo-file-system";
import {askPermission} from "../Share/func";


export default function ZnakFotoBeforeScreen ({navigation, route}: SignDataProps) {

	const Data = route.params;
	const [hasPermission, setHasPermission] = useState(false);
	const [images, setImages] = useState<string[]>(Data.imageAfter ? Data.imageAfter : []);

	useEffect(() => {
		askPermission().then( stat => setHasPermission(stat));
	}, [])

	const deletePhoto = async () => {
			try {
				let fileExists = (await FileSystem.getInfoAsync(images[0])).exists;
				if (fileExists) {
					await FileSystem.deleteAsync(images[0]);
				}
			} finally {
				setImages([]);
			}
	}

	const next = () => {
		navigation.navigate('QR', { imageBefore: images })
	}

	const IM: ListRenderItem<any> = (props) => {
		let image;
		console.log(props.item)
		if (props.item !== '' && typeof props.item !== "undefined") {
			image = (
				<Image source={
					// require('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540maxdev4%252Febp-react-ts/Image_1.png')
					{uri: props.item}
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

					<Image source={{uri: props.item}} style={{width: 100, height: 100}}/>
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
					<TouchableOpacity onPress={ () => deletePhoto()}>
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

	useEffect(() => {
		console.log(images)
	})

	return (RenderPhotoView(images, next, IM,(type) => pickImage(type, hasPermission, async (s, result) => {
			if (s) {
				setImages([result]);
			} else {
				await askPermission()
				console.log(result);
			}
		})
		)
	)


}

ZnakFotoBeforeScreen.navigationOptions = {
  title: 'Фотография до...',
};
