import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'

const AppStack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('AlreadyLaunch')
    .then(value => {
      if(value == null){
        AsyncStorage.setItem('AlreadyLaunch', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if(isFirstLaunch === null){
    return null;
  }else if(isFirstLaunch === true){
    return (
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false
          }}       
        >
          <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
          <AppStack.Screen name='Login' component={LoginScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }else{
    return <LoginScreen/>
  }
};

export default App;
