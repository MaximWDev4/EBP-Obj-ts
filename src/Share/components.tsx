import React, {Children, cloneElement, isValidElement} from "react";
import {Image} from "react-native";

import {
    View,
    StyleSheet,
    TouchableHighlight, GestureResponderEvent,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Modal, Button
} from "react-native";

type loadingProps = {
    show: boolean,
    cancelable?: boolean,
    color?: "white" | "black",
    backgroundColor?: "white" | "black",
    dimLights?: number,
    loadingMessage?: string,
    buttonTitle?: string,
    buttonAction?: () => any | null
}

type MyButton = {
    title?: string,
    onPress: () => any,
    style?: { height?: number | string, size?: number, backgroundColor?: string, color?: string, fontSize?: number }
}

type alertProps = {
    show?: boolean,
    color?: string,
    backgroundColor?: string,
    dimLights?: number,
    message?: string,
    buttons?: MyButton[]
}

type Props = {
    children: any,
    color: string,
    stroke: number
}

export class TextStroke extends React.Component<Props> {
    createClones = (w: number, h: number, color?: string) => {
        const {children} = this.props;
        return Children.map(children, child => {
            if (isValidElement(child)) {
                const currentProps = child.props as any;
                const currentStyle = currentProps ? (currentProps.style || {}) : {};

                const newProps = {
                    ...currentProps,
                    style: {
                        ...currentStyle,
                        textShadowOffset: {
                            width: w,
                            height: h
                        },
                        textShadowColor: color,
                        textShadowRadius: 1
                    }
                }
                return cloneElement(child, newProps)
            }
            return child;
        });
    }

    render() {
        const {color, stroke, children} = this.props;
        const strokeW = stroke;
        const top = this.createClones(0, -strokeW * 1.2, color);
        const topLeft = this.createClones(-strokeW, -strokeW, color);
        const topRight = this.createClones(strokeW, -strokeW, color);
        const right = this.createClones(strokeW, 0, color);
        const bottom = this.createClones(0, strokeW, color);
        const bottomLeft = this.createClones(-strokeW, strokeW, color);
        const bottomRight = this.createClones(strokeW, strokeW, color);
        const left = this.createClones(-strokeW * 1.2, 0, color);

        return (
            <View>
                <View style={styles.outline}>{left}</View>
                <View style={styles.outline}>{right}</View>
                <View style={styles.outline}>{bottom}</View>
                <View style={styles.outline}>{top}</View>
                <View style={styles.outline}>{topLeft}</View>
                <View style={styles.outline}>{topRight}</View>
                <View style={styles.outline}>{bottomLeft}</View>
                {bottomRight}
            </View>
        );
    }
}

export const MyButton = ({
                             title = "Отмена",
                             onPress = () => {
                             },
                             style = {
                                 height: 'auto',
                                 size: 1,
                                 backgroundColor: '#8C8888',
                                 color: '#0cc213',
                                 fontSize: 18,
                             }
                         }: MyButton) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[
            styles.appButtonContainer,
            {
                minHeight: 40,
                maxHeight: style.height,
                marginVertical: 10,
                flex: style.size,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            },
            !!style.backgroundColor && {
                backgroundColor: style.backgroundColor
            }
        ]}>

            <Text style={{
                height: 'auto',
                fontSize: style.fontSize,
                color: style.color,
                alignSelf: "center",
                textAlign: 'center',
                justifyContent: 'center',
                textTransform: "uppercase"
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export const ModalActivityIndicator = (props: loadingProps) => {
    const {
        show = false,
        color = "black",
        cancelable = false,
        backgroundColor = "white",
        dimLights = 0.6,
        loadingMessage = "Загрузка...",
        buttonTitle = "Отмена",
        buttonAction = () => {
        }
    }: loadingProps = props;
    return (
        <Modal transparent={true} animationType="none" visible={show}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `rgba(0,0,0,${dimLights})`
                }}
            >
                <View
                    style={{
                        padding: 10,
                        backgroundColor: `${backgroundColor}`,
                        borderRadius: 13
                    }}
                >
                    <ActivityIndicator animating={show} color={color} size="large"/>
                    <Text style={{color: `${color}`}}>{loadingMessage}</Text>
                    {cancelable && < Button onPress={buttonAction()} title={buttonTitle}/>}
                </View>
            </View>
        </Modal>
    );
};

