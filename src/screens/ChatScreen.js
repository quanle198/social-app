import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Chat</Text>
            <Button title='Log out'></Button>
        </View>
    )
};

export default HomeScreen;
