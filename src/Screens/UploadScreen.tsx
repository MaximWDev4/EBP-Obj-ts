import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    GestureResponderEvent,
    FlatList,
    ListRenderItem
} from 'react-native';
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay';
import {Alert} from 'react-native';
import {Image} from 'react-native';
import {UndefProps} from "../Navigation/NavTypes";
import {useEffect, useState} from "react";
import DB from "../Share/storage";
import {sendZnakObj, sendPhoto} from "../Share/func";
import {store} from "../Store";
import NetInfo from "@react-native-community/netinfo";


export function UploadScreen({route, navigation}: UndefProps) {
    let db: DB = new DB();
    const [images, setImages] = useState<any[]>([]);
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const Network = async (): Promise<boolean> => {
        let check: boolean = false;
        await NetInfo.fetch().then(state => {
            check = state.isConnected ?? false;
        });
        return check;
    }
    useEffect(() => {
            setLoading(true);
            let timeout = setTimeout(() => {
                setLoading(false);
                alert('Ошибка загрузки')
            }, 30000);
            let errCodes: number[] = [];
            try {
                db.getZnaki(async (arr: any[]) => {

                    try {

                        setImages([]);
                        let tempArr: any[] = [];
                        arr.forEach((znak) => {
                            let img_old;
                            let img_new;
                            try {
                                img_new = JSON.parse(znak.img_new);
                                img_old = JSON.parse(znak.img_old);
                            } catch (e) {
                                errCodes.push(znak.id);
                                console.log(e);
                            } finally {
                                tempArr.push(img_old && !!img_old[0] ? img_old[0] : img_new && !!img_new[0] ? img_new[0] : '');
                            }
                        });
                        setImages(tempArr);
                        setRecords(arr);
                        console.log(records);

                    } catch (e) {
                        Alert.alert("Сбой при чтении фотографий", errCodes.join(', '))
                        console.log(e);
                    } finally {
                        clearTimeout(timeout);
                        setLoading(false);
                    }
                });

            } catch (e) {
                alert(e);
                clearTimeout(timeout);
                setLoading(false);
            }
        }
        , []);


    const send = async (record: any, callback: any) => {
        try {
            let body = 'Token=' + store.getState().system.token + '&' + record.data + '&' + 'DATE' + record.dt;

            let id = null;
            const sent = await sendZnakObj(body, record.type == 'znak' ? 'save' : 'saveobj');

            if (sent === null) {
                callback();
            } else {
                let id = sent;
                if (Number.isInteger(id)) {
                    db.updateZnak(record, 'sid', id, callback);
                    callback(id);
                } else {
                    Alert.alert('Error', 'ID is not integer!');
                }
            }
        } catch (e) {
            alert(e + 'send');
        }
    }


    //upload = () => {
    const upload = async (type: 'all' | 'top') => {
        setLoading(true);

        let timeout = setTimeout(() => {
            setLoading(false);
            alert('Ошибка загрузки')
        }, 10000);

        let finish = (e: boolean, i?: number) => {
            setLoading(false);
            db.getZnaki((arr: any[]) => {
                setRecords(arr);
            });
            clearTimeout(timeout);
            if (e) {
                Alert.alert("Выгрузка завершена")
            } else {
                if (i) {
                    Alert.alert("Что-то пошло не так", `выгружено ${i} записей`)
                } else {
                    Alert.alert("Что-то пошло не так")
                }
            }
        }

        if (type === "all" && records.length) {
            let i = 0;
            records.forEach((async (znak) => {
                await SendInfo(znak, (e) => {
                    if (e) {
                        i = i++
                    }
                })
            }));
            if (i == records.length) {
                finish(true);
            } else {
                finish(false, i);
            }
        } else if (records.length) {
            let znak = records[0];
            await SendInfo(znak, finish);
        }
    }


    async function SendInfo(record: any, finish: (s: boolean) => void) {
        const sid: number = record.sid;

        if (sid) {
            await sendPhoto(sid, record, record.type).then((e) => {
                if (e === 'success') {
                    finish(true)
                } else {
                    alert(e);
                    finish(false)
                }
            });
        } else {
            await send(record, async (cid: any) => {
                record.sid = cid;
                await SendInfo(record, finish)
            }).catch((e) => { finish(false)});
        }
    }


    function deleteRecord(znak: any) {
        let tempArr: any[] = [];
        db.deleteZnak(znak, () => {
            try {
                db.getZnaki((arr: any[]) => {
                    setRecords(arr);
                    setImages([]);

                    arr.forEach((znak) => {
                        let img_old = JSON.parse(znak.img_old);
                        let img_new = JSON.parse(znak.img_new)
                        tempArr.push(!!img_old ? img_old : img_new);
                    });
                    setImages(tempArr);
                });
            } finally {
                setImages(tempArr);
            }
        });
    }

    const renderRecord: ListRenderItem<any> = (props) => {

        let image;
        if (images[props.index] !== '' && typeof images[props.index] !== "undefined") {
            image = (
                <Image source={
                    // require('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540maxdev4%252Febp-react-ts/Image_1.png')
                    {uri: images[props.index]}
                } style={{width: 100, height: 100}}/>
            )
        } else {
            image = (
                <Image source={
                    // require('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540maxdev4%252Febp-react-ts/Image_1.png')
                    require('../../assets/images/robot-dev.png')
                } style={{width: 100, height: 100}}/>
            )
        }
        let t = props.item.dt.split(/[- :]/);

        let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

        return (
            // <ListItem
            <View
                key={props.item.id}
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    //flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flex: 1
                }}>

                <View style={{
                    flex: 3
                }}>
                    {image}
                </View>

                <View style={{
                    alignItems: 'flex-start',
                    padding: 15,
                    marginTop: 10,
                    flex: 5
                }}>
                    <Text style={styles.text}>{`Изображение выбрано \n`}{date}</Text>


                </View>

                <View
                    style={{
                        width: 32,
                        justifyContent: 'flex-end',
                        flex: 2
                    }}>

                    <View
                        style={{
                            //width: 32,
                            //justifyContent: 'flex-end',
                            flex: 1
                        }}>

                        <Text
                            // onPress={deleteFoto}
                            style={{
                                //padding: 10,
                            }}>
                        </Text>
                    </View>

                    <View
                        style={{
                            //width: 32,
                            //justifyContent: 'flex-end',
                            //padding:30,
                            paddingBottom: 25,
                            flex: 1
                        }}>
                        <TouchableOpacity onPress={() => deleteRecord(records[props.index])}>
                            <Image style={{
                                width: 32,
                                height: 32,
                            }}
                                   source={require('../../assets/images/delete.png')}/>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
            // {/*</ListItem>*/}
        )
    }


    return (
        <View
            style={{
                //flexDirection: 'column',

                flex: 1
            }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />

            <View
                style={{

                    //backgroundColor: 'green',
                    //justifyContent: 'space-between',
                    //justifyContent: 'flex-start',
                    //justifyContent: 'center',

                    padding: 5,
                    flex: 5,

                }}
            >

                <FlatList
                    keyExtractor={item => item.id.toString()} data={records} renderItem={renderRecord}
                />

            </View>

            <View style={{
                flex: 1,
                //justifyContent: 'space-between',
                flexDirection: 'column',

                //justifyContent: 'center',
                justifyContent: 'flex-end',
                //backgroundColor: 'red',

                //flexDirection: 'column-reverse',
                padding: 5,
            }}>

                <View style={{
                    flex: 1,
                    //flexDirection: 'column-reverse',
                    //padding: 5,
                }}>

                    <Button
                        title='Отправить Верхнюю'
                        // style={{ flex: 1,}}
                        disabled={!records.length}
                        onPress={() => {
                            Network().then((state) => {
                                if (state) {
                                    upload('top');
                                } else {
                                    Alert.alert('Нет интернета')
                                }
                            })

                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    //flexDirection: 'column-reverse',
                    //padding: 5,
                }}>
                    <Button
                        title='Отправить всю очередь'
                        // style={{ flex: 1,}}
                        disabled={!records.length}
                        onPress={() => {
                            Network().then((state) => {
                                if (state) {
                                    upload('all');
                                } else {
                                    Alert.alert('Нет интернета')
                                }
                            })
                        }}
                    />

                </View>

                <View style={{
                    flex: 1,
                    //flexDirection: 'column-reverse',
                    //padding: 5,
                }}>

                    <Button
                        title='Назад'
                        onPress={() => {
                            navigation.replace('Main')
                        }}
                    />

                </View>


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
    spinnerTextStyle: {
        color: '#FFF'
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


    header: {
        height: 40,
        textAlignVertical: 'bottom',
        textDecorationLine: 'underline',
        fontSize: 22,
    },

    button: {
        margin: 5
    }
});