export const CustomModalWindow = (props: alertProps) => {
    const {
        show = false,
        color = "black",
        backgroundColor = "#FFFFFF",
        dimLights = 0.6,
        message = "Вы уверены?",
        buttons = [
            {
                title: "Отмена", onPress: () => {
                }, style: {backgroundColor: '#8C8888', color: '#b22000', fontSize: 18, size: 2}
            },
            {
                title: "Подтвердить", onPress: () => {
                }, style: {backgroundColor: '#8C8888', color: '#0cc213', fontSize: 18, size: 2}
            }]
    }: alertProps = props;
    let btns: any = []
    buttons.map((button, i) => {
        btns.push(<MyButton key={i} title={button.title} onPress={button.onPress} style={button.style}/>)
    })
    return (
        <Modal transparent={true} animationType="none" visible={show}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 5,
                    backgroundColor: `rgba(0,0,0,${dimLights})`
                }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "space-around",
                        height: '50%',
                        backgroundColor: `${backgroundColor}`,
                        borderRadius: 13,
                        paddingVertical: 30,
                        paddingBottom: 100
                        // paddingHorizontal: 5
                    }}
                >
                    <Text style={{
                        color: `${color}`,
                        paddingHorizontal: 40,
                        paddingBottom: 20,
                        fontSize: 15
                    }}>{message}</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        maxHeight: 10,
                        flexGrow: 1,
                        flex: 1
                    }}>{btns}</View>
                </View>
            </View>
        </Modal>
    );
};

const lineProps = {
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeLineCap: "round",
    strokeLineJoin: "round",
};

export function Home({
                         color,
                         size,
                         onPress,
                     }: {
    color: string;
    size: number;
    onPress: (e: GestureResponderEvent) => void;
}) {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={{width: size + 10, height: size, borderRadius: 50}}>
                {/*<Text>H</Text>*/}
                {/*<Svg width={size} height={size} viewBox="0 0 122.88 122.88" fill={'#777777'} {...lineProps} stroke={color} strokeLinecap={'round'}>*/}
                {/*    <Path d="M828.5,490.8c-15.9,0-28.2,12.3-28.2,28.3v386.1H599.9V747.5c0-14.8-12.3-27.7-27.2-27.7H427.9c-15.9,0-28.8,12.9-28.8,27.7v157.7H199.3V531.9c0-14.9-12.3-27.3-28.2-27.3c-14.9,0-27.2,12.4-27.2,27.3v401.5c0,14.9,12.3,27.3,27.2,27.3h256.8c14.9,0,27.2-12.4,27.2-27.3V775.8h89.4v157.7c0,14.9,12.3,27.3,28.2,27.3h255.8c14.9,0,27.2-12.4,27.2-27.3V519.1C855.7,503.1,843.3,490.8,828.5,490.8z"/>*/}
                {/*    <Path d="M982,512.8L759.1,289V136.4c0-15.9-12.8-28.2-28.8-28.2c-14.9,0-27.2,12.3-27.2,28.2V233L519.3,48.1c-5.6-5.7-12.3-8.8-19-8.8c-7.7,0-14.4,3.2-20,8.8L18.6,509.8c-11.1,11.1-11.8,28.8,0,39c10.3,11.8,27.9,11.1,39,0l442.7-441.6l441.7,445.8c4.6,4.6,11.3,7.2,20,7.2c7.7,0,14.4-2.6,20-7.2C992.3,542.6,993,524,982,512.8z"/>*/}
                {/*</Svg>*/}
                <Image source={require('../../assets/Home64.png')} style={{flex: 1, resizeMode: 'contain'}}/>
            </View>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        // borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    text: {},
    outline: {
        position: 'absolute'
    },
});
