import React, { useState, useContext } from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { login, googlelogin, fblogin } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/rn-social-logo.png')}
                style={styles.logo}
            />

            <Text style={styles.text}>FX Social App</Text>

            <FormInput
                labelValue={email}
                onChangeText={(value) => setEmail(value)}
                placeholderText='Email'
                iconType='user'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(value) => setPassword(value)}
                placeholderText='Password'
                iconType='lock'
                secureTextEntry={true}

            />

            <FormButton
                buttonTitle='Sign in'
                onPress={() => login(email, password)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle='Sign in with Facebook'
                        btnType='facebook'
                        color='#4867aa'
                        backgroundColor='#e6eaf4'
                        onPress={() => { fblogin() }}
                    />

                    <SocialButton
                        buttonTitle='Sign in with Google'
                        btnType='google'
                        color='#de4d41'
                        backgroundColor='#f5e7ea'
                        onPress={() => { googlelogin() }}
                    />
                </View>) : null
            }


            <TouchableOpacity style={styles.forgotButton} onPress={() => { navigation.navigate('Signup') }}>
                <Text style={styles.navButtonText}>Don't have an account? Create here!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
});

export default LoginScreen;
