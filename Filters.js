import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import MultiSlider from'@ptomasroos/react-native-multi-slider';
import {openDatabase} from 'react-native-sqlite-storage';
import { Dropdown } from 'react-native-element-dropdown';



const db = openDatabase({name:'rockClimbingInfo.db', createFromLocation: 1}, ()=>{console.log("found")});

let crags = [];
const dropdownOptions = [
    {label: 'Location', value: '1'},
    {label: 'Name', value: '2'}
]

let query = "";
let parameters = [];

const Filters = ({navigation}) => {

    const [info, setInfo] = useState("");
    const [name, setName] = useState("");
    const [filter, setFilter] = useState("");
    const [location, setLocation] = useState("");
    const [gradeRange1, setGradeRange1] = useState();
    const [gradeRange2, setGradeRange2] = useState();

    const grades = ["2a","2b","2c","3a","3b","3c","4a","4b","4c","5a","5b","5c","6a","6a+","6b","6b+","6c","6c+","7a","7a+","7b","7b+","7c","7c+","8a","8a+","8b","8b+","8c","8c+","9a","9a+","9b","9b+","9c","9c+"];

    let filterSearch= () => {

        db.transaction((tx) => {
                    //tx.executeSql('SELECT name, crag, sector  FROM ascent WHERE country="GBR" AND sector LIKE ?',
                    tx.executeSql('SELECT crag_id, MAX(crag) AS crag, MAX(sector) AS sector from ascent WHERE sector<>"" AND country="GBR" group by crag_id',
                    //[`%${location}%`],
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));

                        crags = [];
                        for (var counter = 0; counter< temp.length-100; counter++){
                            crags.push(temp[counter].crag+" UK")
                        }
                        if (crags.length>0){
                            navigation.navigate('Crag Finder', {climbingData: crags})
                        }

                    });

                });

                //console.log(flatListItems)


            //console.log(flatListItems)


    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Filters</Text>
        <Dropdown
            style={styles.dropdownStyle}
            data={dropdownOptions}
            placeholder="Filter By"
            search
            maxHeight={200}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            onChange={(item) => setFilter(item.label)}
        />
        <TextInput
            placeholder={filter}
            style={styles.input}
            onChangeText={(txt)=> setInfo(txt)}>
        </TextInput>
        <Text>
            Difficulty Range
        </Text>
        <MultiSlider //grade range entry
            style={styles.slider}
            values={[0,36]}
            sliderLength={360}
            allowOverlap={false}
            max={36}
            min={1}
            step={1}
            snapped={true}
            showSteps={true}
            showStepLabels={true}
            showStepMarkers={true}
            enabledTwo={true}
            isMarkerSeparated={true}
            onValuesChange={(val) => {

                  setGradeRange1(val[0]);
                  setGradeRange2(val[1]);

            }}
        />
        <Text>
            {grades[gradeRange1-1]} - {grades[gradeRange2-1]}
        </Text>
        <Pressable
            onPress={() => navigation.navigate('Crag Finder', {climbingData: crags})}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Crag Finder</Text>
        </Pressable>
        <Pressable
            onPress={() => filterSearch()}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle2
            )}>

            <Text style={styles.text}>Search</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
    },
    dropdownStyle: {
        width: 100,
        position: "absolute",
        top: 150,
    },
    input: {
        backgroundColor: 'white',
        height: 50,
        width: 300,
        marginVertical: 40,
        marginHorizontal: 10,
        borderWidth: 1,
        padding: 10
    },
    slider:{
        position: "absolute",
        marginVertical: 30,

    },
    pressableStyle: {
        height: 40,
        marginHorizontal: 12,
        marginVertical: 40,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'green',
        position: "absolute",
        bottom: 30,
    },
    pressableStyle2: {
        height: 40,
        marginHorizontal: 12,
        marginVertical: 40,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'green',
        position: "absolute",
        bottom: 30,
        right: 40,
    },
    text: {
        textAlign: 'center'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        position: "absolute",
        top: 30,

    }
});


export default Filters;