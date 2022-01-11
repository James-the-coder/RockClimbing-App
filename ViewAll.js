import React, {useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'MainDB.db', createFromLocation:1});



const ViewAll = () => {
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM USERS',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                setFlatListItems(temp);
            });
        });
    }, []);

    let listViewItemSeparator = () => {
        return(
            <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}}/>
        );
    };

    let listItemView = (item) => {
        return (
            <View
                key={item.ID}
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>Id: {item.ID}</Text>
                <Text>Username: {item.USERNAME}</Text>
                <Text>Password: {item.PASSWORD}</Text>
                <Text>email: {item.EMAIL}</Text>
            </View>
        );
    };

    return (
        <View style={{flex:1}}>
            <FlatList
                data={flatListItems}
                ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={(item, index) => listItemView(item)}
                renderItem={({item}) => listItemView(item)}
            />
        </View>
    );

};

export default ViewAll;