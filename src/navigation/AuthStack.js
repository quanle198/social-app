import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('AlreadyLaunch')
            .then(value => {
                if (value == null) {
                    AsyncStorage.setItem('AlreadyLaunch', 'true');
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
            })
    }, []);

    if (isFirstLaunch === null) {
        return null;
    } else if (isFirstLaunch === true) {
        routeName = 'Onboarding'
    } else {
        routeName = 'Login'
    };

    return (
        <Stack.Navigator
            initialRouteName={routeName}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
    );
};
export default AuthStack;

