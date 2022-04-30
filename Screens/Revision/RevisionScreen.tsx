import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {SignDataProps} from "../../Navigation/NavTypes";
import {MyButton} from "../../Share/components";

export function RevisionScreen({route, navigation}: SignDataProps) {
    const goTo = (destination: string) => {
        switch (destination){
            case '': navigation.dangerouslyGetParent()?.navigate('Root');
            break;
            case '1': navigation.dangerouslyGetParent()?.navigate('Root');
        }
    }
    return(
        <View style = {styles.container}>
            <Text style={{marginBottom: 20, fontSize: 20, textAlign: "center"}}> Выбрать тип ревизии </Text>
            <View>
                <MyButton title = "Смотр"
                        onPress={(() => goTo(''))}/>
                <MyButton title = "Склад"
                        onPress = {(() => goTo('1'))}/>
                <MyButton title = "Доработка"
                        onPress = {(() => goTo(''))}/>
            </View>
        </View>
    )

}


RevisionScreen.navigationOptions = {
    title: 'Ревизия',
};


const styles = StyleSheet.create({
 container: {
     flex: 1,
     backgroundColor: '#fff',
     justifyContent: 'center',
 }
}
)
