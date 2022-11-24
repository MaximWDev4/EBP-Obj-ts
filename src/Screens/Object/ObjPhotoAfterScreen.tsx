import {Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Data, ObjDataProps} from "../../Navigation/NavTypes";
import {useEffect, useState} from "react";
import {pickImage, RenderPhotoView} from "../../Share/screensAPI";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {askPermission} from "../../Share/func";

export default function ObjPhotoAfterScreen({route, navigation}: ObjDataProps) {
    const Data: Data = route.params;
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        try {
            ImagePicker.getPendingResultAsync().then((pend_img) => {
                if (typeof pend_img !== 'undefined') {
                    if (pend_img[0].hasOwnProperty('uri')) {
                        // @ts-ignore
                        setImages(pend_img[0].uri);
                    }
                }
            }, (e) => {
                console.log(e)
            });
        } catch (e) {
            console.log(e)
        }
        askPermission().then((stat: any) => setHasPermission(stat));
    }, [])

    const deleteFoto = async (id: number) => {
        let tempArr: string[];
        try {
            let fileExists = (await FileSystem.getInfoAsync(images[id])).exists;
            if (fileExists) {
                await FileSystem.deleteAsync(images[id]);
            }
        } finally {
            tempArr = [...images]
            tempArr.splice(id, 1)
            setImages(tempArr);
        }
    }

    const next = () => {
        let data: Data = Data;
        data.imageAfter = images;
        navigation.navigate('ObjUpload', data);
    }


    const IM: ListRenderItem<any> = (props) => {
        let image;
        console.log(props.item)
        if (props.item !== '' && typeof props.item !== "undefined") {
            image = (
                <Image source={
                    // require('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540maxdev4%252Febp-react-ts/Image_1.png')
                    {uri: props.item}
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
                    <TouchableOpacity onPress={() => deleteFoto(props.index)}>
                        <Image style={{
                            width: 32,
                            height: 32,
                        }}
                               source={require('../../../assets/images/delete.png')}/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (RenderPhotoView({
                im: images, next: next, IM: IM, pickNewImage: (type) => pickImage(type, hasPermission, (s, result) => {
                    if (s) {
                        try {
                            setImages([...images, result]);
                        } catch (e) {
                            alert(e)
                        }
                    } else {
                        console.log(result);
                    }
                }), after: true, skip: () => {
                    // setImages([Asset.fromModule(require('../../assets/images/maintaining.png')).uri]);
                    next()
                }
            }
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
