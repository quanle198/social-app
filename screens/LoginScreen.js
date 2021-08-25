import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button
                title='Click here'
                onPress={() => alert('Button clicked')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LoginScreen;
