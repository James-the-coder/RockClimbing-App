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
  FlatList,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';

let userName = "";
let UserClimbs = [];

const HomePage = ({navigation}) => {

    let [flatListItems, setFlatListItems] = useState([]);
    const grades = ["2a","2b","2c","3a","3b","3c","4a","4b","4c","5a","5b","5c","6a","6a+","6b","6b+","6c","6c+","7a","7a+","7b","7b+","7c","7c+","8a","8a+","8b","8b+","8c","8c+","9a","9a+","9b","9b+","9c","9c+"];
    const [suggestedLocation, setSuggestedLocation] = useState("");
    const [suggestedGradesMin, setSuggestedGradesMin] = useState("");
    const [suggestedGradesMax, setSuggestedGradesMax] = useState("");

    useEffect(()=>{
        GetData()
    },[])

    let GetData = async() => {
        try {
            let docSnapUser = await getDoc(doc(fireStoreDb, "users", authentication.currentUser.uid))
            userName = docSnapUser.data().username
            let docSnapClimbs = await getDoc(doc(fireStoreDb, "Climbs", authentication.currentUser.uid))
            UserClimbs = docSnapClimbs.data().CragId
            setFlatListItems(UserClimbs)

        }
        catch(err){

            alert("there was an error getting your data")
        }
        SuggestClimb(UserClimbs)

      }

    let SuggestClimb = (dataList) => {

        let possibleSuggestions = []
        let possibleGrades = []
        for (var i = 0; i< dataList.length; i++){
            if (dataList[i].liked){
                possibleSuggestions.push(dataList[i].crag)
                possibleGrades.push(dataList[i].climbGrade)
            }
        }
        setSuggestedLocation(mode(possibleSuggestions))
        gradeSuggestions(possibleGrades)
    }

    let mode = (arr) => {

        if (arr.length===0){
            return null;
        }
        var modeMap = {}
        var maxEl = arr[0], maxCount = 1
        for (var i = 0; i < arr.length; i++){
            var el = arr[i]
            if (modeMap[el] == null){
                modeMap[el]=1
            }else{
                modeMap[el]++
            }
            if (modeMap[el] > maxCount){
                maxEl = el
                maxCount = modeMap[el]
            }
        }
        return maxEl

    }

    let gradeSuggestions = (arr) => {
        let min = "9c+"
        let max = "2a"
        for (let i = 0; i < arr.length; i++){
            let indexOfGrade = grades.indexOf(arr[i])
            if (indexOfGrade < grades.indexOf(min)){
                min = arr[i]
            }
            else if (indexOfGrade > grades.indexOf(max)){
                max = arr[i]
            }

        }
        setSuggestedGradesMin(min)
        setSuggestedGradesMax(max)
    }

    let listViewItemSeparator = () => {
        return(
            <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}}/>
        );
    };

    let listItemView = (item, index) => {

        return (
            <View
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>date: {item.date}</Text>
                <Text>name: {item.name}</Text>
                <Text>crag: {item.crag}</Text>
                <Text>tries: {item.attempts}</Text>
                <Text>grade: {item.climbGrade}</Text>
                <Text>ID: {item.id}</Text>
                <Text>Liked: {(item.liked).toString()}</Text>
            </View>
        );
    };

    return (
        <View>
            <Text>{userName}</Text>
            <Text>You might like climbs from: {suggestedLocation}</Text>
            <Text>You might like difficulties between {suggestedGradesMin} and {suggestedGradesMax}</Text>
            <FlatList
                data={flatListItems}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item}) => listItemView(item)}
            />
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


export default HomePage;