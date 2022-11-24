import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {UndefProps} from '../Navigation/NavTypes'
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
        try {
            if (!username || !password) {
                alert('Empty Username or Password');
                return;
            }

            helper.authenticate(password, username).then((responseJson) => {
                try {
                    if (responseJson.code == 2) {
                        Alert.alert('Неверный логин или пароль ', responseJson.msg);
                        return false
                    }
                    if (typeof responseJson.token !== 'undefined' && responseJson.token !== null) {
                        Token = responseJson.token;
                        const fileUri = FileSystem.documentDirectory + 'Token';
                        FileSystem.writeAsStringAsync(fileUri, Token).catch((e) => {
                            console.log(e)
                        });
                        return true
                    } else {
                        Alert.alert('ResponsecodeError ' + responseJson.code + ': ', responseJson.msg);
                        return false
                    }
                } catch (e) {
                    console.log(e)
                    Alert.alert('TokenSaveError')
                    return false
                }
            })
            .then((success) => {
                if (success) {
                    const pending = Promise.all([
                        helper.getGosts(),
                        helper.getKrepl(),
                        helper.getVidr(),
                        helper.getObjTypes(),
                        helper.getTiporaz(),
                        helper.getRoles(Token)
                    ])
                        .catch((e: any[]) => {
                            let err = e.toString();
                            Alert.alert('Ошибка возникла при загрузке постоянных данных', err);
                            throw Promise.reject('getConstantDataError');
                        });
                    if (Token && success) {
                        store.dispatch({type: 'system/set-token', payload: Token})
                        navigation.replace('Welcome')
                    }
                    Promise.resolve(pending).catch((e: any[]) => {
                        let err = e.toString();
                        console.log(e.toString())
                        Alert.alert('UnnownErr', err)
                    });
                }
            })
            .catch((e: any[]) => {
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
                           value={username}
                />


                <Text style={styles.text}>
                    Password
                </Text>

                <TextInput style={styles.input} onChangeText={text => onChangeText2(text)}
                           value={password}
                />

            </View>

            <View style={{flex: 1, flexDirection: 'column-reverse', padding: 5,}}>
                <Button title='Войти' onPress={() => {
                    getToken();
                }}
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
