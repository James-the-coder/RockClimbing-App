import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'MainDB.db', createFromLocation: 1});

const Welcome = ({navigation}) => {
    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='USER'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS USER', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS USER(ID INTEGER PRIMARY KEY AUTOINCREMENT, USERNAME VARCHAR(20), PASSWORD VARCHAR(20), EMAIL VARCHAR(30))',
                  [],
                );
              }
            },
          );
        });
    }, []);


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Pressable
            onPress={() => navigation.navigate('Login')}
            style={({ pressed }) => ({
                backgroundColor: pressed ? 'blue' : 'green',
                borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Login</Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('Create Account')}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Create New Account</Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('Crag Finder')}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Crag Finder</Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('Filters')}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Filters</Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('ViewAll')}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>View All</Text>
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