import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name:'MainDB',
        createFromLocation:'1',
    },
    () => {alert("Success")},
    error => { }
);




export default function Login({ navigation }, props) {

//  constructor(props){
//    super(props);
//    SQLite.openDatabase(
//    {
//        name:'MainDB',
//        location: 'default',
//    },
//    this.successToOpenDB,
//    this.failToOpenDb,
//    );
//  }
//
//  successToOpenDB(){
//    alert("SUCCESS!")
//  }
//  failToOpenDb(err){
//    console.log("error")
//  }

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const createTable = () => {
        db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS"
            +"USERS"
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, USERNAME TEXT, PASSWORD TEXT, EMAIL TEXT)"
        )
        })
  }



  const setData = async () => {
    if (username.length == 0 || password.length == 0) {
        alert('Warning! Please fill out the fields.')
    }
    else{
        alert(username)
        alert(password)
        try {
            await db.transaction(async (tx)=>{

                await tx.executeSql(
                    "INSERT INTO USERS (USERNAME, PASSWORD) VALUES ('"+username+"','"+password+"')"
                    //[username,password]
                );

            })
        }catch (error) {
            //console.log(error);
        }
    }
  }

  const getData = () => {
    console.log("start")
    try {
        db.transaction((tx)=>{
            tx.executeSql(
                'SELECT USERNAME, PASSWORD FROM USERS',
                [],
                (tx, results)=> {
                    var len = results.rows.length;
                    //console.log(len)
                    if (len > 0){
                        var userName = results.rows.item(0).USERNAME;
                        var Password = results.rows.item(0).PASSWORD;
                        setUserName(userName);
                        setPassword(Password);
                        alert("sql executed")


                    }else{
                        alert("nothing")
                    }
                }
            )
        })
    }catch (error){
        //console.log(error);
    }
  }



    return (
      <View style={styles.container}>
        <Text style={styles.title}>login page</Text>
        <TextInput //username entry
            style={styles.input}
            placeholder='username'
            onChangeText={(value) => setUserName(value)}
        />
        <TextInput //password entry
            style={styles.input}
            placeholder='password'
            onChangeText={(value) => setPassword(value)}
        />
        <Pressable
            onPress={() => getData()}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Login</Text>
        </Pressable>
        <Text>Username: {username}</Text>

      </View>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10
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
