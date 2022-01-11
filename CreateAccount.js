// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';

// Connection to access the pre-populated user_db.db
const db = openDatabase({name: 'MainDB.db', createFromLocation: 1});

const CreateAccount = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [password, setUserPassword] = useState('');
  let [email, setUserEmail] = useState('');

  let register_user = () => {
    console.log(userName, password, email);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!password) {
      alert('Please fill Contact Number');
      return;
    }
    if (!email) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) VALUES (?,?,?)',
        [userName, password, email],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Welcome'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                onChangeText={(userName) => setUserName(userName)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                onChangeText={(password) => setUserPassword(password)}

              />
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={(email) => setUserEmail(email)}
              />
              <Pressable
                  onPress={() => register_user()}
                  style={({ pressed }) => ({
                  backgroundColor: pressed ? 'blue' : 'green',
                  borderRadius: 8,
                  },
                  styles.pressableStyle
                  )}>

                  <Text style={styles.text}>Submit</Text>
              </Pressable>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default CreateAccount;