import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
            });

        GoogleSignin.configure({
            webClientId: '599110756721-oltbn9t91fu5q8sck6rkd6mhapcoogpp.apps.googleusercontent.com',
        });
        
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
        >
            <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{ header: () => null }} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ header: () => null }} />
            <Stack.Screen
                name='Signup'
                component={SignupScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0
                    },
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <FontAwesome.Button
                                name='long-arrow-left'
                                size={25}
                                backgroundColor='#f9fafd'
                                color='#333'
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    )
                })}
            />
        </Stack.Navigator>
    );
};
export default AuthStack;

