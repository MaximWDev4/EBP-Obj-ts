import * as React from 'react';
import {Alert} from 'react-native';
import {SignDataProps, GPS, Data} from "../../Navigation/NavTypes";
import {useCallback, useEffect, useState} from "react";
import {al, RenderGPSView} from "../../Share/screensAPI";
import {useFocusEffect} from "@react-navigation/native";
import {GpsService} from "../../Share/gpsService";
import {store} from "../../Store";


export default function GPSScreen({route, navigation}: SignDataProps) {
    const Data: Data = route.params;
    const [loading, setLoading] = useState(false);
    const [gps, setGps] = useState<GPS | undefined>(undefined);
    const [rAcc, setRacc] = useState<number>(al.high); // required accuracy
    const [min, setMin] = useState<GPS>();
    const unsubscribe = store.subscribe(() => {
            const storedGps = store.getState().gps.s
            if (storedGps.length >= 1) {
                setMin(GpsService.getMin(storedGps));
                setGps(GpsService.getGps(storedGps));
            }
        }
    )
    useEffect(() => {
        return () => unsubscribe()
    })

    useFocusEffect(
        useCallback(() => {
            return async () => {
                setMin(undefined);
            }
        }, [])
    );


    const next = () => {
        if (!min) {
            Alert.alert(
                'Error',
                'Coords not set!');
        } else {
            Data.gps = min;
            navigation.navigate('SignPhotoAfter', Data)
        }
    }

    let acc = '---';
    if (gps && gps.coords && gps.coords.accuracy) {
        acc = gps.coords.accuracy.toFixed(2);
    }

    return RenderGPSView(loading, acc, rAcc, min, setMin, setRacc, setLoading, next)

}

