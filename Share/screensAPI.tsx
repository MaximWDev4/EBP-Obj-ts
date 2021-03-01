import React, {useEffect, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {
    Button,
    FlatList, FlatListProps,
    GestureResponderEvent,
    Image, ListRenderItem,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {GpsService} from  "./gpsService";
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay';
import {GPS} from "../Navigation/NavTypes";
import {CustomModalWindow, MyButton, TextStroke} from "./components";


const colors = {
    green: "#0cc213",
    yellow: "#c29f0c",
    red: "#b22000",
    gray: "#8C8888",
    transparent: 'transparent'
}
/** accuracyLvl */
export const al = {
    high: 3,
    mid: 3.5,
    low: 4.5,
}

const pickImage = async (type: number, hasPermision: boolean, callback: (s: boolean, result: string) => any) => {
    if (hasPermision) {
        try {
            let result;

            if (type == 1) {
                result = await ImagePicker.launchCameraAsync({
                    base64: true,
                    quality: 1
                })

            } else {
                result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    quality: 1
                })
            }
            if (!result?.cancelled) {
                callback(true, result?.uri);
            } else {
                callback(false, '')
            }
        }
        catch (e) {
            alert(e)
        }
    } else Promise.reject("No permission").catch((e) => callback(false, e));
}

// function IM (image: string, callback: (event: any) => void) {


function RenderPhotoView(im: string[], next: () => void, IM: ListRenderItem<any>, pickNewImage: (type: number) => void) {

    return (
        <View
            style={{
                //flexDirection: 'column',


                flex: 1
            }}>


            <View
                style={{

                    //backgroundColor: 'green',
                    //justifyContent: 'space-between',
                    //justifyContent: 'flex-start',


                    //justifyContent: 'center',

                    padding: 5,
                    flex: 1,

                }}
            >

                <View style={{height: '15%'}}>

                    <Text style={styles.header}>

                        Сделать фото до:

                    </Text>

                </View>

                <View style={{
                    //paddingTop: 5,
                    //paddingBottom: 0,
                    height: '20%',
                    // flex: 1,
                    //backgroundColor: 'red',
                    //height: 10,
                }}
                >
                    <View style={{
                        //paddingTop: 5,
                        //paddingBottom: 0,
                        flex: 1,
                        //backgroundColor: 'red',
                        //height: 10,
                    }}
                    >
                        <Button
                            title='Открыть камеру'

                            onPress={() => {
                                //fetchData(2)
                                //takeFoto()
                                pickNewImage(1 )
                            }}
                        >
                        </Button>
                    </View>

                    <View style={{
                        paddingTop: 5,
                        //paddingBottom: 0,
                        flex: 1,
                        //backgroundColor: 'red',
                        //height: 10,
                    }}
                    >
                        <Button
                            title='Выбрать готовое фото'

                            onPress={() => {
                                //fetchData(2)
                                //ZnakFotoBeforetainZnak()
                                pickNewImage(2)
                            }}
                        >
                        </Button>
                    </View>

                </View>
                <View style={{height: '60%'}}>
                <FlatList
                    keyExtractor={item => item.toString()} data={im} renderItem={IM}
                />
                </View>
            </View>
            <View style={{
                height: '15%',
                //justifyContent: 'space-between',
                flexDirection: 'column',

                //justifyContent: 'center',
                justifyContent: 'flex-end',
                //backgroundColor: 'red',

                //flexDirection: 'column-reverse',
                padding: 5,
            }}>

                <View style={{flex: 1}}/>


                <View style={{
                    flex: 1,
                    //flexDirection: 'column-reverse',
                    //padding: 5,
                }}>

                    <Button
                        title='Продолжить'
                        // style={{ flex: 1,
                        // }}
                        disabled={!im}
                        onPress={() => {
                            next();
                        }}
                    >
                    </Button>

                </View>

                <View style={{flex: 1}}/>

            </View>

        </View>
    );
}

/**
 * @param loading - загружается?
 * @param acc - точность
 * @param rAcc - необходимая точность
 * @param min - минимальная полученная точность
 * @param minCallback - записсать минимальную полученную точность
 * @param rAccCallback - записать необходимую точность
 * @param loadingCallback - записать загружается ли
 * @param next - к следующему экрану
 * @constructor
 */
