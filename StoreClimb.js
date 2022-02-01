// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, {useState, useEffect} from 'react';
import { fireStoreDb, authentication} from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore/lite";
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

const db = openDatabase({name:'rockClimbingInfo.db', createFromLocation: 1}, ()=>{console.log("found")});

let cragIdArray = [];
let query = "";
let parameters = [];
let temp = []
const StoreClimb = ({navigation, route}) => {

  const [climbName, setClimbName] = useState("");
  const [cragLocation, setCragLocation] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");
  let selected = route.params


  useEffect(() => {
    if (selected.length !== 0){
        setClimbName(selected.selected[1])
        setCragLocation(selected.selected[2])
    }
    GetData()
  },[selected])


  let SetData = async() => {
    if (selected.length === 0){
        if (grade === ""){
            alert("enter grade")
            return;
        }
        if (climbName === ""){
            alert("enter name")
            return;
        }
        if (cragLocation === ""){
            alert("enter location")
            return;
        }
    }
    if (date === ""){
        alert("enter date")
        return;
    }

    addData()
    await setDoc(doc(fireStoreDb, "Climbs", authentication.currentUser.uid), {
        CragId: cragIdArray,
    }).catch((error)=>{
        alert(error)
    })
    alert("Stored Climb Successfully")
    navigation.navigate("HomePage")

  }

  let GetData = async() => {

    let docSnap = await getDoc(doc(fireStoreDb, "Climbs", authentication.currentUser.uid))
    cragIdArray = docSnap.data().CragId

  }

  let addData = () => {

    if (selected !== "" && date !== ""){
        cragIdArray.push({ date : date, id: selected.selected[0],name:selected.selected[1]})
    }


  }

  let QueryDB = () => {

    db.transaction((tx) => {
        query = 'SELECT crag_id, crag, sector, name, fra_routes from ascent INNER JOIN grade on grade.id=ascent.grade_id WHERE sector<>"" AND country="GBR" AND name LIKE ? and crag LIKE ? AND fra_routes=? '
        parameters = [`%${climbName}%`, `%${cragLocation}%`, grade]
        if (grade === ""){
            //query without grade
            query = 'SELECT crag_id, crag, sector, name, fra_routes from ascent INNER JOIN grade on grade.id=ascent.grade_id WHERE sector<>"" AND country="GBR" AND name LIKE ? and crag LIKE ? '
            parameters = [`%${climbName}%`, `%${cragLocation}%`]
        }
        if (typeof(climbName) === "undefined"){
            //query without name
            query = 'SELECT crag_id, crag, sector, name, fra_routes from ascent INNER JOIN grade on grade.id=ascent.grade_id WHERE sector<>"" AND country="GBR" and crag LIKE ? AND fra_routes= ? '
            parameters = [`%${cragLocation}%`, grade]
        }
        if (cragLocation === ""){
            //query without location
            query = 'SELECT crag_id, crag, sector, name, fra_routes from ascent INNER JOIN grade on grade.id=ascent.grade_id WHERE sector<>"" AND country="GBR" AND name LIKE ? AND fra_routes=? '
            parameters = [`%${climbName}%`, grade]
        }
        tx.executeSql(query,
        parameters,
        (tx, results) => {
              temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));

              if (temp.length === 0){
                alert("Found no results")
              }else{
                alert("Found results")
                navigation.navigate('StoreClimbQueryViewer', {climbingData: temp})
              }





        });

    });
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
                placeholder={"Enter Name of Climb"}
                onChangeText={(nameofCLimb) => setClimbName(nameofCLimb)}
                value={climbName}

              />
              <TextInput
                style={styles.input}
                placeholder="Enter Grade"
                onChangeText={(gradeInput) => setGrade(gradeInput)}
                value={grade}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Enter Crag location"
                  onChangeText={(cragLocationInput) => setCragLocation(cragLocationInput)}
                  value={cragLocation}
                />

              <TextInput
                style={styles.input}
                placeholder="Enter date completed"
                onChangeText={(dateInput) => setDate(dateInput)}
              />

                <Pressable
                    onPress={() => SetData()}
                    style={({ pressed }) => ({backgroundColor: pressed ? 'blue' : 'green',borderRadius: 8,},
                    styles.pressableStyle)}>
                    <Text style={styles.text}>upload climb</Text>
                </Pressable>

                <Pressable
                    onPress={() => QueryDB()}
                    style={({ pressed }) => ({backgroundColor: pressed ? 'blue' : 'green',borderRadius: 8,},
                    styles.pressableStyle)}>
                    <Text style={styles.text}>Filter Search</Text>
                </Pressable>



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

export default StoreClimb;
