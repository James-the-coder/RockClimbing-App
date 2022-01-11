import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import MultiSlider from'@ptomasroos/react-native-multi-slider';





class Filters extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Filters</Text>
        <TextInput //name of climb entry
            style={styles.input}
            placeholder='Name'
        />
        <TextInput //location entry
            style={styles.input}
            placeholder='Location'
        />

        <MultiSlider //grade range entry
            style={styles.slider}
            values={[0,100]}
            sliderLength={280}
            allowOverlap={false}
            max={100}
            min={0}
            enabledTwo={true}
            isMarkerSeparated={true}
        />

        <Pressable
            style={({ pressed }) => ({
            backgroundColor: pressed ? 'blue' : 'green',
            borderRadius: 8,
            },
            styles.pressableStyle
            )}>

            <Text style={styles.text}>Search</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    input: {
        backgroundColor: 'white',
        height: 50,
        marginVertical: 40,
        marginHorizontal: 10,
        borderWidth: 1,
        padding: 10
    },
    slider:{
        marginHorizontal: 20,
        marginVertical: 30
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