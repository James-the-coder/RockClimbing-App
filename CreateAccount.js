// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, {useState} from 'react';
import { fireStoreDb, authentication} from './firebase';
import { doc, setDoc } from "firebase/firestore/lite";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection} from 'firebase/auth';
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

const CreateAccount = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setUserPassword] = useState('');
  const [email, setUserEmail] = useState('');

  const [isSignedIn, setIsSignedIn] = useState(false);
  const StrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  const SetData = async() => {

    await setDoc(doc(fireStoreDb, "users", authentication.currentUser.uid), {
        email: email,
        password: password,
        username: userName
    })
    await setDoc(doc(fireStoreDb, "Climbs", authentication.currentUser.uid), {
        CragId: []
    })

  }

  const RegisterUser = () => {
    if (!userName) {
      alert('Please fill username');
      return;
    }
    if (!password) {
      alert('Please fill password Number');
      return;
    }
    if (!email) {
      alert('Please fill email');
      return;
    }
    if (!StrongRegex.test(password)){
        alert('password not strong enough')
        return;
    }
    createUserWithEmailAndPassword(authentication, email, password)
    .then((re) => {
        SetData()
        setIsSignedIn(true);

        alert("registered account successfully")
        navigation.navigate('Welcome')
    })
    .catch((re) => {
        alert(re.message)
    })
  }
  const SignInUser = () => {
    if (!userName) {
      alert('Please fill username');
      return;
    }
    if (!password) {
      alert('Please fill password Number');
      return;
    }
    if (!email) {
      alert('Please fill email');
      return;
    }
      signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
          setIsSignedIn(true);
          alert("signed in")
          navigation.navigate('Welcome')
      })
      .catch((re) => {
          alert(re.message);
      })
    }
    const SignOutUser = () => {
      signOut(authentication)
      .then((re) => {
          setIsSignedIn(false);
          alert("signed out")
          navigation.navigate('Welcome')
      })
      .catch((re) => {
          alert(re.message);
      })
    }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                onChangeText={(password) => setUserPassword(password)}

              />
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={(email) => setUserEmail(email)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Enter Username"
                  onChangeText={(name) => setUserName(name)}
                />
              <Pressable
                  onPress={() => RegisterUser()}
                  style={({ pressed }) => ({
                  backgroundColor: pressed ? 'blue' : 'green',
                  borderRadius: 8,
                  },
                  styles.pressableStyle
                  )}>

                  <Text style={styles.text}>Register</Text>
              </Pressable>
              {isSignedIn == true?

                <Pressable onPress={() => SignOutUser()}style={({ pressed }) => ({backgroundColor: pressed ? 'blue' : 'green',borderRadius: 8,},styles.pressableStyle)}><Text style={styles.text}>Sign Out</Text></Pressable>
                :
                <Pressable onPress={() => SignInUser()} style={({ pressed }) => ({backgroundColor: pressed ? 'blue' : 'green',borderRadius: 8,},styles.pressableStyle)}><Text style={styles.text}>Login</Text></Pressable>
              }

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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