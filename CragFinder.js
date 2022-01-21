import React, { Component, useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name:'rockClimbingInfo.db', createFromLocation: 1});
Geocoder.init("AIzaSyCqH_RaZ8Djn11bjuMWPpgeDeDIX359g9k");


var data = []


class CragFinder extends Component {

    state = { loc: [] }

    constructor(props){
        super(props);

        this.mapMarkers = this.mapMarkers.bind(this);
    }

    //const [loc, setLoc] = useState([]);

    componentDidMount() {

            Geocoder.from("wales caerwent")
                .then(json => {
                    var location = json.results[0].geometry.location;
                    //console.log(location)

                    //data.push({coordinates: {latitude : location.lat, longitude : location.lng}})
                    console.log(location)
                    this.setState({loc : {"latitude" : location.lat, "longitude" : location.lng}})


                    //console.log(this.state.loc.latitude)
                    //console.log(this.state.loc.longitude)
            }).catch(error => console.warn(error));
    }

    mapMarkers = () => {

        return this.state.loc.map((item, index) => <Marker
            key={index}
            title="test"
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            description="Test"
        >
        </Marker>)

    }



    render() {

        return (

                <MapView
                    style={{flex: 1}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                    latitude: 51,
                    longitude: -2,
                    latitudeDelta: 10,
                    longitudeDelta: 10}}>

                    <Marker
                        coordinate={{latitude: 51, longitude: -2.5}}
                        title="bruh"
                        description="bruh"
                        ></Marker>
                </MapView>

        )


    }
}


export default CragFinder;