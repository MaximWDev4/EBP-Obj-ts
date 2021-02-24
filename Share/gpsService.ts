import {GPS} from "../Navigation/NavTypes";
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions'
export class GpsService {
    min: GPS|undefined = undefined;
    Gps: GPS[]|undefined = [];
    rAcc: number = 3;
    p = false;
    watchLocation: { remove(): void } | undefined;

    constructor() {
        Location.getPermissionsAsync().then( (a) => {
            if (a.granted) {
                this.p = true;
            } else {
                Location.requestPermissionsAsync().then((e) =>{
                    this.p = e.granted
                })
            }
        })
    }

    async start() {
        const options: Location.LocationTaskOptions = {accuracy: Location.Accuracy.BestForNavigation}
        this.watchLocation = await Location.watchPositionAsync(options, (opts) => {
            if (opts) {
                if (opts.coords.accuracy) {
                    if (this.Gps && this.Gps?.length > 19) {
                        this.Gps.shift();
                    }
                    this.Gps?.push(opts);
                }
            }});
        // await Permissions.askAsync(Permissions.LOCATION)
        // this.min = undefined;
        // const options: Location.LocationTaskOptions = {accuracy: Location.Accuracy.BestForNavigation}
        // const { status } = await Location.requestPermissionsAsync();
        // try {
        //     if (status === 'granted') {
        //         await Location.startLocationUpdatesAsync('locationTask', options)
        //         TaskManager.defineTask('locationTask', async (opts: { data: { locations?: GPS[] }, error: any }) => {
        //             if (opts.error) {
        //                 return;
        //             } else {
        //                 if (opts.data.locations) {
        //                     if (opts.data.locations[0].coords.accuracy) {
        //                         if (this.Gps && this.Gps?.length > 9) {
        //                             this.Gps.shift();
        //                         }
        //                         this.Gps?.push(opts.data.locations[0]);
        //                     }
        //                 }
        //                 // console.log(this.Gps[0], this.Gps[1]);
        //             }
        //         });
        //     }
        // }
        // catch (e) {
        //     alert(e);
        // }
    }

    killWatch() {
        this.watchLocation?.remove();
    }

    // @ts-ignore
    get getGps() {
        if (this.Gps && this.Gps?.length>=1) {
            return this.Gps[this.Gps?.length - 1];
        }
        else return undefined;
    }

    // @ts-ignore
    get getMin() {
        let Result: GPS = {
            coords: {
                latitude: 0,
                longitude: 0,
                accuracy: 100,
                altitude: 0,
                heading: 0,
                speed: 0,
            },
            mocked: false,
            timestamp: 0
        };
        let delLat: number = 0;
        let delLon: number = 0;
        let SLat: number = 0;
        let SLon: number = 0;
        const n: number = this.Gps ? this.Gps.length : 0;

        if (this.Gps) {
            this.Gps.map((i) => {
                if (Result.coords.accuracy && i.coords.accuracy && Result.coords.accuracy > i.coords.accuracy) {
                    Result = i;
                }
            });
            this.Gps.map((item) => {
                // let prevItem = this.Gps[i - 1];
                if (Result.coords.latitude && Result.coords.latitude && item.coords.latitude && item.coords.longitude && item.coords.accuracy) {
                    SLat += (Result.coords.latitude - item.coords.latitude) / (item.coords.accuracy);
                    SLon += (Result.coords.latitude - item.coords.longitude) / (item.coords.accuracy);
                    // console.log(prevItem.coords.latitude + ' - ' + item.coords.latitude + ') / ((' + item.coords.accuracy + ' + ' + prevItem.coords.accuracy + ') / 2) = ' + SLat);
                }
            });
            if (Result.coords.latitude && Result.coords.longitude) {
                // console.log((SLat / n) + this.Gps[0].coords.latitude);
                Result.coords.latitude = Result.coords.latitude + (SLat / n);
                Result.coords.longitude = Result.coords.longitude + (SLon / n);
                this.Gps.map((item) => {
                    if (item.coords.accuracy) {
                        delLat += item.coords.accuracy;
                        delLon += item.coords.accuracy;
                    }
                })
                // console.log((((Math.sqrt((delLat / n)) + Math.sqrt((delLon / n))) / 2)) / Math.sqrt(n));
                Result.coords.accuracy = (((Math.sqrt((delLat / n)) + Math.sqrt((delLon / n))) / 2)) + Math.abs(n - 20)

                if (this.Gps[0].coords.accuracy) {
                    if (Result) {
                        this.min = Result;
                    } else {
                        if (this.Gps?.length >= 1) {
                            this.min = this.Gps[this.Gps?.length - 1];
                        } else this.min = undefined;
                    }
                }
            }
        }

        return this.min;
    }

    setDefault() {
        this.Gps = [ {
            coords: {
                latitude: 0,
                longitude: 0,
                accuracy: 100,
                altitude: 0,
                heading: 0,
                speed: 0,
            },
            mocked: false,
            timestamp: 0
        }];
        this.min = undefined;
        this.watchLocation = undefined;
    }
}

import * as TaskManager from "expo-task-manager";


// if (opts.data.locations) {
//     if (opts.data.locations[0].coords.accuracy) {
//         if (this.min?.coords?.accuracy) {
//             console.log('Received new locations', opts.data.locations[0].coords.accuracy);
//             const macc = this.min.coords.accuracy; // current this.min accuracy
//             this.min = macc > opts.data.locations[0].coords.accuracy ? opts.data.locations[0] : this.min;
//             if (macc < this.rAcc) {
//                 if (this.min?.coords.accuracy && this.min.coords.accuracy > this.rAcc) {
//                     Alert.alert('Плохой сигнал', ' Не удалось добиться необходимой точности,  попробуйте еще раз!')
//                 }
//                 await TaskManager.unregisterAllTasksAsync();
//                 return this.Gps = this.min ? this.min : opts.data.locations[0];
//             }
//         } else {
//             this.min = opts.data.locations[0];
//         }
//     }
//     this.Gps = opts.data.locations[0];
//  }
