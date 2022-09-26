import {Text, View, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native';
import {Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {Data, UndefProps} from '../Navigation/NavTypes'
import {getUrl} from '../Share/func';
import {useState} from "react";
import {store} from "../Store";
import {HelperInit} from "../Share/helperInit";


export function LoginScreen({route, navigation}: UndefProps) {
    const helper: HelperInit = new HelperInit();
    let Token: any = '';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeText1 = (text: string) => {
        setUsername(text);
    }

    const onChangeText2 = (text: string) => {
        setPassword(text);
    }
    const getToken = () => {

        if (!username || !password) {
            alert('Empty Username or Password');
            return;
        }
        try {
            helper.authenticate(password, username).then(async (responseJson) => {
                try {
                    console.log(responseJson);
                    if (responseJson.code == 2) {
                        Alert.alert('Неверный логин или пароль ', responseJson.msg);
                        return false
                    }
                    console.log(responseJson);
                    //if ( responseJson.code == 0 ) {
                    if (typeof responseJson.token !== 'undefined' && responseJson.token !== null) {
                        //const id = responseJson.id;
                        //const Token = responseJson.token;
                        Token = responseJson.token;
                        const fileUri = FileSystem.documentDirectory + 'Token';

                        //const p1 = FileSystem.getInfoAsync(fileUri);
                        await FileSystem.writeAsStringAsync(fileUri, Token).catch((e) => {
                            console.log(e)
                        });
                        return true
                    } else {
                        //Alert.alert('Res:', responseJson.msg + ' -- ' + responseJson.code );
                        //Alert.alert('Error', responseJson.code + ': ' + responseJson.msg );
                        Alert.alert('ResponsecodeError ' + responseJson.code + ': ', responseJson.msg);
                        return false
                    }
                } catch (e) {
                    console.log(e)
                    Alert.alert('TokenSaveError')
                    return false
                }
            }).then(async (success) => {
                if (success) {
                    await helper.getRoles(Token).catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('getRoles', err)
                    });
                    await helper.getGosts().catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('getGosts', err)
                    });
                    await helper.getKrepl().catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('getKrepl', err)
                    });
                    await helper.getVidr().catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('getVidr', err)
                    });
                    await helper.getObjTypes().catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('getObjTypes', err)
                    });
                    await helper.getTiporaz().catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('getTiporaz', err)
                    });
                }
                return success
            })
                .then((success) => {
                    if (Token && success) {
                        store.dispatch({type: 'system/set-token', payload: Token})
                        navigation.replace('Welcome')
                    }
                }).catch((e: any[]) => {
                let err = e.toString();
                console.log(e.toString())
                Alert.alert('UnnownErr', err)
            });
        } catch (e) {
            alert('Ошибка');
        }
    }
    return (
        <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flex: 1}}/>

            <View style={{padding: 5, flex: 1}}>
                <Text style={styles.text}>
                    Login
                </Text>

                <TextInput style={styles.input} onChangeText={text => onChangeText1(text)}
                    //onChangeText={text => onChangeText(text)}
                    //value={value}
                           value={username}
                />


                <Text style={styles.text}>
                    Password
                </Text>

                <TextInput style={styles.input} onChangeText={text => onChangeText2(text)}
                    //onChangeText={text => onChangeText(text)}
                    //value={value}
                           value={password}
                />

            </View>

            <View style={{flex: 1, flexDirection: 'column-reverse', padding: 5,}}>
                <Button title='Войти' onPress={() => {
                    getToken();
                }}
                    //this.props.navigation.navigate('Welcome', { Data })
                    //this.props.navigation.navigate('Welcome', {
                    //Data: {
                    //Token: 'a6065650fb9b5df5f8bdaa796ab50c84',
                    //}
                    //})
                    //this.props.navigation.navigate('Welcome', {
                    //routes: this.state.routes,
                    ////parking: this.state.parking, car: this.state.carname, carsjson: this.state.dataSource
                    //})
                    //this.fetchData(2)
                />
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    //picker: {
    //width: Dimensions.get('window').width - 30
    //},
    //datepicker: {
    //width: Dimensions.get('window').width - 30,
    //margin: 10,
    //marginBottom: 20
    //},
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },


    text: {
        height: 40,
        textAlignVertical: 'bottom',
    },
    input: {
        height: 40,
        backgroundColor: '#eee',
        borderColor: 'gray',
        borderWidth: 1
    },


    button: {
        margin: 5
    }
});
