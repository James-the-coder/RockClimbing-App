import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, Pressable} from 'react-native';


const StoreClimbQueryViewer = ({navigation, route}) => {
    let [flatListItems, setFlatListItems] = useState([]);
    const {climbingData} = route.params

    useEffect(() => {
        setFlatListItems(climbingData)
    }, []);

    let listViewItemSeparator = () => {
        return(
            <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}}/>
        );
    };

    let listItemView = (item, index) => {

        return (
            <View
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>Id: {item.crag_id}</Text>
                <Text>name: {item.name}</Text>
                <Text>crag: {item.crag}</Text>
                <Text>sector: {item.sector}</Text>
                <Text>grade: {item.fra_routes}</Text>
                <Pressable onPress={()=>navigation.navigate('StoreClimb', {selected: [item.crag_id, item.name, item.crag, ]})}><Text>Select</Text></Pressable>
            </View>
        );
    };

    return (
        <View style={{flex:1}}>
            <FlatList
                data={flatListItems}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item}) => listItemView(item)}
            />
        </View>
    );

};
export default StoreClimbQueryViewer;