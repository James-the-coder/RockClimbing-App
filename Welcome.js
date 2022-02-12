import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';



const Welcome = ({navigation}) => {


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Pressable
            onPress={() => navigation.navigate('Create Account')}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Sign In</Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('Crag Finder', {climbingData: []})}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Crag Finder</Text>
        </Pressable>

        <Pressable
            onPress={() => navigation.navigate('HomePage')}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Home Page</Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('StoreClimb', {selected: ""})}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Store Climb</Text>
        </Pressable>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    pressableStyle: {
        height: 40,
        margin: 12,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'green'
    },
    text: {
        textAlign: 'center'
    },
    title: {
        fontSize: 25,
        textAlign: 'center'
    }

});


export default Welcome;