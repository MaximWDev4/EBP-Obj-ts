import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SignDataProps} from "../../../ebp-react-ts/Navigation/NavTypes";
import {MyButton} from "../../../ebp-react-ts/Share/components";

export function RevisionMenuScreen({route, navigation}: SignDataProps) {
    const goTo = (destination: string) => {
        switch (destination) {
            case '':
                navigation.navigate('Root');
                break;
            case '1':
                navigation.navigate('Root');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{marginBottom: 20, fontSize: 20, textAlign: "center"}}> Выбрать тип ревизии </Text>
            <View>
                <MyButton title="Смотр"
                          onPress={(() => goTo(''))}/>
                <MyButton title="Склад"
                          onPress={(() => goTo('1'))}/>
                <MyButton title="Доработка"
                          onPress={(() => goTo(''))}/>
            </View>
        </View>
    )

}


RevisionMenuScreen.navigationOptions = {
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
