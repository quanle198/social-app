import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = ({ navigation }) => {
    const {user, logout} = useContext(AuthContext);
    return (
        <View>
            <Text>Home Screen: {user.uid}</Text>
            <Button title='Log out' onPress={() => logout()}></Button>
        </View>
    )
};

export default HomeScreen;
