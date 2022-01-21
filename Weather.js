import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';


function Weather() {
    const [placeName, setPlaceName] = useState('');
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
    return (
        <View style={{flex: 1}}>
        <View
        style={{
        marginTop: '30%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        }}>
        <Text
        style={{
        alignSelf: 'flex-start',
        color: '#48a7c7',
        padding: 8,
        fontSize: 18,
        }}> Place Name : </Text>
        <TextInput
        style={{
        borderWidth: 0.5,
        borderRadius: 10,
        width: '100%',
        fontSize: 18,
        }}
        placeholder="Enter Place Name"
        placeholderTextColor="grey"
        underlineColorAndroid="transparent"
        autoCapitalize="words"
        onChangeText={(text) => setPlaceName(text)}/>
        </View>
        <TouchableOpacity
        style={{
        padding: 10,
        backgroundColor: '#48a7c7',
        width: '70%',
        alignSelf: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: '6%',
        borderRadius: 10,
        }}
        onPress={() => {
        weatherRequest().then((res) => {
        setWeatherData(res.data);
        });
        }}>
        <Text style={{color: 'white', fontSize: 20}}> WEATHER</Text></TouchableOpacity>
        {Object.keys(weatherData).length !== 0 && (
        <View
        style={{
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
        elevation: 5,
        backgroundColor: '#a4d4e4',
        borderRadius: 10,
        padding: 10,
        marginTop: '5%',
        }}>
        <Text style={{fontSize: 35, color: '#48a7c7'}}>
        {weatherData.name}
        </Text>
        <Text style={{color: 'white', fontSize: 20, marginTop: '3%'}}>
        {(weatherData.main.temp - 273.15).toFixed(2)} °C
        </Text>
        <Text style={{color: 'white', fontSize: 22}}>{weatherData.weather[0].main}
        </Text>
        <Text style={{color: 'white', fontSize: 22}}>{weatherData.weather[0].description}
        </Text>
        <Text style={{color: 'white', fontSize: 22}}>Humidity : {weatherData.main.humidity}
        </Text>
        <Text style={{color: 'white', fontSize: 22}}>
        Pressure : {weatherData.main.pressure}
        </Text>
        </View>
        )}
        </View>
    );
}
export default Weather;