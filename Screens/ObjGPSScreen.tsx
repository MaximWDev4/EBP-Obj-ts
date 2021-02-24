import * as React from 'react';
import { Alert } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import { useFocusEffect } from '@react-navigation/native';

import {GPS, Data, ObjDataProps} from "../Navigation/NavTypes";
import {useCallback, useState} from "react";
import {al, RenderGPSView} from "../Share/screensAPI";
import {GpsService} from "../Share/gpsService";


export default function ObjGPSScreen ({route, navigation}: ObjDataProps) {
	const Data: Data = route.params;
	// const gpsService = Data.gpsService;
	const gpsService = new GpsService();
	const [loading, setLoading] = useState(false);
	const [gps, setGps] = useState<GPS | undefined>(undefined);
	const [rAcc, setRacc] = useState<number>(al.high); // required accuracy
	const [min, setMin] = useState<GPS>();
	let interval: any = undefined;
	const asyncFunction = async () => {
		if ((typeof gpsService.watchLocation) === 'undefined') {
			await gpsService.start();
			if (typeof interval === 'undefined') {
				interval = setInterval(() => {
					if (gpsService.getGps) {
						setGps(gpsService.getGps);
					}
					if (gpsService.getMin) {
						setMin( gpsService.getMin);
					}
				}, 2000);
			}
		} else {
			if (typeof interval === 'undefined') {
				interval = setInterval(() => {
					if (gpsService.getGps) {
						setGps(gpsService.getGps);
					}
					if (gpsService.getMin) {
						setMin(gpsService.getMin);
					}
				}, 2000);
			}
		}
	}

	useFocusEffect(
		useCallback(() => {
			asyncFunction();
			return async () => {
				await TaskManager.unregisterAllTasksAsync();
				if (typeof gpsService.watchLocation !== 'undefined') {
					gpsService.killWatch();
				}
				clearInterval(interval);
				interval = undefined;
				setMin(undefined);
				gpsService.setDefault();
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
	if (gps?.coords?.accuracy) {
		acc = gps.coords.accuracy.toFixed(2);
	}

	return RenderGPSView(loading, acc, rAcc, min, setMin, setRacc, setLoading, setGps, next)

}