function RenderGPSView(loading: boolean,
                       acc: string,
                       rAcc: number,
                       min: GPS | undefined,
                       minCallback: (min: GPS) => void,
                       rAccCallback: (rAcc: number) => void,
                       loadingCallback: (loading: boolean) => void,
                       next: () => void
                      ) {
    const macc = min?.coords.accuracy;
    const [chAccIsVis, setChAccIsVis] = useState(false);
    const [awaitMenu, setAwaitMenu] = useState(false);
    const [selectRacc, setSelectRacc] = useState(false);
    let accIc = (a: any) => a || a === 0 ? ( a <= al.high ? colors.green :  a <= al.low ? colors.yellow : colors.red ) : colors.gray;
    let accMarck = macc || macc === 0 ? ( macc <= al.high ? 'Отлично!!!' :  macc <= al.mid ? "Удовлетворительно" : macc <= al.low ? "Неудовлетворительно!" : "Плохо!") : "---";
    // @ts-ignore

    return (
        <View style={{flex: 1}}>
            <CustomModalWindow
                show={chAccIsVis}
                message={'Вы уверены, что хотите изменить допустимую точность локации?'}
                color={colors.red}
                buttons={[
                    {title: "Отмена", onPress: () => { setChAccIsVis(false)}, style: {backgroundColor: colors.gray, color: colors.green, fontSize: 18, size:  2}},
                    {title: "Подтвердить", onPress: () => { setChAccIsVis(false); setSelectRacc(!selectRacc) }, style: {backgroundColor: colors.gray, color: colors.red, fontSize: 18, size:  2}}]
                    }
            />
            <CustomModalWindow
                show={awaitMenu}
                message={'Пожалуйста дождитесь точной локации!\n \n (Не закрывайте телефон и по возможности держитесь открытого пространства)'}
                color={'#000000'}
                buttons={[
                    {title: "Подождать", onPress: () => {setAwaitMenu(false);}, style: {backgroundColor: colors.gray, color: '#FFFFFF', fontSize: 18, size:  2}}]
                }
            />
             <View style={{flex: 1}}>
                 {selectRacc &&
                 <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: 60}}>
                     <MyButton onPress={() => rAccCallback(al.high)} title={`<${al.high}м`} style={{size: 4, backgroundColor: colors.green, color: 'white', fontSize: 30,}}/>
                     <MyButton onPress={() => rAccCallback(al.mid)} title={`${al.high}-${al.low}м`} style={{size: 4, backgroundColor: colors.yellow, color: 'white', fontSize: 30,}}/>
                     <MyButton onPress={() => rAccCallback(al.low+0.1)} title={`>${al.low}м`} style={{size: 4, backgroundColor: colors.red, color: 'white', fontSize: 30,}}/>
                 </View>
                 ||
                 <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: accIc(macc)}} >
                     {    // @ts-ignore
                         macc <= al.high && <Text style={styles.GPSText}>
                         Погрешность {macc?.toFixed(4)}м
                     </Text>
                     ||
                     <Text style={styles.GPSText}>
                         Уточнение локации
                     </Text>}
                 </View>}
                <View style={{backgroundColor: colors.transparent, alignItems: 'flex-start', padding: 5, marginBottom: 10}}>
                    <Text style={[styles.GPSText, {color: accIc(+acc), fontWeight: 'bold' }]}>
                       {acc}м
                    </Text>
                    <Text style={[styles.GPSText, {color: accIc(macc), fontWeight: 'bold' }]}>
                        ~{min?.coords.accuracy?.toFixed(2)}м
                    </Text>
                </View>
                <TextStroke stroke={ 0.5 } color={ '#FFFFFF' }>
                    <Text onPress={() => setChAccIsVis(true)} style={{
                        textAlign: "center",
                        height: 55,
                        paddingBottom: 15,
                        textAlignVertical: 'bottom',
                        fontSize: 22,
                        backgroundColor: '#9d9999',
                        color: accIc(rAcc)}}>
                        Целевая точность: {rAcc<4.6?rAcc:'>4.5'}м.
                    </Text>
                </TextStroke>
                <View style={{paddingTop: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.text, {color: colors.gray}]}>Оценка точности</Text>
                    <Text style={[styles.text, {color: accIc(macc)}]}> {accMarck} </Text>
                </View>
                <View style={{flex: 1}}>

                </View>
                <View style={{flex: 1}}>
                <View style={{flex: 1,}}>
                    <MyButton style={{height: 50, backgroundColor: colors.gray, fontSize: 22}} title='Продолжить' onPress={() => {
                        if (macc || macc === 0){
                            if (macc < rAcc || macc <= al.mid || (rAcc >= al.mid && macc <= al.low) || rAcc > al.low) {
                                next();
                            } else {
                                setAwaitMenu(true);
                            }
                        } else {
                            setAwaitMenu(true);
                        }
                    }}/>
                </View>
                </View>
            </View>

        </View>
    );
}
export default pickImage;

export {pickImage, RenderPhotoView, RenderGPSView}

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

    spinnerTextStyle: {
        color: '#FFF'
    },

    text: {
        fontSize: 20,
        height: 40,
        textAlignVertical: 'bottom',
    },
    input: {
        height: 40,
        backgroundColor: '#eee',
        borderColor: 'gray',
        borderWidth: 1
    },

    GPSText: {
        marginTop: -10,
        textAlign: "center",
        color: 'white',
        height: 40,
        textAlignVertical: 'bottom',
        fontSize: 30,
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
