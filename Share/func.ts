/// <reference path="../node.d.ts"/>

import { Alert } from 'react-native';
import DB from "./storage";
import * as FileSystem from 'expo-file-system';


const getUrl = (action: any) => {

	// let base = 'http://192.168.0.23:8091/'; //dev
	// let base = 'http://192.168.0.16:8095/'; //dev/prod
	let base = 'http://185.97.113.59:8095/'; // prod

	switch(action) {
		case 'gost':
			base += '?gost'
				break;

		case 'tiporaz':
			base += '?tiporaz'
				break;

		case 'krepl':
			base += '?kr'
				break;

		case 'save':
			base += '?save'
				break;

		case 'roles':
			base += '?roles'
				break;

		case 'auth':
			base += '?auth'
				break;

		case 'foto':
			base += '?foto'
				break;
		case 'objtype':
			base += '?menu&type=622'
				break;
		case 'saveobj':
			base += '?save-obj'
			break;
		case 'foto-obj' :
			base += '?foto-obj'
				break;
		case 'vidr':
			base += '?vidr'
			break;
		default:
			// code
	}

	return base;
}


const addRecord = async (type: 'znak' | 'obj', body: string, img_old?: string[], img_new?: string[]) => {
	let db = new DB;
	try {
		db.add(type, body, img_old, img_new)
		return 0;
	}
	catch (err) {
		alert(err.toString());
		return 1;
	}

}

const sendZnakObj = async (body: any, res: 'save' | 'saveobj') => {


	const url = getUrl(res);

	let sent: number | null = null;

	try {

		await fetch(url, {
			//fetch(url, {
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
				console.log(responseJson)
				if (responseJson.code == 0) {
					sent = responseJson.id;

					//res = id;

					console.log('OK');

				} else {
					Alert.alert('Error', responseJson.code + ': ' + responseJson.msg.toString());
				}
			})
			.catch(err => {
				//console.log(err);
				alert(err.toString());

				sent = null;
			})


	} catch (e) {
		alert(e);
	}

	return sent;
}

// export const writeImage = async (result: {uri?: string, cancelled: boolean}, oldWalue: string) => {
// 	if (!result.cancelled && result.uri) {
// 		let photosPath = FileSystem.documentDirectory + 'photos/';
// 		let imgFile = photosPath+result.uri.substr(result.uri.length-40);
// 		try {
// 			await FileSystem.makeDirectoryAsync(photosPath, { intermediates: true});
// 		} catch (e) {
// 			console.log(e);
// 		}
// 		await FileSystem.writeAsStringAsync(imgFile, result.uri)
// 		console.log( 'Func completed', imgFile, await FileSystem.getInfoAsync(imgFile));
// 		return imgFile;
// 	}
// 	else {
// 		return oldValue
// 	}
// }


const sendPhoto = async (sid: string | number, record: any, Token: string, rout: 'znak' | 'obj')  => {
	const img_old: string[] = record.imageBefore ? record.imageBefore : JSON.parse(record.img_old);
	const img_new: string[] = record.imageAfter ? record.imageAfter : JSON.parse(record.img_old);
	const url = getUrl(rout == 'znak' ? 'foto' : 'foto-obj');
	const formData = new FormData();
	let imageExists: boolean[] = [];
	let image2Exists: boolean[] = [];
	let img;
	try {
		for (let i = 0; i < img_old.length && i < img_new.length; i++) {
			img = img_old[i];
			if ((await FileSystem.getInfoAsync(img)).exists) {
				imageExists.push(true);
			} else {
				imageExists.push(false);
			}
			img = img_new[i];
			if ((await FileSystem.getInfoAsync(img)).exists) {
				image2Exists.push(true);
			} else {
				image2Exists.push(false);
			}
		}
	} catch (e) {
		imageExists = [];
		image2Exists = [];
	}
	try {
		let res: boolean | number = false;
		if (rout == 'znak') {
			formData.append('Token', Token);
			formData.append('ID', sid.toString());
			if (imageExists[0] && image2Exists[0]) {
				formData.append('IMG_OLD', {// @ts-ignore
					uri: img_old[0],
					name: `image_old.${img_old[0].substr(img_old[0].length - 3)}`,
					type: `image/${img_old[0].substr(img_old[0].length - 3)}`
				});
				formData.append('IMG_NEW', {// @ts-ignore
					uri: img_new[0],
					name: `image_new.${img_new[0].substr(img_new[0].length - 3)}`,
					type: `image/${img_new[0].substr(img_new[0].length - 3)}`
				});
			}
			try {
				await fetch(url, {
					method: 'post',
					headers: {
						"Content-Type": "multipart/form-data"
					},
					body: formData,
				})
					.then((response) => {
						return response.json();
					})
					.then(async (responseJson) => {
						console.log(responseJson);
						res = responseJson.code;

						if (res == 0) {
							let db = new DB;
							await db.deleteZnak(record, () => null);
						} else {
							Alert.alert(`Error: ${responseJson.code}`, responseJson.msg)
						}
					})
					.catch(err => {
						return err;
					})
			} catch (e) {
				alert(e);
				return e
			}
			return 'success'

		} else if (rout == 'obj') {
			if (imageExists.length && image2Exists.length) {
				formData.append('Token', Token);
				formData.append('ID', sid.toString());
				for (let i = 0; i < img_old.length && i < img_new.length; i++) {
					if (imageExists[i]) {
						console.log('set1')
						formData.append('IMG_OLD', {// @ts-ignore
							uri: img_old[i],
							name: `image_old.${img_old[i].substr(img_old[i].length - 3)}`,
							type: `image/${img_old[i].substr(img_old[i].length - 3)}`
						});
					}
					if (image2Exists[i]) {
						console.log('set2')
						formData.append('IMG_NEW', {// @ts-ignore
							uri: img_new[i],
							name: `image_new.${img_new[i].substr(img_new[i].length - 3)}`,
							type: `image/${img_new[i].substr(img_new[i].length - 3)}`
						});
					}
					if (imageExists[i] && image2Exists[i]) {
						try {
							await fetch(url, {
								method: 'post',
								headers: {
									"Content-Type": "multipart/form-data"
								},
								body: formData,
							})
								.then((response) => {
									return response.json();
								})
								.then(async (responseJson) => {
									console.log(responseJson);
									res = responseJson.code;

									if (res == 0) {
										let db = new DB;
										await db.deleteZnak(record, () => null);
									} else {
										Alert.alert(`Error: ${responseJson.code}`, responseJson.msg)
										Promise.reject(('Response Failed' + i)).then((e) => {
											console.log(e)
										}, (s) => {
											console.log(s)
										})
										return "fail"
									}
								})
								.catch(err => {
									return err;
								})
						} catch (e) {
							alert(e);
							return e
						}
					}
				}
			} else {
				return 'Ошибка: Не найдены изображения'
			}
		}
		return 'success'
	} catch (e) {
		alert(e)
	}
}

