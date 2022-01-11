import React, { Component, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name:'rockClimbingInfo.db', createFromLocation: 1});
Geocoder.init("AIzaSyCqH_RaZ8Djn11bjuMWPpgeDeDIX359g9k");
var running = true;
var renderMarker = false;

const data = [
    { coordinates: {latitude: 50, longitude: 50}},
    { coordinates: {latitude: 50.1, longitude: 50.1}}
]


const CragFinder = () => {

    var [loc, setLoc] = useState([]);



    while (running) {
        async function getCoords(){
            Geocoder.from("wales caerwent")
                .then(json => {
                    var location = json.results[0].geometry.location;

                    setLoc(location);
                    console.log(location.lng)
                    if (typeof location !== 'undefined'){
                        data.push({coordinates: location})
                        console.log(location.lat)
                    }




            })
        }
        running = false

    }
    console.log(data)

    return (

                <MapView
                    style={{flex: 1}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                    latitude: 50,
                    longitude: 50,
                    latitudeDelta: 0.0922,
                    loadingEnabled: true,
                    longitudeDelta: 0.0421}}>

                    {data.map((item, index) => (
                        <Marker key={index} title="Test" coordinate={item.coordinates} />
                    ))}
                </MapView>


    )
}


export default CragFinder;