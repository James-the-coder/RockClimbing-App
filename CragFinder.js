import React, { Component, useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name:'rockClimbingInfo.db', createFromLocation: 1});
Geocoder.init("AIzaSyCqH_RaZ8Djn11bjuMWPpgeDeDIX359g9k");





function CragFinder({navigation}) {

    const [data, setData] = useState([]);
    const [placeName, setPlaceName] = useState("");
    const [weatherData, setWeatherData] = useState({});

    function weatherRequest() {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
            reject('Request failed.Please try again');
            }, 40000);

            let url ='https://api.openweathermap.org/data/2.5/weather?q=' +placeName +'&APPID=d657b497a7641d582fbd524b8265b228';
            fetch(url).then((response) => {
                return Promise.all([response.status, response.json()]);
                }).then((responseJson) => {
                //console.log('response json', responseJson);
                resolve({
                statusCode: responseJson[0],
                data: responseJson[1],
                });
            })
            .catch((error) => {
            console.log('error', error);
            reject(error);
            });
        });
    }

    let mapMarkers = () => {
        Geocoder.from(placeName)
            .then(json => {
                var location = json.results[0].geometry.location;
                weatherRequest().then((res) => {
                    setData([{"latitude" : location.lat, "longitude" : location.lng, "conditions": res.data.weather[0].description}])
                });
        }).catch(error => console.log(error));
    }





        return (



                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                        latitude: 51,
                        longitude: -2,
                        latitudeDelta: 10,
                        longitudeDelta: 10}}>
                        {data &&
                            Array.from(data).map((item, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{latitude: item.latitude, longitude: item.longitude}}
                                    title={placeName}
                                    description={item.conditions}
                                />
                            ))}
                    </MapView>
                    <View style={styles.bottomContainer}>
                        <Pressable
                            onPress={() => mapMarkers()}
                            style={({ pressed }) => ({
                            backgroundColor: pressed ? 'blue' : 'green',
                            borderRadius: 8,
                            },
                            styles.pressableStyle
                            )}>

                            <Text style={styles.text}>Display</Text>
                        </Pressable>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Location"
                            onChangeText={(place) => setPlaceName(place)}
                          />
                        <Pressable
                            onPress={() => navigation.navigate('Filters')}
                            style={({ pressed }) => ({
                            backgroundColor: pressed ? 'blue' : 'green',
                            borderRadius: 8,
                            },
                            styles.pressableStyle2
                            )}>

                            <Text style={styles.text}>Filters</Text>
                        </Pressable>

                    </View>

                </View>

        )



}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex:1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        backgroundColor: 'white',
        height: 50,
        width: 150,
        margin: 1,
        borderWidth: 1,
        padding: 10,
        justifyContent: "flex-start",
        position: "absolute",
        bottom: 5,
        right: 10,
    },
    pressableStyle: {
            height: 50,
            margin: 1,
            width: 100,
            borderRadius: 4,
            padding: 10,
            backgroundColor: 'green',
            position: "absolute",
            left: 10,
            bottom: 5,

    },
    pressableStyle2: {
            height: 50,
            margin: 1,
            width: 100,
            borderRadius: 4,
            padding: 10,
            backgroundColor: 'green',
            position: "absolute",
            left: 110,
            bottom: 5,

    },
    text: {
        textAlign: 'center'
    },
    bottomContainer: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        position: "absolute",
        bottom: 0,
    }
})


export default CragFinder;