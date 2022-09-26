import * as React from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {GPS, Data, ObjDataProps} from "../../Navigation/NavTypes";
import {useCallback, useEffect, useState} from "react";
import {al, RenderGPSView} from "../../Share/screensAPI";
import {store} from "../../Store";
import {GpsService} from "../../Share/gpsService";


export default function ObjGPSScreen({route, navigation}: ObjDataProps) {
    const Data: Data = route.params;
    const [loading, setLoading] = useState(false);
    // const [gps, setGps] = useState<GPS | undefined>(undefined);
    const [rAcc, setRacc] = useState<number>(al.high); // required accuracy
    const [min, setMin] = useState<GPS>();
    let gps: GPS = store.getState().gps.s[0];
    const unsubscribe = store.subscribe(() => {
            const storedGps = store.getState().gps.s
            if (storedGps.length >= 1) {
                setMin(GpsService.getMin(storedGps));
                gps = GpsService.getGps(storedGps);
            }
        }
    )
    useEffect(() => {
        return () => unsubscribe()
    })
    useFocusEffect(
        useCallback(() => {
            return async () => {
                unsubscribe();
                setMin(undefined);
            }
        }, [])
    );

    const next = () => {
        // clearInterval(interval);
        // TaskManager.unregisterAllTasksAsync();
        // gpsService.setDefault();
        //const Data = Data;
        if (!min) {
            Alert.alert(
                'Error',
                'Coords not set!');
        } else {
            Data.gps = min;
            navigation.navigate('ObjPhotoAfter', Data)
        }


    }

    let acc = '---';
    if (gps && gps.coords?.accuracy) {
        acc = gps.coords.accuracy.toFixed(2);
    }

    return RenderGPSView(loading, acc, rAcc, min, setMin, setRacc, setLoading, next)

}
