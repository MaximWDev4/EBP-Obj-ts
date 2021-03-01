import * as React from 'react';
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native';

import * as TaskManager from 'expo-task-manager';

import {SignDataProps, GPS, Data} from "../Navigation/NavTypes";
import {useCallback, useState} from "react";
import {al, RenderGPSView} from "../Share/screensAPI";
import {useFocusEffect} from "@react-navigation/native";
import {GpsService} from "../Share/gpsService";


export default function GPSScreen ({route, navigation}: SignDataProps) {
	const Data: Data = route.params;
	// const gpsService = Data.gpsService;
	const gpsService = GpsService.prototype;
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
		if (!gps) {
			Alert.alert(
				'Error',
				'Coords not set!');
		} else {
			Data.gps = gps;
			navigation.navigate('SignPhotoAfter', Data)
		}
	}

	let acc = '---';
	if (gps && gps.coords && gps.coords.accuracy) {
		acc = gps.coords.accuracy.toFixed(2);
	}

	return RenderGPSView(loading, acc, rAcc, min, setMin, setRacc, setLoading, next)

}

