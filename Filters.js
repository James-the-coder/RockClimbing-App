import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import MultiSlider from'@ptomasroos/react-native-multi-slider';
import {openDatabase} from 'react-native-sqlite-storage';



const db = openDatabase(
    {
        name: 'rockClimbingInfo.db',
        createFromLocation:1
    },
    ()=>{console.log("found it")},
    error => {console.log(error)}
);

var counter = 0;

const Filters = ({navigation}) => {

    const [name, setName] = useState("");
    const country = "GBR";
    const [location, setLocation] = useState("");
    const [gradeRange1, setGradeRange1] = useState();
    const [gradeRange2, setGradeRange2] = useState();



    let [flatListItems, setFlatListItems] = useState([]);

    const grades = ["2a","2b","2c","3a","3b","3c","4a","4b","4c","5a","5b","5c","6a","6a+","6b","6b+","6c","6c+","7a","7a+","7b","7b+","7c","7c+","8a","8a+","8b","8b+","8c","8c+","9a","9a+","9b","9b+","9c","9c+"];

    let filterSearch= () => {
        console.log(location)
        db.transaction((tx) => {
            tx.executeSql('SELECT name, crag, sector  FROM ascent WHERE country="GBR" AND sector LIKE ?',
            [`%${location}%`],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                setFlatListItems(temp);
            });
        });
    };

    let listViewItemSeparator = () => {
        return(
            <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}}/>
        );
    };

    let listItemView = (item) => {
        counter = counter + 1
        console.log(counter)
        return (
            <View
                key={counter}
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>key: {counter}</Text>
                <Text>name: {item.name}</Text>
                <Text>crag: {item.crag}</Text>
                <Text>sector: {item.sector}</Text>
            </View>
        );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Filters</Text>
        <TextInput //name of climb entry
            style={styles.input}
            placeholder='Name'
            onChangeText={(txt) => setName(txt)}
        />
        <TextInput //location entry
            style={styles.input}
            placeholder='Location'
            onChangeText={(txt) => setLocation(`%${txt}%`)}
        />
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
            onPress={() => filterSearch()}
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Search</Text>
        </Pressable>
        <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => listItemView(item)}
            renderItem={({item}) => listItemView(item)}
        />
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

export default Filters;