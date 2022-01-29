import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import MultiSlider from'@ptomasroos/react-native-multi-slider';
import {openDatabase} from 'react-native-sqlite-storage';
import { Dropdown } from 'react-native-element-dropdown';


const db = openDatabase({name:'rockClimbingInfo.db', createFromLocation: 1, },()=>{console.log("found")});

let crags = [];
const dropdownOptions = [
    {label: 'Location', value: '1'},
    {label: 'Name', value: '2'}
]

let query = "";
let gradeIDForBoth = []
//SELECT crag, ascent.grade_id, grade.id ,fra_routes, usa_boulders from ascent INNER JOIN grade ON grade.id = ascent.grade_id WHERE country="GBR" AND sector<>"" AND grade.fra_routes BETWEEN '6a' AND '7a' ORDER BY crag

const Filters = ({navigation}) => {



    const [info, setInfo] = useState("");

    const [gradeRange1, setGradeRange1] = useState();
    const [gradeRange2, setGradeRange2] = useState();

    const [filter, setFilter] = useState("");

    let [flatListItems, setFlatListItems] = useState([]);

    const FraGrades = ["2a","2b","2c","3a","3b","3c","4a","4b","4c","5a","5b","5c","6a","6a+","6b","6b+","6c","6c+","7a","7a+","7b","7b+","7c","7c+","8a","8a+","8b","8b+","8c","8c+","9a","9a+","9b","9b+","9c","9c+"];
    const BoulderGrades = ["VB","V0", "V1","V2","V3","V4","V5","V6","V7","V8","V9","V10","V11","V12","V13","V14","V15","V16","V17","V18","V19","V20"]
    let filterSearch= async() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            reject('Request failed.Please try again');
            }, 20000);
            if (filter !==""){

                db.transaction((tx) => {
                    if (filter==="Name"){
                        query = 'SELECT crag_id, crag, fra_routes, sector from ascent INNER JOIN grade on grade.id=ascent.grade_id WHERE sector<>"" AND country="GBR" AND name LIKE ? AND grade.fra_routes BETWEEN ? AND ? group by crag_id ;'

                    }
                    if (filter==="Location"){
                        query = 'SELECT crag_id, crag, sector from ascent WHERE sector<>"" AND country="GBR" AND crag LIKE ? group by crag_id ;'
                    }
                    //console.log(`%${info}%`)
                    tx.executeSql(query,[`%${info}%`],(tx, results) => {
                        console.log("here")
                        crags = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            crags.push((results.rows.item(i)).crag+" UK");
                        console.log(crags)

                        if (crags.length === 0){
                            alert("Found no results")
                        }else{
                            alert("Found Results")
                        }
                        resolve(crags);
                    });

                });


            }else{
                db.transaction((tx) => {
                    query = 'SELECT crag_id, MAX(crag) AS crag, MAX(sector) AS sector, MAX(fra_routes) as fra_routes from ascent INNER JOIN grade on grade.id=ascent.grade_id WHERE sector<>"" AND country="GBR" AND grade.fra_routes BETWEEN ? AND ? group by crag_id'
                    tx.executeSql(query,[gradeRange1,gradeRange2],(tx, results) => {
                        crags = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            crags.push([results.rows.item(i).crag+" UK"]);
                        console.log(crags)
                        if (crags.length === 0){
                            alert("Found no results")
                        }else{
                            alert("Found Results")
                        }
                        resolve(crags);
                    });

                });

            }


        });



    };

    let listViewItemSeparator = () => {
        return(
            <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}}/>
        );
    };

    let listItemView = (item) => {
        return (
            <View
                key={item.crag_id}
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>key: {item.crag_id}</Text>
                <Text>crag: {item.crag}</Text>
                <Text>sector: {item.sector}</Text>
            </View>
        );
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
            {FraGrades[gradeRange1-1]} - {FraGrades[gradeRange2-1]}
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