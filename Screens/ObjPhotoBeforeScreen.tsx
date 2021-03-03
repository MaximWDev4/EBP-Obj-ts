import * as React from 'react';
import {Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Data, ObjDataProps} from "../Navigation/NavTypes";
import {useEffect, useState} from "react";
import {pickImage, RenderPhotoView} from "../Share/screensAPI";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {askPermission} from "../Share/func";

export default function ObjPhotoBeforeScreen({route, navigation}: ObjDataProps) {

    const Data = route.params;
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>(Data.imageBefore ? Data.imageBefore : []);

    useEffect(() => {
        if (!images || images[0] === '') {
            ImagePicker.getPendingResultAsync().then((pend_img) => {
                if (pend_img && pend_img[0].hasOwnProperty('uri')) {
                    // @ts-ignore
                    setImages([pend_img[0].uri]);
                }
            });
        }
        askPermission().then( stat => setHasPermission(stat));
    }, [])

    const deleteFoto = async (id: number) => {
        let tempArr: string[];
        let fileExists = (await FileSystem.getInfoAsync(images[id])).exists;
        if (fileExists) {
            await FileSystem.deleteAsync(images[id]);
        }
        tempArr = images.filter((v, i) => i !== id)
        setImages(tempArr);
    }

    const next = () => {
        let data: Data = Data;
        data.imageBefore = images;
        navigation.navigate('ObjGPS', data);

        //props.navigation.navigate('Znak', {
        //image: state.image,
        //})


    }

    const IM: ListRenderItem<any> = (props) => {
        let image;
        console.log(images[props.index])
        if (images[props.index] !== '' && typeof images[props.index] !== "undefined") {
            image = (
                <Image source={
                    // require('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540maxdev4%252Febp-react-ts/Image_1.png')
                    {uri: images[props.index]}
                } style={{width: 100, height: 100}}/>
            )
        }
        return (
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                //flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1
            }}>

                <View style={{
                    flex: 3
                }}>

                    <Image source={{uri: images[props.index]}} style={{width: 100, height: 100}}/>
                </View>

                <View style={{
                    paddingTop: 15,
                    flex: 5
                }}>
                    <Text style={styles.text}>Изображение выбрано </Text>


                </View>

                <View
                    style={{
                        //width: 32,
                        //justifyContent: 'flex-end',
                        //padding:30,
                        paddingBottom: 25,
                        flex: 1
                    }}>
                    <TouchableOpacity onPress={ () => deleteFoto(props.index)}>
                        <Image style={{
                            width: 32,
                            height: 32,
                        }}
                               source={require('../assets/images/delete.png')}/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (RenderPhotoView(images, next, IM, (type) => pickImage(type, hasPermission, async (s, result) => {
                if (s) {
                    try {
                        setImages([...images, result]);
                    } catch (e) {
                        alert(e)
                    }
                } else {
                    await askPermission()
                    console.log(result);
                }
            })
        )
    )

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