// const getData = async () => {
// 	try {
// 		const jsonValue = await AsyncStorage.getItem('@app_state')
// 		return jsonValue != null ? JSON.parse(jsonValue) : null;
// 	} catch(e) {
// 		alert(e)
// 		// error reading value
// 	}
// }
//
// const storeData = async (value: any) => {
// 	try {
// 		const jsonValue = JSON.stringify(value)
// 		await AsyncStorage.setItem('@app_state', jsonValue)
// 	} catch (e) {
// 		alert(e)
// 		// saving error
// 	}
// }

// function div(val: number, by: number){
// 	return (val - val % by) / by;
// }
//
// const findMe = async (min: GPS|undefined, minCallback: (min: GPS) => void, rAcc: number, rAccCallback: (rAcc: number) => any,loadingCallback: (loading: boolean) => any, GpsCallback: (gps: GPS) => any) => {
// 	const options: { accuracy: Location.LocationAccuracy } = {accuracy: Location.Accuracy.BestForNavigation}
// 	const p = (await Permissions.getAsync(Permissions.LOCATION)).granted;
// 	let i = 0;
// 	loadingCallback(true);
// 	// const gpdTimeout = setTimeout(async () => {
// 	// 		if (min.coords.accuracy && min.coords.accuracy > rAcc) {
// 	// 			// rAccCallback( min.coords.accuracy - min.coords.accuracy % 1);
// 	// 			Alert.alert('Плохой сигнал', ' Не удалось добиться необходимой точности,  попробуйте еще раз!')
// 	// 		}
// 	// 		loadingCallback(false);
// 	// 		await TaskManager.unregisterAllTasksAsync();
// 	// 		return GpsCallback(min);
// 	// 	}
// 	// 	, 1000 * 60 * 3);
// 	// check `error.message` for more details.
// 	if (p) {
// 		await Location.startLocationUpdatesAsync('locationTask', options)
// 	}
// 	TaskManager.defineTask('locationTask', async (opts: { data: { locations?: GPS[] }, error: any }) => {
// 		if (opts.error) {
// 			return;
// 		} else {
//
// 			console.log(p)
// 				console.log('Received new locations', opts.data);
// 				if (opts.data.locations) {
// 					i++;
// 					if (opts.data.locations[0].coords.accuracy) {
//
// 						if (min?.coords?.accuracy) {
// 							let macc = min.coords.accuracy; // current min accuracy
// 							minCallback(macc > opts.data.locations[0].coords.accuracy ? opts.data.locations[0] : min)
// 							if (macc < rAcc || (macc < rAcc + div(i, 50) && i > 50) || i > 200) {
// 								if (min?.coords.accuracy && min.coords.accuracy > rAcc) {
// 									// rAccCallback( min.coords.accuracy - min.coords.accuracy % 1);
// 									Alert.alert('Плохой сигнал', ' Не удалось добиться необходимой точности,  попробуйте еще раз!')
// 								}
// 								// clearTimeout(gpdTimeout);
// 								loadingCallback(false);
// 								console.log(i);
// 								await TaskManager.unregisterAllTasksAsync();
// 								return GpsCallback(min ? min : opts.data.locations[0]);
// 							}
// 						} else {
// 							minCallback(opts.data.locations[0]);
// 						}
// 						GpsCallback(opts.data.locations[0]);
// 					}
// 				}
// 			}
// 	});
//
// }

export default getUrl;
export { getUrl, sendZnakObj, sendPhoto, addRecord }

//export getUrl, sendForm
