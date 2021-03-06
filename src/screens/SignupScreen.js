import React, { useContext, useState } from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register} = useContext(AuthContext);
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Create an account</Text>

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

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
                placeholderText='Confirm Password'
                iconType='lock'
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle='Sign up'
                onPress={() => register(email, password)}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Terms of service
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                    Privacy Policy
                </Text>
            </View>

            {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle='Sign UP with Facebook'
                        btnType='facebook'
                        color='#4867aa'
                        backgroundColor='#e6eaf4'
                        onPress={() => { }}
                    />

                    <SocialButton
                        buttonTitle='Sign UP with Google'
                        btnType='google'
                        color='#de4d41'
                        backgroundColor='#f5e7ea'
                        onPress={() => { }}
                    />
                </View>) : null
            }

            <TouchableOpacity style={styles.navButton} onPress={() => { navigation.navigate('Login') }}>
                <Text style={styles.navButtonText}>Have an account? Sign in!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
});

export default SignupScreen;
