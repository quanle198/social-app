import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const ProfileScreen = ({ navigation }) => {
    const {user, logout} = useContext(AuthContext);
    return (
        <View>
            <Text>Profile Screen: {user.uid}</Text>
            <Button title='Log out' onPress={() => logout()}></Button>
        </View>
    )
};

export default ProfileScreen;
