import * as React from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {GPS, Data, ObjDataProps} from "../Navigation/NavTypes";
import {useCallback, useState} from "react";
import {al, RenderGPSView} from "../Share/screensAPI";
import {store} from "../Store";


export default function ObjGPSScreen ({route, navigation}: ObjDataProps) {
	const Data: Data = route.params;
	// const gpsService = Data.gpsService;
	const [loading, setLoading] = useState(false);
	// const [gps, setGps] = useState<GPS | undefined>(undefined);
	const [rAcc, setRacc] = useState<number>(al.high); // required accuracy
	const [min, setMin] = useState<GPS>();
	let gps: GPS = store.getState().gps;
	const unsubscribe = store.subscribe(() => {
			setMin(store.getState().gps);
			gps = store.getState().gps;
		}
	)
	useFocusEffect(
		useCallback(() => {

			// asyncFunction();
			return async () => {
				unsubscribe();
				// if (typeof gpsService.watchLocation !== 'undefined') {
				// 	gpsService.killWatch();
				// }
				// clearInterval(interval);
				// interval = undefined;
				setMin(undefined);
				// gpsService.setDefault();
			}
		}, [])
	);

	const next = () => {
		// clearInterval(interval);
		// TaskManager.unregisterAllTasksAsync();
		// gpsService.setDefault();
		//const Data = Data;
		if (!gps) {
			Alert.alert(
				'Error',
				'Coords not set!');
		} else {
			Data.gps = gps;
			navigation.navigate('ObjPhotoAfter', Data)
		}


	}

	let acc = '---';
	if (gps && gps.coords?.accuracy) {
		acc = gps.coords.accuracy.toFixed(2);
	}

	return RenderGPSView(loading, acc, rAcc, min, setMin, setRacc, setLoading, next)

}
