import {Alert} from "react-native";
import * as FileSystem from "expo-file-system";
import {getUrl} from "./func";
import {LoginScreenNavigationProp, StartScreenNavigationProp} from "../Navigation/NavTypes";

export class HelperInit {
    authenticate(pww: string, uname: string) {
        try {
            const url = getUrl('auth');
            let body = 'USERNAME=' + uname + '&' + 'PASSWORD=' + pww;
            return fetch(url, {
                //return await fetch(url, {
                method: 'post',
                //method: 'get',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    'Accept': 'application/json'
                },
                body: body,
            })
                .then(response => {
                    if (typeof response == 'undefined') {
                        return Promise.reject('Время запроса истекло');
                    } else if (response.ok) {
                        return response.json()
                    } else if (response.status === 404) {
                        return Promise.reject('Ошибка сервера');
                    } else {
                        return Promise.reject('Что-то пошло не так: ' + response.status + response.statusText);
                    }
                }).catch((e: any) => {
                    console.log(e)
                    return Promise.reject('Что-то пошло не так: ' + e.statusText);
                })
            // .then((responseJson) => {
            //     //if ( responseJson.code == 0 ) {
            //     if (typeof responseJson.token !== 'undefined' || responseJson.token !== null) {
            //         //const id = responseJson.id;
            //         //const Token = responseJson.token;
            //         Token = responseJson.token;
            //
            //         const fileUri = FileSystem.documentDirectory + 'Token';
            //
            //         //const p1 = FileSystem.getInfoAsync(fileUri);
            //         return FileSystem.writeAsStringAsync(fileUri, Token);
            //
            //     } else {
            //         //Alert.alert('Res:', responseJson.msg + ' -- ' + responseJson.code );
            //         //Alert.alert('Error', responseJson.code + ': ' + responseJson.msg );
            //         Alert.alert('Error ' + responseJson.code + ': ', responseJson.msg);
            //     }
            //
            // })
        } catch (e: any) {
            Alert.alert('AuthenticationError', e.toString());
            return Promise.reject('AuthenticationError' + e);
        }
    }

    async getObjTypes() {
        try {
            return async () => {
                const url = getUrl('objtype');

                //return fetch(url) .then((response) => {
                return await fetch(url).then((response) => {
                    return response.json()
                }).then((responseJson) => {

                    let data: any[] = [];

                    for (var i = 0; i < responseJson.length; i++) {
                        let obj = responseJson[i];

                        data.push({
                            id: obj.id,
                            name: obj.name,
                        })
                    }

                    const fileUri = FileSystem.documentDirectory + 'objtype';
                    return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                })

            }
        } catch (e: any) {
            Alert.alert('ObjTypeError', e.toString());
            return Promise.reject('ObjTypeError' + e);
        }
    }

    async getVidr() {
        try {
            return async () => {
                const url = getUrl('vidr');
                return await fetch(url).then((response) => {
                    return response.json()
                }).then((responseJson) => {

                    let data: any[] = [];

                    for (var i = 0; i < responseJson.length; i++) {
                        let obj = responseJson[i];

                        data.push({
                            id: obj.id,
                            name: obj.name,
                        })
                    }

                    const fileUri = FileSystem.documentDirectory + 'vidr';
                    return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                })

            }
        } catch (e: any) {
            Alert.alert('VidrError', e.toString());
            return Promise.reject('VidrError' + e);
        }
    }

    async getGosts() {
        try {
            return async () => {
                const url = getUrl('gost');

                //return fetch(url) .then((response) => {
                return await fetch(url).then((response) => {
                    return response.json()
                })
                    .then((responseJson) => {

                        let data: any[] = [];

                        for (var i = 0; i < responseJson.length; i++) {
                            let obj = responseJson[i];

                            if (!Array.isArray(data[obj.type])) {
                                data[obj.type] = [];
                            }

                            data[obj.type].push({
                                id: obj.id,
                                name: obj.name,
                                number: obj.number,
                            })
                        }

                        const fileUri = FileSystem.documentDirectory + 'gost';
                        return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                    })

            }
        } catch (e: any) {
            Alert.alert('gostError', e.toString());
            return Promise.reject('gostError' + e);
        }
    }

    async getKrepl() {
        try {
            return async () => {
                const url = getUrl('krepl');

                return await fetch(url).then((response) => {
                    return response.json()
                }).then((responseJson) => {

                    const fileUri = FileSystem.documentDirectory + 'krepl';
                    return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson));
                })

            }
        } catch (e: any) {
            Alert.alert('KreplError', e.toString());
            return Promise.reject('KreplError' + e);
        }
    }

    async getTiporaz() {
        try {
            return async () => {
                const url = getUrl('tiporaz');

                return await fetch(url).then((response) => {
                    return response.json()
                }).then((responseJson) => {

                    const fileUri = FileSystem.documentDirectory + 'tiporaz';
                    return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson));
                })

            }
        } catch (e: any) {
            Alert.alert('TiporazError', e.toString());
            return Promise.reject('TiporazError' + e);
        }
    }

    async getRoles(Token: string) {
        try {
            const url = getUrl('roles');

            let body = 'Token=' + Token;

            return fetch(url, {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: body,
            })
                .then((response) => {
                    return response.json()
                }).then((responseJson) => {
                    console.log(JSON.stringify(responseJson))
                    const fileUri = FileSystem.documentDirectory + 'roles';
                    return FileSystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson));
                })
        } catch (e: any) {
            Alert.alert('RolesError', e.toString());
            return Promise.reject('RolesError' + e);
        }
    }
}
